(function (root) {
    'use strict';
    // Sources:
    //   https://palworld-server-docker.loef.dev/getting-started/configuration/server-settings
    //   https://palworld-server-docker.loef.dev/getting-started/configuration/game-settings
    //   https://github.com/thijsvanloef/palworld-server-docker
    //   https://github.com/jammsen/docker-palworld-dedicated-server (README, docs/ENV_VARS.md)
    //   https://docs.palworldgame.com/settings-and-operation/configuration
    //   https://docs.palworldgame.com/category/rest-api
    const CRON = [
        'Cron 형식: 공백 구분 5칸(분 시 일 월 요일)',
        '예: "0 4 * * *" → 매일 04:00',
        '예: "*/30 * * * *" → 30분 간격',
        '예: "0 3,15 * * *" → 매일 03:00·15:00'
    ];
    const TZ_NOTE = [
        '시각 기준: 컨테이너 TZ(시간대)',
        'TZ 미지정 시 한국 시간과 다를 수 있음'
    ];
    const DISCORD_COLOR = [
        '색상: 16진수(#FF0000) 아닌 10진수 숫자로 입력',
        '예: 빨강 FF0000 → 16711680',
        '16진수 입력 시 Discord 전송 실패 가능'
    ];

    const entries = {
        // ---------------- thijsvanloef/palworld-server-docker ----------------
        'palworld.t_updateOnBoot': {
            what: ['컨테이너 시작 시마다 SteamCMD로 서버 설치·최신 버전 업데이트 여부'],
            effect: [
                '켜면: 시작 시 업데이트 확인, 부팅 조금 느려짐',
                '켜면: 클라이언트와 버전 불일치 줄어듦',
                '끄면: 설치된 버전 그대로 사용, 빠른 시작',
                '기본값: true'
            ],
            tip: [
                '최초 설치 시 반드시 켜야 서버 파일 내려받아짐',
                '게임 업데이트 후 접속 불가 시 켠 채로 재시작 권장'
            ]
        },
        'palworld.t_multithreading': {
            what: ['서버 멀티스레드 성능 옵션을 켜는 예전 방식 설정'],
            effect: [
                '켜면: 여러 CPU 코어 활용용 실행 인수 추가됨',
                '기본값: false'
            ],
            tip: [
                '공식 문서상 지원 중단(deprecated) 표시',
                '대안: ENABLE_PERF_THREADING_ARGS / WORKER_THREADS_SERVER 권장',
                '최신 이미지에서는 효과 없을 수 있음'
            ]
        },
        'palworld.t_backupEnabled': {
            what: ['정해진 일정에 따른 세이브 데이터 자동 백업 여부'],
            effect: [
                '켜면: BACKUP_CRON_EXPRESSION 일정마다 백업 파일 생성됨',
                '백업 일정 기본: "0 0 * * *" (매일 자정)',
                '끄면: 자동 백업 생성 안 됨',
                '기본값: true'
            ],
            tip: ['백업이 계속 쌓이므로 "오래된 백업 삭제"와 함께 사용 권장']
        },
        'palworld.t_deleteOldBackups': {
            what: ['일정 기간 지난 오래된 백업 파일 자동 삭제 여부'],
            effect: [
                '켜면: OLD_BACKUP_DAYS보다 오래된 백업 삭제, 디스크 절약',
                '끄면: 백업이 계속 쌓임',
                '기본값: false'
            ],
            tip: ['자동 백업이 켜져 있을 때만 의미 있음']
        },
        'palworld.t_oldBackupDays': {
            what: ['"오래된 백업 삭제" 켜짐 시 백업 보관 일수'],
            effect: [
                '값 올림: 더 오래 전 시점으로 복구 가능, 디스크 더 사용',
                '값 내림: 공간 절약, 복구 가능 기간 짧아짐',
                '기본값: 30일'
            ]
        },
        'palworld.t_autoRebootEnabled': {
            what: ['정해진 일정에 서버 자동 재시작 여부'],
            effect: [
                '켜면: AUTO_REBOOT_CRON_EXPRESSION 일정마다 재시작',
                '켜면: 장시간 구동에 따른 메모리 증가·렉 감소',
                '끄면: 수동으로만 재시작됨',
                '기본값: false'
            ],
            tip: [
                '재시작 전 경고 방송·안전한 저장에 RCON 또는 REST API 필요함',
                '종료 후 재기동하려면 컨테이너 재시작 정책 설정 필요함',
                '예: restart: unless-stopped'
            ]
        },
        'palworld.t_autoRebootCronExpression': {
            what: ['자동 재부팅 실행 일정(Cron 표현식)'],
            effect: [...CRON, '기본값: "0 0 * * *" (매일 자정)'],
            tip: [...TZ_NOTE, '접속자 적은 새벽 시간대 권장']
        },
        'palworld.t_autoRebootWarnMinutes': {
            what: ['자동 재부팅 전 경고 후 실제 재시작까지 대기 시간(분)'],
            effect: [
                '값 올림: 플레이어 정리·퇴장 여유 생김',
                '값 내림: 재시작 빨리 진행됨',
                '기본값: 5분'
            ]
        },
        'palworld.t_logFormatType': {
            what: ['컨테이너 로그 출력 형식'],
            effect: [
                'default: 기본 형식 (기본값)',
                'colored: 색상 포함',
                'plain: 장식 없는 텍스트',
                'logfmt: 키=값 형식',
                'json: JSON 한 줄 형식',
                '사람이 읽을 때: default/colored 편함',
                'Loki 등 로그 수집 도구용: json/logfmt 편함'
            ]
        },
        'palworld.t_autoUpdateEnabled': {
            what: ['정해진 일정마다 새 서버 버전 확인·자동 업데이트 여부'],
            effect: [
                '켜면: AUTO_UPDATE_CRON_EXPRESSION 일정마다 업데이트 확인',
                '켜면: 새 버전 있으면 경고 후 서버 재시작해 업데이트',
                '끄면: 수동 업데이트 필요함',
                '기본값: false'
            ],
            tip: [
                '"시작 시 업데이트"(UPDATE_ON_BOOT) 켜져 있어야 실제 설치됨',
                '경고 방송에 RCON 또는 REST API 필요함'
            ]
        },
        'palworld.t_autoUpdateCronExpression': {
            what: ['자동 업데이트 확인 실행 일정(Cron 표현식)'],
            effect: [...CRON, '기본값: "0 * * * *" (매시 정각)'],
            tip: [...TZ_NOTE]
        },
        'palworld.t_autoUpdateWarnMinutes': {
            what: ['업데이트 발견 시 경고 후 업데이트 시작까지 대기 시간(분)'],
            effect: [
                '값 올림: 플레이어에게 여유 생김',
                '값 내림: 업데이트 빨리 적용됨',
                '접속자 없으면 대기 무시, 바로 진행',
                '기본값: 30분'
            ]
        },
        'palworld.t_autoRebootEvenIfPlayersOnline': {
            what: ['접속 플레이어가 있어도 예정된 자동 재부팅 진행 여부'],
            effect: [
                '켜면: 플레이어가 있어도 경고 후 재부팅',
                '끄면: 플레이어가 있으면 그 회차 재부팅 건너뜀',
                '기본값: false'
            ],
            tip: ['24시간 사람 있는 서버에서 끄면 재부팅이 거의 안 일어날 수 있음']
        },
        'palworld.t_itemCorruptionMultiplier': {
            what: ['아이템(음식 등) 부패 속도 배율'],
            effect: [
                '값 올림: 더 빨리 썩음',
                '값 내림: 더 천천히 썩음',
                '기본값: 1.0 (기본 속도)'
            ],
            tip: ['DISABLE_GENERATE_SETTINGS 켜짐 시 설정 파일에 반영 안 됨']
        },
        'palworld.t_disableGenerateSettings': {
            what: ['환경 변수로 PalWorldSettings.ini 자동 생성 기능 끄기 여부'],
            effect: [
                '켜면: ini 직접 편집 내용 유지, 게임 설정 환경 변수 무시됨',
                '끄면: 시작 시마다 환경 변수 값으로 ini 재생성',
                '기본값: false'
            ],
            tip: ['이 앱의 게임 설정을 반영하려면 꺼 둬야 함']
        },
        'palworld.t_disableGenerateEngine': {
            what: ['Engine.ini(엔진 성능 설정 파일) 자동 생성 끄기 여부'],
            effect: [
                '켜면: Engine.ini 자동 생성 안 함, 기존 파일 그대로 사용',
                '끄면: 이미지가 최적화 값 담은 Engine.ini 생성',
                '기본값: true'
            ],
            tip: ['Engine.ini 직접 관리 안 하면 기본값 유지로 충분함']
        },
        'palworld.t_enablePlayerLogging': {
            what: ['플레이어 접속/퇴장 로그 기록·게임 내 알림 여부'],
            effect: [
                '켜면: 입장·퇴장자를 로그와 공지로 확인 가능',
                '끄면: 기록 안 함',
                '기본값: true'
            ],
            tip: [
                'REST API(REST_API_ENABLED) 켜져 있어야 동작함',
                '자동 일시정지도 이 기능에 의존함'
            ]
        },
        'palworld.t_playerLoggingPollPeriod': {
            what: ['플레이어 접속/퇴장 확인 주기(초)'],
            effect: [
                '값 내림: 접속 알림 빨라짐, 조회 요청 늘어남',
                '값 올림: 부하 줄어듦, 알림 늦어짐',
                '기본값: 5초',
                '0은 사용 불가'
            ]
        },
        'palworld.t_logFilterEnabled': {
            what: ['같은 내용 반복 로그 줄 걸러내기 여부'],
            effect: [
                '켜면: 중복 로그 줄어 읽기 쉬워짐',
                '끄면: 서버 출력 로그 전부 그대로 표시',
                '기본값: true'
            ],
            tip: ['문제 조사 시 잠시 꺼서 전체 로그 확인 권장']
        },
        'palworld.t_autoPauseEnabled': {
            what: ['접속자 없을 때 서버 프로세스 일시정지로 CPU 사용 절감 기능'],
            effect: [
                '켜면: 마지막 플레이어 퇴장 후 일정 시간 지나면 서버 멈춤',
                '켜면: 누군가 접속 시도 시 다시 깨어남',
                '끄면: 항상 실행 상태 유지',
                '기본값: false'
            ],
            tip: [
                'ENABLE_PLAYER_LOGGING·REST_API_ENABLED 모두 켜져 있어야 함',
                '일시정지 중 서버 목록 미표시·첫 접속 지연 가능'
            ]
        },
        'palworld.t_autoPauseTimeoutEst': {
            what: ['마지막 플레이어 퇴장 후 일시정지 진입까지 대기 시간(초)'],
            effect: [
                '값 올림: 잠깐 나갔다 들어와도 서버 깨어 있음',
                '값 내림: 더 빨리 멈춰 자원 절약',
                '기본값: 180초'
            ]
        },
        'palworld.t_autoPauseLog': {
            what: ['자동 일시정지/재개 동작 로그 기록 여부'],
            effect: [
                '켜면: 멈춤·깨어남 시점을 로그로 확인 가능',
                '끄면: 해당 로그 출력 안 됨',
                '기본값: true'
            ]
        },
        'palworld.t_autoPauseDebug': {
            what: ['자동 일시정지 상세 디버그 로그 출력 여부'],
            effect: [
                '켜면: 동작 원인 추적용 자세한 로그 출력',
                '켜면: 로그 양 늘어남',
                '기본값: false'
            ],
            tip: ['자동 일시정지가 기대대로 동작하지 않을 때만 켤 것']
        },
        'palworld.t_useDepotDownloader': {
            what: ['서버 파일 다운로드 시 SteamCMD 대신 DepotDownloader 사용 여부'],
            effect: [
                '켜면: DepotDownloader로 설치/업데이트',
                '끄면: 표준 SteamCMD 사용',
                '기본값: false'
            ],
            tip: [
                'SteamCMD 미동작 환경(예: ARM64)용 대안',
                '일반 x86 서버는 기본값 권장'
            ]
        },
        'palworld.t_installBetaInsider': {
            what: ['정식 버전 대신 최신 베타(Insider) 빌드 설치 여부'],
            effect: [
                '켜면: 베타 설치, 새 기능 먼저 사용 가능',
                '켜면: 불안정할 수 있음',
                '끄면: 정식 버전 사용',
                '기본값: false'
            ],
            tip: [
                '클라이언트도 같은 베타 브랜치여야 접속 가능',
                '세이브 호환성 문제 대비해 백업 후 사용 권장'
            ]
        },
        'palworld.t_serverReplicatePawnCullDistanceInBaseCamp': {
            what: ['거점(베이스 캠프) 안에서 플레이어 주변 팰 정보 동기화 거리'],
            effect: [
                '값 올림: 더 먼 팰까지 보이고 움직임, 서버/네트워크 부하 증가',
                '값 내림: 부하 감소, 가까이 가야 팰 보임'
            ],
            tip: [
                '확인한 문서에서 이 변수 이름 찾지 못함',
                '공식 문서의 유사 설정: ServerReplicatePawnCullDistance',
                '유사 설정 단위·범위: 센티미터, 5000~15000',
                '유사 설정 기본값: 15000',
                '사용 중인 이미지 버전의 지원 여부 확인 필요함'
            ]
        },
        'palworld.t_box64DynarecStrongmem': {
            what: ['ARM64에서 x86 실행용 Box64 에뮬레이터의 강한 메모리 순서 모델 흉내 수준'],
            effect: [
                '값: 0, 1, 2, 3',
                '기본값: 1',
                '값 올림: 멀티스레드 동작 정확해져 크래시 감소 가능, 느려짐',
                '값 내림: 빨라짐, 불안정해질 수 있음'
            ],
            tip: [
                'ARM64(예: 라즈베리 파이, Ampere) 호스트에서만 의미 있음',
                'x86 서버에서는 무시됨'
            ]
        },
        'palworld.t_box64DynarecBigblock': {
            what: ['Box64의 x86 코드 변환 시 묶는 블록 크기'],
            effect: [
                '값: 0, 1, 2, 3',
                '기본값: 1',
                '값 올림: 성능 향상 가능, 호환성 문제 가능',
                '0: 가장 안전, 느림'
            ],
            tip: [
                'ARM64 호스트 전용',
                '크래시 시 값 낮춤 권장'
            ]
        },
        'palworld.t_box64DynarecSafeflags': {
            what: ['Box64의 CALL/RET 명령 CPU 플래그 처리 꼼꼼함 정도'],
            effect: [
                '값: 0, 1, 2',
                '기본값: 1',
                '값 올림: 안전성 높아짐, 느려짐',
                '0: 빠름, 오동작 가능성 있음'
            ],
            tip: ['ARM64 호스트 전용']
        },
        'palworld.t_box64DynarecFastround': {
            what: ['Box64의 x86 정밀 반올림 동작 흉내 여부'],
            effect: [
                '1: 빠른 반올림 (성능 우선)',
                '0: 정확한 x86 반올림 (정확성 우선, 느림)',
                '기본값: 1'
            ],
            tip: ['ARM64 호스트 전용']
        },
        'palworld.t_box64DynarecFastnan': {
            what: ['Box64의 부동소수점 -NaN 생성을 x86과 동일하게 처리할지 여부'],
            effect: [
                '1: 빠른 처리 (성능 우선)',
                '0: x86과 동일 처리 (정확성 우선, 느림)',
                '기본값: 1'
            ],
            tip: ['ARM64 호스트 전용']
        },
        'palworld.t_box64DynarecX87double': {
            what: ['Box64의 x87 부동소수점 연산 Double 정밀도 강제 여부'],
            effect: [
                '값: 0, 1',
                '기본값: 0',
                '1: 정밀도 관련 문제 감소 가능, 느려짐'
            ],
            tip: ['ARM64 호스트 전용']
        },

        // ---------------- jammsen/palworld-dedicated-server ----------------
        'palworld.j_alwaysUpdateOnStart': {
            what: ['컨테이너 시작 시마다 SteamCMD로 서버 업데이트 여부'],
            effect: [
                '켜면: 시작 시 최신 버전으로 갱신, 클라이언트와 버전 맞춰짐',
                '끄면: 설치된 버전으로 바로 시작',
                '기본값: true'
            ],
            tip: ['자동 재부팅(RESTART_ENABLED)과 함께 켜면 재시작마다 업데이트 적용됨']
        },
        'palworld.j_steamcmdValidateFiles': {
            what: ['업데이트 시 SteamCMD 서버 파일 무결성 검사(validate) 여부'],
            effect: [
                '켜면: 손상 파일 복구됨, 시작 시간 길어짐',
                '켜면: 직접 수정한 파일(모드 등)이 원본으로 덮어써짐',
                '끄면: 검사 건너뜀',
                '기본값: true'
            ],
            tip: ['서버 파일을 직접 수정해 쓰는 경우 끌 것']
        },
        'palworld.j_multithreadEnabled': {
            what: ['멀티코어 CPU 성능 향상 서버 실행 옵션 적용 여부'],
            effect: [
                '켜면: 여러 CPU 코어 활용, 성능 향상 가능',
                '끄면: 해당 옵션 없이 실행',
                '기본값: true'
            ],
            tip: ['thijsvanloef MULTITHREADING과 달리 이 이미지에선 현재 사용 중']
        },
        'palworld.j_backupEnabled': {
            what: ['정해진 일정에 세이브 데이터 자동 백업 여부'],
            effect: [
                '켜면: BACKUP_CRON_EXPRESSION 일정마다 game 디렉터리에 백업 생성',
                '끄면: 자동 백업 안 함',
                '기본값: true'
            ]
        },
        'palworld.j_backupRetentionPolicy': {
            what: ['보관 개수 넘는 오래된 백업 자동 삭제 여부'],
            effect: [
                '켜면: BACKUP_RETENTION_AMOUNT_TO_KEEP 개수만 남김', '켜면: 오래된 것부터 삭제',
                '끄면: 백업이 계속 쌓임',
                '기본값: true'
            ],
            tip: [
                'thijsvanloef: "일수" 기준 보관',
                'jammsen: "개수" 기준 보관'
            ]
        },
        'palworld.j_backupRetentionAmountToKeep': {
            what: ['보관 정책 켜짐 시 남겨 둘 백업 파일 개수'],
            effect: [
                '값 올림: 더 많은 시점으로 복구 가능, 디스크 더 사용',
                '값 내림: 공간 절약',
                '기본값: 72개 (매시 백업 기준 약 3일치)'
            ]
        },
        'palworld.j_backupCronExpression': {
            what: ['자동 백업 실행 일정(Cron 표현식)'],
            effect: [...CRON, '기본값: "0 * * * *" (매시 정각)'],
            tip: [...TZ_NOTE, 'jammsen 이미지 기본 TZ: Europe/Berlin']
        },
        'palworld.j_restartEnabled': {
            what: ['정해진 일정에 서버 자동 재시작 여부'],
            effect: [
                '켜면: RESTART_CRON_EXPRESSION 일정마다 재시작',
                '플레이어 있음: 15분 지연 후 재시작',
                '플레이어 없음: 즉시 재시작',
                '끄면: 자동 재시작 없음',
                '기본값: false'
            ],
            tip: ['플레이어 확인·공지가 REST API 경유이므로 RESTAPI_ENABLED 켜 둘 것']
        },
        'palworld.j_restartCronExpression': {
            what: ['자동 재시작 실행 일정(Cron 표현식)'],
            effect: [...CRON, '기본값: "0 3,15 * * *" (매일 03:00, 15:00)'],
            tip: [...TZ_NOTE, 'jammsen 이미지 기본 TZ: Europe/Berlin']
        },
        'palworld.j_netServerMaxTickRate': {
            what: ['서버의 초당 게임 상태 갱신 횟수(틱레이트)'],
            effect: [
                '값 올림: 움직임·반응 부드러워짐, CPU 사용량 증가',
                '값 내림: 부하 감소, 끊김 느껴질 수 있음',
                '허용 범위: 30~120',
                '기본값: 120'
            ],
            tip: [
                '공식 문서도 신중한 변경 안내함',
                '서버가 버거울 때만 60 정도로 낮춤 권장'
            ]
        },
        'palworld.j_logFormatType': {
            what: ['컨테이너 로그 출력 형식'],
            effect: [
                'Text: 사람이 읽기 쉬운 형식 (기본값)',
                'Json: 로그 수집 도구용 JSON 형식'
            ],
            tip: [
                'thijsvanloef와 허용 값 다름 (대소문자 포함)',
                '잘못된 값 입력 주의'
            ]
        },
        'palworld.j_backupAnnounceMessagesEnabled': {
            what: ['백업 진행 시 게임 내 공지 메시지 표시 여부'],
            effect: [
                '켜면: 백업 시작/완료를 플레이어에게 공지',
                '끄면: 공지 안 함',
                '백업 오류는 설정과 무관하게 항상 공지됨',
                '기본값: true'
            ]
        },
        'palworld.j_restartDebugOverride': {
            what: ['자동 재시작 기능 시험용 디버그 설정'],
            effect: [
                '켜면: 플레이어 있을 때 재시작 대기 15분 → 15초로 단축',
                '기본값: false'
            ],
            tip: ['테스트 용도 전용, 실제 운영에서는 끌 것']
        },
        'palworld.j_playerDetectionEnabled': {
            what: ['플레이어 접속/퇴장 감지 후 콘솔 로그·웹훅 알림 여부'],
            effect: [
                '켜면: 입장·퇴장 알림 전송',
                '끄면: 감지 안 함',
                '기본값: true'
            ],
            tip: ['RESTAPI_ENABLED 켜져 있어야 동작함']
        },
        'palworld.j_playerDetectionDebug': {
            what: ['플레이어 감지 디버그 메시지 콘솔 출력 여부'],
            effect: [
                '켜면: 감지 과정 자세히 확인 가능, 로그 늘어남',
                '기본값: false'
            ]
        },
        'palworld.j_playerDetectionStartupDelay': {
            what: ['서버 시작 후 첫 플레이어 감지까지 대기 시간(초)'],
            effect: [
                '값 올림: 업데이트/부팅 끝난 뒤 안정적으로 감지 시작',
                '값 내림: 더 빨리 시작, 서버 미준비로 오류 가능',
                '기본값: 60초'
            ]
        },
        'palworld.j_playerDetectionCheckInterval': {
            what: ['플레이어 접속 여부 확인 주기(초)'],
            effect: [
                '값 내림: 알림 빨라짐, 요청 늘어남',
                '값 올림: 부하 줄어듦, 알림 늦어짐',
                '기본값: 15초'
            ]
        },
        'palworld.j_serverSettingsMode': {
            what: ['서버 설정 출처 선택: 환경 변수 또는 PalWorldSettings.ini'],
            effect: [
                'auto: 환경 변수만 적용, 파일 직접 수정 내용 덮어써짐 (기본값)',
                'rcononly: RCON_ENABLED·RCON_PORT·ADMIN_PASSWORD만 환경 변수로 적용',
                'rcononly: 나머지는 파일 직접 편집',
                'manual: 파일만 사용, 환경 변수 무시'
            ],
            tip: [
                '이 앱의 설정을 반영하려면 auto 사용',
                '문서상 RCON deprecated이므로 rcononly보다 auto 권장'
            ]
        },
        'palworld.j_customScriptEnabled': {
            what: ['게임 서버 시작 전 사용자 셸 스크립트 실행 여부'],
            effect: [
                '켜면: CUSTOM_SCRIPT_PATH 스크립트를 서버 시작 직전 실행',
                '용도 예: 모드 설치, 파일 복사',
                '끄면: 실행 안 함',
                '기본값: false'
            ],
            tip: ['컨테이너 권한으로 실행되므로 신뢰할 수 있는 내용만 넣을 것']
        },
        'palworld.j_customScriptPath': {
            what: ['실행할 사용자 지정 스크립트의 컨테이너 내부 절대 경로'],
            effect: [
                '기본값: /palworld/custom-script.sh',
                '실행 시점에 파일이 실제로 있어야 함',
                '볼륨 마운트 필요함'
            ],
            tip: ['호스트 경로 아닌 컨테이너 안에서 보이는 경로 입력']
        },
        'palworld.j_webhookEnabled': {
            what: ['서버 시작/정지/재시작/업데이트 등 이벤트의 외부(Discord 등) 알림 여부'],
            effect: [
                '켜면: WEBHOOK_URL로 알림 메시지 전송',
                '끄면: 웹훅 전송 안 함',
                '기본값: false'
            ],
            tip: ['WEBHOOK_URL 함께 입력 필수']
        },
        'palworld.j_webhookDebugEnabled': {
            what: ['웹훅 전송 시 curl 실행 결과 로그 출력 여부'],
            effect: [
                '켜면: 전송 실패 원인 확인 가능',
                '기본값: false'
            ],
            tip: ['웹훅이 오지 않을 때 원인 찾는 용도로만 켤 것']
        },
        'palworld.j_webhookUrl': {
            what: ['웹훅 알림 대상 주소 (예: Discord 채널 웹훅 URL)'],
            effect: [
                '이 주소로 이벤트 메시지 전송됨',
                '비우면: 웹훅 동작 안 함'
            ],
            tip: [
                'URL을 아는 사람은 누구나 그 채널에 글 게시 가능',
                '외부 공유 금지'
            ]
        },
        'palworld.j_webhookContentTitle': {
            what: ['웹훅 메시지 맨 위 공통 제목(content)'],
            effect: [
                '기본값: "Status update"',
                '비우면: 메시지에서 제목 부분 빠짐'
            ]
        },
        'palworld.j_webhookInfoTitle': {
            what: ['정보(Info) 이벤트 웹훅 제목'],
            effect: ['기본값: "Info"']
        },
        'palworld.j_webhookInfoDescription': {
            what: ['정보(Info) 이벤트 웹훅 본문'],
            effect: ['기본값: "This is an info from the server"']
        },
        'palworld.j_webhookInfoColor': {
            what: ['정보(Info) 이벤트 웹훅 카드 색상'],
            effect: ['기본값: 2849520 (파란색 계열)'],
            tip: [...DISCORD_COLOR]
        },
        'palworld.j_webhookInstallTitle': {
            what: ['서버 설치 이벤트 웹훅 제목'],
            effect: ['기본값: "Installing server"']
        },
        'palworld.j_webhookInstallDescription': {
            what: ['서버 설치 이벤트 웹훅 본문'],
            effect: ['기본값: "Server is being installed"']
        },
        'palworld.j_webhookInstallColor': {
            what: ['서버 설치 이벤트 웹훅 카드 색상'],
            effect: ['기본값: 2849520'],
            tip: [...DISCORD_COLOR]
        },
        'palworld.j_webhookRestartTitle': {
            what: ['자동 재시작 이벤트 웹훅 제목'],
            effect: ['기본값: "Automatic restart"']
        },
        'palworld.j_webhookRestartDelayedDescription': {
            what: ['플레이어 접속 중이라 재시작을 미룰 때(지연 재시작) 웹훅 본문'],
            effect: [
                '플레이어 있을 때 재시작 예고 메시지로 사용됨',
                '비우면: 이미지 기본 문구 사용'
            ]
        },
        'palworld.j_webhookRestartNowDescription': {
            what: ['접속자 없어 즉시 재시작할 때 웹훅 본문'],
            effect: [
                '서버가 비어 있을 때 재시작 메시지로 사용됨',
                '비우면: 이미지 기본 문구 사용'
            ]
        },
        'palworld.j_webhookRestartColor': {
            what: ['자동 재시작 이벤트 웹훅 카드 색상'],
            effect: ['기본값: 15593515 (주황색 계열)'],
            tip: [...DISCORD_COLOR]
        },
        'palworld.j_webhookStartTitle': {
            what: ['서버 시작 이벤트 웹훅 제목'],
            effect: ['기본값: "Server is starting"']
        },
        'palworld.j_webhookStartDescription': {
            what: ['서버 시작 이벤트 웹훅 본문'],
            effect: ['기본값: "The gameserver is starting"']
        },
        'palworld.j_webhookStartColor': {
            what: ['서버 시작 이벤트 웹훅 카드 색상'],
            effect: ['기본값: 2328576 (초록색 계열)'],
            tip: [...DISCORD_COLOR]
        },
        'palworld.j_webhookStopTitle': {
            what: ['서버 정지 이벤트 웹훅 제목'],
            effect: ['기본값: "Server has been stopped"']
        },
        'palworld.j_webhookStopDescription': {
            what: ['서버 정지 이벤트 웹훅 본문'],
            effect: ['기본값: "The gameserver has been stopped"']
        },
        'palworld.j_webhookStopColor': {
            what: ['서버 정지 이벤트 웹훅 카드 색상'],
            effect: ['기본값: 7413016'],
            tip: [...DISCORD_COLOR]
        },
        'palworld.j_webhookUpdateTitle': {
            what: ['서버 업데이트 이벤트 웹훅 제목'],
            effect: ['기본값: "Updating server"']
        },
        'palworld.j_webhookUpdateDescription': {
            what: ['서버 업데이트 이벤트 웹훅 본문'],
            effect: ['기본값: "Server is being updated"']
        },
        'palworld.j_webhookUpdateColor': {
            what: ['서버 업데이트 이벤트 웹훅 카드 색상'],
            effect: ['기본값: 2849520'],
            tip: [...DISCORD_COLOR]
        },

        // ---------------- Palworld 접속 설정 ----------------
        'palworld.connection.serverName': {
            what: ['서버 목록(커뮤니티 서버 브라우저)·게임 내 표시 서버 이름'],
            effect: [
                '변경 시: 다음 시작부터 새 이름으로 표시',
                '접속 방식·세이브에는 영향 없음'
            ],
            tip: ['jammsen: 비우면 임의 이름 붙음', '예: "jammsen-docker-generated-숫자"']
        },
        'palworld.connection.serverPassword': {
            what: ['플레이어 서버 입장 시 입력하는 비밀번호'],
            effect: [
                '입력 시: 비밀번호 아는 사람만 접속 가능',
                '비우면: 누구나 접속 가능'
            ],
            tip: [
                '커뮤니티 서버로 공개 시 비밀번호 설정 권장',
                'jammsen 기본값 "serverPasswordHere"는 자리표시자, 반드시 변경'
            ]
        },
        'palworld.connection.adminPassword': {
            what: [
                '게임 내 /AdminPassword 명령으로 관리자 권한 획득용 비밀번호',
                'RCON/REST API 인증에도 사용'
            ],
            effect: ['아는 사람은 추방/차단, 서버 종료 등 관리자 작업 가능'],
            tip: [
                'REST API 인증: 사용자명 admin + 이 비밀번호',
                '길고 추측하기 어려운 값 권장',
                '서버 접속 비밀번호와 동일하게 설정 금지',
                'jammsen 기본값 "adminPasswordHere"는 반드시 변경'
            ]
        },
        'palworld.connection.publicConnection': {
            what: ['외부 접속용 공인 IP/포트 직접 지정 스위치'],
            effect: [
                '사용: 공인 IP(thijsvanloef는 공인 포트도) 값을 서버에 전달',
                '미사용: 값 미지정, 서버가 자동 감지'
            ],
            tip: [
                '포트포워딩·NAT 뒤에서 커뮤니티 목록 주소가 잘못 표시될 때 사용',
                '포트포워딩 자체는 공유기/방화벽에서 별도 설정 필요함'
            ]
        },
        'palworld.connection.publicIp': {
            what: ['커뮤니티 서버 목록에 알릴 외부(공인) IP 주소'],
            effect: [
                '지정 시: 목록에 이 주소 표시, 외부 플레이어가 이 주소로 접속',
                '비우면: 자동 감지'
            ],
            tip: [
                'jammsen: 도메인 이름(FQDN)도 입력 가능',
                '공인 IP가 바뀌는 가정용 회선은 값이 오래되지 않게 주의'
            ]
        },
        'palworld.connection.publicPort': {
            what: ['커뮤니티 서버 목록에 알릴 외부 포트 (thijsvanloef 전용 입력란)'],
            effect: [
                '서버 실제 수신 포트는 그대로, 목록 표시 포트만 변경',
                '공유기에서 다른 외부 포트로 포워딩 시 그 외부 포트 입력',
                '비우면: 자동 감지'
            ],
            tip: ['jammsen: 게임 포트 입력란이 PUBLIC_PORT(기본 8211)로 사용됨']
        },
        'palworld.connection.community': {
            what: ['공식 커뮤니티 서버 목록에 이 서버 표시 여부'],
            effect: [
                '노출: 게임 내 커뮤니티 서버 검색에 나타나 누구나 찾을 수 있음',
                '비노출: IP:포트 직접 입력해 접속해야 함'
            ],
            tip: [
                '기본값: thijsvanloef false, jammsen true',
                '공개 노출 시 서버 비밀번호 설정 권장',
                '목록 표시 조건: 게임 포트 UDP 외부 개방',
                'thijsvanloef는 쿼리 포트 UDP도 외부 개방 필요함'
            ]
        },
        'palworld.connection.gamePort': {
            what: ['게임 클라이언트가 접속하는 주 UDP 포트', '변수명: thijsvanloef PORT, jammsen PUBLIC_PORT'],
            effect: [
                '기본값: 8211',
                '변경 시: docker 포트 매핑·공유기 포트포워딩도 같은 번호(UDP)로 맞춰야 함',
                '변경 시: 플레이어는 IP:새포트로 접속'
            ],
            tip: [
                '한 호스트에서 서버 여러 개 돌릴 때만 변경 권장',
                '사용 범위: 1024~65535'
            ]
        },
        'palworld.connection.queryPort': {
            what: ['Steam 서버와 통신하며 서버 정보를 조회하는 UDP 포트 (thijsvanloef 전용)'],
            effect: [
                '기본값: 27015',
                '변경 시: docker 포트 매핑·방화벽도 같은 번호(UDP)로 맞춰야 함'
            ],
            tip: ['커뮤니티 목록 노출 관련, 공개 서버라면 외부 개방 권장']
        },
        'palworld.connection.restApi': {
            what: ['공식 REST API 사용 여부', 'HTTP로 서버 정보 조회·공지·추방/차단·저장·종료 등 가능'],
            effect: [
                '켜면: REST API 포트에서 요청 수신',
                '인증: 사용자명 admin + 관리자 비밀번호',
                '끄면: API 비활성화',
                '기본값: true (두 이미지 모두)'
            ],
            tip: [
                '두 이미지 모두 플레이어 접속 감지·재시작 전 공지 등에 사용',
                'thijsvanloef 자동 일시정지도 REST API 사용',
                '켜 두는 것 권장',
                '단, 포트 외부 공개 금지'
            ]
        },
        'palworld.connection.restApiPort': {
            what: ['REST API 사용 TCP 포트'],
            effect: [
                '기본값: 8212',
                '변경 시: API 호출 도구의 주소도 함께 변경 필요함'
            ],
            tip: [
                'HTTPS 아닌 평문 HTTP·단순 인증 사용',
                '공유기 포트포워딩 금지',
                '내부망 또는 같은 호스트에서만 접근 권장'
            ]
        },
        'palworld.connection.rcon': {
            what: ['원격 콘솔(RCON) 프로토콜로 서버 관리 명령 전송 허용 여부'],
            effect: [
                '켜면: RCON 클라이언트로 관리자 비밀번호 이용해 명령 실행 가능',
                '명령 예: 저장, 공지, 추방',
                '끄면: 사용 불가',
                '기본값: false (두 이미지 모두)'
            ],
            tip: [
                'thijsvanloef: docker stop 시 안전한 저장에 RCON 필요하다고 안내함',
                'jammsen: 문서상 RCON deprecated, 내부 도구에서 미사용',
                'jammsen: REST API 사용 권장'
            ]
        },
        'palworld.connection.rconPort': {
            what: ['RCON 사용 TCP 포트'],
            effect: [
                '기본값: 25575',
                '변경 시: RCON 클라이언트 접속 포트도 함께 변경 필요함'
            ],
            tip: [
                'RCON은 암호화되지 않음, 인터넷 공개 금지',
                '공개가 꼭 필요하면 방화벽으로 접속 IP 제한',
                '강력한 관리자 비밀번호 사용 권장'
            ]
        }
    };
    const help = root.OptionHelp = root.OptionHelp || {};
    Object.assign(help, entries);
    if (typeof module !== 'undefined' && module.exports) module.exports = entries;
})(typeof globalThis !== 'undefined' ? globalThis : this);
