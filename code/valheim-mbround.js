(function (root) {
    'use strict';

    // Audited against mbround18/valheim-docker docs/README.md (main) on 2026-10-25.
    const settings = root.ValheimSettings || (typeof require === 'function' ? require('./valheim-settings.js') : null);
    const image = 'mbround18/valheim:3';
    const groups = [
        ['world', '월드 난이도·플레이 규칙', '게임 기본 월드 설정입니다. 비워두면 해당 값을 보내지 않고 게임 기본값을 사용합니다.'],
        ['mods', '모드 로더·Thunderstore 모드', 'TYPE으로 로더를 고르고 MODS에 Thunderstore 모드를 적으면 시작할 때 자동으로 설치합니다.'],
        ['maintenance', '업데이트·재시작 예약', 'Odin 내장 스케줄러가 Cron 식(분 시 일 월 요일)에 맞춰 작업을 실행합니다.'],
        ['backup', '자동 백업', '백업은 /home/steam/backups에 tar.gz로 저장되며 아래 백업 폴더 볼륨으로 보존합니다.'],
        ['notify', '알림·상태 HTTP', 'Discord 웹훅 알림과 Huginn 상태 HTTP 서버를 설정합니다.'],
        ['container', '컨테이너·고급', 'rootless 이미지이므로 실행 계정(user)이 호스트 폴더 소유자와 같아야 합니다.']
    ].map(([key, label, help]) => ({ key, label, help }));

    const fields = [];
    const add = (group, key, label, env, type, value, extra = {}) => fields.push({ group, key, label, env, type, value, ...extra });
    const keep = [['', '게임 기본값 (미설정)']];
    const options = pairs => pairs.map(([value, label]) => ({ value, label }));

    add('world', 'preset', '월드 프리셋', 'PRESET', 'select', '', {
        options: options([...keep, ['Normal', '보통'], ['Casual', '캐주얼'], ['Easy', '쉬움'], ['Hard', '어려움'], ['Hardcore', '하드코어'], ['Immersive', '몰입'], ['Hammer', '해머 / 건축']]),
        help: {
            what: '게임의 월드 난이도 프리셋을 한 번에 지정합니다. 게임 메뉴의 "월드 설정 → 프리셋"과 같습니다.',
            effect: '캐주얼·쉬움은 적이 약하고 사망 페널티가 가벼워집니다. 어려움·하드코어는 적이 강하고 사망 시 손실이 커지며 하드코어는 지도와 포탈 제약도 생깁니다. 몰입은 지도·포탈 사용을 제한해 탐험감을 높이고, 해머는 건축 재료 없이 자유롭게 짓는 창작용입니다.',
            tip: '프리셋 위에 아래 개별 규칙을 덧붙여 조정합니다. 기존 월드에 적용하면 이전 월드 규칙이 바뀌므로 백업 후 변경하세요.'
        }
    });
    for (const [key, label, choices, help] of [
        ['combat', '전투 난이도', [['veryeasy', '매우 쉬움'], ['easy', '쉬움'], ['hard', '어려움'], ['veryhard', '매우 어려움']], {
            what: '적이 주는 피해와 적의 체력을 조절합니다.',
            effect: '쉬울수록 받는 피해가 줄고 적이 빨리 쓰러집니다. 어려움·매우 어려움은 적의 공격력과 체력이 올라 보스전과 습격이 훨씬 위험해집니다.'
        }],
        ['deathpenalty', '사망 페널티', [['casual', '캐주얼'], ['veryeasy', '매우 쉬움'], ['easy', '쉬움'], ['hard', '어려움'], ['hardcore', '하드코어']], {
            what: '죽었을 때 잃는 기술 레벨과 아이템 범위를 정합니다.',
            effect: '캐주얼은 아이템과 기술을 거의 잃지 않습니다. 어려움은 장비까지 무덤에 떨어지고 기술 손실이 커지며, 하드코어는 캐릭터의 아이템과 기술을 모두 잃습니다.',
            tip: '하드코어는 되돌릴 수 없는 손실이 생기므로 참여자와 미리 합의하세요.'
        }],
        ['resources', '자원 획득량', [['muchless', '매우 적게'], ['less', '적게'], ['more', '많이'], ['muchmore', '매우 많이'], ['most', '최대']], {
            what: '나무·광석·전리품 등 채집과 처치로 얻는 자원의 양을 바꿉니다.',
            effect: '많이 쪽으로 갈수록 같은 행동으로 더 많은 자원을 얻어 진행이 빨라집니다. 적게 쪽은 자원이 귀해져 생존 난도가 올라갑니다.'
        }],
        ['raids', '습격 빈도', [['none', '습격 없음'], ['muchless', '매우 드물게'], ['less', '드물게'], ['more', '자주'], ['muchmore', '매우 자주']], {
            what: '기지 근처에서 발생하는 적 습격 이벤트의 빈도를 정합니다.',
            effect: '습격 없음은 기지 습격이 일어나지 않아 건축에 집중할 수 있습니다. 자주 쪽은 습격이 잦아 방어 시설이 중요해집니다.'
        }],
        ['portals', '포탈 규칙', [['casual', '광물·금속 포탈 허용'], ['hard', '어려움'], ['veryhard', '포탈 사용 불가']], {
            what: '포탈로 옮길 수 있는 물건과 포탈 사용 가능 여부를 정합니다.',
            effect: '광물·금속 포탈 허용은 원래 막혀 있던 광석과 금속도 포탈로 옮길 수 있어 배 운송이 필요 없습니다. 포탈 사용 불가는 포탈 자체를 짓거나 쓸 수 없습니다.',
            tip: '어려움(hard)은 기본보다 포탈 제약을 늘리는 단계지만 정확히 무엇을 막는지는 공식 문서에 명시되어 있지 않습니다. 게임 월드 설정 화면에서 확인하세요.'
        }]
    ]) add('world', key, label, `MODIFIERS ${key}`, 'select', '', { options: options([...keep, ...choices]), modifier: key, help });
    add('world', 'setKey', '추가 월드 규칙', 'SET_KEY', 'select', '', {
        options: options([['', '사용 안 함'], ['nobuildcost', '건축 재료 비용 없음'], ['playerevents', '플레이어 진행도 기반 습격'], ['passivemobs', '선제공격하지 않는 적'], ['nomap', '지도 사용 안 함']]),
        help: {
            what: '게임의 월드 키(특수 규칙) 하나를 켭니다.',
            effect: '건축 재료 비용 없음은 재료 없이 건축할 수 있습니다. 플레이어 진행도 기반 습격은 월드 전체가 아니라 각 플레이어가 잡은 보스 기준으로 습격 종류가 정해집니다. 선제공격하지 않는 적은 먼저 공격받기 전까지 적이 공격하지 않습니다. 지도 사용 안 함은 미니맵과 지도를 끕니다.'
        }
    });

    add('mods', 'type', '모드 로더', 'TYPE', 'select', 'Vanilla', {
        options: options([['Vanilla', '기본 서버 (모드 없음)'], ['BepInEx', 'BepInEx'], ['ValheimPlus', 'ValheimPlus']]),
        help: {
            what: '서버에 설치할 모드 로더를 고릅니다. 이미지가 선택한 로더를 자동으로 설치합니다.',
            effect: '기본 서버는 모드 없이 실행합니다. BepInEx는 Thunderstore 모드 대부분이 필요로 하는 로더이고, ValheimPlus는 편의 기능 모음 모드를 설치합니다.',
            tip: '모드를 쓰는 서버는 접속하는 모든 플레이어 PC에도 같은 모드와 버전이 필요한 경우가 많습니다.'
        }
    });
    add('mods', 'mods', '설치할 모드 목록', 'MODS', 'textarea', '', {
        omitEmpty: true,
        help: {
            what: 'Thunderstore 모드를 한 줄에 하나씩 적으면 서버 시작 시 다운로드·설치합니다. 제작자-모드명-버전 형식이나 다운로드 URL을 사용합니다.',
            effect: '예: ValheimModding-Jotunn-* 처럼 버전 자리에 *를 쓰면 시작할 때마다 최신 버전을 받습니다. 1.2.3처럼 정확한 버전을 적으면 그 버전에 고정됩니다.',
            tip: '안정적인 운영에는 정확한 버전 고정을 권장합니다. 모드 로더가 BepInEx 또는 ValheimPlus여야 합니다.'
        }
    });
    add('mods', 'modsContinueOnFailure', '일부 모드 실패 시 계속 실행', 'MODS_CONTINUE_ON_FAILURE', 'boolean', false, {
        help: {
            what: '모드 하나의 다운로드가 실패했을 때 서버 시작을 멈출지 정합니다.',
            effect: '켜면 받을 수 있는 모드만 설치하고 경고만 남긴 채 서버를 시작합니다. 끄면 첫 실패에서 설치를 중단하고 컨테이너가 재시작됩니다.',
            tip: '필수 모드가 빠진 채 서버가 열리면 접속 오류가 날 수 있으므로 평소에는 끄는 것을 권장합니다.'
        }
    });
    add('mods', 'valheimPlusRelease', 'ValheimPlus 버전', 'VALHEIM_PLUS_RELEASE', 'text', 'latest', {
        help: {
            what: '모드 로더가 ValheimPlus일 때 설치할 릴리스 버전입니다.',
            effect: 'latest는 항상 최신 릴리스를 설치합니다. 0.10.1.2 같은 태그를 적으면 그 버전에 고정되어 클라이언트와 버전을 맞추기 쉽습니다.'
        }
    });

    add('maintenance', 'timezone', '시간대', 'TZ', 'text', 'Asia/Seoul', {
        help: {
            what: '컨테이너 시계의 시간대입니다. 로그 시간과 모든 예약 작업(Cron)의 기준이 됩니다.',
            effect: 'Asia/Seoul로 두면 "0 5 * * *"가 한국 시간 새벽 5시에 실행됩니다. 이미지 기본값은 America/Los_Angeles입니다.'
        }
    });
    add('maintenance', 'updateOnStartup', '시작할 때 업데이트', 'UPDATE_ON_STARTUP', 'boolean', true, {
        help: {
            what: '컨테이너를 시작할 때마다 SteamCMD로 서버 업데이트를 확인합니다.',
            effect: '켜면 재시작만으로 최신 게임 버전이 됩니다. 끄면 시작이 빨라지지만 클라이언트가 업데이트되면 버전 불일치로 접속이 막힐 수 있습니다.'
        }
    });
    add('maintenance', 'autoUpdate', '예약 자동 업데이트', 'AUTO_UPDATE', 'boolean', false, {
        help: {
            what: '아래 일정마다 Steam에 새 서버 버전이 있는지 확인합니다.',
            effect: '켜면 업데이트가 있을 때 서버를 종료하고 업데이트한 뒤 다시 켭니다. 끄면 컨테이너를 재시작할 때만 업데이트합니다.'
        }
    });
    add('maintenance', 'autoUpdateSchedule', '자동 업데이트 일정', 'AUTO_UPDATE_SCHEDULE', 'text', '0 1 * * *', { cron: true, help: {
        what: '자동 업데이트 확인을 실행할 Cron 식입니다.',
        effect: '기본값 "0 1 * * *"는 매일 1시 정각에 확인합니다. "*/30 * * * *"처럼 쓰면 30분마다 확인합니다.'
    } });
    add('maintenance', 'autoUpdatePauseWithPlayers', '접속자가 있으면 업데이트 보류', 'AUTO_UPDATE_PAUSE_WITH_PLAYERS', 'boolean', false, {
        help: {
            what: '예약 업데이트 시점에 플레이어가 접속해 있으면 업데이트를 건너뜁니다.',
            effect: '켜면 플레이 중 서버가 갑자기 꺼지지 않습니다. 대신 늘 누군가 접속해 있는 서버는 업데이트가 계속 밀릴 수 있습니다.'
        }
    });
    add('maintenance', 'scheduledRestart', '예약 재시작', 'SCHEDULED_RESTART', 'boolean', false, {
        help: {
            what: '정해진 일정마다 서버를 재시작합니다.',
            effect: '켜면 오래 켜 둘 때 쌓이는 메모리 사용량과 지연을 정기적으로 정리합니다. 재시작 중에는 잠시 접속이 끊깁니다.'
        }
    });
    add('maintenance', 'scheduledRestartSchedule', '재시작 일정', 'SCHEDULED_RESTART_SCHEDULE', 'text', '0 2 * * *', { cron: true, help: {
        what: '예약 재시작을 실행할 Cron 식입니다.',
        effect: '기본값 "0 2 * * *"는 매일 2시에 재시작합니다. 접속자가 적은 시간대로 맞추세요.'
    } });
    add('maintenance', 'usePublicBeta', '공개 테스트 버전 사용', 'USE_PUBLIC_BETA', 'boolean', false, {
        help: {
            what: 'Valheim의 public-test 베타 브랜치로 서버를 설치·업데이트합니다.',
            effect: '켜면 출시 전 기능을 미리 쓸 수 있지만 일반 클라이언트는 접속할 수 없고 월드 호환성 문제가 생길 수 있습니다.',
            tip: '플레이어도 Steam에서 같은 베타를 선택해야 합니다. 켜기 전에 월드를 백업하세요.'
        }
    });

    add('backup', 'autoBackup', '자동 백업', 'AUTO_BACKUP', 'boolean', true, {
        help: {
            what: '월드 저장 폴더를 일정마다 tar.gz로 압축해 백업합니다.',
            effect: '켜면 월드가 손상되거나 실수로 지워져도 백업 시점으로 되돌릴 수 있습니다. 이미지 기본값은 꺼짐이지만 이 생성기는 켜 두는 것을 권장합니다.'
        }
    });
    add('backup', 'autoBackupSchedule', '백업 일정', 'AUTO_BACKUP_SCHEDULE', 'text', '*/15 * * * *', { cron: true, help: {
        what: '자동 백업을 실행할 Cron 식입니다.',
        effect: '기본값 "*/15 * * * *"는 15분마다 백업합니다. 간격을 늘리면 디스크 사용량이 줄고, 줄이면 잃는 진행이 적어집니다.'
    } });
    add('backup', 'autoBackupRemoveOld', '오래된 백업 자동 삭제', 'AUTO_BACKUP_REMOVE_OLD', 'boolean', true, {
        help: {
            what: '보관 기간이 지난 백업 파일을 자동으로 지웁니다.',
            effect: '켜면 아래 보관 일수보다 오래된 백업이 삭제되어 디스크가 가득 차지 않습니다. 끄면 백업을 직접 정리해야 합니다.'
        }
    });
    add('backup', 'autoBackupDaysToLive', '백업 보관 일수', 'AUTO_BACKUP_DAYS_TO_LIVE', 'number', 3, { min: 1, max: 3650, step: 1, help: {
        what: '백업 파일을 며칠 동안 남겨 둘지 정합니다.',
        effect: '값이 클수록 더 예전 시점으로 복구할 수 있지만 디스크 사용량이 늘어납니다. 백업 1개는 보통 수십 MB입니다.'
    } });
    add('backup', 'autoBackupOnUpdate', '업데이트 직전 백업', 'AUTO_BACKUP_ON_UPDATE', 'boolean', false, {
        help: {
            what: '서버를 업데이트하고 시작하기 직전에 백업을 만듭니다.',
            effect: '켜면 게임 업데이트 후 월드에 문제가 생겨도 업데이트 직전 상태로 되돌릴 수 있습니다.'
        }
    });
    add('backup', 'autoBackupOnShutdown', '종료 시 백업', 'AUTO_BACKUP_ON_SHUTDOWN', 'boolean', false, {
        help: {
            what: '컨테이너가 종료될 때 백업을 만듭니다.',
            effect: '켜면 마지막 플레이 상태가 항상 백업에 남습니다. 종료 시간이 조금 길어집니다.'
        }
    });
    add('backup', 'autoBackupPauseWithNoPlayers', '접속자 없으면 백업 생략', 'AUTO_BACKUP_PAUSE_WITH_NO_PLAYERS', 'boolean', false, {
        help: {
            what: '접속한 플레이어가 없으면 예약 백업을 건너뜁니다.',
            effect: '켜면 변화가 없는 동안 같은 백업이 반복 생성되지 않아 디스크를 아낍니다.',
            tip: '서버 목록 공개가 켜져 있어야 접속자 수를 확인할 수 있습니다.'
        }
    });

    add('notify', 'webhookUrl', 'Discord 웹훅 URL', 'WEBHOOK_URL', 'text', '', {
        sensitive: true, omitEmpty: true,
        help: {
            what: '서버 시작·종료·업데이트 같은 상태 알림을 보낼 Discord(또는 호환) 웹훅 주소입니다.',
            effect: '입력하면 해당 채널에 서버 상태 메시지가 올라옵니다. 비워두면 알림을 보내지 않습니다.',
            tip: 'Discord 채널 설정 → 연동 → 웹후크에서 URL을 만들 수 있습니다. URL이 노출되면 누구나 메시지를 보낼 수 있으니 공유하지 마세요.'
        }
    });
    add('notify', 'webhookIncludePublicIp', '알림에 공인 IP 포함', 'WEBHOOK_INCLUDE_PUBLIC_IP', 'boolean', false, {
        help: {
            what: '웹훅 알림에 서버의 공인 IP를 함께 적습니다.',
            effect: '켜면 유동 IP 환경에서도 알림만 보고 접속 주소를 알 수 있습니다. 알림 채널을 보는 모든 사람에게 IP가 공개됩니다.'
        }
    });
    add('notify', 'playerEventNotifications', '플레이어 입장·퇴장 알림', 'PLAYER_EVENT_NOTIFICATIONS', 'boolean', false, {
        help: {
            what: '플레이어가 접속하거나 나갈 때 웹훅 알림을 보냅니다.',
            effect: '켜면 누가 언제 들어오고 나갔는지 채널에서 확인할 수 있습니다. 웹훅 URL이 있어야 동작합니다.'
        }
    });
    add('notify', 'httpEnabled', 'Huginn 상태 HTTP', 'HTTP_PORT', 'boolean', false, {
        virtual: true,
        help: {
            what: '서버 상태(/status)와 Prometheus 지표(/metrics)를 제공하는 작은 HTTP 서버를 켭니다.',
            effect: '켜면 HTTP_PORT를 설정하고 TCP 포트를 연결합니다. 웹 브라우저나 모니터링 도구로 접속자 수와 서버 상태를 볼 수 있습니다.'
        }
    });
    add('notify', 'httpPort', '상태 HTTP 포트', 'HTTP_PORT', 'number', 3000, { min: 1025, max: 65535, step: 1, help: {
        what: 'Huginn 상태 서버가 사용할 TCP 포트입니다. 호스트에도 같은 번호로 연결합니다.',
        effect: '다른 서비스와 겹치지 않는 1025 이상의 포트를 지정하세요.'
    } });
    add('notify', 'httpBind', '상태 HTTP 공개 주소', 'Compose', 'text', '127.0.0.1', { virtual: true, help: {
        what: '호스트의 어느 주소에서 상태 HTTP를 열지 정합니다.',
        effect: '127.0.0.1은 서버 컴퓨터 안에서만 접속할 수 있습니다. 0.0.0.0으로 바꾸면 외부에서도 열려 누구나 상태를 볼 수 있습니다.'
    } });

    add('container', 'puid', '실행 사용자 ID', 'user', 'number', 1000, { min: 0, max: 65535, step: 1, virtual: true, help: {
        what: '컨테이너를 실행할 리눅스 사용자 ID입니다. Compose의 user 항목으로 들어갑니다.',
        effect: '호스트 폴더 소유자와 같아야 월드·백업 파일을 읽고 쓸 수 있습니다. 서버에서 id -u 명령으로 확인합니다.'
    } });
    add('container', 'pgid', '실행 그룹 ID', 'user', 'number', 1000, { min: 0, max: 65535, step: 1, virtual: true, help: {
        what: '컨테이너를 실행할 리눅스 그룹 ID입니다.',
        effect: '호스트 폴더 그룹과 같아야 권한 오류가 나지 않습니다. 서버에서 id -g 명령으로 확인합니다.'
    } });
    add('container', 'extraLaunchArgs', '추가 서버 실행 인수', 'SERVER_EXTRA_LAUNCH_ARGS', 'text', '', {
        omitEmpty: true,
        help: {
            what: 'Valheim 서버 실행 명령 뒤에 그대로 붙일 인수입니다.',
            effect: '예: -saveinterval 600을 넣으면 월드 저장 주기를 10분으로 바꿉니다. 이름·월드·포트·비밀번호는 접속 설정에서 관리하세요.'
        }
    });

    const defaults = Object.fromEntries(fields.map(field => [field.key, field.value]));
    const isEnv = field => !field.virtual && !field.modifier;
    const flag = value => (value ? '1' : '0');

    function modifiers(options) {
        return fields.filter(field => field.modifier && options[field.key]).map(field => `${field.modifier}=${options[field.key]}`).join(',');
    }

    function validate(options) {
        const errors = [];
        for (const f of fields) {
            const v = options[f.key];
            if (f.type === 'number' && (!Number.isInteger(v) || v < f.min || v > f.max)) errors.push(`${f.label}: ${f.min}~${f.max} 사이 정수를 입력하세요.`);
            if (f.type === 'boolean' && typeof v !== 'boolean') errors.push(`${f.label}: 켜기 또는 끄기를 선택하세요.`);
            if (f.type === 'select' && !f.options.some(option => option.value === v)) errors.push(`${f.label}: 올바른 값을 선택하세요.`);
            if (['text', 'textarea'].includes(f.type) && (typeof v !== 'string' || v.includes('\0'))) errors.push(`${f.label}: 올바른 문자열을 입력하세요.`);
        }
        if (errors.length) return errors;
        if (!options.timezone.trim()) errors.push('시간대를 입력하세요.');
        for (const f of fields.filter(f => f.cron)) {
            if (!settings.validCron(options[f.key])) errors.push(`${f.label}: 분 시 일 월 요일 순서의 Cron 식을 입력하세요.`);
        }
        if (options.mods.trim() && options.type === 'Vanilla') errors.push('설치할 모드 목록을 쓰려면 모드 로더를 BepInEx 또는 ValheimPlus로 선택하세요.');
        if (options.type === 'ValheimPlus' && !/^(latest|[\w.-]+)$/.test(options.valheimPlusRelease)) errors.push('ValheimPlus 버전은 latest 또는 릴리스 태그로 입력하세요.');
        if (options.httpEnabled && !/^\d{1,3}(\.\d{1,3}){3}$/.test(options.httpBind)) errors.push('상태 HTTP 공개 주소는 IPv4 주소로 입력하세요.');
        if (/(?:^|\s)-(name|world|port|password|public|crossplay|savedir)\b/i.test(options.extraLaunchArgs)) errors.push('추가 실행 인수의 이름·월드·포트·비밀번호·공개 설정은 접속 설정에서 관리하세요.');
        return errors;
    }

    function environment(options) {
        const env = {};
        for (const f of fields.filter(isEnv)) {
            const value = options[f.key];
            if (f.omitEmpty && !String(value).trim()) continue;
            if (f.type === 'select' && value === '') continue;
            if (f.key === 'valheimPlusRelease' && options.type !== 'ValheimPlus') continue;
            if (f.key === 'modsContinueOnFailure') env[f.env] = value ? 'true' : 'false';
            else env[f.env] = f.type === 'boolean' ? flag(value) : (f.key === 'mods' ? value.trim() : value);
        }
        const modifierList = modifiers(options);
        if (modifierList) env.MODIFIERS = modifierList;
        if (options.httpEnabled) env.HTTP_PORT = options.httpPort;
        return env;
    }

    const api = { image, groups, fields, defaults, validate, environment, modifiers };
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    root.ValheimMbround = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
