(function (root) {
    'use strict';

    // Audited against community-valheim-tools/valheim-server-docker on 2026-10-25.
    const image = 'lloesche/valheim-server:latest';
    const groups = [
        ['world', '월드 난이도·플레이 규칙', '모드 없이 적용하는 공식 월드 설정입니다. 기존 설정 유지는 명령을 보내지 않습니다. 이전 규칙을 해제하려면 프리셋을 보통으로 설정한 뒤 원하는 규칙을 선택하세요. 프리셋은 기존 월드 규칙 전체를 초기화합니다.'],
        ['save', '월드 저장·게임 자체 백업', '게임 자체 저장 설정입니다. 아래 컨테이너 백업과 별도로 작동하며, 빈 값은 게임 기본값을 사용합니다.'],
        ['access', '관리자·접속 권한', 'ID는 공백으로 구분합니다. 입력하면 기존 목록을 덮어쓰며, 빈 값은 서버의 기존 목록을 유지합니다.'],
        ['maintenance', '업데이트·재시작', 'Cron은 분 시 일 월 요일 순서입니다. 빈 Cron은 해당 예약 작업을 끕니다.'],
        ['backup', '컨테이너 자동 백업', '월드 파일을 별도로 보관합니다. 백업 경로는 영구 저장되는 /config 또는 /opt/valheim 아래를 권장합니다.'],
        ['mods', '모드 로더', 'BepInEx와 ValheimPlus 중 하나를 사용합니다. 추가 모드와 편의 설정도 같은 서버 옵션의 적용 버튼으로 반영합니다.'],
        ['http', '상태 조회·웹 관리', '켜면 TCP 포트 연결도 생성합니다. 기본 공개 주소 127.0.0.1은 Docker 호스트에서만 접근할 수 있으며, 외부 접근이 필요하면 호스트 IP 또는 0.0.0.0을 지정하세요.'],
        ['container', '컨테이너·권한', '컨테이너 실행 계정과 파일 권한을 설정합니다.'],
        ['logs', '로그·원격 Syslog', '로그 필터의 빈 값은 해당 필터를 해제합니다. 반복 필터와 필터별 명령은 추가 환경변수에서 설정할 수 있습니다.'],
        ['hooks', '시작·백업·종료 실행 명령 (고급)', '컨테이너 안에서 실행할 셸 명령입니다. 비워두면 실행하지 않습니다. 시작 전 명령은 모드 설치가 성공한 뒤 실행됩니다.'],
        ['advanced', '추가 실행 인수·환경변수 (고급)', '개별 모드의 모든 설정은 .cfg 편집 또는 VPCFG_/BEPINEXCFG_ 환경변수로 입력할 수 있습니다. 화면에서 관리하는 항목과 중복되면 수정 위치를 안내합니다.']
    ].map(([key, label, help]) => ({ key, label, help }));
    const fields = [];
    const add = (group, key, label, env, type, value, extra = {}) => fields.push({ group, key, label, env, type, value, ...extra });
    const text = (g, k, l, e, v = '', extra = {}) => add(g, k, l, e, 'text', v, extra);
    const bool = (g, k, l, e, v = false) => add(g, k, l, e, 'boolean', v);
    const num = (g, k, l, e, v, min, max, extra = {}) => add(g, k, l, e, 'number', v, { min, max, step: 1, ...extra });
    const select = (g, k, l, e, choices, extra = {}) => add(g, k, l, e, 'select', '', {
        options: [['', '기존 설정 유지'], ...choices].map(([value, label]) => ({ value, label })), ...extra
    });
    select('world', 'worldPreset', '월드 프리셋', '-preset', [
        ['normal', '보통 (기존 규칙 초기화)'], ['casual', '캐주얼'], ['easy', '쉬움'], ['hard', '어려움'],
        ['hardcore', '하드코어'], ['immersive', '몰입'], ['hammer', '해머 / 건축']
    ], { arg: 'preset' });
    select('world', 'combat', '전투 난이도', '-modifier combat', [['veryeasy', '매우 쉬움'], ['easy', '쉬움'], ['hard', '어려움'], ['veryhard', '매우 어려움']], { modifier: 'combat' });
    select('world', 'deathPenalty', '사망 페널티', '-modifier deathpenalty', [['casual', '캐주얼'], ['veryeasy', '매우 쉬움'], ['easy', '쉬움'], ['hard', '어려움'], ['hardcore', '하드코어']], { modifier: 'deathpenalty' });
    select('world', 'resources', '자원 획득량', '-modifier resources', [['muchless', '매우 적게'], ['less', '적게'], ['more', '많이'], ['muchmore', '매우 많이'], ['most', '최대']], { modifier: 'resources' });
    select('world', 'raids', '습격 빈도', '-modifier raids', [['none', '습격 없음'], ['muchless', '매우 드물게'], ['less', '드물게'], ['more', '자주'], ['muchmore', '매우 자주']], { modifier: 'raids' });
    select('world', 'portals', '포탈·광물 이동 규칙', '-modifier portals', [['casual', '광물·금속 포탈 허용'], ['hard', '어려움'], ['veryhard', '포탈 사용 불가']], { modifier: 'portals', helper: '광물 포탈 허용은 기본 서버에서도 가능합니다. ValheimPlus 없이 이 항목만 선택해도 됩니다.' });
    for (const [key, label] of [['nobuildcost', '건축 재료 비용 없음'], ['playerevents', '플레이어 진행도 기반 습격'], ['passivemobs', '선제공격하지 않는 적'], ['nomap', '지도 사용 안 함']]) {
        select('world', key, label, `-setkey ${key}`, [['enabled', '활성화']], { worldKey: key, helper: '기존 설정 유지는 해제 명령이 아닙니다. 해제하려면 보통 프리셋으로 초기화 후 규칙을 다시 선택하세요.' });
    }
    for (const [key, label, arg, standard, min, max] of [
        ['saveInterval', '월드 저장 주기 (초)', 'saveinterval', 1800, 1, 604800],
        ['nativeBackups', '게임 자동 백업 개수', 'backups', 4, 0, 10000],
        ['backupShort', '첫 게임 백업 간격 (초)', 'backupshort', 7200, 1, 31536000],
        ['backupLong', '이후 게임 백업 간격 (초)', 'backuplong', 43200, 1, 31536000]
    ]) add('save', key, label, `-${arg}`, 'optional-number', '', { arg, min, max, step: 1, helper: `빈 값은 게임 기본값 (${standard})을 사용합니다.` });
    text('save', 'instanceId', 'PlayFab 인스턴스 ID', '-instanceid', '', { arg: 'instanceid', helper: '같은 호스트에서 크로스플레이 서버를 여러 개 운영할 때 사용합니다. 공백 없이 입력하세요.' });
    text('save', 'logFile', '게임 로그 파일 경로', '-logFile', '', { arg: 'logFile', helper: '선택 사항. 예: /config/server.log. 이미지의 추가 인수 전달 방식상 공백 없는 경로를 사용하세요.' });
    for (const [key, label, env] of [['adminIds', '관리자 ID', 'ADMINLIST_IDS'], ['bannedIds', '차단 ID', 'BANNEDLIST_IDS'], ['permittedIds', '접속 허용 ID', 'PERMITTEDLIST_IDS']]) text('access', key, label, env, '', { omitEmpty: true, helper: 'SteamID64 또는 게임에서 확인한 플랫폼 사용자 ID를 공백으로 구분하세요. 허용 목록을 입력하면 해당 사용자만 접속할 수 있습니다.' });
    text('maintenance', 'timezone', '시간대', 'TZ', 'Asia/Seoul');
    text('maintenance', 'updateCron', '업데이트 확인 주기', 'UPDATE_CRON', '*/15 * * * *', { cron: true });
    bool('maintenance', 'updateIfIdle', '플레이어가 없을 때만 업데이트', 'UPDATE_IF_IDLE', true);
    text('maintenance', 'restartCron', '자동 재시작 주기', 'RESTART_CRON', '10 5 * * *', { cron: true });
    bool('maintenance', 'restartIfIdle', '플레이어가 없을 때만 재시작', 'RESTART_IF_IDLE', true);
    text('maintenance', 'steamcmdArgs', 'SteamCMD 추가 인수', 'STEAMCMD_ARGS', 'validate');
    bool('maintenance', 'publicTest', '공개 테스트 버전 사용', 'PUBLIC_TEST');
    fields[fields.length - 1].helper = '테스트 버전과 일반 버전은 월드 호환성이 다를 수 있습니다. 기존 월드 백업 후 사용하세요.';
    bool('backup', 'backups', '월드 자동 백업', 'BACKUPS', true);
    text('backup', 'backupsCron', '백업 주기', 'BACKUPS_CRON', '5 * * * *', { cron: true });
    text('backup', 'backupsDirectory', '백업 저장 경로', 'BACKUPS_DIRECTORY', '/config/backups');
    num('backup', 'backupsMaxAge', '백업 보관 일수', 'BACKUPS_MAX_AGE', 3, 1, 3650);
    num('backup', 'backupsMaxCount', '최대 백업 개수', 'BACKUPS_MAX_COUNT', 0, 0, 10000, { helper: '0이면 개수 제한이 없습니다. 보관 일수는 계속 적용됩니다.' });
    bool('backup', 'backupsIfIdle', '플레이어가 없어도 백업', 'BACKUPS_IF_IDLE', true);
    num('backup', 'backupsIdleGracePeriod', '마지막 접속 종료 후 백업 유예 (초)', 'BACKUPS_IDLE_GRACE_PERIOD', 3600, 0, 31536000);
    bool('backup', 'backupsZip', '백업 ZIP 압축', 'BACKUPS_ZIP', true);
    add('mods', 'modMode', '모드 로더', 'BEPINEX / VALHEIM_PLUS', 'select', 'vanilla', { options: [
        { value: 'vanilla', label: '기본 서버 (모드 없음)' }, { value: 'bepinex', label: 'BepInEx' }, { value: 'valheimplus', label: 'ValheimPlus' }
    ], virtual: true });
    text('mods', 'plusRepo', 'ValheimPlus 저장소', 'VALHEIM_PLUS_REPO', 'Grantapher/ValheimPlus', { helper: '제작자/저장소 형식. ValheimPlus 모드에서 사용합니다.' });
    text('mods', 'plusRelease', 'ValheimPlus 버전', 'VALHEIM_PLUS_RELEASE', 'latest', { helper: 'latest 또는 tags/0.10.3.0 같은 릴리스 태그를 입력하세요.' });
    bool('http', 'statusHttp', '상태 조회 HTTP', 'STATUS_HTTP');
    num('http', 'statusHttpPort', '상태 HTTP 컨테이너 포트', 'STATUS_HTTP_PORT', 80, 1, 65535);
    num('http', 'statusHostPort', '상태 HTTP 호스트 포트', 'Compose', 8080, 1, 65535, { virtual: true });
    text('http', 'statusBind', '상태 HTTP 공개 주소', 'Compose', '127.0.0.1', { virtual: true, helper: '상태 조회는 서버 목록 공개가 켜져 있어야 합니다.' });
    text('http', 'statusHttpConf', '상태 HTTP 설정 파일', 'STATUS_HTTP_CONF', '/config/httpd.conf');
    text('http', 'statusHttpHtdocs', '상태 JSON 저장 경로', 'STATUS_HTTP_HTDOCS', '/opt/valheim/htdocs');
    bool('http', 'supervisorHttp', 'Supervisor 웹 관리', 'SUPERVISOR_HTTP');
    num('http', 'supervisorHttpPort', '관리 HTTP 컨테이너 포트', 'SUPERVISOR_HTTP_PORT', 9001, 1, 65535);
    num('http', 'supervisorHostPort', '관리 HTTP 호스트 포트', 'Compose', 9001, 1, 65535, { virtual: true });
    text('http', 'supervisorBind', '관리 HTTP 공개 주소', 'Compose', '127.0.0.1', { virtual: true });
    text('http', 'supervisorHttpUser', '관리 HTTP 사용자', 'SUPERVISOR_HTTP_USER', 'admin');
    text('http', 'supervisorHttpPass', '관리 HTTP 비밀번호', 'SUPERVISOR_HTTP_PASS', '', { sensitive: true, omitEmpty: true });
    text('http', 'supervisorSecretFile', '관리 비밀번호 파일 (호스트)', 'SUPERVISOR_HTTP_PASS_FILE', '', { virtual: true, helper: '입력하면 Compose secret으로 연결하며 비밀번호 직접 입력보다 우선합니다. 서버에 실제 파일을 준비하세요.' });
    num('container', 'puid', '사용자 ID', 'PUID', 1000, 0, 65535);
    num('container', 'pgid', '그룹 ID', 'PGID', 1000, 0, 65535);
    text('container', 'permissionsUmask', '파일 생성 권한 마스크', 'PERMISSIONS_UMASK', '022', { helper: '3~4자리 8진수. 예: 022, 002, 077' });
    bool('logs', 'logFilterEmpty', '빈 로그 줄 제거', 'VALHEIM_LOG_FILTER_EMPTY', true);
    bool('logs', 'logFilterUtf8', '잘못된 UTF-8 문자 제거', 'VALHEIM_LOG_FILTER_UTF8', true);
    for (const [key, label, suffix, value] of [
        ['logFilterMatch', '완전히 같은 로그 제거', 'MATCH', ' '], ['logFilterStartsWith', '시작 문자열 필터', 'STARTSWITH', '(Filename:'],
        ['logFilterEndsWith', '끝 문자열 필터', 'ENDSWITH', ''], ['logFilterContains', '포함 문자열 필터', 'CONTAINS', ''], ['logFilterRegexp', '정규식 로그 필터', 'REGEXP', '']
    ]) text('logs', key, label, `VALHEIM_LOG_FILTER_${suffix}`, value);
    text('logs', 'syslogRemoteHost', '원격 Syslog 호스트', 'SYSLOG_REMOTE_HOST', '', { omitEmpty: true });
    num('logs', 'syslogRemotePort', '원격 Syslog UDP 포트', 'SYSLOG_REMOTE_PORT', 514, 1, 65535);
    bool('logs', 'syslogRemoteAndLocal', '원격 전송 중 로컬 로그도 기록', 'SYSLOG_REMOTE_AND_LOCAL', true);
    const hookNames = [
        ['PRE_SUPERVISOR_HOOK', '프로세스 관리자 시작 전'], ['PRE_BOOTSTRAP_HOOK', '서버 초기화 전'], ['POST_BOOTSTRAP_HOOK', '서버 초기화 후'],
        ['PRE_BACKUP_HOOK', '백업 전'], ['POST_BACKUP_HOOK', '백업 후'], ['PRE_UPDATE_CHECK_HOOK', '업데이트 확인 전'], ['POST_UPDATE_CHECK_HOOK', '업데이트 확인 후'],
        ['PRE_START_HOOK', '최초 서버 시작 전'], ['POST_START_HOOK', '최초 서버 시작 후'], ['PRE_RESTART_HOOK', '재시작 전'], ['POST_RESTART_HOOK', '재시작 후'],
        ['PRE_SERVER_LISTENING_HOOK', '접속 준비 전'], ['POST_SERVER_LISTENING_HOOK', '접속 준비 완료 후'], ['PRE_SERVER_RUN_HOOK', '게임 프로세스 시작 전'],
        ['POST_SERVER_RUN_HOOK', '게임 프로세스 종료 후'], ['PRE_SERVER_SHUTDOWN_HOOK', '종료 요청 전'], ['POST_SERVER_SHUTDOWN_HOOK', '종료 처리 후'],
        ['PRE_BEPINEX_CONFIG_HOOK', 'BepInEx 설정 작성 전'], ['POST_BEPINEX_CONFIG_HOOK', 'BepInEx 설정 작성 후']
    ];
    for (const [env, label] of hookNames) add('hooks', env, label, env, 'textarea', '', { omitEmpty: true });
    add('advanced', 'serverArgs', '추가 서버 실행 인수', 'SERVER_ARGS', 'textarea', '', { virtual: true, helper: '개별 입력 항목에서 지정한 인수는 중복 입력할 수 없습니다. -savedir는 /config 볼륨으로 관리합니다. 공백을 포함한 인수 값의 따옴표 묶음은 이미지에서 지원하지 않습니다.' });
    add('advanced', 'extraEnvironment', '추가 환경변수', 'KEY=value', 'textarea', '', { virtual: true, helper: '한 줄에 KEY=value. 따옴표 없이 입력하세요. 예: VPCFG_Server_maxPlayers=20 또는 ON_VALHEIM_LOG_FILTER_CONTAINS_Join=명령. 전체 설정 파일은 아래 .cfg 편집에서도 수정할 수 있습니다.' });
    const defaults = Object.fromEntries(fields.map(field => [field.key, field.value]));
    const isEnv = field => !field.virtual && !field.arg && !field.modifier && !field.worldKey;

    function parseExtra(value) {
        const entries = {};
        for (const line of value.split(/\r?\n/)) {
            if (!line.trim() || line.trimStart().startsWith('#')) continue;
            const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
            if (!match) throw new Error('추가 환경변수는 한 줄에 KEY=value 형식으로 입력하세요.');
            if (Object.hasOwn(entries, match[1])) throw new Error(`추가 환경변수 ${match[1]}가 중복되었습니다.`);
            Object.defineProperty(entries, match[1], { value: match[2], enumerable: true });
        }
        return entries;
    }

    function argumentsFor(options) {
        const args = [];
        for (const field of fields) {
            const value = options[field.key];
            if (value === '') continue;
            if (field.arg) args.push(`-${field.arg} ${value}`);
            if (field.modifier) args.push(`-modifier ${field.modifier} ${value}`);
            if (field.worldKey) args.push(`-setkey ${field.worldKey}`);
        }
        if (options.serverArgs.trim()) args.push(options.serverArgs.trim());
        return args.join(' ');
    }

    function validate(options, connection, qolEnvironment = {}) {
        const errors = [];
        for (const f of fields) {
            const v = options[f.key];
            if (f.type === 'optional-number' && v === '') continue;
            if (['number', 'optional-number'].includes(f.type) && (!Number.isInteger(v) || v < f.min || v > f.max)) errors.push(`${f.label}: ${f.min}~${f.max} 사이 정수를 입력하세요.`);
            if (f.type === 'boolean' && typeof v !== 'boolean') errors.push(`${f.label}: 켜기 또는 끄기를 선택하세요.`);
            if (f.type === 'select' && !f.options.some(option => option.value === v)) errors.push(`${f.label}: 올바른 값을 선택하세요.`);
            if (['text', 'textarea'].includes(f.type) && (typeof v !== 'string' || v.includes('\0'))) errors.push(`${f.label}: 올바른 문자열을 입력하세요.`);
        }
        if (errors.length) return errors;
        if (!/^[0-7]{3,4}$/.test(options.permissionsUmask)) errors.push('권한 마스크는 3~4자리 8진수여야 합니다.');
        if (!options.timezone.trim()) errors.push('시간대를 입력하세요.');
        for (const f of fields.filter(f => f.cron)) {
            if (options[f.key] && !validCron(options[f.key])) errors.push(`${f.label}: 분 시 일 월 요일 순서의 Cron 식을 입력하세요.`);
        }
        for (const key of ['backupsDirectory', 'statusHttpConf', 'statusHttpHtdocs']) if (!options[key].startsWith('/')) errors.push(`${key}: 컨테이너의 절대 경로를 입력하세요.`);
        for (const key of ['instanceId', 'logFile']) if (/\s|["'\\*?\[\]]/.test(options[key])) errors.push(`${key}: 공백·따옴표·와일드카드 없는 값을 입력하세요.`);
        if (options.logFile && !options.logFile.startsWith('/')) errors.push('게임 로그 파일은 컨테이너의 절대 경로로 입력하세요.');
        if (options.modMode === 'valheimplus' && (!/^[\w.-]+\/[\w.-]+$/.test(options.plusRepo) || !/^(latest|tags\/[\w.-]+)$/.test(options.plusRelease))) errors.push('ValheimPlus 저장소와 버전 형식을 확인하세요.');
        if (options.statusHttp && !connection.serverPublic) errors.push('상태 조회 HTTP는 서버 목록 공개를 켠 서버에서만 지원합니다.');
        if (options.supervisorHttp && (!options.supervisorHttpUser.trim() || !(options.supervisorHttpPass.trim() || options.supervisorSecretFile.trim()))) errors.push('웹 관리 사용자와 비밀번호 또는 비밀번호 파일을 입력하세요.');
        for (const prefix of ['status', 'supervisor']) {
            if (options[`${prefix}Http`] && !validBind(options[`${prefix}Bind`])) errors.push(`${prefix} HTTP 공개 주소는 IPv4 주소로 입력하세요.`);
        }
        if (options.statusHttp && options.supervisorHttp && (options.statusHttpPort === options.supervisorHttpPort || (options.statusHostPort === options.supervisorHostPort && (options.statusBind === options.supervisorBind || [options.statusBind, options.supervisorBind].includes('0.0.0.0'))))) errors.push('상태 조회와 웹 관리의 TCP 포트가 충돌합니다.');
        const argFlags = options.serverArgs.match(/(?:^|\s)-[A-Za-z]+/g)?.map(v => v.trim().toLowerCase()) || [];
        if (argFlags.includes('-preset') && fields.some(f => (f.modifier || f.worldKey) && options[f.key] !== '')) errors.push('추가 인수의 -preset을 위 월드 프리셋 항목으로 옮기세요. 프리셋은 개별 규칙보다 먼저 적용해야 합니다.');
        for (const flag of ['-name', '-world', '-port', '-password', '-public', '-crossplay', '-savedir']) if (argFlags.includes(flag)) errors.push(`${flag} 인수는 접속 설정과 저장 경로에서 관리하세요.`);
        for (const f of fields.filter(f => f.arg)) if (options[f.key] !== '' && argFlags.includes(`-${f.arg.toLowerCase()}`)) errors.push(`${f.env} 인수가 개별 설정과 중복됩니다.`);
        for (const f of fields.filter(f => f.modifier || f.worldKey)) {
            const pattern = f.modifier ? `-modifier\\s+${f.modifier}\\b` : `-setkey\\s+${f.worldKey}\\b`;
            if (options[f.key] !== '' && new RegExp(`(?:^|\\s)${pattern}`, 'i').test(options.serverArgs)) errors.push(`${f.env} 인수가 개별 설정과 중복됩니다.`);
        }
        try {
            const protectedKeys = new Set([
                ...fields.filter(isEnv).map(f => f.env.toUpperCase()), ...Object.keys(qolEnvironment).map(k => k.toUpperCase()),
                'SERVER_NAME', 'WORLD_NAME', 'SERVER_PASS', 'SERVER_PASS_FILE', 'SERVER_PORT', 'SERVER_PUBLIC', 'CROSSPLAY', 'SERVER_ARGS',
                'BEPINEX', 'VALHEIM_PLUS', 'SUPERVISOR_HTTP_PASS_FILE', 'VALHEIM_PLUS_CFG_ENV_PREFIX', 'BEPINEX_CFG_ENV_PREFIX'
            ]);
            for (const key of Object.keys(parseExtra(options.extraEnvironment))) {
                if (protectedKeys.has(key.toUpperCase())) errors.push(`${key}는 위 개별 설정에서 관리하는 항목과 중복됩니다.`);
                if (/^IDLE_DATAGRAM_(WINDOW|MAX_COUNT)$/.test(key)) errors.push(`${key}는 현재 이미지가 값을 고정하므로 환경변수로 변경할 수 없습니다.`);
                if (/^VPCFG_/i.test(key) && options.modMode !== 'valheimplus') errors.push(`${key}에는 ValheimPlus 로더가 필요합니다.`);
                if (/^BEPINEXCFG_/i.test(key) && options.modMode === 'vanilla') errors.push(`${key}에는 모드 로더가 필요합니다.`);
            }
        } catch (error) { errors.push(error.message); }
        return errors;
    }

    function validBind(value) {
        return /^\d{1,3}(\.\d{1,3}){3}$/.test(value) && value.split('.').every(part => Number(part) <= 255);
    }

    function validCron(value) {
        const parts = value.trim().split(/\s+/);
        const bounds = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 7]];
        return parts.length === 5 && parts.every((part, index) => part.split(',').every(term => {
            const match = term.match(/^(\*|\d+(?:-\d+)?)(?:\/(\d+))?$/);
            if (!match || (match[2] && Number(match[2]) < 1)) return false;
            if (match[1] === '*') return true;
            const values = match[1].split('-').map(Number);
            return values.every(v => v >= bounds[index][0] && v <= bounds[index][1]) && (values.length === 1 || values[0] <= values[1]);
        }));
    }

    function environment(options) {
        const env = {};
        for (const f of fields.filter(isEnv)) {
            if (f.omitEmpty && !options[f.key].trim()) continue;
            if (f.key === 'supervisorHttpPass' && options.supervisorSecretFile.trim()) continue;
            env[f.env] = options[f.key];
        }
        env.SERVER_ARGS = argumentsFor(options);
        env.BEPINEX = options.modMode === 'bepinex';
        env.VALHEIM_PLUS = options.modMode === 'valheimplus';
        if (options.supervisorSecretFile.trim()) env.SUPERVISOR_HTTP_PASS_FILE = '/run/secrets/supervisor_pass';
        return { ...env, ...parseExtra(options.extraEnvironment) };
    }

    const api = { image, groups, fields, defaults, parseExtra, argumentsFor, validate, validCron, environment };
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    root.ValheimSettings = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
