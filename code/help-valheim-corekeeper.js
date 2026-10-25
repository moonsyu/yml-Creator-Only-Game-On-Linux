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
        what: `${when} 컨테이너 안에서 실행할 셸 명령입니다.`,
        effect: '입력하면 해당 시점마다 명령이 실행되고, 비워두면 아무것도 실행하지 않습니다.' + (extra ? ' ' + extra : ''),
        tip: '명령이 오래 걸리거나 실패하면 서버 시작·종료가 지연될 수 있으니 짧고 안전한 명령을 사용하세요. 외부 패키지가 필요하면 POST_BOOTSTRAP_HOOK에서 설치하는 방법이 안내되어 있습니다.'
    });
    const logFilter = (how) => ({
        what: `게임 로그에서 ${how} 줄을 화면(docker logs)에 표시하지 않도록 거르는 필터입니다.`,
        effect: '값을 입력하면 조건에 맞는 줄이 로그에서 제거되고, 비워두면 이 필터는 꺼집니다. 게임 동작에는 영향이 없고 로그 표시만 바뀝니다.',
        tip: '같은 종류 필터를 여러 개 쓰려면 추가 환경변수에 접미사를 붙여(예: VALHEIM_LOG_FILTER_CONTAINS_Foo=문자열) 넣을 수 있습니다. ON_ 으로 시작하는 같은 이름 변수를 함께 두면 해당 줄을 지우는 대신 명령을 실행합니다.'
    });
    const entries = {
        // ---------- Valheim: world ----------
        'valheim.worldPreset': {
            what: '월드 난이도 규칙을 한 번에 묶어서 적용하는 프리셋입니다 (-preset 인수). 게임의 월드 설정 화면에 있는 프리셋과 같습니다.',
            effect: '보통(normal)은 모든 규칙을 기본값으로 되돌립니다. 캐주얼은 매우 쉬운 전투·습격 없음·광물 포탈 허용 등 가장 느슨한 조합, 쉬움은 약간 쉬운 조합, 어려움은 적이 강해지고 사망 페널티가 커지는 조합, 하드코어는 매우 어려운 전투와 사망 시 소지품·스킬 전부 손실 같은 가장 가혹한 조합입니다. 몰입(immersive)은 지도·포탈 같은 편의 기능을 제한해 탐험 위주로, 해머(hammer)는 건축 비용 없음·선공하지 않는 적·습격 없음 등 건축 위주로 구성됩니다. 기존 설정 유지를 고르면 프리셋 명령을 보내지 않습니다.',
            tip: '프리셋은 이전에 적용된 모든 월드 규칙을 덮어씁니다. 이 앱은 프리셋을 개별 규칙보다 먼저 적용하므로, 프리셋을 고른 뒤 아래 항목으로 세부 조정할 수 있습니다. 각 프리셋의 정확한 구성은 게임 버전에 따라 달라질 수 있어 게임 내 월드 설정 화면에서 확인하는 것이 가장 정확합니다.'
        },
        'valheim.combat': {
            what: '적의 공격력·체력과 플레이어 공격력의 균형을 정하는 전투 난이도입니다 (-modifier combat).',
            effect: '매우 쉬움: 플레이어 피해 약 125%, 받는 피해 약 50%. 쉬움: 플레이어 피해 약 110%, 받는 피해 약 75%. 어려움: 플레이어 피해 약 85%, 받는 피해 약 150%, 적이 조금 더 빠르고 크며 별(레벨) 붙은 적이 더 자주 등장합니다. 매우 어려움: 플레이어 피해 약 70%, 받는 피해 약 200%로 적의 한 방이 두 배 아프고 별 붙은 적도 훨씬 많아집니다. 선택하지 않으면 보통(100%)입니다.',
            tip: '수치는 Valheim 위키 기준이며 패치에 따라 달라질 수 있습니다. 진행 중인 월드에서 갑자기 매우 어려움으로 올리면 체감 난이도가 크게 뛰므로 단계적으로 올리는 것을 권장합니다.'
        },
        'valheim.deathPenalty': {
            what: '플레이어가 죽었을 때 잃는 아이템과 스킬의 양을 정합니다 (-modifier deathpenalty).',
            effect: '캐주얼: 착용 장비는 유지하고 나머지 소지품만 묘비에 떨어지며 스킬 손실 약 1%. 매우 쉬움: 소지품을 묘비에 떨어뜨리고 스킬 손실 약 1%. 쉬움: 스킬 손실 약 2.5%. 보통(기본): 모든 소지품이 묘비에 남고 스킬 약 5% 손실. 어려움: 착용 장비만 묘비에 남고 나머지 소지품은 사라지며 스킬 약 7.5% 손실. 하드코어: 모든 소지품이 사라지고 스킬이 전부 초기화됩니다.',
            tip: '하드코어는 되돌릴 수 없는 손실이 생기므로 참가자에게 미리 알리세요. 수치는 위키·호스팅 문서 기준이며 출처마다 세부 내용이 조금씩 달라 게임 내 설명으로 확인하는 것이 좋습니다.'
        },
        'valheim.resources': {
            what: '나무·광석·몬스터 전리품 등 채집·드롭되는 자원 양의 배율입니다 (-modifier resources).',
            effect: '매우 적게 0.5배, 적게 0.75배, 많이 1.5배, 매우 많이 2배, 최대 3배입니다. 선택하지 않으면 1배(보통)입니다. 값을 올리면 파밍 시간이 줄어 진행이 빨라지고, 내리면 자원 관리가 빡빡해집니다.',
            tip: '배율은 올림 처리되어 1.5배가 실제로는 2배처럼 느껴지는 경우가 있습니다. 위키에 따르면 물고기, 트로피, 보스 드롭에는 적용되지 않습니다.'
        },
        'valheim.raids': {
            what: '기지에 몬스터 무리가 쳐들어오는 습격 이벤트의 빈도입니다 (-modifier raids).',
            effect: '습격 없음: 습격 이벤트가 발생하지 않습니다. 매우 드물게: 확인 간격 약 92분·발생 확률 약 10%. 드물게: 약 69분·약 13%. 보통(기본): 약 46분·20%. 자주: 약 28분·약 33%. 매우 자주: 약 14분·약 67%로 거의 쉴 틈 없이 습격이 옵니다.',
            tip: '습격 없음에서도 밤에 일반 몬스터가 기지 근처에 나타나는 것은 막지 못합니다. 습격 종류는 처치한 보스 진행도에 따라 정해지며, 플레이어별로 계산하려면 플레이어 진행도 기반 습격을 함께 켜세요.'
        },
        'valheim.portals': {
            what: '포탈로 무엇을 옮길 수 있는지, 포탈을 쓸 수 있는지를 정합니다 (-modifier portals).',
            effect: '광물·금속 포탈 허용(casual): 광석·금속 주괴 등 원래 포탈 이동이 막힌 아이템도 모두 가지고 이동할 수 있어 운반 노동이 크게 줄어듭니다. 어려움(hard): 기본보다 포탈 사용이 더 제한됩니다. 포탈 사용 불가(veryhard): 포탈을 사용할 수 없어 모든 이동과 운반을 걷거나 배로 해야 합니다. 선택하지 않으면 기본 규칙(광석·금속 이동 불가)입니다.',
            tip: '어려움(hard)이 정확히 무엇을 제한하는지는 공식 문서에 없습니다. 게임 내부적으로 보스 관련 포탈을 막는 설정으로 알려져 있으나 확실하지 않으니 게임 내 설명으로 확인하세요. 광물 포탈 허용은 ValheimPlus 같은 모드 없이도 작동합니다.'
        },
        'valheim.nobuildcost': {
            what: '건축물을 지을 때 재료를 소모하지 않게 하는 월드 규칙입니다 (-setkey nobuildcost).',
            effect: '활성화하면 모든 건축이 무료가 되어 재료 없이 마음껏 지을 수 있습니다. 다만 건축 레시피는 여전히 해당 재료를 발견해야 해금됩니다.',
            tip: '기존 설정 유지는 해제 명령이 아닙니다. 한 번 켠 규칙을 끄려면 프리셋을 보통으로 초기화한 뒤 필요한 규칙만 다시 선택하세요.'
        },
        'valheim.playerevents': {
            what: '습격 종류를 월드 전체 진행도 대신 각 플레이어의 진행도로 정하는 규칙입니다 (-setkey playerevents).',
            effect: '활성화하면 보스를 아직 잡지 않은 새 플레이어의 기지에는 초반 수준 습격이, 진행이 빠른 플레이어에게는 그에 맞는 습격이 옵니다. 끄면(기본) 서버에서 누군가 보스를 잡으면 모든 플레이어에게 더 강한 습격이 올 수 있습니다.',
            tip: '진행 속도가 다른 사람들이 함께 하는 서버에서 유용합니다. 해제하려면 보통 프리셋으로 초기화 후 다시 선택하세요.'
        },
        'valheim.passivemobs': {
            what: '적이 먼저 공격하지 않도록 하는 규칙입니다 (-setkey passivemobs).',
            effect: '활성화하면 적이 플레이어를 보고도 선제공격하지 않고, 플레이어가 먼저 공격해야 반격합니다. 탐험과 건축이 매우 편해집니다.',
            tip: '해제하려면 보통 프리셋으로 초기화한 뒤 원하는 규칙을 다시 선택하세요.'
        },
        'valheim.nomap': {
            what: '지도와 미니맵을 사용하지 못하게 하는 규칙입니다 (-setkey nomap).',
            effect: '활성화하면 모든 플레이어가 지도·미니맵 없이 지형과 표지물만으로 길을 찾아야 합니다. 탐험 긴장감이 커지지만 길을 잃기 쉽습니다.',
            tip: '해제하려면 보통 프리셋으로 초기화 후 규칙을 다시 선택하세요.'
        },

        // ---------- Valheim: save ----------
        'valheim.saveInterval': {
            what: '게임이 월드를 자동 저장하는 주기(초)입니다 (-saveinterval).',
            effect: '값을 줄이면 더 자주 저장해 서버가 갑자기 꺼져도 잃는 진행이 줄지만, 저장 순간의 짧은 끊김이 더 자주 생길 수 있습니다. 값을 늘리면 그 반대입니다. 비워두면 게임 기본값 1800초(30분)입니다.',
            tip: '큰 월드에서는 저장 시 잠깐 렉이 생길 수 있어 너무 짧게(예: 수십 초) 설정하는 것은 권장하지 않습니다.'
        },
        'valheim.nativeBackups': {
            what: '게임이 자체적으로 보관하는 월드 자동 백업 개수입니다 (-backups).',
            effect: '값을 늘리면 더 오래된 시점까지 되돌릴 수 있지만 디스크 사용량이 늘어납니다. 0이면 게임 자체 백업을 남기지 않는 것으로 보입니다. 비워두면 기본값 4개입니다.',
            tip: '아래 컨테이너 자동 백업과는 별개입니다. 첫 백업은 첫 게임 백업 간격, 나머지는 이후 게임 백업 간격을 따릅니다.'
        },
        'valheim.backupShort': {
            what: '게임 자체 백업 중 첫 번째 백업이 만들어지는 간격(초)입니다 (-backupshort).',
            effect: '값을 줄이면 가장 최근 백업이 더 촘촘해집니다. 비워두면 기본값 7200초(2시간)입니다.'
        },
        'valheim.backupLong': {
            what: '게임 자체 백업 중 두 번째 이후 백업이 만들어지는 간격(초)입니다 (-backuplong).',
            effect: '값을 줄이면 오래된 백업 사이 간격이 좁아지고, 늘리면 같은 개수로 더 먼 과거까지 보관합니다. 비워두면 기본값 43200초(12시간)입니다.'
        },
        'valheim.instanceId': {
            what: '크로스플레이(PlayFab)에서 서버를 구분하는 고유 인스턴스 ID입니다 (-instanceid).',
            effect: '같은 컴퓨터(같은 MAC 주소)에서 크로스플레이 서버를 여러 개 띄울 때 서버마다 다른 값을 주면 각자 고유한 PlayFab ID를 받습니다. 서버가 하나라면 비워두세요.',
            tip: '공백·따옴표 없이 입력하세요. 크로스플레이를 끈 서버에서는 의미가 없습니다.'
        },
        'valheim.logFile': {
            what: '게임 서버 로그를 별도 파일로 저장할 경로입니다 (-logFile).',
            effect: '경로를 입력하면 로그가 그 파일로 기록되고, 비워두면 기본 출력(docker logs)으로 나옵니다.',
            tip: '파일로 보내면 docker logs와 아래 로그 필터에 게임 로그가 나타나지 않을 수 있습니다. 영구 보관하려면 /config 아래 경로를 사용하세요.'
        },

        // ---------- Valheim: access ----------
        'valheim.adminIds': {
            what: '관리자 권한을 줄 플레이어 ID 목록입니다 (ADMINLIST_IDS, adminlist.txt).',
            effect: '입력한 ID의 플레이어는 게임 콘솔에서 kick·ban 같은 관리자 명령을 쓸 수 있습니다. 입력하면 서버의 adminlist.txt를 이 목록으로 덮어쓰고, 비워두면 기존 파일을 그대로 둡니다.',
            tip: 'Steam 사용자는 SteamID64(7656으로 시작하는 17자리)를 공백으로 구분해 입력합니다. 크로스플레이 사용자는 게임 내 F2 화면 등에서 확인한 플랫폼 ID를 사용하세요.'
        },
        'valheim.bannedIds': {
            what: '접속을 차단할 플레이어 ID 목록입니다 (BANNEDLIST_IDS, bannedlist.txt).',
            effect: '입력한 ID는 서버에 접속할 수 없습니다. 입력하면 기존 bannedlist.txt를 덮어쓰므로, 게임 안에서 ban으로 추가한 ID도 목록에 없으면 다음 시작 때 사라집니다. 비워두면 기존 파일을 유지합니다.'
        },
        'valheim.permittedIds': {
            what: '접속을 허용할 플레이어 ID 목록(화이트리스트)입니다 (PERMITTEDLIST_IDS, permittedlist.txt).',
            effect: '하나라도 입력하면 목록에 있는 사람만 접속할 수 있고 나머지는 비밀번호를 알아도 거부됩니다. 비워두면 기존 파일을 유지하며, 파일도 비어 있으면 비밀번호만 알면 누구나 접속합니다.',
            tip: '본인 ID를 빠뜨리면 본인도 접속하지 못하니 주의하세요.'
        },

        // ---------- Valheim: maintenance ----------
        'valheim.timezone': {
            what: '컨테이너의 시간대입니다 (TZ). 업데이트·재시작·백업 Cron 시각과 로그 시간에 적용됩니다.',
            effect: 'Asia/Seoul로 두면 Cron의 시각이 한국 시간 기준이 됩니다. 이미지 기본값은 Etc/UTC입니다.',
            tip: 'Area/City 형식의 IANA 시간대 이름을 입력하세요.'
        },
        'valheim.updateCron': {
            what: '게임 서버 업데이트를 확인하는 주기(Cron 식)입니다 (UPDATE_CRON).',
            effect: '기본 */15 * * * *은 15분마다 확인합니다. 새 버전이 있으면 서버를 내렸다가 업데이트 후 다시 올립니다. 비워두면 자동 업데이트를 하지 않습니다.',
            tip: '클라이언트가 업데이트되었는데 서버가 구버전이면 접속할 수 없으므로 켜두는 것을 권장합니다. 모드 서버는 모드가 새 버전을 지원할 때까지 업데이트를 꺼두기도 합니다.'
        },
        'valheim.updateIfIdle': {
            what: '접속한 플레이어가 없을 때만 업데이트를 적용할지 정합니다 (UPDATE_IF_IDLE).',
            effect: '켜면(기본) 누군가 플레이 중일 때는 업데이트를 미뤄 갑자기 튕기는 일이 없습니다. 끄면 업데이트가 있을 때 플레이어가 있어도 바로 재시작합니다.',
            tip: '공개 서버는 Steam 조회로, 비공개 서버는 UDP 트래픽 양으로 접속자 여부를 판단합니다.'
        },
        'valheim.restartCron': {
            what: '서버를 정기적으로 재시작하는 주기(Cron 식)입니다 (RESTART_CRON).',
            effect: '기본 10 5 * * *은 매일 05:10에 재시작합니다. 장시간 실행으로 쌓이는 메모리 사용과 렉을 줄여줍니다. 비워두면 자동 재시작을 하지 않습니다.',
            tip: '시각은 시간대(TZ) 설정을 따릅니다. 백업 Cron과 시각이 겹치지 않게 하는 것이 좋습니다.'
        },
        'valheim.restartIfIdle': {
            what: '접속한 플레이어가 없을 때만 예약 재시작을 할지 정합니다 (RESTART_IF_IDLE).',
            effect: '켜면(기본) 플레이 중인 사람이 있으면 그 회차 재시작을 건너뜁니다. 끄면 예약 시각에 무조건 재시작합니다.'
        },
        'valheim.steamcmdArgs': {
            what: '게임 서버를 설치·업데이트할 때 SteamCMD에 추가로 넘기는 인수입니다 (STEAMCMD_ARGS).',
            effect: '기본값 validate는 업데이트 때마다 파일 무결성을 검사해 손상된 파일을 복구합니다. 지우면 업데이트가 조금 빨라지지만 손상 파일을 자동으로 고치지 않습니다.',
            tip: '베타 브랜치는 직접 입력하기보다 공개 테스트 버전 사용 항목을 쓰는 것이 안전합니다.'
        },
        'valheim.publicTest': {
            what: 'Valheim 공개 테스트(Public Test) 베타 버전을 설치할지 정합니다 (PUBLIC_TEST).',
            effect: '켜면 SteamCMD 인수에 베타 옵션을 추가해 테스트 버전 서버를 실행합니다. 클라이언트도 같은 테스트 버전이어야 접속할 수 있습니다. 끄면(기본) 정식 버전을 사용합니다.',
            tip: '테스트 버전에서 열린 월드는 정식 버전과 호환되지 않을 수 있으니 반드시 월드를 백업한 뒤 사용하세요.'
        },

        // ---------- Valheim: container backups ----------
        'valheim.backups': {
            what: '컨테이너가 월드 폴더(worlds_local)를 주기적으로 별도 압축 백업하는 기능입니다 (BACKUPS).',
            effect: '켜면(기본) 서버 시작 시와 백업 주기마다 월드를 백업합니다. 끄면 컨테이너 백업을 하지 않고 게임 자체 백업만 남습니다.',
            tip: '서버 실행 중 백업하므로 드물게 저장 중인 파일이 들어갈 수 있습니다. 중요한 서버라면 백업 폴더를 다른 디스크나 외부로 복사하는 것을 권장합니다.'
        },
        'valheim.backupsCron': {
            what: '컨테이너 백업을 만드는 주기(Cron 식)입니다 (BACKUPS_CRON).',
            effect: '기본 5 * * * *은 매시 5분에 백업합니다. 주기를 줄이면 복구 시점이 촘촘해지지만 백업 파일이 많아집니다.',
            tip: '시각은 시간대(TZ)를 따릅니다.'
        },
        'valheim.backupsDirectory': {
            what: '컨테이너 백업 파일을 저장할 컨테이너 내부 경로입니다 (BACKUPS_DIRECTORY).',
            effect: '기본값은 /config/backups입니다. 영구 볼륨 밖의 경로를 쓰면 컨테이너를 다시 만들 때 백업이 사라집니다.',
            tip: 'worlds_local 폴더 안은 피하세요. /config 또는 /opt/valheim 아래 경로를 권장합니다.'
        },
        'valheim.backupsMaxAge': {
            what: '컨테이너 백업을 며칠 동안 보관할지 정합니다 (BACKUPS_MAX_AGE).',
            effect: '기본 3일입니다. 값을 늘리면 더 오래된 시점으로 되돌릴 수 있지만 디스크를 더 씁니다. 기간이 지난 백업은 자동 삭제됩니다.',
            tip: '보관 일수는 최대 개수보다 우선 적용됩니다.'
        },
        'valheim.backupsMaxCount': {
            what: '보관할 컨테이너 백업의 최대 개수입니다 (BACKUPS_MAX_COUNT).',
            effect: '값을 정하면 개수를 넘는 오래된 백업부터 지웁니다. 0(기본)이면 개수 제한 없이 보관 일수만 적용합니다.'
        },
        'valheim.backupsIfIdle': {
            what: '아무도 플레이하지 않을 때도 백업할지 정합니다 (BACKUPS_IF_IDLE).',
            effect: '켜면(기본) 접속자가 없어도 주기마다 백업합니다. 끄면 최근에 플레이한 경우에만 백업해 변화 없는 중복 백업을 줄입니다.',
            tip: '끈 경우 마지막 접속 종료 후 백업 유예 시간 동안은 계속 백업합니다.'
        },
        'valheim.backupsIdleGracePeriod': {
            what: '플레이어가 없어도 백업 끄기를 쓸 때, 마지막 플레이어가 나간 뒤 백업을 계속하는 유예 시간(초)입니다 (BACKUPS_IDLE_GRACE_PERIOD).',
            effect: '기본 3600초(1시간)입니다. 값을 늘리면 접속 종료 후에도 더 오래 백업하고, 줄이면 빨리 멈춥니다.',
            tip: '플레이어가 없어도 백업이 켜져 있으면 이 값은 사용되지 않습니다.'
        },
        'valheim.backupsZip': {
            what: '컨테이너 백업을 ZIP으로 압축할지 정합니다 (BACKUPS_ZIP).',
            effect: '켜면(기본) 용량이 작아지고, 끄면 압축하지 않은 파일로 저장해 바로 꺼내 쓰기 쉽지만 용량이 커집니다.'
        },

        // ---------- Valheim: mods ----------
        'valheim.modMode': {
            what: '서버에서 사용할 모드 로더를 고릅니다 (BEPINEX 또는 VALHEIM_PLUS).',
            effect: '기본 서버는 모드 없이 실행합니다. BepInEx는 Thunderstore 등의 일반 모드를 넣을 수 있는 범용 로더입니다. ValheimPlus는 설정 파일로 많은 게임 규칙을 바꾸는 대형 모드입니다. 두 로더는 동시에 쓸 수 없습니다.',
            tip: '대부분의 모드는 접속하는 클라이언트에도 같은 모드가 설치되어 있어야 합니다. 크로스플레이와 일부 모드는 함께 동작하지 않을 수 있습니다.'
        },
        'valheim.plusRepo': {
            what: 'ValheimPlus를 내려받을 GitHub 저장소입니다 (VALHEIM_PLUS_REPO).',
            effect: '기본값은 현재 유지 관리 중인 Grantapher/ValheimPlus입니다. 다른 포크를 쓰려면 제작자/저장소 형식으로 바꿉니다.',
            tip: 'ValheimPlus 모드 로더를 선택했을 때만 사용됩니다.'
        },
        'valheim.plusRelease': {
            what: '설치할 ValheimPlus 버전입니다 (VALHEIM_PLUS_RELEASE).',
            effect: 'latest(기본)는 최신 릴리스를 받고, tags/0.10.3.0처럼 태그를 지정하면 그 버전으로 고정합니다.',
            tip: '클라이언트와 서버의 ValheimPlus 버전이 다르면 접속이 거부될 수 있으므로 버전을 고정하고 함께 맞추는 것을 권장합니다.'
        },

        // ---------- Valheim: http ----------
        'valheim.statusHttp': {
            what: '서버 상태(이름, 접속자 수, 버전 등)를 status.json으로 제공하는 작은 웹 서버입니다 (STATUS_HTTP).',
            effect: '켜면 지정한 TCP 포트에서 상태 JSON을 조회할 수 있어 모니터링이나 디스코드 봇 등에 활용할 수 있습니다. 끄면(기본) 웹 서버를 실행하지 않습니다.',
            tip: '서버 목록 공개(SERVER_PUBLIC)가 켜져 있어야 정상 동작합니다. 외부에 열 경우 공개 주소와 방화벽을 확인하세요.'
        },
        'valheim.statusHttpPort': {
            what: '상태 웹 서버가 컨테이너 안에서 사용하는 TCP 포트입니다 (STATUS_HTTP_PORT).',
            effect: '기본 80입니다. 보통은 그대로 두고 호스트 포트만 바꾸면 됩니다.',
            tip: 'Supervisor 관리 포트와 같은 값을 쓰면 충돌합니다.'
        },
        'valheim.statusHostPort': {
            what: '상태 웹 서버를 Docker 호스트의 어느 TCP 포트로 연결할지 정합니다 (Compose ports).',
            effect: '기본 8080이면 http://호스트주소:8080/status.json 으로 조회합니다. 다른 서비스와 겹치면 다른 번호로 바꾸세요.'
        },
        'valheim.statusBind': {
            what: '상태 웹 서버 포트를 호스트의 어떤 IP 주소에 열지 정합니다 (Compose ports 바인드 주소).',
            effect: '127.0.0.1(기본)은 Docker 호스트 자신만 접근할 수 있습니다. 호스트의 특정 IP를 넣으면 그 네트워크에서, 0.0.0.0이면 모든 네트워크 인터페이스에서 접근할 수 있습니다.',
            tip: '인터넷에 공개하려면 0.0.0.0과 함께 공유기 포트포워딩·방화벽 설정이 필요합니다.'
        },
        'valheim.statusHttpConf': {
            what: '상태 웹 서버(BusyBox httpd)의 설정 파일 경로입니다 (STATUS_HTTP_CONF).',
            effect: '이 파일에 접근 허용·차단 규칙(IP 제한, 기본 인증 등)을 적어 상태 페이지 접근을 제한할 수 있습니다. 기본값은 /config/httpd.conf입니다.',
            tip: '파일이 없으면 기본 동작으로 실행됩니다. BusyBox httpd 설정 문법을 따릅니다.'
        },
        'valheim.statusHttpHtdocs': {
            what: 'status.json 파일이 만들어지는 컨테이너 내부 폴더입니다 (STATUS_HTTP_HTDOCS).',
            effect: '기본값 /opt/valheim/htdocs입니다. 이 폴더에 다른 정적 파일을 넣으면 함께 제공됩니다.'
        },
        'valheim.supervisorHttp': {
            what: '컨테이너 안의 프로세스 관리자(Supervisor)를 웹 화면으로 조작하는 기능입니다 (SUPERVISOR_HTTP).',
            effect: '켜면 브라우저에서 게임 서버·백업·업데이트 프로세스의 상태를 보고 시작·중지·재시작하거나 로그를 볼 수 있습니다. 끄면(기본) 관리 화면이 없습니다.',
            tip: '서버를 마음대로 끌 수 있는 강력한 기능이며 암호화되지 않은 HTTP 기본 인증을 사용합니다. 인터넷에 직접 공개하지 말고 127.0.0.1 바인드 + SSH 터널이나 VPN으로 접근하는 것을 강력히 권장합니다.'
        },
        'valheim.supervisorHttpPort': {
            what: 'Supervisor 관리 웹이 컨테이너 안에서 사용하는 TCP 포트입니다 (SUPERVISOR_HTTP_PORT).',
            effect: '기본 9001입니다. 보통은 그대로 두고 호스트 포트만 바꾸면 됩니다.'
        },
        'valheim.supervisorHostPort': {
            what: 'Supervisor 관리 웹을 Docker 호스트의 어느 TCP 포트로 연결할지 정합니다 (Compose ports).',
            effect: '기본 9001이면 http://호스트주소:9001 로 접속합니다. 다른 서비스와 겹치면 바꾸세요.'
        },
        'valheim.supervisorBind': {
            what: 'Supervisor 관리 웹 포트를 호스트의 어떤 IP 주소에 열지 정합니다 (Compose ports 바인드 주소).',
            effect: '127.0.0.1(기본)은 호스트 자신만 접근할 수 있고, 0.0.0.0은 모든 네트워크에서 접근할 수 있습니다.',
            tip: '보안상 127.0.0.1을 유지하는 것을 권장합니다. 원격에서 쓰려면 SSH 포트 포워딩을 이용하세요.'
        },
        'valheim.supervisorHttpUser': {
            what: 'Supervisor 관리 웹에 로그인할 사용자 이름입니다 (SUPERVISOR_HTTP_USER).',
            effect: '기본값은 admin입니다. 추측하기 어려운 이름으로 바꾸면 무차별 대입 공격에 조금 더 안전합니다.'
        },
        'valheim.supervisorHttpPass': {
            what: 'Supervisor 관리 웹 로그인 비밀번호입니다 (SUPERVISOR_HTTP_PASS).',
            effect: '관리 웹을 켜려면 이 값이나 비밀번호 파일 중 하나가 필요합니다. 입력한 값은 Compose 파일에 그대로 기록됩니다.',
            tip: 'Compose 파일을 공유할 계획이라면 비밀번호 파일(secret) 방식을 사용하세요. 다른 서비스와 같은 비밀번호는 피하세요.'
        },
        'valheim.supervisorSecretFile': {
            what: 'Supervisor 비밀번호를 담은 Docker 호스트의 파일 경로입니다 (SUPERVISOR_HTTP_PASS_FILE, Compose secret).',
            effect: '입력하면 이 파일을 Compose secret으로 연결해 비밀번호가 Compose 파일에 노출되지 않습니다. 직접 입력한 비밀번호보다 우선합니다.',
            tip: '생성기가 파일을 만들지 않으므로 서버에 실제 파일을 준비해야 합니다. 파일이 없으면 컨테이너가 시작되지 않습니다.'
        },

        // ---------- Valheim: container ----------
        'valheim.puid': {
            what: '컨테이너 안에서 게임 서버가 실행될 사용자 ID입니다 (PUID).',
            effect: '호스트의 볼륨 폴더 소유자 UID와 맞추면 월드·설정 파일을 호스트에서 권한 문제 없이 편집할 수 있습니다. 앱 기본값은 1000(대부분의 리눅스 첫 사용자)이며, 이미지 자체 기본값은 0(root)입니다.',
            tip: '호스트에서 id 명령으로 자신의 UID를 확인할 수 있습니다.'
        },
        'valheim.pgid': {
            what: '컨테이너 안에서 게임 서버가 실행될 그룹 ID입니다 (PGID).',
            effect: '호스트 볼륨 폴더의 그룹과 맞추면 파일 권한 문제가 줄어듭니다. 앱 기본값은 1000입니다.'
        },
        'valheim.permissionsUmask': {
            what: '백업·설정 파일과 폴더를 만들 때 적용할 권한 마스크(umask)입니다 (PERMISSIONS_UMASK).',
            effect: '022(기본)는 소유자만 쓰고 다른 사람은 읽기만 가능합니다. 002는 같은 그룹도 쓸 수 있고, 077은 소유자 외에는 읽지도 못하게 합니다.',
            tip: '여러 사용자가 같은 그룹으로 파일을 관리한다면 002, 보안이 중요하면 077을 고려하세요.'
        },

        // ---------- Valheim: logs ----------
        'valheim.logFilterEmpty': {
            what: '게임 로그의 빈 줄을 지울지 정합니다 (VALHEIM_LOG_FILTER_EMPTY).',
            effect: '켜면(기본) 빈 줄이 제거되어 로그가 읽기 쉬워집니다. 끄면 원본 그대로 출력합니다.'
        },
        'valheim.logFilterUtf8': {
            what: '게임 로그의 깨진(잘못된 UTF-8) 문자를 지울지 정합니다 (VALHEIM_LOG_FILTER_UTF8).',
            effect: '켜면(기본) 깨진 문자가 제거되어 로그 수집 도구가 오류를 내지 않습니다. 끄면 원본 그대로 출력합니다.'
        },
        'valheim.logFilterMatch': Object.assign(logFilter('입력한 값과 완전히 같은'), {
            effect: '값과 정확히 일치하는 줄을 제거합니다. 기본값은 공백 한 칸으로, 공백만 있는 줄을 지웁니다. 비워두면 이 필터는 꺼집니다.'
        }),
        'valheim.logFilterStartsWith': Object.assign(logFilter('입력한 값으로 시작하는'), {
            effect: '값으로 시작하는 줄을 제거합니다. 기본값 (Filename: 은 Unity가 반복 출력하는 소스 파일 위치 줄을 지웁니다. 비워두면 이 필터는 꺼집니다.'
        }),
        'valheim.logFilterEndsWith': logFilter('입력한 값으로 끝나는'),
        'valheim.logFilterContains': logFilter('입력한 값을 포함하는'),
        'valheim.logFilterRegexp': Object.assign(logFilter('정규식과 일치하는'), {
            effect: '입력한 정규식에 맞는 줄을 제거합니다. 비워두면 이 필터는 꺼집니다. 잘못된 정규식은 의도하지 않은 줄까지 지울 수 있습니다.'
        }),
        'valheim.syslogRemoteHost': {
            what: '로그를 전송할 원격 Syslog 서버 주소입니다 (SYSLOG_REMOTE_HOST).',
            effect: '입력하면 컨테이너 로그를 해당 서버로 보내 중앙에서 모아 볼 수 있습니다. 비워두면 원격 전송을 하지 않습니다.'
        },
        'valheim.syslogRemotePort': {
            what: '원격 Syslog 서버의 UDP 포트입니다 (SYSLOG_REMOTE_PORT).',
            effect: '기본 514입니다. 원격 Syslog 호스트를 입력했을 때만 사용됩니다.'
        },
        'valheim.syslogRemoteAndLocal': {
            what: '원격 Syslog로 보내는 동안에도 로컬(docker logs)에 로그를 남길지 정합니다 (SYSLOG_REMOTE_AND_LOCAL).',
            effect: '켜면(기본) 양쪽 모두 기록하고, 끄면 원격으로만 보내 docker logs에는 거의 나타나지 않습니다.'
        },

        // ---------- Valheim: hooks ----------
        'valheim.PRE_SUPERVISOR_HOOK': hook('프로세스 관리자(supervisord)가 시작되기 전에', '명령이 끝날 때까지 컨테이너 시작이 멈춥니다.'),
        'valheim.PRE_BOOTSTRAP_HOOK': hook('서버 초기화(bootstrap) 단계 직전에', '명령이 끝날 때까지 초기화가 멈춥니다.'),
        'valheim.POST_BOOTSTRAP_HOOK': hook('서버 초기화가 끝나고 게임 서버·서비스가 시작되기 전에', '명령이 끝날 때까지 시작이 멈추며, 추가 패키지 설치에 적합합니다.'),
        'valheim.PRE_BACKUP_HOOK': hook('컨테이너 백업을 만들기 직전에', '명령 안의 @BACKUP_FILE@ 은 만들어질 백업 파일 경로로 바뀝니다.'),
        'valheim.POST_BACKUP_HOOK': hook('컨테이너 백업을 만든 직후에', '명령 안의 @BACKUP_FILE@ 은 만들어진 백업 파일 경로로 바뀌어, 외부 저장소로 복사하는 데 쓸 수 있습니다.'),
        'valheim.PRE_UPDATE_CHECK_HOOK': hook('업데이트 확인을 시작하기 전에'),
        'valheim.POST_UPDATE_CHECK_HOOK': hook('업데이트 확인이 끝난 뒤에'),
        'valheim.PRE_START_HOOK': hook('업데이트 관리자가 서버를 처음 시작하기 전에'),
        'valheim.POST_START_HOOK': hook('업데이트 관리자가 서버를 처음 시작한 뒤에'),
        'valheim.PRE_RESTART_HOOK': hook('업데이트·예약 재시작으로 서버를 다시 시작하기 전에', '예를 들어 sleep으로 재시작을 잠시 늦추거나 미리 알림을 보낼 수 있습니다.'),
        'valheim.POST_RESTART_HOOK': hook('업데이트·예약 재시작으로 서버를 다시 시작한 뒤에'),
        'valheim.PRE_SERVER_LISTENING_HOOK': hook('게임 프로세스가 실행된 뒤, 플레이어 접속을 받기 시작하기 전에'),
        'valheim.POST_SERVER_LISTENING_HOOK': hook('서버가 플레이어 접속을 받을 수 있게 된 직후에', '접속 가능 알림(디스코드 웹훅 등)에 적합합니다.'),
        'valheim.PRE_SERVER_RUN_HOOK': hook('게임 서버 프로세스를 실행하기 직전에', '명령이 끝날 때까지 서버 시작이 멈춥니다.'),
        'valheim.POST_SERVER_RUN_HOOK': hook('게임 서버 프로세스가 종료된 뒤에', '컨테이너 종료 시에는 약 29초 안에 끝나야 하며 넘으면 중단될 수 있습니다.'),
        'valheim.PRE_SERVER_SHUTDOWN_HOOK': hook('게임 서버를 종료하기 직전에', '90초를 넘기면 프로세스 관리자가 서버를 강제 종료하므로 저장이 안 될 수 있습니다.'),
        'valheim.POST_SERVER_SHUTDOWN_HOOK': hook('게임 서버 종료 처리가 끝난 뒤에'),
        'valheim.PRE_BEPINEX_CONFIG_HOOK': hook('BepInEx 설정 파일(BepInEx.cfg)을 작성하기 전에', 'BepInEx 모드 로더를 사용할 때만 실행됩니다.'),
        'valheim.POST_BEPINEX_CONFIG_HOOK': hook('BepInEx 설정 파일(BepInEx.cfg)을 작성한 뒤에', 'BepInEx 모드 로더를 사용할 때만 실행됩니다.'),

        // ---------- Valheim: advanced ----------
        'valheim.serverArgs': {
            what: '위 항목에 없는 Valheim 서버 실행 인수를 직접 추가하는 칸입니다 (SERVER_ARGS에 덧붙임).',
            effect: '입력한 인수가 게임 서버 실행 명령 끝에 그대로 붙습니다. 잘못된 인수는 서버가 무시하거나 시작에 실패할 수 있습니다.',
            tip: '-name, -world, -port, -password, -public, -crossplay, -savedir와 위에서 지정한 프리셋·규칙·저장 인수는 중복 입력할 수 없습니다. 공백이 들어간 값을 따옴표로 묶는 방식은 이미지가 지원하지 않습니다.'
        },
        'valheim.extraEnvironment': {
            what: '화면에 없는 컨테이너 환경변수를 한 줄에 하나씩 KEY=value 형식으로 추가합니다.',
            effect: '입력한 변수가 Compose environment에 그대로 추가됩니다. 예: VPCFG_Server_maxPlayers=20 은 ValheimPlus 설정을, BEPINEXCFG_ 로 시작하는 변수는 BepInEx 모드 설정을 바꿉니다. # 으로 시작하는 줄은 무시됩니다.',
            tip: '위 개별 항목에서 관리하는 변수는 중복 입력할 수 없습니다. VPCFG_ 는 ValheimPlus, BEPINEXCFG_ 는 모드 로더가 켜져 있어야 적용됩니다. 값에 따옴표를 붙이지 마세요.'
        },

        // ---------- Valheim: connection ----------
        'valheim.connection.serverName': {
            what: '서버 목록과 접속 화면에 표시되는 서버 이름입니다 (SERVER_NAME).',
            effect: '바꾸면 다음 시작부터 서버 목록에 새 이름으로 표시됩니다. 월드 데이터에는 영향이 없습니다.',
            tip: '서버 목록 공개 시 다른 사람도 이 이름으로 검색할 수 있습니다.'
        },
        'valheim.connection.worldName': {
            what: '서버가 불러오거나 새로 만들 월드 이름입니다 (WORLD_NAME). 기본값은 Dedicated입니다.',
            effect: '같은 이름의 월드가 있으면 그 월드를 불러오고, 없으면 새 월드를 생성합니다. 이름을 바꾸면 다른 월드로 시작하는 것이므로 기존 월드가 사라진 것처럼 보일 수 있습니다(파일은 남아 있습니다).',
            tip: '기존 월드를 옮겨올 때는 worlds_local 폴더 안의 파일 이름(.db/.fwl 확장자 제외)과 정확히 같게 입력하세요. 대소문자도 구분됩니다.'
        },
        'valheim.connection.serverPassword': {
            what: '서버 접속 비밀번호입니다 (SERVER_PASS).',
            effect: '플레이어는 접속할 때 이 비밀번호를 입력해야 합니다. 5자 이상이어야 하며, 비밀번호가 서버 이름 안에 그대로 들어 있으면 게임이 서버 시작을 거부하는 것으로 알려져 있습니다.',
            tip: '비밀번호 파일을 지정하면 그쪽이 우선합니다. Compose 파일에 비밀번호가 그대로 기록되므로 공유할 때 주의하세요.'
        },
        'valheim.connection.serverSecretFile': {
            what: '접속 비밀번호를 담은 Docker 호스트의 파일 경로입니다 (SERVER_PASS_FILE, Compose secret).',
            effect: '입력하면 이 파일 내용을 비밀번호로 사용하며, 직접 입력한 비밀번호보다 우선합니다. Compose 파일에 비밀번호가 노출되지 않습니다.',
            tip: '파일 내용은 5자 이상이어야 하며, 생성기가 파일을 만들지 않으므로 서버에 직접 준비하세요.'
        },
        'valheim.connection.serverPort': {
            what: '서버가 사용하는 시작 UDP 포트입니다 (SERVER_PORT). 기본값은 2456입니다.',
            effect: '시작 포트(게임)와 다음 포트(서버 조회)를 함께 사용합니다. 예: 2456이면 2456~2457/UDP. 크로스플레이를 켜면 세 번째 포트(2458)도 사용합니다. 여러 서버를 한 호스트에서 돌릴 때는 서로 겹치지 않게 바꾸세요.',
            tip: 'Steam 방식 외부 접속에는 공유기 포트포워딩과 방화벽에서 해당 UDP 포트를 열어야 합니다. 일부 모드는 시작 포트+2도 사용합니다.'
        },
        'valheim.connection.serverPublic': {
            what: '게임 내 커뮤니티 서버 목록에 서버를 표시할지 정합니다 (SERVER_PUBLIC).',
            effect: '공개(기본)하면 누구나 목록에서 찾을 수 있고(비밀번호는 필요), 비공개면 목록에 나타나지 않아 IP 주소나 참가 코드로만 접속합니다.',
            tip: '상태 조회 HTTP 기능은 공개 서버에서만 동작합니다. 친구끼리만 한다면 비공개도 충분합니다.'
        },
        'valheim.connection.crossplay': {
            what: 'Steam 외 플랫폼(Xbox, Microsoft Store 등) 플레이어도 접속할 수 있게 하는 크로스플레이 기능입니다 (CROSSPLAY).',
            effect: '켜면 Steam 대신 PlayFab 백엔드를 사용해 모든 플랫폼이 참가 코드로 접속할 수 있고, 릴레이를 통하므로 포트포워딩 없이도 접속되는 경우가 많습니다. 끄면(기본) Steam 사용자만 접속할 수 있습니다.',
            tip: '크로스플레이 서버는 LAN이나 루프백 IP로 직접 접속할 수 없습니다. 일부 모드는 크로스플레이와 호환되지 않습니다.'
        },

        // ---------- Core Keeper: options ----------
        'corekeeper.worldIndex': {
            what: '서버가 불러올 월드 저장 슬롯 번호입니다 (WORLD_INDEX). 기본값은 0입니다.',
            effect: '번호를 바꾸면 다른 슬롯의 월드를 불러오고, 그 슬롯이 비어 있으면 새 월드를 만듭니다. 기존 슬롯의 월드는 지워지지 않습니다.',
            tip: '크리에이티브 월드와 일반 월드를 나눠 쓰거나 새 월드를 시험할 때 다른 번호를 사용하세요.'
        },
        'corekeeper.worldSeed': {
            what: '새 월드를 만들 때 지형 생성에 쓰는 시드 값입니다 (WORLD_SEED).',
            effect: '같은 시드는 같은 지형을 만듭니다. 비워두면 무작위 시드를 사용합니다. 이미 만들어진 월드에는 영향이 없습니다.',
            tip: '공유받은 시드를 쓰려면 아직 생성되지 않은 월드 슬롯(월드 인덱스)과 함께 지정하세요.'
        },
        'corekeeper.hashedWorldSeed': {
            what: 'Core Keeper 1.1부터 쓰이는 해시 형식의 월드 시드입니다 (HASHED_WORLD_SEED).',
            effect: '게임에서 공유되는 해시 시드를 입력하면 그 지형으로 새 월드를 만듭니다. 비워두면 무작위입니다. 기존 월드에는 영향이 없습니다.',
            tip: '일반 시드와 해시 시드를 동시에 넣었을 때 어느 쪽이 우선하는지는 문서에 명시되어 있지 않으니 하나만 사용하세요.'
        },
        'corekeeper.worldMode': {
            what: '월드의 게임 모드(난이도)입니다 (WORLD_MODE).',
            effect: '보통(0, 기본): 표준 난이도입니다. 어려움(1): 적과 보스의 체력이 약 50%, 피해가 약 100% 증가하고 보스 보상 굴림도 늘어나며 사망 페널티도 더 무겁습니다. 캐주얼(4): 적의 체력과 피해가 약 50% 줄어든 편한 모드입니다. 창작(2): 대부분의 아이템을 무제한으로 쓸 수 있는 건축 중심 모드로, 코어가 없는 평지에서 시작하며 창작용 캐릭터로만 들어갈 수 있습니다.',
            tip: '모드는 월드를 만들 때 정해지며, 창작 월드와 일반 월드는 서로 바꿀 수 없습니다. 바꾸려면 다른 월드 인덱스로 새 월드를 만드세요. 어려움 모드의 정확한 사망 페널티는 게임 내 설명을 확인하세요.'
        },
        'corekeeper.season': {
            what: '부활절·할로윈·크리스마스 같은 시즌 이벤트를 강제로 지정합니다 (SEASON).',
            effect: '자동(미설정)은 실제 날짜에 맞춰 시즌이 바뀝니다. 0(None)은 시즌 이벤트를 끄고, 1 부활절, 2 할로윈, 3 크리스마스, 4 발렌타인, 5 기념일, 6 벚꽃, 7 설날을 고르면 날짜와 상관없이 그 시즌의 장식·한정 아이템·이벤트가 나타납니다.',
            tip: '시즌 한정 아이템을 모으고 싶을 때 유용합니다. 원래대로 되돌리려면 자동으로 바꾸고 재시작하세요.'
        },
        'corekeeper.activateContent': {
            what: '1.1 이전에 만든 기존 월드에 새 콘텐츠 묶음(보스 던전, 오아시스, 타이탄 성소, 협업 콘텐츠 등)을 추가합니다 (ACTIVATE_CONTENT).',
            effect: '선택한 콘텐츠가 월드에 생성됩니다. 생성 위치의 이미 탐험한 지형이나 건축물 일부가 덮어써질 수 있습니다. 새로 만든 월드에는 보통 필요하지 않습니다.',
            tip: '한 번 활성화한 콘텐츠는 다시 끌 수 없으므로 반드시 월드를 백업한 뒤 적용하세요.'
        },
        'corekeeper.puid': {
            what: '컨테이너 안에서 서버가 실행될 사용자 ID입니다 (PUID). 기본값 1000입니다.',
            effect: '호스트 볼륨 폴더 소유자의 UID와 맞추면 저장 파일을 호스트에서 권한 문제 없이 다룰 수 있습니다.',
            tip: '호스트에서 id 명령으로 자신의 UID를 확인할 수 있습니다.'
        },
        'corekeeper.pgid': {
            what: '컨테이너 안에서 서버가 실행될 그룹 ID입니다 (PGID). 기본값 1000입니다.',
            effect: '호스트 볼륨 폴더의 그룹과 맞추면 파일 권한 문제가 줄어듭니다.'
        },
        'corekeeper.arm64Device': {
            what: 'ARM64 장치(라즈베리 파이, Apple M1 등)에서 x86 서버를 실행하기 위한 Box64 빌드를 고릅니다 (ARM64_DEVICE).',
            effect: 'generic(기본)은 일반 ARM64용입니다. rpi3/rpi4-pre3/rpi5/rpi5_16k는 라즈베리 파이 모델별, m1은 Apple Silicon, adlink는 ADLINK 장치용 최적화 빌드입니다. 일반 x86 PC에서는 사용되지 않습니다.',
            tip: 'rpi5_16k는 16K 페이지 커널을 쓰는 라즈베리 파이 5용입니다. 장치에 맞지 않으면 서버가 시작되지 않을 수 있으니 문제가 있으면 generic으로 시도하세요.'
        },
        'corekeeper.useDepotDownloader': {
            what: '서버 파일을 SteamCMD 대신 DepotDownloader로 내려받을지 정합니다 (USE_DEPOT_DOWNLOADER).',
            effect: '켜면 32비트 실행 환경이 없는 시스템(일부 ARM 등)에서도 설치할 수 있습니다. 끄면(기본) SteamCMD를 사용합니다.',
            tip: 'SteamCMD가 정상 동작한다면 끈 상태를 유지하세요.'
        },
        'corekeeper.modsEnabled': {
            what: 'mod.io에서 서버용 모드를 자동으로 설치하는 기능입니다 (MODS_ENABLED).',
            effect: '켜면 컨테이너가 시작될 때마다 설치할 모드 목록을 mod.io에서 내려받아 설치하므로, 재시작하면 모드도 최신으로 갱신됩니다. 끄면(기본) 모드 없이 실행합니다.',
            tip: 'mod.io API 키와 API URL이 필요합니다. 클라이언트 전용 모드는 서버 시작을 막을 수 있습니다.'
        },
        'corekeeper.modioApiKey': {
            what: 'mod.io에서 모드를 내려받기 위한 개인 API 키입니다 (MODIO_API_KEY).',
            effect: '모드 사용이 켜져 있을 때 모드 다운로드 인증에 쓰입니다. 비어 있거나 틀리면 모드를 설치하지 못합니다.',
            tip: '비밀번호처럼 다뤄야 하는 값입니다. Compose 파일을 공유할 때 노출되지 않도록 주의하세요.'
        },
        'corekeeper.modioApiUrl': {
            what: 'API 키와 함께 발급되는 개인 mod.io API 주소입니다 (MODIO_API_URL).',
            effect: '모드 다운로드 요청을 보낼 주소로, 예: https://u-xxxx.modapi.io/v1 형식입니다. 틀리면 모드 설치가 실패합니다.'
        },
        'corekeeper.mods': {
            what: '설치할 mod.io 모드 목록입니다 (MODS).',
            effect: '모드 ID를 쉼표로 구분해 입력합니다. ID 뒤에 :버전을 붙이면 그 버전으로 고정하고, 생략하면 최신 버전을 설치합니다.',
            tip: '의존성 모드는 자동 설치되지 않으므로 필요한 라이브러리 모드(예: core-lib)도 직접 목록에 넣어야 합니다.'
        },

        // ---------- Core Keeper: connection ----------
        'corekeeper.connection.worldName': {
            what: '서버(월드)의 표시 이름입니다 (WORLD_NAME). 기본값은 Core Keeper Server입니다.',
            effect: '바꾸면 접속 화면 등에 표시되는 이름이 바뀝니다. 어떤 월드를 불러올지는 월드 인덱스가 정합니다.'
        },
        'corekeeper.connection.gameId': {
            what: 'SDR(Steam 릴레이) 방식에서 친구가 서버에 접속할 때 입력하는 Game ID입니다 (GAME_ID).',
            effect: '15~28자의 영숫자로 직접 지정하면 재시작해도 같은 ID가 유지됩니다. 비워두면 시작 시 자동 생성되며, 컨테이너의 GameID.txt나 로그에서 확인할 수 있습니다.',
            tip: 'Game ID를 아는 사람은 누구나 접속할 수 있으므로 비밀번호처럼 필요한 사람에게만 알려주세요.'
        },
        'corekeeper.connection.maxPlayers': {
            what: '동시에 접속할 수 있는 최대 플레이어 수입니다 (MAX_PLAYERS). 기본값은 10입니다.',
            effect: '값을 올리면 더 많은 인원이 함께할 수 있지만 서버 CPU·메모리·대역폭 사용이 늘어납니다. 가득 차면 새 접속이 거부됩니다.'
        },
        'corekeeper.connection.directConnection': {
            what: 'SDR(Steam 릴레이) 대신 IP 주소와 UDP 포트로 직접 접속하게 하는 모드입니다 (SERVER_PORT 지정 여부).',
            effect: 'SDR(기본)은 포트 개방 없이 Game ID만으로 접속합니다. 직접 연결을 켜면 SERVER_PORT가 설정되어 IP·포트·비밀번호로 접속하며, 릴레이를 거치지 않아 지연이 줄 수 있습니다.',
            tip: '직접 연결은 공유기 포트포워딩과 방화벽에서 해당 UDP 포트를 열어야 합니다. 허용 플랫폼 제한도 직접 연결에서만 동작합니다.'
        },
        'corekeeper.connection.serverIp': {
            what: '직접 연결 모드에서 서버가 대기할 IP 주소입니다 (SERVER_IP).',
            effect: '비워두면 모든 인터페이스(0.0.0.0)에서 접속을 받습니다. 특정 IP를 넣으면 그 주소로만 받습니다. IPv4와 IPv6 모두 사용할 수 있습니다.',
            tip: 'Docker 컨테이너 안에서 존재하지 않는 IP를 지정하면 서버가 접속을 받지 못하므로 특별한 이유가 없으면 비워두세요.'
        },
        'corekeeper.connection.serverPort': {
            what: '직접 연결 모드에서 사용하는 UDP 포트입니다 (SERVER_PORT). 기본값은 27015입니다.',
            effect: '이 포트로 플레이어 접속을 받습니다. 값을 지정하는 것 자체가 네트워크 방식을 직접 연결로 바꿉니다.',
            tip: '공유기와 방화벽에서 이 UDP 포트를 열어야 외부에서 접속할 수 있습니다. 다른 게임 서버와 포트가 겹치지 않게 하세요.'
        },
        'corekeeper.connection.password': {
            what: '직접 연결 모드의 접속 비밀번호입니다 (PASSWORD). 최대 28자입니다.',
            effect: '플레이어는 IP·포트와 함께 이 비밀번호를 입력해야 접속합니다. 비워두거나 형식이 맞지 않으면 서버가 무작위 비밀번호를 생성합니다.',
            tip: '무작위로 생성된 비밀번호는 로그에서 확인해야 하므로, 직접 정해 두는 것이 편합니다.'
        },
        'corekeeper.connection.allowOnlyPlatform': {
            what: '특정 플랫폼 사용자만 접속하도록 제한합니다 (ALLOW_ONLY_PLATFORM).',
            effect: '전체 허용(기본)은 모든 플랫폼이 접속할 수 있습니다. 1은 Steam, 2는 Epic, 3은 Microsoft(Xbox/PC Game Pass), 4는 GOG 사용자만 접속을 허용합니다.',
            tip: '직접 연결 모드(SERVER_PORT 지정)에서만 적용됩니다.'
        }
    };
    const help = root.OptionHelp = root.OptionHelp || {};
    Object.assign(help, entries);
    if (typeof module !== 'undefined' && module.exports) module.exports = entries;
})(typeof globalThis !== 'undefined' ? globalThis : this);
