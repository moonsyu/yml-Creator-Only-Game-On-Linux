(function (root) {
    'use strict';

    // Audited against mbround18/valheim-docker docs/README.md (main) on 2026-10-25.
    const settings = root.ValheimSettings || (typeof require === 'function' ? require('./valheim-settings.js') : null);
    const image = 'mbround18/valheim:3';
    const groups = [
        ['world', '월드 난이도·플레이 규칙', '게임 기본 월드 설정 · 비워두면 해당 값을 보내지 않고 게임 기본값 사용'],
        ['mods', '모드 로더·Thunderstore 모드', 'TYPE으로 로더 선택 · MODS에 적은 Thunderstore 모드를 시작할 때 자동 설치'],
        ['maintenance', '업데이트·재시작 예약', 'Odin 내장 스케줄러가 Cron 식(분 시 일 월 요일)에 맞춰 실행'],
        ['backup', '자동 백업', '/home/steam/backups에 tar.gz로 저장 · 아래 백업 폴더 볼륨으로 보존'],
        ['notify', '알림·상태 HTTP', 'Discord 웹훅 알림과 Huginn 상태 HTTP 서버'],
        ['container', '컨테이너·고급', 'rootless 이미지 · 실행 계정(user)이 호스트 폴더 소유자와 같아야 함']
    ].map(([key, label, help]) => ({ key, label, help }));

    const fields = [];
    const add = (group, key, label, env, type, value, extra = {}) => fields.push({ group, key, label, env, type, value, ...extra });
    const keep = [['', '게임 기본값 (미설정)']];
    const options = pairs => pairs.map(([value, label]) => ({ value, label }));
    const CRON_FORMAT = '형식: 분 시 일 월 요일 (공백 구분)';

    add('world', 'preset', '월드 프리셋', 'PRESET', 'select', '', {
        options: options([...keep, ['Normal', '보통'], ['Casual', '캐주얼'], ['Easy', '쉬움'], ['Hard', '어려움'], ['Hardcore', '하드코어'], ['Immersive', '몰입'], ['Hammer', '해머 / 건축']]),
        help: {
            what: ['월드 난이도 프리셋을 한 번에 지정', '게임 메뉴의 "월드 설정 → 프리셋"과 같음'],
            effect: [
                '캐주얼·쉬움: 적 약화, 사망 페널티 가벼움',
                '어려움: 적 강화, 사망 시 손실 증가',
                '하드코어: 가장 가혹함, 지도·포탈 제약도 생김',
                '몰입: 지도·포탈 사용 제한, 탐험 위주',
                '해머: 건축 재료 없이 자유 건축, 창작 위주',
                '게임 기본값: PRESET 미전송'
            ],
            tip: ['아래 개별 규칙으로 프리셋 위에 세부 조정 가능', '기존 월드에 적용 시 이전 월드 규칙이 바뀜 → 백업 후 변경 권장']
        }
    });
    for (const [key, label, choices, help] of [
        ['combat', '전투 난이도', [['veryeasy', '매우 쉬움'], ['easy', '쉬움'], ['hard', '어려움'], ['veryhard', '매우 어려움']], {
            what: ['적이 주는 피해와 적 체력 조절'],
            effect: ['쉬움 쪽: 받는 피해 감소, 적이 빨리 쓰러짐', '어려움 쪽: 적 공격력·체력 증가, 보스전·습격 위험 증가', '게임 기본값: 보통']
        }],
        ['deathpenalty', '사망 페널티', [['casual', '캐주얼'], ['veryeasy', '매우 쉬움'], ['easy', '쉬움'], ['hard', '어려움'], ['hardcore', '하드코어']], {
            what: ['사망 시 잃는 기술 레벨과 아이템 범위'],
            effect: ['캐주얼: 아이템·기술 거의 손실 없음', '어려움: 장비까지 무덤에 떨어짐, 기술 손실 증가', '하드코어: 캐릭터의 아이템·기술 전부 손실'],
            tip: ['하드코어는 되돌릴 수 없는 손실 발생 → 참여자와 사전 합의 필요']
        }],
        ['resources', '자원 획득량', [['muchless', '매우 적게'], ['less', '적게'], ['more', '많이'], ['muchmore', '매우 많이'], ['most', '최대']], {
            what: ['채집·처치로 얻는 나무·광석·전리품 양'],
            effect: ['많이 쪽: 같은 행동으로 자원 더 획득, 진행 빨라짐', '적게 쪽: 자원이 귀해짐, 생존 난도 상승']
        }],
        ['raids', '습격 빈도', [['none', '습격 없음'], ['muchless', '매우 드물게'], ['less', '드물게'], ['more', '자주'], ['muchmore', '매우 자주']], {
            what: ['기지 근처 적 습격 이벤트 빈도'],
            effect: ['습격 없음: 기지 습격 미발생, 건축에 집중 가능', '자주 쪽: 습격 잦아짐, 방어 시설 중요']
        }],
        ['portals', '포탈 규칙', [['casual', '광물·금속 포탈 허용'], ['hard', '어려움'], ['veryhard', '포탈 사용 불가']], {
            what: ['포탈로 옮길 수 있는 물건과 포탈 사용 가능 여부'],
            effect: ['광물·금속 포탈 허용: 광석·금속도 포탈 이동 가능, 배 운송 불필요', '포탈 사용 불가: 포탈 건설·사용 불가'],
            tip: ['어려움(hard): 포탈 제약 강화 단계, 정확히 막는 대상은 공식 문서 미기재', '게임 월드 설정 화면에서 확인 권장']
        }]
    ]) add('world', key, label, `MODIFIERS ${key}`, 'select', '', { options: options([...keep, ...choices]), modifier: key, help });
    add('world', 'setKey', '추가 월드 규칙', 'SET_KEY', 'select', '', {
        options: options([['', '사용 안 함'], ['nobuildcost', '건축 재료 비용 없음'], ['playerevents', '플레이어 진행도 기반 습격'], ['passivemobs', '선제공격하지 않는 적'], ['nomap', '지도 사용 안 함']]),
        help: {
            what: ['게임의 월드 키(특수 규칙) 하나를 켬'],
            effect: [
                '건축 재료 비용 없음: 재료 없이 건축 가능',
                '플레이어 진행도 기반 습격: 각 플레이어가 잡은 보스 기준으로 습격 종류 결정',
                '선제공격하지 않는 적: 먼저 공격받기 전까지 적이 공격 안 함',
                '지도 사용 안 함: 미니맵·지도 꺼짐'
            ]
        }
    });

    add('mods', 'type', '모드 로더', 'TYPE', 'select', 'Vanilla', {
        options: options([['Vanilla', '기본 서버 (모드 없음)'], ['BepInEx', 'BepInEx'], ['ValheimPlus', 'ValheimPlus']]),
        help: {
            what: ['서버에 설치할 모드 로더', '선택한 로더는 이미지가 자동 설치'],
            effect: ['기본 서버: 모드 없이 실행', 'BepInEx: 대부분의 Thunderstore 모드가 필요로 하는 로더', 'ValheimPlus: 편의 기능 모음 모드 설치'],
            tip: ['모드 서버는 접속하는 플레이어 PC에도 같은 모드·버전이 필요한 경우 많음']
        }
    });
    add('mods', 'mods', '설치할 모드 목록', 'MODS', 'textarea', '', {
        omitEmpty: true,
        help: {
            what: ['서버 시작 시 다운로드·설치할 Thunderstore 모드 목록', '한 줄에 하나, 제작자-모드명-버전 또는 다운로드 URL'],
            effect: ['버전 자리에 *: 시작할 때마다 최신 버전 설치 (예: ValheimModding-Jotunn-*)', '정확한 버전 (예: 1.2.3): 해당 버전 고정'],
            tip: ['안정적인 운영에는 정확한 버전 고정 권장', '모드 로더가 BepInEx 또는 ValheimPlus여야 함']
        }
    });
    add('mods', 'modsContinueOnFailure', '일부 모드 실패 시 계속 실행', 'MODS_CONTINUE_ON_FAILURE', 'boolean', false, {
        help: {
            what: ['모드 다운로드 실패 시 서버 시작 중단 여부'],
            effect: ['켜면: 받을 수 있는 모드만 설치, 경고만 남기고 서버 시작', '끄면: 첫 실패에서 설치 중단, 컨테이너 재시작', '기본값: 끔'],
            tip: ['필수 모드가 빠진 채 서버가 열리면 접속 오류 가능 → 평소에는 끔 권장']
        }
    });
    add('mods', 'valheimPlusRelease', 'ValheimPlus 버전', 'VALHEIM_PLUS_RELEASE', 'text', 'latest', {
        help: {
            what: ['모드 로더가 ValheimPlus일 때 설치할 릴리스 버전'],
            effect: ['latest: 항상 최신 릴리스 설치', '태그 (예: 0.10.1.2): 해당 버전 고정, 클라이언트와 버전 맞추기 쉬움']
        }
    });

    add('maintenance', 'timezone', '시간대', 'TZ', 'text', 'Asia/Seoul', {
        help: {
            what: ['컨테이너 시계의 시간대', '로그 시간과 모든 예약 작업(Cron)의 기준'],
            effect: ['Asia/Seoul: "0 5 * * *"가 한국 시간 새벽 5시에 실행', '이미지 기본값: America/Los_Angeles']
        }
    });
    add('maintenance', 'updateOnStartup', '시작할 때 업데이트', 'UPDATE_ON_STARTUP', 'boolean', true, {
        help: {
            what: ['컨테이너 시작 시마다 SteamCMD로 서버 업데이트 확인'],
            effect: ['켜면: 재시작만으로 최신 게임 버전 적용', '끄면: 시작 빨라짐, 클라이언트 업데이트 후 버전 불일치로 접속 차단 가능', '기본값: 켬']
        }
    });
    add('maintenance', 'autoUpdate', '예약 자동 업데이트', 'AUTO_UPDATE', 'boolean', false, {
        help: {
            what: ['아래 일정마다 Steam에서 새 서버 버전 확인'],
            effect: ['켜면: 업데이트 있을 때 서버 종료 → 업데이트 → 재시작', '끄면: 컨테이너 재시작 때만 업데이트', '기본값: 끔']
        }
    });
    add('maintenance', 'autoUpdateSchedule', '자동 업데이트 일정', 'AUTO_UPDATE_SCHEDULE', 'text', '0 1 * * *', { cron: true, help: {
        what: ['자동 업데이트 확인 실행 시점 (Cron 식)'],
        effect: ['기본값 "0 1 * * *": 매일 1시 정각', '예: "*/30 * * * *" → 30분마다'],
        tip: [CRON_FORMAT]
    } });
    add('maintenance', 'autoUpdatePauseWithPlayers', '접속자가 있으면 업데이트 보류', 'AUTO_UPDATE_PAUSE_WITH_PLAYERS', 'boolean', false, {
        help: {
            what: ['예약 업데이트 시점에 접속자가 있으면 업데이트 건너뜀'],
            effect: ['켜면: 플레이 중 갑작스러운 서버 종료 방지', '단점: 늘 접속자가 있는 서버는 업데이트가 계속 밀림', '기본값: 끔']
        }
    });
    add('maintenance', 'scheduledRestart', '예약 재시작', 'SCHEDULED_RESTART', 'boolean', false, {
        help: {
            what: ['정해진 일정마다 서버 재시작'],
            effect: ['켜면: 장시간 실행으로 쌓인 메모리 사용량·지연 정기 정리', '재시작 중 잠시 접속 끊김', '기본값: 끔']
        }
    });
    add('maintenance', 'scheduledRestartSchedule', '재시작 일정', 'SCHEDULED_RESTART_SCHEDULE', 'text', '0 2 * * *', { cron: true, help: {
        what: ['예약 재시작 실행 시점 (Cron 식)'],
        effect: ['기본값 "0 2 * * *": 매일 2시'],
        tip: ['접속자가 적은 시간대로 설정 권장', CRON_FORMAT]
    } });
    add('maintenance', 'usePublicBeta', '공개 테스트 버전 사용', 'USE_PUBLIC_BETA', 'boolean', false, {
        help: {
            what: ['Valheim public-test 베타 브랜치로 서버 설치·업데이트'],
            effect: ['켜면: 출시 전 기능 사용 가능', '켜면: 일반 클라이언트 접속 불가, 월드 호환성 문제 가능', '기본값: 끔'],
            tip: ['플레이어도 Steam에서 같은 베타 선택 필요', '켜기 전 월드 백업 필수']
        }
    });

    add('backup', 'autoBackup', '자동 백업', 'AUTO_BACKUP', 'boolean', true, {
        help: {
            what: ['월드 저장 폴더를 일정마다 tar.gz로 압축 백업'],
            effect: ['켜면: 월드 손상·삭제 시 백업 시점으로 복구 가능', '이미지 기본값: 끔 · 이 생성기 기본값: 켬 (권장)']
        }
    });
    add('backup', 'autoBackupSchedule', '백업 일정', 'AUTO_BACKUP_SCHEDULE', 'text', '*/15 * * * *', { cron: true, help: {
        what: ['자동 백업 실행 시점 (Cron 식)'],
        effect: ['기본값 "*/15 * * * *": 15분마다', '간격 늘림: 디스크 사용량 감소', '간격 줄임: 잃는 진행 감소'],
        tip: [CRON_FORMAT]
    } });
    add('backup', 'autoBackupRemoveOld', '오래된 백업 자동 삭제', 'AUTO_BACKUP_REMOVE_OLD', 'boolean', true, {
        help: {
            what: ['보관 기간이 지난 백업 파일 자동 삭제'],
            effect: ['켜면: 보관 일수 초과 백업 삭제, 디스크 가득 참 방지', '끄면: 백업 직접 정리 필요', '기본값: 켬']
        }
    });
    add('backup', 'autoBackupDaysToLive', '백업 보관 일수', 'AUTO_BACKUP_DAYS_TO_LIVE', 'number', 3, { min: 1, max: 3650, step: 1, help: {
        what: ['백업 파일 보관 기간 (일)'],
        effect: ['값 올림: 더 예전 시점으로 복구 가능, 디스크 사용량 증가', '값 내림: 디스크 절약, 복구 가능 기간 단축', '기본값: 3'],
        tip: ['백업 1개 크기: 보통 수십 MB']
    } });
    add('backup', 'autoBackupOnUpdate', '업데이트 직전 백업', 'AUTO_BACKUP_ON_UPDATE', 'boolean', false, {
        help: {
            what: ['서버 업데이트·시작 직전 백업 생성'],
            effect: ['켜면: 게임 업데이트 후 월드 문제 시 직전 상태로 복구 가능', '기본값: 끔']
        }
    });
    add('backup', 'autoBackupOnShutdown', '종료 시 백업', 'AUTO_BACKUP_ON_SHUTDOWN', 'boolean', false, {
        help: {
            what: ['컨테이너 종료 시 백업 생성'],
            effect: ['켜면: 마지막 플레이 상태가 항상 백업에 남음', '종료 시간 약간 증가', '기본값: 끔']
        }
    });
    add('backup', 'autoBackupPauseWithNoPlayers', '접속자 없으면 백업 생략', 'AUTO_BACKUP_PAUSE_WITH_NO_PLAYERS', 'boolean', false, {
        help: {
            what: ['접속자가 없으면 예약 백업 건너뜀'],
            effect: ['켜면: 변화 없는 동안 같은 백업 반복 생성 방지, 디스크 절약', '기본값: 끔'],
            tip: ['서버 목록 공개가 켜져 있어야 접속자 수 확인 가능']
        }
    });

    add('notify', 'webhookUrl', 'Discord 웹훅 URL', 'WEBHOOK_URL', 'text', '', {
        sensitive: true, omitEmpty: true,
        help: {
            what: ['서버 시작·종료·업데이트 상태 알림을 보낼 Discord(또는 호환) 웹훅 주소'],
            effect: ['입력: 해당 채널에 서버 상태 메시지 게시', '비움: 알림 미전송'],
            tip: ['생성 위치: Discord 채널 설정 → 연동 → 웹후크', 'URL 노출 시 누구나 메시지 전송 가능 → 공유 금지']
        }
    });
    add('notify', 'webhookIncludePublicIp', '알림에 공인 IP 포함', 'WEBHOOK_INCLUDE_PUBLIC_IP', 'boolean', false, {
        help: {
            what: ['웹훅 알림에 서버 공인 IP 함께 표시'],
            effect: ['켜면: 유동 IP 환경에서도 알림으로 접속 주소 확인 가능', '켜면: 알림 채널을 보는 모든 사람에게 IP 공개', '기본값: 끔']
        }
    });
    add('notify', 'playerEventNotifications', '플레이어 입장·퇴장 알림', 'PLAYER_EVENT_NOTIFICATIONS', 'boolean', false, {
        help: {
            what: ['플레이어 접속·퇴장 시 웹훅 알림 전송'],
            effect: ['켜면: 누가 언제 들어오고 나갔는지 채널에서 확인 가능', '기본값: 끔'],
            tip: ['웹훅 URL 필요']
        }
    });
    add('notify', 'httpEnabled', 'Huginn 상태 HTTP', 'HTTP_PORT', 'boolean', false, {
        virtual: true,
        help: {
            what: ['서버 상태(/status)·Prometheus 지표(/metrics) 제공 HTTP 서버'],
            effect: ['켜면: HTTP_PORT 설정 및 TCP 포트 연결', '켜면: 브라우저·모니터링 도구로 접속자 수·서버 상태 확인 가능', '기본값: 끔']
        }
    });
    add('notify', 'httpPort', '상태 HTTP 포트', 'HTTP_PORT', 'number', 3000, { min: 1025, max: 65535, step: 1, help: {
        what: ['Huginn 상태 서버의 TCP 포트 (호스트에도 같은 번호로 연결)'],
        effect: ['기본값: 3000'],
        tip: ['다른 서비스와 겹치지 않는 1025 이상 포트 사용']
    } });
    add('notify', 'httpBind', '상태 HTTP 공개 주소', 'Compose', 'text', '127.0.0.1', { virtual: true, help: {
        what: ['상태 HTTP를 열 호스트 주소'],
        effect: ['127.0.0.1: 서버 컴퓨터 안에서만 접속 가능', '0.0.0.0: 외부에서도 접속 가능, 누구나 상태 열람 가능', '기본값: 127.0.0.1']
    } });

    add('container', 'puid', '실행 사용자 ID', 'user', 'number', 1000, { min: 0, max: 65535, step: 1, virtual: true, help: {
        what: ['컨테이너 실행 리눅스 사용자 ID (Compose user 항목)'],
        effect: ['호스트 폴더 소유자와 같아야 월드·백업 파일 읽기·쓰기 가능', '기본값: 1000'],
        tip: ['확인 방법: 서버에서 id -u']
    } });
    add('container', 'pgid', '실행 그룹 ID', 'user', 'number', 1000, { min: 0, max: 65535, step: 1, virtual: true, help: {
        what: ['컨테이너 실행 리눅스 그룹 ID'],
        effect: ['호스트 폴더 그룹과 다르면 권한 오류 발생', '기본값: 1000'],
        tip: ['확인 방법: 서버에서 id -g']
    } });
    add('container', 'extraLaunchArgs', '추가 서버 실행 인수', 'SERVER_EXTRA_LAUNCH_ARGS', 'text', '', {
        omitEmpty: true,
        help: {
            what: ['Valheim 서버 실행 명령 뒤에 그대로 붙일 인수'],
            effect: ['예: -saveinterval 600 → 월드 저장 주기 10분'],
            tip: ['이름·월드·포트·비밀번호는 접속 설정에서 관리']
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
