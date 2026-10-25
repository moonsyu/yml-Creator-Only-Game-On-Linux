(function (root) {
    'use strict';
    // Sources:
    //   https://palworld-server-docker.loef.dev/getting-started/configuration/server-settings
    //   https://palworld-server-docker.loef.dev/getting-started/configuration/game-settings
    //   https://github.com/thijsvanloef/palworld-server-docker
    //   https://github.com/jammsen/docker-palworld-dedicated-server (README, docs/ENV_VARS.md)
    //   https://docs.palworldgame.com/settings-and-operation/configuration
    //   https://docs.palworldgame.com/category/rest-api
    const CRON = 'Cron 표현식은 공백으로 구분된 5칸(분 시 일 월 요일)입니다. 예: "0 4 * * *"는 매일 04:00, "*/30 * * * *"는 30분마다, "0 3,15 * * *"는 매일 03:00과 15:00입니다.';
    const TZ_NOTE = '시각은 컨테이너의 TZ(시간대) 기준입니다. TZ를 지정하지 않으면 한국 시간과 다를 수 있습니다.';
    const DISCORD_COLOR = '색상은 16진수(#FF0000)가 아닌 10진수 숫자로 입력해야 합니다. 예: 빨강 FF0000 = 16711680. 16진수를 넣으면 Discord 전송이 실패할 수 있습니다.';

    const entries = {
        // ---------------- thijsvanloef/palworld-server-docker ----------------
        'palworld.t_updateOnBoot': {
            what: '컨테이너가 시작될 때마다 SteamCMD로 Palworld 서버를 설치하거나 최신 버전으로 업데이트할지 정합니다.',
            effect: '켜면(기본값 true) 시작할 때 업데이트를 확인하므로 부팅이 조금 느려지지만 클라이언트와 버전이 어긋날 일이 줄어듭니다. 끄면 설치된 버전을 그대로 쓰며 빠르게 시작합니다.',
            tip: '처음 설치할 때는 반드시 켜 두어야 서버 파일이 내려받아집니다. 게임 업데이트 후 접속이 안 되면 이 값을 켠 채로 재시작해 보세요.'
        },
        'palworld.t_multithreading': {
            what: '서버의 멀티스레드 성능 옵션을 켜는 예전 방식의 설정입니다.',
            effect: '켜면 여러 CPU 코어를 활용하도록 실행 인수가 추가됩니다. 기본값은 false입니다.',
            tip: '공식 문서에서 지원 중단(deprecated)으로 표시되어 있으며 ENABLE_PERF_THREADING_ARGS / WORKER_THREADS_SERVER 사용을 권장합니다. 최신 이미지에서는 효과가 없을 수 있습니다.'
        },
        'palworld.t_backupEnabled': {
            what: '정해진 일정에 따라 세이브 데이터를 자동으로 백업할지 정합니다.',
            effect: '켜면(기본값 true) BACKUP_CRON_EXPRESSION 일정(기본 "0 0 * * *", 매일 자정)마다 백업 파일이 만들어집니다. 끄면 자동 백업이 생성되지 않습니다.',
            tip: '백업이 계속 쌓이므로 "오래된 백업 삭제"와 함께 쓰는 것을 권장합니다.'
        },
        'palworld.t_deleteOldBackups': {
            what: '일정 기간이 지난 오래된 백업 파일을 자동으로 지울지 정합니다.',
            effect: '켜면 OLD_BACKUP_DAYS보다 오래된 백업이 삭제되어 디스크 공간을 아낍니다. 끄면(기본값 false) 백업이 계속 쌓입니다.',
            tip: '자동 백업이 켜져 있을 때만 의미가 있습니다.'
        },
        'palworld.t_oldBackupDays': {
            what: '"오래된 백업 삭제"가 켜져 있을 때 백업을 며칠 동안 보관할지 정합니다.',
            effect: '값을 올리면 더 오래 전 시점으로 되돌릴 수 있지만 디스크를 더 씁니다. 내리면 공간은 절약되지만 복구 가능한 기간이 짧아집니다. 기본값은 30일입니다.'
        },
        'palworld.t_autoRebootEnabled': {
            what: '정해진 일정에 서버를 자동으로 재시작할지 정합니다.',
            effect: '켜면 AUTO_REBOOT_CRON_EXPRESSION 일정마다 서버가 재시작되어 장시간 구동에 따른 메모리 증가나 렉을 줄일 수 있습니다. 끄면(기본값 false) 수동으로만 재시작됩니다.',
            tip: '재시작 전 경고 방송과 안전한 저장에는 RCON 또는 REST API가 필요합니다. 컨테이너 재시작 정책(restart: unless-stopped 등)도 설정해 두어야 종료 후 다시 올라옵니다.'
        },
        'palworld.t_autoRebootCronExpression': {
            what: '자동 재부팅이 실행될 일정을 Cron 표현식으로 지정합니다.',
            effect: CRON + ' 기본값은 "0 0 * * *"(매일 자정)입니다.',
            tip: TZ_NOTE + ' 접속자가 적은 새벽 시간대를 권장합니다.'
        },
        'palworld.t_autoRebootWarnMinutes': {
            what: '자동 재부팅 전에 플레이어에게 경고를 보낸 뒤 실제로 재시작하기까지 기다리는 시간(분)입니다.',
            effect: '값을 올리면 플레이어가 정리하고 나갈 여유가 생기고, 내리면 재시작이 빨리 진행됩니다. 기본값은 5분입니다.'
        },
        'palworld.t_logFormatType': {
            what: '컨테이너 로그를 어떤 형식으로 출력할지 정합니다.',
            effect: '사용 가능 값: default(기본), colored(색상 포함), plain(장식 없는 텍스트), logfmt(키=값 형식), json(JSON 한 줄 형식). 사람이 읽을 때는 default/colored, Loki 같은 로그 수집 도구에 넣을 때는 json/logfmt가 편합니다.'
        },
        'palworld.t_autoUpdateEnabled': {
            what: '정해진 일정마다 새 서버 버전이 있는지 확인하고 자동으로 업데이트할지 정합니다.',
            effect: '켜면 AUTO_UPDATE_CRON_EXPRESSION 일정마다 업데이트를 확인하고, 새 버전이 있으면 경고 후 서버를 재시작해 업데이트합니다. 끄면(기본값 false) 수동으로 업데이트해야 합니다.',
            tip: '"시작 시 업데이트"(UPDATE_ON_BOOT)가 켜져 있어야 재시작 시 실제로 업데이트가 설치됩니다. 경고 방송에는 RCON 또는 REST API가 필요합니다.'
        },
        'palworld.t_autoUpdateCronExpression': {
            what: '자동 업데이트 확인을 실행할 일정을 Cron 표현식으로 지정합니다.',
            effect: CRON + ' 기본값은 "0 * * * *"(매시 정각)입니다.',
            tip: TZ_NOTE
        },
        'palworld.t_autoUpdateWarnMinutes': {
            what: '업데이트가 발견됐을 때 플레이어에게 경고한 뒤 업데이트를 시작하기까지 기다리는 시간(분)입니다.',
            effect: '값을 올리면 플레이어에게 여유가 생기고, 내리면 업데이트가 빨리 적용됩니다. 접속자가 없으면 이 대기 시간은 무시되고 바로 진행됩니다. 기본값은 30분입니다.'
        },
        'palworld.t_autoRebootEvenIfPlayersOnline': {
            what: '접속 중인 플레이어가 있어도 예정된 자동 재부팅을 진행할지 정합니다.',
            effect: '켜면 플레이어가 있어도 경고 후 재부팅합니다. 끄면(기본값 false) 플레이어가 있을 때는 그 회차 재부팅을 건너뜁니다.',
            tip: '24시간 사람이 있는 서버에서 끄면 재부팅이 거의 일어나지 않을 수 있습니다.'
        },
        'palworld.t_itemCorruptionMultiplier': {
            what: '아이템(음식 등)이 부패하는 속도의 배율입니다.',
            effect: '값을 올리면 더 빨리 썩고, 내리면 더 천천히 썩습니다. 1.0이 기본 속도입니다.',
            tip: 'DISABLE_GENERATE_SETTINGS가 켜져 있으면 이 환경 변수는 설정 파일에 반영되지 않습니다.'
        },
        'palworld.t_disableGenerateSettings': {
            what: '환경 변수로 PalWorldSettings.ini를 자동 생성하는 기능을 끌지 정합니다.',
            effect: '켜면 ini 파일을 직접 편집한 내용이 유지되고 게임 설정 환경 변수는 무시됩니다. 끄면(기본값 false) 시작할 때마다 환경 변수 값으로 ini가 다시 만들어집니다.',
            tip: '이 앱에서 지정한 게임 설정을 반영하려면 꺼 두어야 합니다.'
        },
        'palworld.t_disableGenerateEngine': {
            what: 'Engine.ini(엔진 성능 관련 설정 파일) 자동 생성을 끌지 정합니다.',
            effect: '켜면(기본값 true) Engine.ini를 자동으로 만들지 않고 기존 파일을 그대로 씁니다. 끄면 이미지가 최적화 값을 담은 Engine.ini를 생성합니다.',
            tip: 'Engine.ini를 직접 관리하지 않는다면 기본값을 유지해도 됩니다.'
        },
        'palworld.t_enablePlayerLogging': {
            what: '플레이어 접속/퇴장을 로그에 남기고 게임 내에 알릴지 정합니다.',
            effect: '켜면(기본값 true) 누가 들어오고 나갔는지 로그와 공지로 확인할 수 있습니다. 끄면 기록하지 않습니다.',
            tip: 'REST API(REST_API_ENABLED)가 켜져 있어야 동작합니다. 자동 일시정지도 이 기능에 의존합니다.'
        },
        'palworld.t_playerLoggingPollPeriod': {
            what: '플레이어 접속/퇴장을 몇 초마다 확인할지 정합니다.',
            effect: '값을 내리면 접속 알림이 더 빨리 뜨지만 조회 요청이 늘어나고, 올리면 부하는 줄지만 알림이 늦어집니다. 기본값은 5초이며 0은 쓸 수 없습니다.'
        },
        'palworld.t_logFilterEnabled': {
            what: '같은 내용이 반복되는 로그 줄을 걸러낼지 정합니다.',
            effect: '켜면(기본값 true) 중복 로그가 줄어 읽기 쉬워집니다. 끄면 서버가 출력하는 로그를 모두 그대로 보여줍니다.',
            tip: '문제를 조사할 때는 잠시 꺼서 전체 로그를 확인해 보세요.'
        },
        'palworld.t_autoPauseEnabled': {
            what: '접속자가 아무도 없을 때 서버 프로세스를 일시정지해 CPU 사용을 줄이는 기능입니다.',
            effect: '켜면 마지막 플레이어가 나간 뒤 일정 시간이 지나면 서버가 멈추고, 누군가 접속을 시도하면 다시 깨어납니다. 끄면(기본값 false) 항상 실행 상태를 유지합니다.',
            tip: 'ENABLE_PLAYER_LOGGING과 REST_API_ENABLED가 모두 켜져 있어야 합니다. 일시정지 중에는 서버 목록에 보이지 않거나 첫 접속이 지연될 수 있습니다.'
        },
        'palworld.t_autoPauseTimeoutEst': {
            what: '마지막 플레이어가 나간 뒤 일시정지에 들어가기까지 기다리는 시간(초)입니다.',
            effect: '값을 올리면 잠깐 나갔다 들어오는 경우에도 서버가 깨어 있고, 내리면 더 빨리 멈춰 자원을 아낍니다. 기본값은 180초입니다.'
        },
        'palworld.t_autoPauseLog': {
            what: '자동 일시정지/재개 동작을 로그에 남길지 정합니다.',
            effect: '켜면(기본값 true) 언제 멈추고 깨어났는지 로그로 확인할 수 있습니다. 끄면 해당 로그가 출력되지 않습니다.'
        },
        'palworld.t_autoPauseDebug': {
            what: '자동 일시정지 기능의 상세 디버그 로그를 출력할지 정합니다.',
            effect: '켜면 동작 원인을 추적할 수 있는 자세한 로그가 나오지만 로그 양이 늘어납니다. 기본값은 false입니다.',
            tip: '자동 일시정지가 기대대로 동작하지 않을 때만 켜세요.'
        },
        'palworld.t_useDepotDownloader': {
            what: '서버 파일을 내려받을 때 SteamCMD 대신 DepotDownloader를 사용할지 정합니다.',
            effect: '켜면 DepotDownloader로 설치/업데이트합니다. 끄면(기본값 false) 표준 SteamCMD를 사용합니다.',
            tip: 'SteamCMD가 동작하지 않는 환경(예: ARM64)에서 대안으로 쓰입니다. 일반 x86 서버는 기본값을 권장합니다.'
        },
        'palworld.t_installBetaInsider': {
            what: '정식 버전 대신 최신 베타(Insider) 빌드를 설치할지 정합니다.',
            effect: '켜면 베타 버전이 설치되어 새 기능을 먼저 쓸 수 있지만 불안정할 수 있습니다. 끄면(기본값 false) 정식 버전을 씁니다.',
            tip: '클라이언트도 같은 베타 브랜치여야 접속할 수 있습니다. 세이브 호환성 문제에 대비해 백업 후 사용하세요.'
        },
        'palworld.t_serverReplicatePawnCullDistanceInBaseCamp': {
            what: '거점(베이스 캠프) 안에서 서버가 플레이어 주변의 팰 정보를 동기화하는 거리입니다.',
            effect: '값을 올리면 더 먼 곳의 팰까지 보이고 움직이지만 서버/네트워크 부하가 늘어납니다. 내리면 부하는 줄지만 가까이 가야 팰이 보입니다.',
            tip: '이 변수 이름은 확인한 문서에서 찾지 못했습니다. 공식 문서의 비슷한 설정 ServerReplicatePawnCullDistance는 센티미터 단위, 범위 5000~15000, 기본값 15000입니다. 사용 중인 이미지 버전에서 지원하는지 확인하세요.'
        },
        'palworld.t_box64DynarecStrongmem': {
            what: 'ARM64 서버에서 x86 프로그램을 돌리는 Box64 에뮬레이터의 강한 메모리 순서 모델 흉내 수준입니다.',
            effect: '값: 0, 1, 2, 3 (기본값 1). 올리면 멀티스레드 동작이 더 정확해져 크래시가 줄 수 있지만 느려지고, 내리면 빨라지지만 불안정해질 수 있습니다.',
            tip: 'ARM64(예: 라즈베리 파이, Ampere) 호스트에서만 의미가 있습니다. x86 서버에서는 무시됩니다.'
        },
        'palworld.t_box64DynarecBigblock': {
            what: 'Box64가 x86 코드를 변환할 때 얼마나 큰 블록 단위로 묶을지 정합니다.',
            effect: '값: 0, 1, 2, 3 (기본값 1). 올리면 성능이 좋아질 수 있지만 호환성 문제가 생길 수 있고, 0은 가장 안전하지만 느립니다.',
            tip: 'ARM64 호스트 전용입니다. 크래시가 나면 값을 낮춰 보세요.'
        },
        'palworld.t_box64DynarecSafeflags': {
            what: 'Box64가 CALL/RET 명령에서 CPU 플래그를 얼마나 꼼꼼하게 처리할지 정합니다.',
            effect: '값: 0, 1, 2 (기본값 1). 올리면 안전성이 높아지지만 느려지고, 0은 빠르지만 오동작 가능성이 있습니다.',
            tip: 'ARM64 호스트 전용입니다.'
        },
        'palworld.t_box64DynarecFastround': {
            what: 'Box64가 x86의 정밀한 반올림 동작을 그대로 흉내 낼지 정합니다.',
            effect: '값: 0, 1 (기본값 1). 1은 빠른 반올림(성능 우선), 0은 정확한 x86 반올림(정확성 우선, 느림)입니다.',
            tip: 'ARM64 호스트 전용입니다.'
        },
        'palworld.t_box64DynarecFastnan': {
            what: 'Box64가 부동소수점 -NaN 값 생성을 x86과 똑같이 처리할지 정합니다.',
            effect: '값: 0, 1 (기본값 1). 1은 빠르게 처리(성능 우선), 0은 x86과 동일하게 처리(정확성 우선, 느림)합니다.',
            tip: 'ARM64 호스트 전용입니다.'
        },
        'palworld.t_box64DynarecX87double': {
            what: 'Box64가 x87 부동소수점 연산을 강제로 Double 정밀도로 처리할지 정합니다.',
            effect: '값: 0, 1 (기본값 0). 1로 하면 정밀도 관련 문제가 줄 수 있지만 느려집니다.',
            tip: 'ARM64 호스트 전용입니다.'
        },

        // ---------------- jammsen/palworld-dedicated-server ----------------
        'palworld.j_alwaysUpdateOnStart': {
            what: '컨테이너가 시작될 때마다 SteamCMD로 서버를 업데이트할지 정합니다.',
            effect: '켜면(기본값 true) 시작 시 최신 버전으로 갱신되어 클라이언트와 버전이 맞춰집니다. 끄면 설치된 버전으로 바로 시작합니다.',
            tip: '자동 재부팅(RESTART_ENABLED)과 함께 켜 두면 재시작할 때마다 업데이트가 적용됩니다.'
        },
        'palworld.j_steamcmdValidateFiles': {
            what: '업데이트할 때 SteamCMD가 서버 파일 무결성을 검사(validate)할지 정합니다.',
            effect: '켜면(기본값 true) 손상된 파일이 복구되지만 시작 시간이 길어지고, 서버 폴더에서 직접 수정한 파일(모드 등)이 원본으로 덮어써집니다. 끄면 검사를 건너뜁니다.',
            tip: '서버 파일을 직접 수정해 쓰는 경우에는 꺼 두세요.'
        },
        'palworld.j_multithreadEnabled': {
            what: '멀티코어 CPU 성능을 높이는 서버 실행 옵션을 적용할지 정합니다.',
            effect: '켜면(기본값 true) 여러 CPU 코어를 활용해 성능이 좋아질 수 있습니다. 끄면 해당 옵션 없이 실행합니다.',
            tip: 'thijsvanloef의 MULTITHREADING과 달리 이 이미지에서는 현재 사용되는 설정입니다.'
        },
        'palworld.j_backupEnabled': {
            what: '정해진 일정에 세이브 데이터를 자동 백업할지 정합니다.',
            effect: '켜면(기본값 true) BACKUP_CRON_EXPRESSION 일정마다 game 디렉터리에 백업이 생성됩니다. 끄면 자동 백업을 하지 않습니다.'
        },
        'palworld.j_backupRetentionPolicy': {
            what: '보관 개수를 넘는 오래된 백업을 자동으로 지울지 정합니다.',
            effect: '켜면(기본값 true) BACKUP_RETENTION_AMOUNT_TO_KEEP 개수만 남기고 오래된 것부터 삭제합니다. 끄면 백업이 계속 쌓입니다.',
            tip: 'thijsvanloef는 "일수" 기준, jammsen은 "개수" 기준으로 보관합니다.'
        },
        'palworld.j_backupRetentionAmountToKeep': {
            what: '보관 정책이 켜져 있을 때 남겨 둘 백업 파일 개수입니다.',
            effect: '값을 올리면 더 많은 시점으로 되돌릴 수 있지만 디스크를 더 씁니다. 내리면 공간이 절약됩니다. 기본값은 72개(매시 백업 기준 약 3일치)입니다.'
        },
        'palworld.j_backupCronExpression': {
            what: '자동 백업이 실행될 일정을 Cron 표현식으로 지정합니다.',
            effect: CRON + ' 기본값은 "0 * * * *"(매시 정각)입니다.',
            tip: TZ_NOTE + ' jammsen 이미지의 기본 TZ는 Europe/Berlin입니다.'
        },
        'palworld.j_restartEnabled': {
            what: '정해진 일정에 서버를 자동으로 재시작할지 정합니다.',
            effect: '켜면 RESTART_CRON_EXPRESSION 일정마다 재시작합니다. 플레이어가 있으면 15분 지연 후, 없으면 즉시 재시작합니다. 끄면(기본값 false) 자동 재시작이 없습니다.',
            tip: '플레이어 확인과 공지는 REST API를 통해 이뤄지므로 RESTAPI_ENABLED를 켜 두세요.'
        },
        'palworld.j_restartCronExpression': {
            what: '자동 재시작이 실행될 일정을 Cron 표현식으로 지정합니다.',
            effect: CRON + ' 기본값은 "0 3,15 * * *"(매일 03:00, 15:00)입니다.',
            tip: TZ_NOTE + ' jammsen 이미지의 기본 TZ는 Europe/Berlin입니다.'
        },
        'palworld.j_netServerMaxTickRate': {
            what: '서버가 1초에 게임 상태를 몇 번 갱신하는지(틱레이트) 정합니다.',
            effect: '값을 올리면 움직임과 반응이 부드러워지지만 CPU 사용량이 늘고, 내리면 부하는 줄지만 끊김이 느껴질 수 있습니다. 허용 범위 30~120, 기본값 120입니다.',
            tip: '공식 문서도 신중하게 변경하라고 안내합니다. 서버가 버거울 때만 60 정도로 낮춰 보세요.'
        },
        'palworld.j_logFormatType': {
            what: '컨테이너 로그 출력 형식입니다.',
            effect: '사용 가능 값: Text(기본, 사람이 읽기 쉬운 형식), Json(로그 수집 도구용 JSON 형식).',
            tip: 'thijsvanloef와 허용 값이 다릅니다(대소문자 포함). 잘못된 값을 넣지 않도록 주의하세요.'
        },
        'palworld.j_backupAnnounceMessagesEnabled': {
            what: '백업이 진행될 때 게임 내 공지 메시지를 띄울지 정합니다.',
            effect: '켜면(기본값 true) 백업 시작/완료가 플레이어에게 공지됩니다. 끄면 공지하지 않습니다. 백업 오류는 설정과 상관없이 항상 공지됩니다.'
        },
        'palworld.j_restartDebugOverride': {
            what: '자동 재시작 기능을 시험할 때 쓰는 디버그용 설정입니다.',
            effect: '켜면 플레이어가 있을 때의 재시작 대기 시간이 15분 대신 15초로 줄어듭니다. 기본값은 false입니다.',
            tip: '테스트 용도로만 쓰고 실제 운영에서는 꺼 두세요.'
        },
        'palworld.j_playerDetectionEnabled': {
            what: '플레이어 접속/퇴장을 감지해 콘솔 로그와 웹훅으로 알릴지 정합니다.',
            effect: '켜면(기본값 true) 누가 들어오고 나갔는지 알림이 갑니다. 끄면 감지하지 않습니다.',
            tip: 'RESTAPI_ENABLED가 켜져 있어야 동작합니다.'
        },
        'palworld.j_playerDetectionDebug': {
            what: '플레이어 감지 기능의 디버그 메시지를 콘솔에 출력할지 정합니다.',
            effect: '켜면 감지 과정을 자세히 볼 수 있지만 로그가 늘어납니다. 기본값은 false입니다.'
        },
        'palworld.j_playerDetectionStartupDelay': {
            what: '서버가 시작된 뒤 첫 플레이어 감지를 하기까지 기다리는 시간(초)입니다.',
            effect: '값을 올리면 업데이트/부팅이 끝난 뒤 안정적으로 감지를 시작하고, 내리면 더 빨리 시작하지만 서버가 준비되지 않아 오류가 날 수 있습니다. 기본값은 60초입니다.'
        },
        'palworld.j_playerDetectionCheckInterval': {
            what: '플레이어 접속 여부를 몇 초마다 확인할지 정합니다.',
            effect: '값을 내리면 알림이 빨라지지만 요청이 늘고, 올리면 부하는 줄지만 알림이 늦어집니다. 기본값은 15초입니다.'
        },
        'palworld.j_serverSettingsMode': {
            what: '서버 설정을 환경 변수와 설정 파일(PalWorldSettings.ini) 중 어디에서 가져올지 정합니다.',
            effect: 'auto(기본): 환경 변수만 적용되고 파일을 직접 고친 내용은 덮어써집니다. rcononly: RCON_ENABLED, RCON_PORT, ADMIN_PASSWORD만 환경 변수로 적용하고 나머지는 파일을 직접 편집합니다. manual: 파일만 사용하고 환경 변수는 무시합니다.',
            tip: '이 앱에서 지정한 설정을 반영하려면 auto를 사용하세요. 문서상 RCON이 deprecated이므로 rcononly보다 auto를 권장합니다.'
        },
        'palworld.j_customScriptEnabled': {
            what: '게임 서버가 시작되기 전에 사용자가 만든 셸 스크립트를 실행할지 정합니다.',
            effect: '켜면 CUSTOM_SCRIPT_PATH의 스크립트가 서버 시작 직전에 실행됩니다(모드 설치, 파일 복사 등). 끄면(기본값 false) 실행하지 않습니다.',
            tip: '스크립트는 컨테이너 권한으로 실행되므로 신뢰할 수 있는 내용만 넣으세요.'
        },
        'palworld.j_customScriptPath': {
            what: '실행할 사용자 지정 스크립트의 컨테이너 내부 절대 경로입니다.',
            effect: '기본값은 /palworld/custom-script.sh입니다. 실행 시점에 파일이 실제로 있어야 하므로 볼륨으로 마운트해 두어야 합니다.',
            tip: '호스트 경로가 아니라 컨테이너 안에서 보이는 경로를 입력하세요.'
        },
        'palworld.j_webhookEnabled': {
            what: '서버 시작/정지/재시작/업데이트 등의 이벤트를 Discord 같은 외부 서비스로 알릴지 정합니다.',
            effect: '켜면 WEBHOOK_URL로 알림 메시지를 보냅니다. 끄면(기본값 false) 웹훅을 보내지 않습니다.',
            tip: 'WEBHOOK_URL을 반드시 함께 입력해야 합니다.'
        },
        'palworld.j_webhookDebugEnabled': {
            what: '웹훅 전송 시 curl 실행 결과를 로그에 출력할지 정합니다.',
            effect: '켜면 전송 실패 원인을 확인할 수 있습니다. 기본값은 false입니다.',
            tip: '웹훅이 오지 않을 때 원인을 찾는 용도로만 켜세요.'
        },
        'palworld.j_webhookUrl': {
            what: '웹훅 알림을 보낼 주소(예: Discord 채널의 웹훅 URL)입니다.',
            effect: '이 주소로 이벤트 메시지가 전송됩니다. 비어 있으면 웹훅이 동작하지 않습니다.',
            tip: '웹훅 URL을 아는 사람은 누구나 그 채널에 글을 올릴 수 있으니 외부에 공유하지 마세요.'
        },
        'palworld.j_webhookContentTitle': {
            what: '웹훅 메시지 맨 위에 붙는 공통 제목(content)입니다.',
            effect: '기본값은 "Status update"입니다. 비워 두면 이 제목 부분이 메시지에서 빠집니다.'
        },
        'palworld.j_webhookInfoTitle': {
            what: '정보(Info) 이벤트 웹훅의 제목입니다.',
            effect: '기본값은 "Info"입니다.'
        },
        'palworld.j_webhookInfoDescription': {
            what: '정보(Info) 이벤트 웹훅의 본문입니다.',
            effect: '기본값은 "This is an info from the server"입니다.'
        },
        'palworld.j_webhookInfoColor': {
            what: '정보(Info) 이벤트 웹훅 카드의 색상입니다.',
            effect: '기본값은 2849520(파란색 계열)입니다.',
            tip: DISCORD_COLOR
        },
        'palworld.j_webhookInstallTitle': {
            what: '서버 설치 이벤트 웹훅의 제목입니다.',
            effect: '기본값은 "Installing server"입니다.'
        },
        'palworld.j_webhookInstallDescription': {
            what: '서버 설치 이벤트 웹훅의 본문입니다.',
            effect: '기본값은 "Server is being installed"입니다.'
        },
        'palworld.j_webhookInstallColor': {
            what: '서버 설치 이벤트 웹훅 카드의 색상입니다.',
            effect: '기본값은 2849520입니다.',
            tip: DISCORD_COLOR
        },
        'palworld.j_webhookRestartTitle': {
            what: '자동 재시작 이벤트 웹훅의 제목입니다.',
            effect: '기본값은 "Automatic restart"입니다.'
        },
        'palworld.j_webhookRestartDelayedDescription': {
            what: '플레이어가 접속 중이라 재시작을 미룰 때(지연 재시작) 보내는 웹훅 본문입니다.',
            effect: '플레이어가 있을 때 재시작 예고 메시지로 사용됩니다. 비워 두면 이미지 기본 문구가 쓰입니다.'
        },
        'palworld.j_webhookRestartNowDescription': {
            what: '접속자가 없어 즉시 재시작할 때 보내는 웹훅 본문입니다.',
            effect: '서버가 비어 있을 때의 재시작 메시지로 사용됩니다. 비워 두면 이미지 기본 문구가 쓰입니다.'
        },
        'palworld.j_webhookRestartColor': {
            what: '자동 재시작 이벤트 웹훅 카드의 색상입니다.',
            effect: '기본값은 15593515(주황색 계열)입니다.',
            tip: DISCORD_COLOR
        },
        'palworld.j_webhookStartTitle': {
            what: '서버 시작 이벤트 웹훅의 제목입니다.',
            effect: '기본값은 "Server is starting"입니다.'
        },
        'palworld.j_webhookStartDescription': {
            what: '서버 시작 이벤트 웹훅의 본문입니다.',
            effect: '기본값은 "The gameserver is starting"입니다.'
        },
        'palworld.j_webhookStartColor': {
            what: '서버 시작 이벤트 웹훅 카드의 색상입니다.',
            effect: '기본값은 2328576(초록색 계열)입니다.',
            tip: DISCORD_COLOR
        },
        'palworld.j_webhookStopTitle': {
            what: '서버 정지 이벤트 웹훅의 제목입니다.',
            effect: '기본값은 "Server has been stopped"입니다.'
        },
        'palworld.j_webhookStopDescription': {
            what: '서버 정지 이벤트 웹훅의 본문입니다.',
            effect: '기본값은 "The gameserver has been stopped"입니다.'
        },
        'palworld.j_webhookStopColor': {
            what: '서버 정지 이벤트 웹훅 카드의 색상입니다.',
            effect: '기본값은 7413016입니다.',
            tip: DISCORD_COLOR
        },
        'palworld.j_webhookUpdateTitle': {
            what: '서버 업데이트 이벤트 웹훅의 제목입니다.',
            effect: '기본값은 "Updating server"입니다.'
        },
        'palworld.j_webhookUpdateDescription': {
            what: '서버 업데이트 이벤트 웹훅의 본문입니다.',
            effect: '기본값은 "Server is being updated"입니다.'
        },
        'palworld.j_webhookUpdateColor': {
            what: '서버 업데이트 이벤트 웹훅 카드의 색상입니다.',
            effect: '기본값은 2849520입니다.',
            tip: DISCORD_COLOR
        },

        // ---------------- Palworld 접속 설정 ----------------
        'palworld.connection.serverName': {
            what: '서버 목록(커뮤니티 서버 브라우저)과 게임 내에 표시될 서버 이름입니다.',
            effect: '바꾸면 다음 시작부터 새 이름으로 표시됩니다. 접속 방식이나 세이브에는 영향이 없습니다.',
            tip: 'jammsen은 비워 두면 "jammsen-docker-generated-숫자" 같은 임의 이름이 붙습니다.'
        },
        'palworld.connection.serverPassword': {
            what: '플레이어가 서버에 들어올 때 입력해야 하는 비밀번호입니다.',
            effect: '입력하면 비밀번호를 아는 사람만 접속할 수 있습니다. 비워 두면 누구나 접속할 수 있습니다.',
            tip: '커뮤니티 서버로 공개할 때는 비밀번호 설정을 권장합니다. jammsen은 기본값이 "serverPasswordHere"라는 자리표시자이므로 반드시 바꾸세요.'
        },
        'palworld.connection.adminPassword': {
            what: '게임 안에서 /AdminPassword 명령으로 관리자 권한을 얻을 때, 그리고 RCON/REST API 인증에 쓰는 비밀번호입니다.',
            effect: '이 비밀번호를 아는 사람은 플레이어 추방/차단, 서버 종료 등 관리자 작업을 할 수 있습니다.',
            tip: 'REST API는 사용자명 admin과 이 비밀번호로 인증하므로 길고 추측하기 어려운 값을 쓰세요. 서버 접속 비밀번호와 같게 하지 마세요. jammsen 기본값 "adminPasswordHere"는 반드시 변경하세요.'
        },
        'palworld.connection.publicConnection': {
            what: '외부 접속용 공인 IP/포트를 직접 지정할지 정하는 스위치입니다.',
            effect: '사용으로 하면 아래 공인 IP(와 thijsvanloef는 공인 포트) 값이 서버에 전달됩니다. 미사용이면 값이 지정되지 않고 서버가 자동으로 감지합니다.',
            tip: '공유기 포트포워딩이나 NAT 뒤에서 커뮤니티 목록에 잘못된 주소가 표시될 때 사용하세요. 포트포워딩 자체는 공유기/방화벽에서 따로 해야 합니다.'
        },
        'palworld.connection.publicIp': {
            what: '커뮤니티 서버 목록에 알릴 외부(공인) IP 주소입니다.',
            effect: '지정하면 목록에 이 주소가 표시되어 외부 플레이어가 이 주소로 접속합니다. 비워 두면 자동 감지됩니다.',
            tip: 'jammsen은 도메인 이름(FQDN)도 넣을 수 있습니다. 가정용 회선처럼 공인 IP가 바뀌는 환경에서는 값이 오래되지 않도록 주의하세요.'
        },
        'palworld.connection.publicPort': {
            what: '커뮤니티 서버 목록에 알릴 외부 포트입니다 (thijsvanloef 전용 입력란).',
            effect: '서버가 실제로 듣는 포트는 바꾸지 않고, 목록에 표시되는 포트만 바꿉니다. 공유기에서 다른 외부 포트로 포워딩할 때 그 외부 포트를 넣으세요. 비워 두면 자동 감지됩니다.',
            tip: 'jammsen은 게임 포트 입력란이 PUBLIC_PORT(기본 8211)로 쓰입니다.'
        },
        'palworld.connection.community': {
            what: '공식 커뮤니티 서버 목록에 이 서버를 표시할지 정합니다.',
            effect: '노출하면 게임 내 커뮤니티 서버 검색에 나타나 누구나 찾을 수 있습니다. 비노출이면 IP:포트를 직접 입력해 접속해야 합니다.',
            tip: '기본값은 thijsvanloef false, jammsen true입니다. 공개 노출 시 서버 비밀번호 설정을 권장하며, 목록에 보이려면 게임 포트(와 thijsvanloef는 쿼리 포트) UDP가 외부에서 열려 있어야 합니다.'
        },
        'palworld.connection.gamePort': {
            what: '게임 클라이언트가 접속하는 주 UDP 포트입니다 (thijsvanloef: PORT, jammsen: PUBLIC_PORT).',
            effect: '기본값은 8211입니다. 바꾸면 docker 포트 매핑과 공유기 포트포워딩도 같은 번호(UDP)로 맞춰야 하고, 플레이어는 IP:새포트로 접속합니다.',
            tip: '한 호스트에서 서버를 여러 개 돌릴 때만 바꾸는 것을 권장합니다. 사용 범위는 1024~65535입니다.'
        },
        'palworld.connection.queryPort': {
            what: 'Steam 서버와 통신하며 서버 정보를 조회하는 UDP 포트입니다 (thijsvanloef 전용).',
            effect: '기본값은 27015입니다. 바꾸면 docker 포트 매핑과 방화벽도 같은 번호(UDP)로 맞춰야 합니다.',
            tip: '커뮤니티 목록 노출에 관련되므로 공개 서버라면 외부에서 열어 두세요.'
        },
        'palworld.connection.restApi': {
            what: 'HTTP 요청으로 서버 정보 조회, 공지, 추방/차단, 저장, 종료 등을 할 수 있는 공식 REST API를 켤지 정합니다.',
            effect: '켜면 REST API 포트에서 요청을 받습니다(인증: 사용자명 admin + 관리자 비밀번호). 끄면 API가 비활성화됩니다. 두 이미지 모두 기본값은 true입니다.',
            tip: '두 이미지 모두 플레이어 접속 감지, 자동 일시정지(thijsvanloef), 재시작 전 공지 등에 REST API를 사용하므로 켜 두는 것을 권장합니다. 단, 포트는 외부에 공개하지 마세요.'
        },
        'palworld.connection.restApiPort': {
            what: 'REST API가 사용하는 TCP 포트입니다.',
            effect: '기본값은 8212입니다. 바꾸면 API를 호출하는 도구의 주소도 같이 바꿔야 합니다.',
            tip: 'REST API는 HTTPS가 아닌 평문 HTTP와 단순 인증을 사용하므로, 이 포트는 공유기에서 포트포워딩하지 말고 내부망이나 같은 호스트에서만 접근하세요.'
        },
        'palworld.connection.rcon': {
            what: '원격 콘솔(RCON) 프로토콜로 서버에 관리 명령을 보낼 수 있게 할지 정합니다.',
            effect: '켜면 RCON 클라이언트로 관리자 비밀번호를 이용해 명령(저장, 공지, 추방 등)을 실행할 수 있습니다. 끄면(두 이미지 모두 기본값 false) 사용할 수 없습니다.',
            tip: 'thijsvanloef는 docker stop 시 안전하게 저장하려면 RCON이 필요하다고 안내합니다. jammsen 문서는 RCON을 deprecated로 표시하며 내부 도구에서 사용하지 않으므로 REST API 사용을 권장합니다.'
        },
        'palworld.connection.rconPort': {
            what: 'RCON이 사용하는 TCP 포트입니다.',
            effect: '기본값은 25575입니다. 바꾸면 RCON 클라이언트의 접속 포트도 같이 바꿔야 합니다.',
            tip: 'RCON은 암호화되지 않으므로 이 포트를 인터넷에 공개하지 마세요. 공개가 꼭 필요하면 방화벽으로 접속 IP를 제한하고 강력한 관리자 비밀번호를 쓰세요.'
        }
    };
    const help = root.OptionHelp = root.OptionHelp || {};
    Object.assign(help, entries);
    if (typeof module !== 'undefined' && module.exports) module.exports = entries;
})(typeof globalThis !== 'undefined' ? globalThis : this);
