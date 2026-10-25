(function (root) {
    'use strict';
    // Sources:
    // https://github.com/community-valheim-tools/valheim-server-docker (README, environment variables / event hooks / log filters / backups)
    // https://www.valheimgame.com/support/a-guide-to-dedicated-servers/ (command line arguments, -preset/-modifier/-setkey values)
    // https://www.gameserverkings.com/knowledge-base/valheim/valheim-world-modifiers/ (world modifier numbers, cited from the Valheim wiki)
    // https://xgamingserver.com/docs/valheim/world-modifiers (modifier/preset overview)
    // https://github.com/escapingnetwork/core-keeper-dedicated (README, environment variables / mod support)
    // https://core-keeper.fandom.com/wiki/Game_mode (via search summary: Casual/Hard/Creative stats)
    // https://xgamingserver.com/docs/core-keeper/game-mode
    const hook = (when, extra) => ({
        what: [`${when} 컨테이너 안에서 실행할 셸 명령`],
        effect: [
            '입력하면: 해당 시점마다 명령 실행',
            '비우면: 아무것도 실행 안 함'
        ].concat(extra ? [].concat(extra) : []),
        tip: [
            '명령이 오래 걸리거나 실패하면 서버 시작·종료가 지연될 수 있음',
            '짧고 안전한 명령 사용 권장',
            '외부 패키지가 필요하면 POST_BOOTSTRAP_HOOK에서 설치하는 방법이 안내되어 있음'
        ]
    });
    const logFilter = (how) => ({
        what: [`게임 로그에서 ${how} 줄을 화면(docker logs)에서 거르는 필터`],
        effect: [
            '값 입력 시: 조건에 맞는 줄을 로그에서 제거',
            '비우면: 이 필터 꺼짐',
            '게임 동작에는 영향 없음, 로그 표시만 바뀜'
        ],
        tip: [
            '같은 종류 필터 여러 개: 추가 환경변수에 접미사 붙여 사용 (예: VALHEIM_LOG_FILTER_CONTAINS_Foo=문자열)',
            'ON_ 으로 시작하는 같은 이름 변수를 함께 두면 줄 삭제 대신 명령 실행'
        ]
    });
    const entries = {
        // ---------- Valheim: world ----------
        'valheim.worldPreset': {
            what: [
                '월드 난이도 규칙을 한 번에 묶어 적용하는 프리셋 (-preset 인수)',
                '게임 월드 설정 화면의 프리셋과 동일'
            ],
            effect: [
                '보통(normal): 모든 규칙을 기본값으로 초기화',
                '캐주얼: 가장 느슨한 조합 (매우 쉬운 전투, 습격 없음, 광물 포탈 허용)',
                '쉬움: 약간 쉬운 조합',
                '어려움: 적 강화, 사망 페널티 증가',
                '하드코어: 가장 가혹한 조합 (매우 어려운 전투, 사망 시 소지품·스킬 전부 손실)',
                '몰입(immersive): 지도·포탈 등 편의 기능 제한, 탐험 위주',
                '해머(hammer): 건축 비용 없음·선공하지 않는 적·습격 없음, 건축 위주',
                '기존 설정 유지: 프리셋 명령 전송 안 함'
            ],
            tip: [
                '프리셋은 이전에 적용된 모든 월드 규칙을 덮어씀',
                '이 앱은 프리셋을 개별 규칙보다 먼저 적용함',
                '프리셋 선택 후 아래 항목으로 세부 조정 가능',
                '프리셋의 정확한 구성은 게임 버전에 따라 다를 수 있음',
                '게임 내 월드 설정 화면에서 확인하는 것이 가장 정확함'
            ]
        },
        'valheim.combat': {
            what: ['적 공격력·체력과 플레이어 공격력의 균형을 정하는 전투 난이도 (-modifier combat)'],
            effect: [
                '매우 쉬움: 주는 피해 약 125%, 받는 피해 약 50%',
                '쉬움: 주는 피해 약 110%, 받는 피해 약 75%',
                '어려움: 주는 피해 약 85%, 받는 피해 약 150%',
                '어려움: 적이 조금 더 빠르고 커짐, 별(레벨) 붙은 적 더 자주 등장',
                '매우 어려움: 주는 피해 약 70%, 받는 피해 약 200%',
                '매우 어려움: 적의 한 방이 두 배로 아픔, 별 붙은 적 훨씬 많아짐',
                '미선택 시: 보통(100%)'
            ],
            tip: [
                '수치는 Valheim 위키 기준, 패치에 따라 달라질 수 있음',
                '진행 중인 월드에서 갑자기 매우 어려움으로 올리면 체감 난이도가 크게 뜀',
                '단계적으로 올리는 것을 권장'
            ]
        },
        'valheim.deathPenalty': {
            what: ['플레이어 사망 시 잃는 아이템·스킬의 양 (-modifier deathpenalty)'],
            effect: [
                '캐주얼: 착용 장비 유지, 나머지 소지품만 묘비에 떨어짐, 스킬 손실 약 1%',
                '매우 쉬움: 소지품을 묘비에 떨어뜨림, 스킬 손실 약 1%',
                '쉬움: 스킬 손실 약 2.5%',
                '보통(기본): 모든 소지품이 묘비에 남음, 스킬 약 5% 손실',
                '어려움: 착용 장비만 묘비에 남고 나머지 소지품 사라짐, 스킬 약 7.5% 손실',
                '하드코어: 모든 소지품 사라짐, 스킬 전부 초기화'
            ],
            tip: [
                '하드코어는 되돌릴 수 없는 손실 발생, 참가자에게 미리 알릴 것',
                '수치는 위키·호스팅 문서 기준',
                '출처마다 세부 내용이 조금씩 다름, 게임 내 설명으로 확인 권장'
            ]
        },
        'valheim.resources': {
            what: ['나무·광석·몬스터 전리품 등 채집·드롭 자원 양의 배율 (-modifier resources)'],
            effect: [
                '매우 적게: 0.5배',
                '적게: 0.75배',
                '많이: 1.5배',
                '매우 많이: 2배',
                '최대: 3배',
                '미선택 시: 1배(보통)',
                '올리면: 파밍 시간 감소, 진행 빨라짐',
                '내리면: 자원 관리가 빡빡해짐'
            ],
            tip: [
                '배율은 올림 처리됨, 1.5배가 실제로는 2배처럼 느껴지는 경우 있음',
                '위키 기준 물고기·트로피·보스 드롭에는 미적용'
            ]
        },
        'valheim.raids': {
            what: ['기지에 몬스터 무리가 쳐들어오는 습격 이벤트의 빈도 (-modifier raids)'],
            effect: [
                '습격 없음: 습격 이벤트 발생 안 함',
                '매우 드물게: 확인 간격 약 92분, 발생 확률 약 10%',
                '드물게: 약 69분, 약 13%',
                '보통(기본): 약 46분, 20%',
                '자주: 약 28분, 약 33%',
                '매우 자주: 약 14분, 약 67% (거의 쉴 틈 없이 습격)'
            ],
            tip: [
                '습격 없음이어도 밤에 일반 몬스터가 기지 근처에 나타나는 것은 못 막음',
                '습격 종류는 처치한 보스 진행도에 따라 정해짐',
                '플레이어별 계산을 원하면 플레이어 진행도 기반 습격을 함께 켤 것'
            ]
        },
        'valheim.portals': {
            what: ['포탈로 옮길 수 있는 대상과 포탈 사용 가능 여부 (-modifier portals)'],
            effect: [
                '광물·금속 포탈 허용(casual): 광석·금속 주괴 등 원래 막힌 아이템도 이동 가능, 운반 노동 크게 감소',
                '어려움(hard): 기본보다 포탈 사용이 더 제한됨',
                '포탈 사용 불가(veryhard): 포탈 사용 불가, 모든 이동·운반을 걷거나 배로 해야 함',
                '미선택 시: 기본 규칙 (광석·금속 이동 불가)'
            ],
            tip: [
                '어려움(hard)의 정확한 제한 내용은 공식 문서에 없음',
                '게임 내부적으로 보스 관련 포탈을 막는 설정으로 알려져 있으나 확실하지 않음',
                '게임 내 설명으로 확인 권장',
                '광물 포탈 허용은 ValheimPlus 같은 모드 없이도 작동함'
            ]
        },
        'valheim.nobuildcost': {
            what: ['건축 시 재료를 소모하지 않게 하는 월드 규칙 (-setkey nobuildcost)'],
            effect: [
                '켜면: 모든 건축이 무료, 재료 없이 건축 가능',
                '건축 레시피는 여전히 해당 재료를 발견해야 해금됨'
            ],
            tip: [
                '기존 설정 유지는 해제 명령이 아님',
                '끄려면: 프리셋을 보통으로 초기화 후 필요한 규칙만 다시 선택'
            ]
        },
        'valheim.playerevents': {
            what: ['습격 종류를 월드 전체 대신 각 플레이어의 진행도로 정하는 규칙 (-setkey playerevents)'],
            effect: [
                '켜면: 보스를 안 잡은 새 플레이어 기지에는 초반 수준 습격',
                '켜면: 진행이 빠른 플레이어에게는 그에 맞는 습격',
                '끄면(기본): 누군가 보스를 잡으면 모든 플레이어에게 더 강한 습격이 올 수 있음'
            ],
            tip: [
                '진행 속도가 다른 사람들이 함께 하는 서버에서 유용함',
                '해제하려면: 보통 프리셋으로 초기화 후 다시 선택'
            ]
        },
        'valheim.passivemobs': {
            what: ['적이 먼저 공격하지 않도록 하는 규칙 (-setkey passivemobs)'],
            effect: [
                '켜면: 적이 플레이어를 보고도 선제공격 안 함',
                '켜면: 플레이어가 먼저 공격해야 반격함',
                '탐험과 건축이 매우 편해짐'
            ],
            tip: ['해제하려면: 보통 프리셋으로 초기화 후 원하는 규칙 다시 선택']
        },
        'valheim.nomap': {
            what: ['지도와 미니맵 사용을 막는 규칙 (-setkey nomap)'],
            effect: [
                '켜면: 모든 플레이어가 지도·미니맵 없이 지형·표지물로 길을 찾아야 함',
                '탐험 긴장감 증가, 길을 잃기 쉬움'
            ],
            tip: ['해제하려면: 보통 프리셋으로 초기화 후 규칙 다시 선택']
        },

        // ---------- Valheim: save ----------
        'valheim.saveInterval': {
            what: ['게임이 월드를 자동 저장하는 주기(초) (-saveinterval)'],
            effect: [
                '줄이면: 더 자주 저장, 서버가 갑자기 꺼져도 잃는 진행 감소',
                '줄이면: 저장 순간의 짧은 끊김이 더 자주 생길 수 있음',
                '늘리면: 그 반대',
                '기본값(비움): 1800초(30분)'
            ],
            tip: [
                '큰 월드는 저장 시 잠깐 렉이 생길 수 있음',
                '너무 짧게(예: 수십 초) 설정하는 것은 비권장'
            ]
        },
        'valheim.nativeBackups': {
            what: ['게임이 자체 보관하는 월드 자동 백업 개수 (-backups)'],
            effect: [
                '늘리면: 더 오래된 시점까지 복구 가능, 디스크 사용량 증가',
                '0: 게임 자체 백업을 남기지 않는 것으로 보임',
                '기본값(비움): 4개'
            ],
            tip: [
                '아래 컨테이너 자동 백업과는 별개임',
                '첫 백업은 첫 게임 백업 간격을 따름',
                '나머지는 이후 게임 백업 간격을 따름'
            ]
        },
        'valheim.backupShort': {
            what: ['게임 자체 백업 중 첫 번째 백업이 만들어지는 간격(초) (-backupshort)'],
            effect: [
                '줄이면: 가장 최근 백업이 더 촘촘해짐',
                '기본값(비움): 7200초(2시간)'
            ]
        },
        'valheim.backupLong': {
            what: ['게임 자체 백업 중 두 번째 이후 백업이 만들어지는 간격(초) (-backuplong)'],
            effect: [
                '줄이면: 오래된 백업 사이 간격이 좁아짐',
                '늘리면: 같은 개수로 더 먼 과거까지 보관',
                '기본값(비움): 43200초(12시간)'
            ]
        },
        'valheim.instanceId': {
            what: ['크로스플레이(PlayFab)에서 서버를 구분하는 고유 인스턴스 ID (-instanceid)'],
            effect: [
                '같은 컴퓨터(같은 MAC 주소)에서 크로스플레이 서버를 여러 개 띄울 때 사용',
                '서버마다 다른 값을 주면 각자 고유한 PlayFab ID 받음',
                '서버가 하나라면: 비워둠'
            ],
            tip: [
                '공백·따옴표 없이 입력',
                '크로스플레이를 끈 서버에서는 의미 없음'
            ]
        },
        'valheim.logFile': {
            what: ['게임 서버 로그를 별도 파일로 저장할 경로 (-logFile)'],
            effect: [
                '입력하면: 로그가 그 파일로 기록됨',
                '비우면: 기본 출력(docker logs)으로 나옴'
            ],
            tip: [
                '파일로 보내면 docker logs와 아래 로그 필터에 게임 로그가 안 나타날 수 있음',
                '영구 보관하려면 /config 아래 경로 사용'
            ]
        },

        // ---------- Valheim: access ----------
        'valheim.adminIds': {
            what: ['관리자 권한을 줄 플레이어 ID 목록 (ADMINLIST_IDS, adminlist.txt)'],
            effect: [
                '입력한 ID의 플레이어는 게임 콘솔에서 kick·ban 등 관리자 명령 사용 가능',
                '입력하면: 서버의 adminlist.txt를 이 목록으로 덮어씀',
                '비우면: 기존 파일 그대로 유지'
            ],
            tip: [
                'Steam 사용자: SteamID64(7656으로 시작하는 17자리)를 공백으로 구분해 입력',
                '크로스플레이 사용자: 게임 내 F2 화면 등에서 확인한 플랫폼 ID 사용'
            ]
        },
        'valheim.bannedIds': {
            what: ['접속을 차단할 플레이어 ID 목록 (BANNEDLIST_IDS, bannedlist.txt)'],
            effect: [
                '입력한 ID는 서버 접속 불가',
                '입력하면: 기존 bannedlist.txt를 덮어씀',
                '게임 안에서 ban으로 추가한 ID도 목록에 없으면 다음 시작 때 사라짐',
                '비우면: 기존 파일 유지'
            ]
        },
        'valheim.permittedIds': {
            what: ['접속을 허용할 플레이어 ID 목록(화이트리스트) (PERMITTEDLIST_IDS, permittedlist.txt)'],
            effect: [
                '하나라도 입력하면: 목록에 있는 사람만 접속 가능',
                '목록 외 사람은 비밀번호를 알아도 거부됨',
                '비우면: 기존 파일 유지',
                '파일도 비어 있으면: 비밀번호만 알면 누구나 접속'
            ],
            tip: ['본인 ID를 빠뜨리면 본인도 접속 불가, 주의']
        },

        // ---------- Valheim: maintenance ----------
        'valheim.timezone': {
            what: [
                '컨테이너의 시간대 (TZ)',
                '업데이트·재시작·백업 Cron 시각과 로그 시간에 적용됨'
            ],
            effect: [
                'Asia/Seoul: Cron 시각이 한국 시간 기준이 됨',
                '이미지 기본값: Etc/UTC'
            ],
            tip: ['Area/City 형식의 IANA 시간대 이름 입력']
        },
        'valheim.updateCron': {
            what: ['게임 서버 업데이트를 확인하는 주기(Cron 식) (UPDATE_CRON)'],
            effect: [
                '기본값: */15 * * * * (15분마다 확인)',
                '새 버전이 있으면: 서버를 내렸다가 업데이트 후 다시 올림',
                '비우면: 자동 업데이트 안 함'
            ],
            tip: [
                '클라이언트만 업데이트되고 서버가 구버전이면 접속 불가',
                '켜두는 것을 권장',
                '모드 서버는 모드가 새 버전을 지원할 때까지 업데이트를 꺼두기도 함'
            ]
        },
        'valheim.updateIfIdle': {
            what: ['접속자가 없을 때만 업데이트를 적용할지 여부 (UPDATE_IF_IDLE)'],
            effect: [
                '켜면(기본): 플레이 중인 사람이 있으면 업데이트 미룸, 갑자기 튕기지 않음',
                '끄면: 플레이어가 있어도 업데이트 시 바로 재시작'
            ],
            tip: [
                '공개 서버: Steam 조회로 접속자 여부 판단',
                '비공개 서버: UDP 트래픽 양으로 접속자 여부 판단'
            ]
        },
        'valheim.restartCron': {
            what: ['서버를 정기적으로 재시작하는 주기(Cron 식) (RESTART_CRON)'],
            effect: [
                '기본값: 10 5 * * * (매일 05:10 재시작)',
                '장시간 실행으로 쌓이는 메모리 사용과 렉 감소',
                '비우면: 자동 재시작 안 함'
            ],
            tip: [
                '시각은 시간대(TZ) 설정을 따름',
                '백업 Cron과 시각이 겹치지 않게 하는 것이 좋음'
            ]
        },
        'valheim.restartIfIdle': {
            what: ['접속자가 없을 때만 예약 재시작을 할지 여부 (RESTART_IF_IDLE)'],
            effect: [
                '켜면(기본): 플레이 중인 사람이 있으면 그 회차 재시작 건너뜀',
                '끄면: 예약 시각에 무조건 재시작'
            ]
        },
        'valheim.steamcmdArgs': {
            what: ['게임 서버 설치·업데이트 시 SteamCMD에 추가로 넘기는 인수 (STEAMCMD_ARGS)'],
            effect: [
                '기본값: validate (업데이트마다 파일 무결성 검사, 손상 파일 복구)',
                '지우면: 업데이트가 조금 빨라짐, 손상 파일 자동 복구 안 함'
            ],
            tip: ['베타 브랜치는 직접 입력보다 공개 테스트 버전 사용 항목이 안전함']
        },
        'valheim.publicTest': {
            what: ['Valheim 공개 테스트(Public Test) 베타 버전 설치 여부 (PUBLIC_TEST)'],
            effect: [
                '켜면: SteamCMD 인수에 베타 옵션 추가, 테스트 버전 서버 실행',
                '클라이언트도 같은 테스트 버전이어야 접속 가능',
                '끄면(기본): 정식 버전 사용'
            ],
            tip: [
                '테스트 버전에서 열린 월드는 정식 버전과 호환되지 않을 수 있음',
                '반드시 월드 백업 후 사용'
            ]
        },

        // ---------- Valheim: container backups ----------
        'valheim.backups': {
            what: ['컨테이너가 월드 폴더(worlds_local)를 주기적으로 별도 압축 백업하는 기능 (BACKUPS)'],
            effect: [
                '켜면(기본): 서버 시작 시와 백업 주기마다 월드 백업',
                '끄면: 컨테이너 백업 안 함, 게임 자체 백업만 남음'
            ],
            tip: [
                '서버 실행 중 백업하므로 드물게 저장 중인 파일이 들어갈 수 있음',
                '중요한 서버라면 백업 폴더를 다른 디스크나 외부로 복사 권장'
            ]
        },
        'valheim.backupsCron': {
            what: ['컨테이너 백업을 만드는 주기(Cron 식) (BACKUPS_CRON)'],
            effect: [
                '기본값: 5 * * * * (매시 5분에 백업)',
                '주기를 줄이면: 복구 시점이 촘촘해짐, 백업 파일 증가'
            ],
            tip: ['시각은 시간대(TZ)를 따름']
        },
        'valheim.backupsDirectory': {
            what: ['컨테이너 백업 파일을 저장할 컨테이너 내부 경로 (BACKUPS_DIRECTORY)'],
            effect: [
                '기본값: /config/backups',
                '영구 볼륨 밖 경로 사용 시: 컨테이너 재생성 때 백업 사라짐'
            ],
            tip: [
                'worlds_local 폴더 안은 피할 것',
                '/config 또는 /opt/valheim 아래 경로 권장'
            ]
        },
        'valheim.backupsMaxAge': {
            what: ['컨테이너 백업 보관 일수 (BACKUPS_MAX_AGE)'],
            effect: [
                '기본값: 3일',
                '늘리면: 더 오래된 시점으로 복구 가능, 디스크 사용 증가',
                '기간이 지난 백업은 자동 삭제됨'
            ],
            tip: ['보관 일수가 최대 개수보다 우선 적용됨']
        },
        'valheim.backupsMaxCount': {
            what: ['보관할 컨테이너 백업의 최대 개수 (BACKUPS_MAX_COUNT)'],
            effect: [
                '값 지정 시: 개수를 넘는 오래된 백업부터 삭제',
                '0(기본): 개수 제한 없음, 보관 일수만 적용'
            ]
        },
        'valheim.backupsIfIdle': {
            what: ['아무도 플레이하지 않을 때도 백업할지 여부 (BACKUPS_IF_IDLE)'],
            effect: [
                '켜면(기본): 접속자가 없어도 주기마다 백업',
                '끄면: 최근에 플레이한 경우에만 백업, 변화 없는 중복 백업 감소'
            ],
            tip: ['끈 경우에도 마지막 접속 종료 후 백업 유예 시간 동안은 계속 백업함']
        },
        'valheim.backupsIdleGracePeriod': {
            what: ['무접속 백업을 끈 경우, 마지막 플레이어가 나간 뒤 백업을 계속하는 유예 시간(초) (BACKUPS_IDLE_GRACE_PERIOD)'],
            effect: [
                '기본값: 3600초(1시간)',
                '늘리면: 접속 종료 후에도 더 오래 백업',
                '줄이면: 빨리 멈춤'
            ],
            tip: ['무접속 백업이 켜져 있으면 이 값은 미사용']
        },
        'valheim.backupsZip': {
            what: ['컨테이너 백업의 ZIP 압축 여부 (BACKUPS_ZIP)'],
            effect: [
                '켜면(기본): 용량 작아짐',
                '끄면: 압축하지 않은 파일로 저장, 바로 꺼내 쓰기 쉬움, 용량 커짐'
            ]
        },

        // ---------- Valheim: mods ----------
        'valheim.modMode': {
            what: ['서버에서 사용할 모드 로더 선택 (BEPINEX 또는 VALHEIM_PLUS)'],
            effect: [
                '기본 서버: 모드 없이 실행',
                'BepInEx: Thunderstore 등의 일반 모드를 넣을 수 있는 범용 로더',
                'ValheimPlus: 설정 파일로 많은 게임 규칙을 바꾸는 대형 모드',
                '두 로더는 동시 사용 불가'
            ],
            tip: [
                '대부분의 모드는 접속하는 클라이언트에도 같은 모드 설치 필요함',
                '크로스플레이와 일부 모드는 함께 동작하지 않을 수 있음'
            ]
        },
        'valheim.plusRepo': {
            what: ['ValheimPlus를 내려받을 GitHub 저장소 (VALHEIM_PLUS_REPO)'],
            effect: [
                '기본값: Grantapher/ValheimPlus (현재 유지 관리 중)',
                '다른 포크 사용 시: 제작자/저장소 형식으로 변경'
            ],
            tip: ['ValheimPlus 모드 로더 선택 시에만 사용됨']
        },
        'valheim.plusRelease': {
            what: ['설치할 ValheimPlus 버전 (VALHEIM_PLUS_RELEASE)'],
            effect: [
                'latest(기본): 최신 릴리스 받음',
                'tags/0.10.3.0 같은 태그 지정: 그 버전으로 고정'
            ],
            tip: [
                '클라이언트·서버 ValheimPlus 버전이 다르면 접속 거부될 수 있음',
                '버전을 고정하고 함께 맞추는 것을 권장'
            ]
        },

        // ---------- Valheim: http ----------
        'valheim.statusHttp': {
            what: ['서버 상태(이름, 접속자 수, 버전 등)를 status.json으로 제공하는 작은 웹 서버 (STATUS_HTTP)'],
            effect: [
                '켜면: 지정한 TCP 포트에서 상태 JSON 조회 가능',
                '모니터링·디스코드 봇 등에 활용 가능',
                '끄면(기본): 웹 서버 실행 안 함'
            ],
            tip: [
                '서버 목록 공개(SERVER_PUBLIC)가 켜져 있어야 정상 동작',
                '외부에 열 경우 공개 주소와 방화벽 확인 필요함'
            ]
        },
        'valheim.statusHttpPort': {
            what: ['상태 웹 서버가 컨테이너 안에서 쓰는 TCP 포트 (STATUS_HTTP_PORT)'],
            effect: [
                '기본값: 80',
                '보통은 그대로 두고 호스트 포트만 변경'
            ],
            tip: ['Supervisor 관리 포트와 같은 값이면 충돌함']
        },
        'valheim.statusHostPort': {
            what: ['상태 웹 서버를 연결할 Docker 호스트 TCP 포트 (Compose ports)'],
            effect: [
                '기본값: 8080 (http://호스트주소:8080/status.json 으로 조회)',
                '다른 서비스와 겹치면 다른 번호로 변경'
            ]
        },
        'valheim.statusBind': {
            what: ['상태 웹 서버 포트를 열 호스트 IP 주소 (Compose ports 바인드 주소)'],
            effect: [
                '127.0.0.1(기본): Docker 호스트 자신만 접근 가능',
                '호스트의 특정 IP: 그 네트워크에서 접근 가능',
                '0.0.0.0: 모든 네트워크 인터페이스에서 접근 가능'
            ],
            tip: ['인터넷 공개 시 0.0.0.0과 함께 공유기 포트포워딩·방화벽 설정 필요함']
        },
        'valheim.statusHttpConf': {
            what: ['상태 웹 서버(BusyBox httpd)의 설정 파일 경로 (STATUS_HTTP_CONF)'],
            effect: [
                '접근 허용·차단 규칙(IP 제한, 기본 인증 등)으로 상태 페이지 접근 제한 가능',
                '기본값: /config/httpd.conf'
            ],
            tip: [
                '파일이 없으면 기본 동작으로 실행됨',
                'BusyBox httpd 설정 문법을 따름'
            ]
        },
        'valheim.statusHttpHtdocs': {
            what: ['status.json 파일이 만들어지는 컨테이너 내부 폴더 (STATUS_HTTP_HTDOCS)'],
            effect: [
                '기본값: /opt/valheim/htdocs',
                '이 폴더에 다른 정적 파일을 넣으면 함께 제공됨'
            ]
        },
        'valheim.supervisorHttp': {
            what: ['컨테이너 안의 프로세스 관리자(Supervisor)를 웹 화면으로 조작하는 기능 (SUPERVISOR_HTTP)'],
            effect: [
                '켜면: 브라우저에서 게임 서버·백업·업데이트 프로세스 상태 확인',
                '켜면: 프로세스 시작·중지·재시작, 로그 보기 가능',
                '끄면(기본): 관리 화면 없음'
            ],
            tip: [
                '서버를 마음대로 끌 수 있는 강력한 기능임',
                '암호화되지 않은 HTTP 기본 인증 사용',
                '인터넷에 직접 공개 금지',
                '127.0.0.1 바인드 + SSH 터널이나 VPN으로 접근 강력 권장'
            ]
        },
        'valheim.supervisorHttpPort': {
            what: ['Supervisor 관리 웹이 컨테이너 안에서 쓰는 TCP 포트 (SUPERVISOR_HTTP_PORT)'],
            effect: [
                '기본값: 9001',
                '보통은 그대로 두고 호스트 포트만 변경'
            ]
        },
        'valheim.supervisorHostPort': {
            what: ['Supervisor 관리 웹을 연결할 Docker 호스트 TCP 포트 (Compose ports)'],
            effect: [
                '기본값: 9001 (http://호스트주소:9001 로 접속)',
                '다른 서비스와 겹치면 변경'
            ]
        },
        'valheim.supervisorBind': {
            what: ['Supervisor 관리 웹 포트를 열 호스트 IP 주소 (Compose ports 바인드 주소)'],
            effect: [
                '127.0.0.1(기본): 호스트 자신만 접근 가능',
                '0.0.0.0: 모든 네트워크에서 접근 가능'
            ],
            tip: [
                '보안상 127.0.0.1 유지 권장',
                '원격 사용 시 SSH 포트 포워딩 이용'
            ]
        },
        'valheim.supervisorHttpUser': {
            what: ['Supervisor 관리 웹 로그인 사용자 이름 (SUPERVISOR_HTTP_USER)'],
            effect: [
                '기본값: admin',
                '추측하기 어려운 이름으로 바꾸면 무차별 대입 공격에 조금 더 안전함'
            ]
        },
        'valheim.supervisorHttpPass': {
            what: ['Supervisor 관리 웹 로그인 비밀번호 (SUPERVISOR_HTTP_PASS)'],
            effect: [
                '관리 웹을 켜려면 이 값이나 비밀번호 파일 중 하나 필요함',
                '입력한 값은 Compose 파일에 그대로 기록됨'
            ],
            tip: [
                'Compose 파일 공유 계획이 있으면 비밀번호 파일(secret) 방식 사용',
                '다른 서비스와 같은 비밀번호는 피할 것'
            ]
        },
        'valheim.supervisorSecretFile': {
            what: ['Supervisor 비밀번호를 담은 Docker 호스트 파일 경로 (SUPERVISOR_HTTP_PASS_FILE, Compose secret)'],
            effect: [
                '입력하면: Compose secret으로 연결, 비밀번호가 Compose 파일에 노출 안 됨',
                '직접 입력한 비밀번호보다 우선함'
            ],
            tip: [
                '생성기가 파일을 만들지 않음, 서버에 실제 파일 준비 필요함',
                '파일이 없으면 컨테이너 시작 안 됨'
            ]
        },

        // ---------- Valheim: container ----------
        'valheim.puid': {
            what: ['컨테이너 안에서 게임 서버가 실행될 사용자 ID (PUID)'],
            effect: [
                '호스트 볼륨 폴더 소유자 UID와 맞추면 호스트에서 월드·설정 파일을 권한 문제 없이 편집 가능',
                '앱 기본값: 1000 (대부분의 리눅스 첫 사용자)',
                '이미지 자체 기본값: 0(root)'
            ],
            tip: ['호스트에서 id 명령으로 자신의 UID 확인 가능']
        },
        'valheim.pgid': {
            what: ['컨테이너 안에서 게임 서버가 실행될 그룹 ID (PGID)'],
            effect: [
                '호스트 볼륨 폴더의 그룹과 맞추면 파일 권한 문제 감소',
                '앱 기본값: 1000'
            ]
        },
        'valheim.permissionsUmask': {
            what: ['백업·설정 파일과 폴더 생성 시 적용할 권한 마스크(umask) (PERMISSIONS_UMASK)'],
            effect: [
                '022(기본): 소유자만 쓰기, 다른 사람은 읽기만 가능',
                '002: 같은 그룹도 쓰기 가능',
                '077: 소유자 외에는 읽기도 불가'
            ],
            tip: [
                '여러 사용자가 같은 그룹으로 파일 관리 시: 002 고려',
                '보안이 중요하면: 077 고려'
            ]
        },

        // ---------- Valheim: logs ----------
        'valheim.logFilterEmpty': {
            what: ['게임 로그의 빈 줄 삭제 여부 (VALHEIM_LOG_FILTER_EMPTY)'],
            effect: [
                '켜면(기본): 빈 줄 제거, 로그가 읽기 쉬워짐',
                '끄면: 원본 그대로 출력'
            ]
        },
        'valheim.logFilterUtf8': {
            what: ['게임 로그의 깨진(잘못된 UTF-8) 문자 삭제 여부 (VALHEIM_LOG_FILTER_UTF8)'],
            effect: [
                '켜면(기본): 깨진 문자 제거, 로그 수집 도구 오류 방지',
                '끄면: 원본 그대로 출력'
            ]
        },
        'valheim.logFilterMatch': Object.assign(logFilter('입력한 값과 완전히 같은'), {
            effect: [
                '값과 정확히 일치하는 줄 제거',
                '기본값: 공백 한 칸 (공백만 있는 줄 삭제)',
                '비우면: 이 필터 꺼짐'
            ]
        }),
        'valheim.logFilterStartsWith': Object.assign(logFilter('입력한 값으로 시작하는'), {
            effect: [
                '값으로 시작하는 줄 제거',
                '기본값: (Filename: (Unity가 반복 출력하는 소스 파일 위치 줄 삭제)',
                '비우면: 이 필터 꺼짐'
            ]
        }),
        'valheim.logFilterEndsWith': logFilter('입력한 값으로 끝나는'),
        'valheim.logFilterContains': logFilter('입력한 값을 포함하는'),
        'valheim.logFilterRegexp': Object.assign(logFilter('정규식과 일치하는'), {
            effect: [
                '입력한 정규식에 맞는 줄 제거',
                '비우면: 이 필터 꺼짐',
                '잘못된 정규식은 의도하지 않은 줄까지 지울 수 있음'
            ]
        }),
        'valheim.syslogRemoteHost': {
            what: ['로그를 전송할 원격 Syslog 서버 주소 (SYSLOG_REMOTE_HOST)'],
            effect: [
                '입력하면: 컨테이너 로그를 해당 서버로 보내 중앙에서 모아 보기 가능',
                '비우면: 원격 전송 안 함'
            ]
        },
        'valheim.syslogRemotePort': {
            what: ['원격 Syslog 서버의 UDP 포트 (SYSLOG_REMOTE_PORT)'],
            effect: [
                '기본값: 514',
                '원격 Syslog 호스트 입력 시에만 사용됨'
            ]
        },
        'valheim.syslogRemoteAndLocal': {
            what: ['원격 Syslog 전송 중에도 로컬(docker logs)에 로그를 남길지 여부 (SYSLOG_REMOTE_AND_LOCAL)'],
            effect: [
                '켜면(기본): 양쪽 모두 기록',
                '끄면: 원격으로만 전송, docker logs에는 거의 안 나타남'
            ]
        },

        // ---------- Valheim: hooks ----------
        'valheim.PRE_SUPERVISOR_HOOK': hook('프로세스 관리자(supervisord)가 시작되기 전에', '명령이 끝날 때까지 컨테이너 시작이 멈춤'),
        'valheim.PRE_BOOTSTRAP_HOOK': hook('서버 초기화(bootstrap) 단계 직전에', '명령이 끝날 때까지 초기화가 멈춤'),
        'valheim.POST_BOOTSTRAP_HOOK': hook('서버 초기화가 끝나고 게임 서버·서비스가 시작되기 전에', ['명령이 끝날 때까지 시작이 멈춤', '추가 패키지 설치에 적합함']),
        'valheim.PRE_BACKUP_HOOK': hook('컨테이너 백업을 만들기 직전에', '명령 안의 @BACKUP_FILE@ 은 만들어질 백업 파일 경로로 바뀜'),
        'valheim.POST_BACKUP_HOOK': hook('컨테이너 백업을 만든 직후에', ['명령 안의 @BACKUP_FILE@ 은 만들어진 백업 파일 경로로 바뀜', '외부 저장소로 복사하는 데 활용 가능']),
        'valheim.PRE_UPDATE_CHECK_HOOK': hook('업데이트 확인을 시작하기 전에'),
        'valheim.POST_UPDATE_CHECK_HOOK': hook('업데이트 확인이 끝난 뒤에'),
        'valheim.PRE_START_HOOK': hook('업데이트 관리자가 서버를 처음 시작하기 전에'),
        'valheim.POST_START_HOOK': hook('업데이트 관리자가 서버를 처음 시작한 뒤에'),
        'valheim.PRE_RESTART_HOOK': hook('업데이트·예약 재시작으로 서버를 다시 시작하기 전에', '예: sleep으로 재시작을 잠시 늦추거나 미리 알림 전송 가능'),
        'valheim.POST_RESTART_HOOK': hook('업데이트·예약 재시작으로 서버를 다시 시작한 뒤에'),
        'valheim.PRE_SERVER_LISTENING_HOOK': hook('게임 프로세스가 실행된 뒤, 플레이어 접속을 받기 시작하기 전에'),
        'valheim.POST_SERVER_LISTENING_HOOK': hook('서버가 플레이어 접속을 받을 수 있게 된 직후에', '접속 가능 알림(디스코드 웹훅 등)에 적합함'),
        'valheim.PRE_SERVER_RUN_HOOK': hook('게임 서버 프로세스를 실행하기 직전에', '명령이 끝날 때까지 서버 시작이 멈춤'),
        'valheim.POST_SERVER_RUN_HOOK': hook('게임 서버 프로세스가 종료된 뒤에', '컨테이너 종료 시 약 29초 안에 끝나야 함, 넘으면 중단될 수 있음'),
        'valheim.PRE_SERVER_SHUTDOWN_HOOK': hook('게임 서버를 종료하기 직전에', '90초를 넘기면 프로세스 관리자가 서버를 강제 종료, 저장이 안 될 수 있음'),
        'valheim.POST_SERVER_SHUTDOWN_HOOK': hook('게임 서버 종료 처리가 끝난 뒤에'),
        'valheim.PRE_BEPINEX_CONFIG_HOOK': hook('BepInEx 설정 파일(BepInEx.cfg)을 작성하기 전에', 'BepInEx 모드 로더 사용 시에만 실행됨'),
        'valheim.POST_BEPINEX_CONFIG_HOOK': hook('BepInEx 설정 파일(BepInEx.cfg)을 작성한 뒤에', 'BepInEx 모드 로더 사용 시에만 실행됨'),

        // ---------- Valheim: advanced ----------
        'valheim.serverArgs': {
            what: ['위 항목에 없는 Valheim 서버 실행 인수를 직접 추가하는 칸 (SERVER_ARGS에 덧붙임)'],
            effect: [
                '입력한 인수가 게임 서버 실행 명령 끝에 그대로 붙음',
                '잘못된 인수는 서버가 무시하거나 시작에 실패할 수 있음'
            ],
            tip: [
                '중복 입력 불가: -name, -world, -port, -password, -public, -crossplay, -savedir',
                '위에서 지정한 프리셋·규칙·저장 인수도 중복 입력 불가',
                '공백이 들어간 값을 따옴표로 묶는 방식은 이미지가 미지원'
            ]
        },
        'valheim.extraEnvironment': {
            what: ['화면에 없는 컨테이너 환경변수를 한 줄에 하나씩 KEY=value 형식으로 추가'],
            effect: [
                '입력한 변수가 Compose environment에 그대로 추가됨',
                '예: VPCFG_Server_maxPlayers=20 은 ValheimPlus 설정 변경',
                'BEPINEXCFG_ 로 시작하는 변수: BepInEx 모드 설정 변경',
                '# 으로 시작하는 줄은 무시됨'
            ],
            tip: [
                '위 개별 항목에서 관리하는 변수는 중복 입력 불가',
                'VPCFG_ 는 ValheimPlus, BEPINEXCFG_ 는 해당 모드 로더가 켜져 있어야 적용됨',
                '값에 따옴표를 붙이지 말 것'
            ]
        },

        // ---------- Valheim: connection ----------
        'valheim.connection.serverName': {
            what: ['서버 목록과 접속 화면에 표시되는 서버 이름 (SERVER_NAME)'],
            effect: [
                '바꾸면: 다음 시작부터 서버 목록에 새 이름으로 표시',
                '월드 데이터에는 영향 없음'
            ],
            tip: ['서버 목록 공개 시 다른 사람도 이 이름으로 검색 가능']
        },
        'valheim.connection.worldName': {
            what: ['서버가 불러오거나 새로 만들 월드 이름 (WORLD_NAME)'],
            effect: [
                '기본값: Dedicated',
                '같은 이름의 월드가 있으면: 그 월드를 불러옴',
                '없으면: 새 월드 생성',
                '이름을 바꾸면 다른 월드로 시작, 기존 월드가 사라진 것처럼 보일 수 있음 (파일은 남아 있음)'
            ],
            tip: [
                '기존 월드를 옮겨올 때는 worlds_local 안의 파일 이름(.db/.fwl 확장자 제외)과 정확히 같게 입력',
                '대소문자도 구분됨'
            ]
        },
        'valheim.connection.serverPassword': {
            what: ['서버 접속 비밀번호 (SERVER_PASS)'],
            effect: [
                '플레이어는 접속 시 이 비밀번호 입력 필요함',
                '5자 이상이어야 함',
                '비밀번호가 서버 이름 안에 그대로 들어 있으면 게임이 서버 시작을 거부하는 것으로 알려져 있음'
            ],
            tip: [
                '비밀번호 파일을 지정하면 그쪽이 우선함',
                'Compose 파일에 비밀번호가 그대로 기록됨, 공유 시 주의'
            ]
        },
        'valheim.connection.serverSecretFile': {
            what: ['접속 비밀번호를 담은 Docker 호스트 파일 경로 (SERVER_PASS_FILE, Compose secret)'],
            effect: [
                '입력하면: 이 파일 내용을 비밀번호로 사용',
                '직접 입력한 비밀번호보다 우선함',
                'Compose 파일에 비밀번호 노출 안 됨'
            ],
            tip: [
                '파일 내용은 5자 이상이어야 함',
                '생성기가 파일을 만들지 않음, 서버에 직접 준비 필요함'
            ]
        },
        'valheim.connection.serverPort': {
            what: ['서버가 사용하는 시작 UDP 포트 (SERVER_PORT)'],
            effect: [
                '기본값: 2456',
                '시작 포트(게임)와 다음 포트(서버 조회)를 함께 사용 (예: 2456~2457/UDP)',
                '크로스플레이를 켜면: 세 번째 포트(2458)도 사용',
                '한 호스트에서 여러 서버 운영 시 서로 겹치지 않게 변경'
            ],
            tip: [
                'Steam 방식 외부 접속에는 공유기 포트포워딩·방화벽에서 해당 UDP 포트 개방 필요함',
                '일부 모드는 시작 포트+2도 사용함'
            ]
        },
        'valheim.connection.serverPublic': {
            what: ['게임 내 커뮤니티 서버 목록에 서버를 표시할지 여부 (SERVER_PUBLIC)'],
            effect: [
                '공개(기본): 누구나 목록에서 찾을 수 있음 (비밀번호는 필요)',
                '비공개: 목록에 안 나타남, IP 주소나 참가 코드로만 접속'
            ],
            tip: [
                '상태 조회 HTTP 기능은 공개 서버에서만 동작함',
                '친구끼리만 한다면 비공개로도 충분함'
            ]
        },
        'valheim.connection.crossplay': {
            what: ['Steam 외 플랫폼(Xbox, Microsoft Store 등) 플레이어도 접속하게 하는 크로스플레이 기능 (CROSSPLAY)'],
            effect: [
                '켜면: Steam 대신 PlayFab 백엔드 사용, 모든 플랫폼이 참가 코드로 접속 가능',
                '켜면: 릴레이를 거치므로 포트포워딩 없이도 접속되는 경우가 많음',
                '끄면(기본): Steam 사용자만 접속 가능'
            ],
            tip: [
                '크로스플레이 서버는 LAN이나 루프백 IP로 직접 접속 불가',
                '일부 모드는 크로스플레이와 호환되지 않음'
            ]
        },

        // ---------- Core Keeper: options ----------
        'corekeeper.worldIndex': {
            what: ['서버가 불러올 월드 저장 슬롯 번호 (WORLD_INDEX)'],
            effect: [
                '기본값: 0',
                '번호를 바꾸면: 다른 슬롯의 월드를 불러옴',
                '그 슬롯이 비어 있으면: 새 월드 생성',
                '기존 슬롯의 월드는 지워지지 않음'
            ],
            tip: ['크리에이티브·일반 월드를 나눠 쓰거나 새 월드를 시험할 때 다른 번호 사용']
        },
        'corekeeper.worldSeed': {
            what: ['새 월드를 만들 때 지형 생성에 쓰는 시드 값 (WORLD_SEED)'],
            effect: [
                '같은 시드는 같은 지형 생성',
                '비우면: 무작위 시드 사용',
                '이미 만들어진 월드에는 영향 없음'
            ],
            tip: ['공유받은 시드는 아직 생성되지 않은 월드 슬롯(월드 인덱스)과 함께 지정']
        },
        'corekeeper.hashedWorldSeed': {
            what: ['Core Keeper 1.1부터 쓰이는 해시 형식의 월드 시드 (HASHED_WORLD_SEED)'],
            effect: [
                '게임에서 공유되는 해시 시드 입력 시: 그 지형으로 새 월드 생성',
                '비우면: 무작위',
                '기존 월드에는 영향 없음'
            ],
            tip: [
                '일반 시드와 해시 시드를 동시에 넣을 때 우선순위는 문서에 명시되지 않음',
                '하나만 사용 권장'
            ]
        },
        'corekeeper.worldMode': {
            what: ['월드의 게임 모드(난이도) (WORLD_MODE)'],
            effect: [
                '보통(0, 기본): 표준 난이도',
                '어려움(1): 적·보스 체력 약 50%, 피해 약 100% 증가',
                '어려움(1): 보스 보상 굴림 증가, 사망 페널티 더 무거움',
                '캐주얼(4): 적 체력·피해 약 50% 감소, 편한 모드',
                '창작(2): 대부분의 아이템 무제한 사용, 건축 중심 모드',
                '창작(2): 코어가 없는 평지에서 시작, 창작용 캐릭터로만 입장 가능'
            ],
            tip: [
                '모드는 월드 생성 시 정해짐',
                '창작 월드와 일반 월드는 서로 전환 불가',
                '바꾸려면: 다른 월드 인덱스로 새 월드 생성',
                '어려움 모드의 정확한 사망 페널티는 게임 내 설명으로 확인'
            ]
        },
        'corekeeper.season': {
            what: ['부활절·할로윈·크리스마스 등 시즌 이벤트를 강제 지정 (SEASON)'],
            effect: [
                '자동(미설정): 실제 날짜에 맞춰 시즌 변경',
                '0(None): 시즌 이벤트 끔',
                '1: 부활절',
                '2: 할로윈',
                '3: 크리스마스',
                '4: 발렌타인',
                '5: 기념일',
                '6: 벚꽃',
                '7: 설날',
                '1~7 선택 시: 날짜와 상관없이 그 시즌의 장식·한정 아이템·이벤트 등장'
            ],
            tip: [
                '시즌 한정 아이템 수집 시 유용함',
                '되돌리려면: 자동으로 바꾸고 재시작'
            ]
        },
        'corekeeper.activateContent': {
            what: ['1.1 이전에 만든 기존 월드에 새 콘텐츠 묶음(보스 던전, 오아시스, 타이탄 성소, 협업 콘텐츠 등) 추가 (ACTIVATE_CONTENT)'],
            effect: [
                '선택한 콘텐츠가 월드에 생성됨',
                '생성 위치의 이미 탐험한 지형·건축물 일부가 덮어써질 수 있음',
                '새로 만든 월드에는 보통 필요 없음'
            ],
            tip: [
                '한 번 활성화한 콘텐츠는 다시 끌 수 없음',
                '반드시 월드 백업 후 적용'
            ]
        },
        'corekeeper.puid': {
            what: ['컨테이너 안에서 서버가 실행될 사용자 ID (PUID)'],
            effect: [
                '기본값: 1000',
                '호스트 볼륨 폴더 소유자 UID와 맞추면 저장 파일을 권한 문제 없이 다룰 수 있음'
            ],
            tip: ['호스트에서 id 명령으로 자신의 UID 확인 가능']
        },
        'corekeeper.pgid': {
            what: ['컨테이너 안에서 서버가 실행될 그룹 ID (PGID)'],
            effect: [
                '기본값: 1000',
                '호스트 볼륨 폴더의 그룹과 맞추면 파일 권한 문제 감소'
            ]
        },
        'corekeeper.arm64Device': {
            what: ['ARM64 장치(라즈베리 파이, Apple M1 등)에서 x86 서버 실행용 Box64 빌드 선택 (ARM64_DEVICE)'],
            effect: [
                'generic(기본): 일반 ARM64용',
                'rpi3/rpi4-pre3/rpi5/rpi5_16k: 라즈베리 파이 모델별 최적화 빌드',
                'm1: Apple Silicon용 최적화 빌드',
                'adlink: ADLINK 장치용 최적화 빌드',
                '일반 x86 PC에서는 미사용'
            ],
            tip: [
                'rpi5_16k: 16K 페이지 커널을 쓰는 라즈베리 파이 5용',
                '장치에 맞지 않으면 서버가 시작되지 않을 수 있음',
                '문제가 있으면 generic으로 시도'
            ]
        },
        'corekeeper.useDepotDownloader': {
            what: ['서버 파일을 SteamCMD 대신 DepotDownloader로 받을지 여부 (USE_DEPOT_DOWNLOADER)'],
            effect: [
                '켜면: 32비트 실행 환경이 없는 시스템(일부 ARM 등)에서도 설치 가능',
                '끄면(기본): SteamCMD 사용'
            ],
            tip: ['SteamCMD가 정상 동작하면 끈 상태 유지']
        },
        'corekeeper.modsEnabled': {
            what: ['mod.io에서 서버용 모드를 자동 설치하는 기능 (MODS_ENABLED)'],
            effect: [
                '켜면: 컨테이너 시작 때마다 모드 목록을 mod.io에서 받아 설치',
                '재시작하면 모드도 최신으로 갱신됨',
                '끄면(기본): 모드 없이 실행'
            ],
            tip: [
                'mod.io API 키와 API URL 필요함',
                '클라이언트 전용 모드는 서버 시작을 막을 수 있음'
            ]
        },
        'corekeeper.modioApiKey': {
            what: ['mod.io 모드 다운로드용 개인 API 키 (MODIO_API_KEY)'],
            effect: [
                '모드 사용이 켜져 있을 때 다운로드 인증에 쓰임',
                '비어 있거나 틀리면: 모드 설치 불가'
            ],
            tip: [
                '비밀번호처럼 다뤄야 하는 값임',
                'Compose 파일 공유 시 노출 주의'
            ]
        },
        'corekeeper.modioApiUrl': {
            what: ['API 키와 함께 발급되는 개인 mod.io API 주소 (MODIO_API_URL)'],
            effect: [
                '모드 다운로드 요청을 보낼 주소',
                '형식 예: https://u-xxxx.modapi.io/v1',
                '틀리면: 모드 설치 실패'
            ]
        },
        'corekeeper.mods': {
            what: ['설치할 mod.io 모드 목록 (MODS)'],
            effect: [
                '모드 ID를 쉼표로 구분해 입력',
                'ID 뒤에 :버전 붙이면: 그 버전으로 고정',
                '생략하면: 최신 버전 설치'
            ],
            tip: [
                '의존성 모드는 자동 설치되지 않음',
                '필요한 라이브러리 모드(예: core-lib)도 직접 목록에 넣어야 함'
            ]
        },

        // ---------- Core Keeper: connection ----------
        'corekeeper.connection.worldName': {
            what: ['서버(월드)의 표시 이름 (WORLD_NAME)'],
            effect: [
                '기본값: Core Keeper Server',
                '바꾸면: 접속 화면 등에 표시되는 이름 변경',
                '불러올 월드는 월드 인덱스가 정함'
            ]
        },
        'corekeeper.connection.gameId': {
            what: ['SDR(Steam 릴레이) 방식에서 친구가 접속할 때 입력하는 Game ID (GAME_ID)'],
            effect: [
                '15~28자 영숫자로 직접 지정 시: 재시작해도 같은 ID 유지',
                '비우면: 시작 시 자동 생성',
                '자동 생성 ID는 컨테이너의 GameID.txt나 로그에서 확인 가능'
            ],
            tip: [
                'Game ID를 아는 사람은 누구나 접속 가능',
                '비밀번호처럼 필요한 사람에게만 공유'
            ]
        },
        'corekeeper.connection.maxPlayers': {
            what: ['동시 접속 가능한 최대 플레이어 수 (MAX_PLAYERS)'],
            effect: [
                '기본값: 10',
                '올리면: 더 많은 인원 참여 가능, 서버 CPU·메모리·대역폭 사용 증가',
                '가득 차면: 새 접속 거부'
            ]
        },
        'corekeeper.connection.directConnection': {
            what: ['SDR(Steam 릴레이) 대신 IP 주소와 UDP 포트로 직접 접속하게 하는 모드 (SERVER_PORT 지정 여부)'],
            effect: [
                'SDR(기본): 포트 개방 없이 Game ID만으로 접속',
                '직접 연결 켜면: SERVER_PORT 설정됨, IP·포트·비밀번호로 접속',
                '직접 연결은 릴레이를 거치지 않아 지연이 줄 수 있음'
            ],
            tip: [
                '직접 연결은 공유기 포트포워딩·방화벽에서 해당 UDP 포트 개방 필요함',
                '허용 플랫폼 제한도 직접 연결에서만 동작함'
            ]
        },
        'corekeeper.connection.serverIp': {
            what: ['직접 연결 모드에서 서버가 대기할 IP 주소 (SERVER_IP)'],
            effect: [
                '비우면: 모든 인터페이스(0.0.0.0)에서 접속 받음',
                '특정 IP 입력 시: 그 주소로만 받음',
                'IPv4·IPv6 모두 사용 가능'
            ],
            tip: [
                '컨테이너 안에 없는 IP를 지정하면 서버가 접속을 못 받음',
                '특별한 이유가 없으면 비워둘 것'
            ]
        },
        'corekeeper.connection.serverPort': {
            what: ['직접 연결 모드에서 사용하는 UDP 포트 (SERVER_PORT)'],
            effect: [
                '기본값: 27015',
                '이 포트로 플레이어 접속을 받음',
                '값을 지정하는 것 자체가 네트워크 방식을 직접 연결로 바꿈'
            ],
            tip: [
                '공유기·방화벽에서 이 UDP 포트를 열어야 외부 접속 가능',
                '다른 게임 서버와 포트가 겹치지 않게 할 것'
            ]
        },
        'corekeeper.connection.password': {
            what: ['직접 연결 모드의 접속 비밀번호 (PASSWORD)'],
            effect: [
                '최대 28자',
                '플레이어는 IP·포트와 함께 이 비밀번호를 입력해야 접속',
                '비우거나 형식이 맞지 않으면: 서버가 무작위 비밀번호 생성'
            ],
            tip: ['무작위 비밀번호는 로그에서 확인해야 함, 직접 정해 두는 것이 편함']
        },
        'corekeeper.connection.allowOnlyPlatform': {
            what: ['특정 플랫폼 사용자만 접속하도록 제한 (ALLOW_ONLY_PLATFORM)'],
            effect: [
                '전체 허용(기본): 모든 플랫폼 접속 가능',
                '1: Steam 사용자만 허용',
                '2: Epic 사용자만 허용',
                '3: Microsoft(Xbox/PC Game Pass) 사용자만 허용',
                '4: GOG 사용자만 허용'
            ],
            tip: ['직접 연결 모드(SERVER_PORT 지정)에서만 적용됨']
        }
    };
    const help = root.OptionHelp = root.OptionHelp || {};
    Object.assign(help, entries);
    if (typeof module !== 'undefined' && module.exports) module.exports = entries;
})(typeof globalThis !== 'undefined' ? globalThis : this);
