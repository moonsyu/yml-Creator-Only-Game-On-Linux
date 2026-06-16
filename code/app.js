const defaultDraftState = {
    creator: 'thijsvanloef',
    connection: {
        serverName: "팰월드 서버",
        serverPassword: "",
        adminPassword: "",
        publicConnection: false,
        publicIp: "",
        publicPort: 8211,
        community: false,
        gamePort: 8211,
        restApi: false,
        restApiPort: 8212,
        rcon: false,
        rconPort: 25575,
        queryPort: 27015
    },
    serverOptions: {
        players: null,
        difficulty: "None",
        expRate: 1.0,
        palCaptureRate: 1.0,
        palSpawnNumRate: 1.0,
        dayTimeSpeedRate: 1.0,
        nightTimeSpeedRate: 1.0,
        playerDamageRateAttack: 1.0,
        playerDamageRateDefense: 1.0,
        palDamageRateAttack: 1.0,
        palDamageRateDefense: 1.0,
        collectionDropRate: 1.0,
        enemyDropItemRate: 1.0,
        workSpeedRate: 1.0,
        palEggDefaultHatchingTime: 72,
        dropItemMaxNum: 3000,
        baseCampWorkerMaxNum: 15,
        guildPlayerMaxNum: 20,
        deathPenalty: "All",
        crossplayPlatforms: "(Steam,Xbox,PS5,Mac)",
        useAuth: true,
        isPvp: false,
        enableFriendlyFire: false,
        enableInvaderEnemy: true,
        enableFastTravel: true,
        
        randomizerType: "None",
        randomizerSeed: "",
        isRandomizerPalLevelRandom: false,
        playerStomachDecreaseRate: 1.0,
        playerStaminaDecreaseRate: 1.0,
        playerAutoHpRegenRate: 1.0,
        playerAutoHpRegenRateInSleep: 1.0,
        palStomachDecreaseRate: 1.0,
        palStaminaDecreaseRate: 1.0,
        palAutoHpRegenRate: 1.0,
        palAutoHpRegenRateInSleep: 1.0,
        enablePlayerToPlayerDamage: false,
        activeUnko: false,
        enableAimAssistPad: true,
        enableAimAssistKeyboard: false,
        dropItemMaxNumUnko: 100,
        baseCampMaxNum: 128,
        dropItemAliveMaxHours: 1.0,
        autoResetGuildNoOnlinePlayers: false,
        autoResetGuildTimeNoOnlinePlayers: 72.0,
        characterRecreateInHardcore: false,
        hardcore: false,
        palLost: false,
        canPickupOtherGuildDeathPenaltyDrop: false,
        enableNonLoginPenalty: true,
        isStartLocationSelectByMap: true,
        existPlayerAfterLogout: false,
        enableDefenseOtherGuildPlayer: false,
        invisibleOtherGuildBaseCampAreaFx: false,
        buildAreaLimit: false,
        itemWeightRate: 1.0,
        coopPlayerMaxNum: 4,
        autoSaveSpan: 30.0,
        useBackupSaveData: true,
        supplyDropSpan: 180,
        chatPostLimitPerMinute: 10,
        showPlayerList: false,
        banListUrl: "https://api.palworldgame.com/api/banlist.txt",
        enablePredatorBossPal: true,
        maxBuildingLimitNum: 0,
        serverReplicatePawnCullDistance: 15000.0,
        equipmentDurabilityDamageRate: 1.0,
        itemContainerForceMarkDirtyInterval: 10.0,
        allowGlobalPalboxExport: false,
        allowGlobalPalboxImport: false,
        puid: 1000,
        pgid: 1000,
        timezone: "UTC",
        serverDescription: "",
        buildObjectHpRate: 1.0,
        buildObjectDamageRate: 1.0,
        buildObjectDeteriorationDamageRate: 1.0,
        collectionObjectHpRate: 1.0,
        collectionObjectRespawnSpeedRate: 1.0,
        baseCampMaxNumInGuild: 4,
        isMultiplay: true,
        region: "",
        
        t_updateOnBoot: true,
        t_multithreading: false,
        t_backupEnabled: true,
        t_deleteOldBackups: false,
        t_oldBackupDays: 30,
        t_autoRebootEnabled: false,
        t_autoRebootCronExpression: "0 0 * * *",
        t_autoRebootWarnMinutes: 5,
        t_logFormatType: "default",
        t_autoUpdateEnabled: false,
        t_autoUpdateCronExpression: "0 * * * *",
        t_autoUpdateWarnMinutes: 30,
        t_autoRebootEvenIfPlayersOnline: false,
        t_itemCorruptionMultiplier: 1.0,
        t_disableGenerateSettings: false,
        t_disableGenerateEngine: false,
        t_enablePlayerLogging: true,
        t_playerLoggingPollPeriod: 5,
        t_logFilterEnabled: false,
        t_autoPauseEnabled: false,
        t_autoPauseTimeoutEst: 3600,
        t_autoPauseLog: false,
        t_autoPauseDebug: false,
        t_useDepotDownloader: false,
        t_installBetaInsider: false,
        t_serverReplicatePawnCullDistanceInBaseCamp: 3000.0,
        t_box64DynarecStrongmem: "",
        t_box64DynarecBigblock: "",
        t_box64DynarecSafeflags: "",
        t_box64DynarecFastround: "",
        t_box64DynarecFastnan: "",
        t_box64DynarecX87double: "",

        j_alwaysUpdateOnStart: true,
        j_steamcmdValidateFiles: true,
        j_multithreadEnabled: true,
        j_backupEnabled: true,
        j_backupRetentionPolicy: true,
        j_backupRetentionAmountToKeep: 72,
        j_backupCronExpression: "0 * * * *",
        j_restartEnabled: false,
        j_restartCronExpression: "0 18 * * *",
        j_netServerMaxTickRate: 120,
        j_logFormatType: "Text",
        j_backupAnnounceMessagesEnabled: true,
        j_restartDebugOverride: false,
        j_rconPlayerDetection: true,
        j_rconPlayerDebug: false,
        j_rconPlayerDetectionStartupDelay: 60,
        j_rconPlayerDetectionCheckInterval: 15,
        j_serverSettingsMode: "auto",
        j_customScriptEnabled: false,
        j_customScriptPath: "/palworld/scripts/custom_script.sh",
        j_webhookEnabled: false,
        j_webhookDebugEnabled: false,
        j_webhookUrl: "",
        j_webhookContentTitle: "Palworld Server",
        j_webhookInfoTitle: "Info",
        j_webhookInfoDescription: "This is an info message",
        j_webhookInfoColor: "2829617",
        j_webhookInstallTitle: "Installing",
        j_webhookInstallDescription: "Server is installing / updating",
        j_webhookInstallColor: "2829617",
        j_webhookRestartTitle: "Restarting",
        j_webhookRestartDescription: "Server is restarting",
        j_webhookRestartColor: "16753920",
        j_webhookStartTitle: "Starting",
        j_webhookStartDescription: "Server is starting",
        j_webhookStartColor: "65280",
        j_webhookStopTitle: "Stopping",
        j_webhookStopDescription: "Server is stopping",
        j_webhookStopColor: "16711680",
        j_webhookUpdateTitle: "Updating",
        j_webhookUpdateDescription: "Server is updating",
        j_webhookUpdateColor: "2829617"
    },
    volume: {
        hostPath: "./pal_server"
    }
};

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function isEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

const state = {
    draft: clone(defaultDraftState),
    applied: clone(defaultDraftState)
};

const OPTIONS_SCHEMA = {
    common: [
        { key: 'players', label: '최대 플레이어 수', envT: 'PLAYERS', envJ: 'MAX_PLAYERS', type: 'number', min: 1, max: 32, step: 1 },
        { key: 'difficulty', label: '난이도', envT: 'DIFFICULTY', envJ: 'DIFFICULTY', type: 'text', helper: 'None, Normal, Difficult' },
        { key: 'expRate', label: '경험치 배율', envT: 'EXP_RATE', envJ: 'EXP_RATE', type: 'number', min: 0.1, max: 20, step: 0.1 },
        { key: 'palCaptureRate', label: '팰 포획 배율', envT: 'PAL_CAPTURE_RATE', envJ: 'PAL_CAPTURE_RATE', type: 'number', min: 0.1, max: 10, step: 0.1 },
        { key: 'palSpawnNumRate', label: '팰 출현 배율', envT: 'PAL_SPAWN_NUM_RATE', envJ: 'PAL_SPAWN_NUM_RATE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'dayTimeSpeedRate', label: '낮 시간 속도', envT: 'DAYTIME_SPEEDRATE', envJ: 'DAYTIME_SPEEDRATE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'nightTimeSpeedRate', label: '밤 시간 속도', envT: 'NIGHTTIME_SPEEDRATE', envJ: 'NIGHTTIME_SPEEDRATE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'playerDamageRateAttack', label: '플레이어 공격 배율', envT: 'PLAYER_DAMAGE_RATE_ATTACK', envJ: 'PLAYER_DAMAGE_RATE_ATTACK', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'playerDamageRateDefense', label: '플레이어 방어 배율', envT: 'PLAYER_DAMAGE_RATE_DEFENSE', envJ: 'PLAYER_DAMAGE_RATE_DEFENSE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'palDamageRateAttack', label: '팰 공격 배율', envT: 'PAL_DAMAGE_RATE_ATTACK', envJ: 'PAL_DAMAGE_RATE_ATTACK', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'palDamageRateDefense', label: '팰 방어 배율', envT: 'PAL_DAMAGE_RATE_DEFENSE', envJ: 'PAL_DAMAGE_RATE_DEFENSE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'collectionDropRate', label: '채집 드롭 배율', envT: 'COLLECTION_DROP_RATE', envJ: 'COLLECTION_DROP_RATE', type: 'number', min: 0.1, max: 10, step: 0.1 },
        { key: 'enemyDropItemRate', label: '적 드롭 배율', envT: 'ENEMY_DROP_ITEM_RATE', envJ: 'ENEMY_DROP_ITEM_RATE', type: 'number', min: 0.1, max: 10, step: 0.1 },
        { key: 'workSpeedRate', label: '작업 속도 배율', envT: 'WORK_SPEED_RATE', envJ: 'WORK_SPEED_RATE', type: 'number', min: 0.1, max: 10, step: 0.1 },
        { key: 'palEggDefaultHatchingTime', label: '알 부화 시간', envT: 'PAL_EGG_DEFAULT_HATCHING_TIME', envJ: 'PAL_EGG_DEFAULT_HATCHING_TIME', type: 'number', min: 0, max: 240, step: 1 },
        { key: 'dropItemMaxNum', label: '드롭 아이템 최대 수', envT: 'DROP_ITEM_MAX_NUM', envJ: 'DROP_ITEM_MAX_NUM', type: 'number', min: 0, max: 10000, step: 100 },
        { key: 'baseCampWorkerMaxNum', label: '거점 작업 팰 수', envT: 'BASE_CAMP_WORKER_MAX_NUM', envJ: 'BASE_CAMP_WORKER_MAXNUM', type: 'number', min: 1, max: 50, step: 1 },
        { key: 'guildPlayerMaxNum', label: '길드 최대 인원', envT: 'GUILD_PLAYER_MAX_NUM', envJ: 'GUILD_PLAYER_MAX_NUM', type: 'number', min: 1, max: 100, step: 1 },
        { key: 'deathPenalty', label: '사망 패널티', envT: 'DEATH_PENALTY', envJ: 'DEATH_PENALTY', type: 'text', helper: 'None, Item, ItemAndEquipment, All' },
        { key: 'crossplayPlatforms', label: '크로스플레이 플랫폼', envT: 'CROSSPLAY_PLATFORMS', envJ: 'CROSSPLAY_PLATFORMS', type: 'text' },
        { key: 'useAuth', label: '서버 인증 사용', envT: 'USEAUTH', envJ: 'USEAUTH', type: 'boolean' },
        { key: 'isPvp', label: 'PVP 사용', envT: 'IS_PVP', envJ: 'IS_PVP', type: 'boolean' },
        { key: 'enableFriendlyFire', label: '아군 피해 허용', envT: 'ENABLE_FRIENDLY_FIRE', envJ: 'ENABLE_FRIENDLY_FIRE', type: 'boolean' },
        { key: 'enableInvaderEnemy', label: '침입 이벤트 허용', envT: 'ENABLE_INVADER_ENEMY', envJ: 'ENABLE_INVADER_ENEMY', type: 'boolean' },
        { key: 'enableFastTravel', label: '빠른 이동 허용', envT: 'ENABLE_FAST_TRAVEL', envJ: 'ENABLE_FAST_TRAVEL', type: 'boolean' },
        { key: 'randomizerType', label: '랜더마이저 유형', envT: 'RANDOMIZER_TYPE', envJ: 'RANDOMIZER_TYPE', type: 'text', helper: 'None 등' },
        { key: 'randomizerSeed', label: '랜더마이저 시드', envT: 'RANDOMIZER_SEED', envJ: 'RANDOMIZER_SEED', type: 'text' },
        { key: 'isRandomizerPalLevelRandom', label: '랜더마이저 팰 레벨 랜덤', envT: 'IS_RANDOMIZER_PAL_LEVEL_RANDOM', envJ: 'IS_RANDOMIZER_PAL_LEVEL_RANDOM', type: 'boolean' },
        { key: 'playerStomachDecreaseRate', label: '플레이어 배고픔 감소율', envT: 'PLAYER_STOMACH_DECREASE_RATE', envJ: 'PLAYER_STOMACH_DECREASE_RATE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'playerStaminaDecreaseRate', label: '플레이어 스태미나 감소율', envT: 'PLAYER_STAMINA_DECREASE_RATE', envJ: 'PLAYER_STAMINA_DECREACE_RATE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'playerAutoHpRegenRate', label: '플레이어 자동 HP 회복율', envT: 'PLAYER_AUTO_HP_REGEN_RATE', envJ: 'PLAYER_AUTO_HP_REGENE_RATE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'playerAutoHpRegenRateInSleep', label: '수면 시 플레이어 자동 HP 회복율', envT: 'PLAYER_AUTO_HP_REGEN_RATE_IN_SLEEP', envJ: 'PLAYER_AUTO_HP_REGENE_RATE_IN_SLEEP', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'palStomachDecreaseRate', label: '팰 배고픔 감소율', envT: 'PAL_STOMACH_DECREASE_RATE', envJ: 'PAL_STOMACH_DECREACE_RATE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'palStaminaDecreaseRate', label: '팰 스태미나 감소율', envT: 'PAL_STAMINA_DECREASE_RATE', envJ: 'PAL_STAMINA_DECREACE_RATE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'palAutoHpRegenRate', label: '팰 자동 HP 회복율', envT: 'PAL_AUTO_HP_REGEN_RATE', envJ: 'PAL_AUTO_HP_REGENE_RATE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'palAutoHpRegenRateInSleep', label: '수면 시 팰 자동 HP 회복율', envT: 'PAL_AUTO_HP_REGEN_RATE_IN_SLEEP', envJ: 'PAL_AUTO_HP_REGENE_RATE_IN_SLEEP', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'enablePlayerToPlayerDamage', label: '플레이어 간 데미지', envT: 'ENABLE_PLAYER_TO_PLAYER_DAMAGE', envJ: 'ENABLE_PLAYER_TO_PLAYER_DAMAGE', type: 'boolean' },
        { key: 'activeUnko', label: '운코(배설물) 활성화', envT: 'ACTIVE_UNKO', envJ: 'ACTIVE_UNKO', type: 'boolean' },
        { key: 'enableAimAssistPad', label: '패드 조준 보정', envT: 'ENABLE_AIM_ASSIST_PAD', envJ: 'ENABLE_AIM_ASSIST_PAD', type: 'boolean' },
        { key: 'enableAimAssistKeyboard', label: '키보드 조준 보정', envT: 'ENABLE_AIM_ASSIST_KEYBOARD', envJ: 'ENABLE_AIM_ASSIST_KEYBOARD', type: 'boolean' },
        { key: 'dropItemMaxNumUnko', label: '운코 최대 드롭 수', envT: 'DROP_ITEM_MAX_NUM_UNKO', envJ: 'DROP_ITEM_MAX_NUM_UNKO', type: 'number', min: 0, max: 1000, step: 10 },
        { key: 'baseCampMaxNum', label: '거점 최대 수', envT: 'BASE_CAMP_MAX_NUM', envJ: 'BASE_CAMP_MAX_NUM', type: 'number', min: 0, max: 10000, step: 1 },
        { key: 'dropItemAliveMaxHours', label: '드롭 아이템 유지 시간', envT: 'DROP_ITEM_ALIVE_MAX_HOURS', envJ: 'DROP_ITEM_ALIVE_MAX_HOURS', type: 'number', min: 0, max: 24, step: 0.5 },
        { key: 'autoResetGuildNoOnlinePlayers', label: '미접속 길드 자동 초기화', envT: 'AUTO_RESET_GUILD_NO_ONLINE_PLAYERS', envJ: 'AUTO_RESET_GUILD_NO_ONLINE_PLAYERS', type: 'boolean' },
        { key: 'autoResetGuildTimeNoOnlinePlayers', label: '길드 초기화 미접속 시간', envT: 'AUTO_RESET_GUILD_TIME_NO_ONLINE_PLAYERS', envJ: 'AUTO_RESET_GUILD_TIME_NO_ONLINE_PLAYERS', type: 'number', min: 0, max: 720, step: 1 },
        { key: 'characterRecreateInHardcore', label: '하드코어 캐릭터 재생성', envT: 'CHARACTER_RECREATE_IN_HARDCORE', envJ: 'CHARACTER_RECREATE_IN_HARDCORE', type: 'boolean' },
        { key: 'hardcore', label: '하드코어', envT: 'HARDCORE', envJ: 'HARDCORE', type: 'boolean' },
        { key: 'palLost', label: '팰 로스트', envT: 'PAL_LOST', envJ: 'PAL_LOST', type: 'boolean' },
        { key: 'canPickupOtherGuildDeathPenaltyDrop', label: '타 길드 사망 페널티 줍기', envT: 'CAN_PICKUP_OTHER_GUILD_DEATH_PENALTY_DROP', envJ: 'CAN_PICKUP_OTHER_GUILD_DEATH_PENALTY_DROP', type: 'boolean' },
        { key: 'enableNonLoginPenalty', label: '미로그인 페널티 활성화', envT: 'ENABLE_NON_LOGIN_PENALTY', envJ: 'ENABLE_NON_LOGIN_PENALTY', type: 'boolean' },
        { key: 'isStartLocationSelectByMap', label: '맵에서 시작 위치 선택', envT: 'IS_START_LOCATION_SELECT_BY_MAP', envJ: 'IS_START_LOCATION_SELECT_BY_MAP', type: 'boolean' },
        { key: 'existPlayerAfterLogout', label: '로그아웃 후 플레이어 잔류', envT: 'EXIST_PLAYER_AFTER_LOGOUT', envJ: 'EXIST_PLAYER_AFTER_LOGOUT', type: 'boolean' },
        { key: 'enableDefenseOtherGuildPlayer', label: '타 길드 플레이어 방어', envT: 'ENABLE_DEFENSE_OTHER_GUILD_PLAYER', envJ: 'ENABLE_DEFENSE_OTHER_GUILD_PLAYER', type: 'boolean' },
        { key: 'invisibleOtherGuildBaseCampAreaFx', label: '타 길드 거점 영역 효과 숨김', envT: 'INVISIBLE_OTHER_GUILD_BASE_CAMP_AREA_FX', envJ: 'INVISBIBLE_OTHER_GUILD_BASE_CAMP_AREA_FX', type: 'boolean' },
        { key: 'buildAreaLimit', label: '건축 영역 제한', envT: 'BUILD_AREA_LIMIT', envJ: 'BUILD_AREA_LIMIT', type: 'boolean' },
        { key: 'itemWeightRate', label: '아이템 무게 비율', envT: 'ITEM_WEIGHT_RATE', envJ: 'ITEM_WEIGHT_RATE', type: 'number', min: 0.1, max: 10, step: 0.1 },
        { key: 'coopPlayerMaxNum', label: '협동 플레이 최대 인원', envT: 'COOP_PLAYER_MAX_NUM', envJ: 'COOP_PLAYER_MAX_NUM', type: 'number', min: 1, max: 32, step: 1 },
        { key: 'autoSaveSpan', label: '자동 저장 간격', envT: 'AUTO_SAVE_SPAN', envJ: 'AUTO_SAVE_SPAN', type: 'number', min: 1, max: 3600, step: 10 },
        { key: 'useBackupSaveData', label: '백업 저장 데이터 사용', envT: 'USE_BACKUP_SAVE_DATA', envJ: 'ENABLE_WORLD_BACKUP', type: 'boolean' },
        { key: 'supplyDropSpan', label: '보급품 낙하 간격', envT: 'SUPPLY_DROP_SPAN', envJ: 'SUPPLY_DROP_SPAN', type: 'number', min: 1, max: 1000, step: 1 },
        { key: 'chatPostLimitPerMinute', label: '분당 채팅 제한', envT: 'CHAT_POST_LIMIT_PER_MINUTE', envJ: 'CHAT_POST_LIMIT_PER_MINUTE', type: 'number', min: 1, max: 1000, step: 1 },
        { key: 'showPlayerList', label: '플레이어 목록 표시', envT: 'SHOW_PLAYER_LIST', envJ: 'SHOW_PLAYER_LIST', type: 'boolean' },
        { key: 'banListUrl', label: '밴 목록 URL', envT: 'BAN_LIST_URL', envJ: 'BAN_LIST_URL', type: 'text' },
        { key: 'enablePredatorBossPal', label: '포식자 보스 팰 활성화', envT: 'ENABLE_PREDATOR_BOSS_PAL', envJ: 'ENABLE_PREDATOR_BOSS_PAL', type: 'boolean' },
        { key: 'maxBuildingLimitNum', label: '최대 건물 제한 수', envT: 'MAX_BUILDING_LIMIT_NUM', envJ: 'MAX_BUILDING_LIMIT_NUM', type: 'number', min: 1, max: 100000, step: 100 },
        { key: 'serverReplicatePawnCullDistance', label: '서버 복제 폰 컬링 거리', envT: 'SERVER_REPLICATE_PAWN_CULL_DISTANCE', envJ: 'SERVER_REPLICATE_PAWN_CULL_DISTANCE', type: 'number', min: 1, max: 100000, step: 100 },
        { key: 'equipmentDurabilityDamageRate', label: '장비 내구도 손상 비율', envT: 'EQUIPMENT_DURABILITY_DAMAGE_RATE', envJ: 'EQUIPMENT_DURABILITY_DAMAGE_RATE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'itemContainerForceMarkDirtyInterval', label: '아이템 컨테이너 강제 갱신 간격', envT: 'ITEM_CONTAINER_FORCE_MARK_DIRTY_INTERVAL', envJ: 'ITEM_CONTAINER_FORCE_MARK_DIRTY_INTERVAL', type: 'number', min: 0.1, max: 60, step: 0.1 },
        { key: 'allowGlobalPalboxExport', label: '팰 박스 내보내기 허용', envT: 'ALLOW_GLOBAL_PALBOX_EXPORT', envJ: 'ALLOW_GLOBAL_PALBOX_EXPORT', type: 'boolean' },
        { key: 'allowGlobalPalboxImport', label: '팰 박스 가져오기 허용', envT: 'ALLOW_GLOBAL_PALBOX_IMPORT', envJ: 'ALLOW_GLOBAL_PALBOX_IMPORT', type: 'boolean' },
        { key: 'puid', label: '컨테이너 사용자 ID', envT: 'PUID', envJ: 'PUID', type: 'number', min: 0, max: 65535, step: 1 },
        { key: 'pgid', label: '컨테이너 그룹 ID', envT: 'PGID', envJ: 'PGID', type: 'number', min: 0, max: 65535, step: 1 },
        { key: 'timezone', label: '타임존', envT: 'TZ', envJ: 'TZ', type: 'text', helper: 'UTC, Asia/Seoul 등' },
        { key: 'serverDescription', label: '서버 설명', envT: 'SERVER_DESCRIPTION', envJ: 'SERVER_DESCRIPTION', type: 'text' },
        { key: 'buildObjectHpRate', label: '건축물 HP 비율', envT: 'BUILD_OBJECT_HP_RATE', envJ: 'BUILD_OBJECT_HP_RATE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'buildObjectDamageRate', label: '건축물 데미지 비율', envT: 'BUILD_OBJECT_DAMAGE_RATE', envJ: 'BUILD_OBJECT_DAMAGE_RATE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'buildObjectDeteriorationDamageRate', label: '건축물 열화 데미지 비율', envT: 'BUILD_OBJECT_DETERIORATION_DAMAGE_RATE', envJ: 'BUILD_OBJECT_DETERIORATION_DAMAGE_RATE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'collectionObjectHpRate', label: '채집물 HP 비율', envT: 'COLLECTION_OBJECT_HP_RATE', envJ: 'COLLECTION_OBJECT_HP_RATE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'collectionObjectRespawnSpeedRate', label: '채집물 리스폰 속도 비율', envT: 'COLLECTION_OBJECT_RESPAWN_SPEED_RATE', envJ: 'COLLECTION_OBJECT_RESPAWN_SPEED_RATE', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 'baseCampMaxNumInGuild', label: '길드 당 최대 거점 수', envT: 'BASE_CAMP_MAX_NUM_IN_GUILD', envJ: 'BASE_CAMP_MAX_NUM_IN_GUILD', type: 'number', min: 1, max: 10, step: 1 },
        { key: 'isMultiplay', label: '멀티플레이 여부', envT: 'IS_MULTIPLAY', envJ: 'IS_MULTIPLAY', type: 'boolean' },
        { key: 'region', label: '지역', envT: 'REGION', envJ: 'REGION', type: 'text' }
    ],
    thijsvanloef: [
        { key: 't_updateOnBoot', label: '시작 시 업데이트', env: 'UPDATE_ON_BOOT', type: 'boolean' },
        { key: 't_multithreading', label: '멀티스레드 사용', env: 'MULTITHREADING', type: 'boolean' },
        { key: 't_backupEnabled', label: '자동 백업', env: 'BACKUP_ENABLED', type: 'boolean' },
        { key: 't_deleteOldBackups', label: '오래된 백업 삭제', env: 'DELETE_OLD_BACKUPS', type: 'boolean' },
        { key: 't_oldBackupDays', label: '백업 보존 일수', env: 'OLD_BACKUP_DAYS', type: 'number', min: 1, max: 365, step: 1 },
        { key: 't_autoRebootEnabled', label: '자동 재부팅', env: 'AUTO_REBOOT_ENABLED', type: 'boolean' },
        { key: 't_autoRebootCronExpression', label: '재부팅 스케줄', env: 'AUTO_REBOOT_CRON_EXPRESSION', type: 'text', helper: 'Cron 표현식 (예: 0 0 * * *)' },
        { key: 't_autoRebootWarnMinutes', label: '재부팅 경고 분', env: 'AUTO_REBOOT_WARN_MINUTES', type: 'number', min: 1, max: 60, step: 1 },
        { key: 't_logFormatType', label: '로그 형식', env: 'LOG_FORMAT_TYPE', type: 'text', helper: 'default, logfmt, json 등' },
        { key: 't_autoUpdateEnabled', label: '자동 업데이트', env: 'AUTO_UPDATE_ENABLED', type: 'boolean' },
        { key: 't_autoUpdateCronExpression', label: '자동 업데이트 스케줄', env: 'AUTO_UPDATE_CRON_EXPRESSION', type: 'text', helper: 'Cron 표현식' },
        { key: 't_autoUpdateWarnMinutes', label: '자동 업데이트 경고 분', env: 'AUTO_UPDATE_WARN_MINUTES', type: 'number', min: 1, max: 60, step: 1 },
        { key: 't_autoRebootEvenIfPlayersOnline', label: '플레이어 접속 중에도 재부팅', env: 'AUTO_REBOOT_EVEN_IF_PLAYERS_ONLINE', type: 'boolean' },
        { key: 't_itemCorruptionMultiplier', label: '아이템 부패 배수', env: 'ITEM_CORRUPTION_MULTIPLIER', type: 'number', min: 0.1, max: 5, step: 0.1 },
        { key: 't_disableGenerateSettings', label: '설정 생성 비활성화', env: 'DISABLE_GENERATE_SETTINGS', type: 'boolean' },
        { key: 't_disableGenerateEngine', label: '엔진 생성 비활성화', env: 'DISABLE_GENERATE_ENGINE', type: 'boolean' },
        { key: 't_enablePlayerLogging', label: '플레이어 로깅 활성화', env: 'ENABLE_PLAYER_LOGGING', type: 'boolean' },
        { key: 't_playerLoggingPollPeriod', label: '플레이어 로깅 확인 주기', env: 'PLAYER_LOGGING_POLL_PERIOD', type: 'number', min: 1, max: 3600, step: 1 },
        { key: 't_logFilterEnabled', label: '로그 필터 활성화', env: 'LOG_FILTER_ENABLED', type: 'boolean' },
        { key: 't_autoPauseEnabled', label: '자동 일시정지 활성화', env: 'AUTO_PAUSE_ENABLED', type: 'boolean' },
        { key: 't_autoPauseTimeoutEst', label: '자동 일시정지 타임아웃 (초)', env: 'AUTO_PAUSE_TIMEOUT_EST', type: 'number', min: 10, max: 86400, step: 10 },
        { key: 't_autoPauseLog', label: '자동 일시정지 로그', env: 'AUTO_PAUSE_LOG', type: 'boolean' },
        { key: 't_autoPauseDebug', label: '자동 일시정지 디버그', env: 'AUTO_PAUSE_DEBUG', type: 'boolean' },
        { key: 't_useDepotDownloader', label: 'Depot Downloader 사용', env: 'USE_DEPOT_DOWNLOADER', type: 'boolean' },
        { key: 't_installBetaInsider', label: 'Beta/Insider 설치', env: 'INSTALL_BETA_INSIDER', type: 'boolean' },
        { key: 't_serverReplicatePawnCullDistanceInBaseCamp', label: '거점 내 폰 컬링 거리', env: 'SERVER_REPLICATE_PAWN_CULL_DISTANCE_IN_BASE_CAMP', type: 'number', min: 1, max: 100000, step: 100 },
        { key: 't_box64DynarecStrongmem', label: 'Box64 DYNAREC_STRONGMEM', env: 'BOX64_DYNAREC_STRONGMEM', type: 'text' },
        { key: 't_box64DynarecBigblock', label: 'Box64 DYNAREC_BIGBLOCK', env: 'BOX64_DYNAREC_BIGBLOCK', type: 'text' },
        { key: 't_box64DynarecSafeflags', label: 'Box64 DYNAREC_SAFEFLAGS', env: 'BOX64_DYNAREC_SAFEFLAGS', type: 'text' },
        { key: 't_box64DynarecFastround', label: 'Box64 DYNAREC_FASTROUND', env: 'BOX64_DYNAREC_FASTROUND', type: 'text' },
        { key: 't_box64DynarecFastnan', label: 'Box64 DYNAREC_FASTNAN', env: 'BOX64_DYNAREC_FASTNAN', type: 'text' },
        { key: 't_box64DynarecX87double', label: 'Box64 DYNAREC_X87DOUBLE', env: 'BOX64_DYNAREC_X87DOUBLE', type: 'text' }
    ],
    jammsen: [
        { key: 'j_alwaysUpdateOnStart', label: '시작 시 업데이트', env: 'ALWAYS_UPDATE_ON_START', type: 'boolean' },
        { key: 'j_steamcmdValidateFiles', label: '서버 파일 검증', env: 'STEAMCMD_VALIDATE_FILES', type: 'boolean' },
        { key: 'j_multithreadEnabled', label: '멀티스레드 사용', env: 'MULTITHREAD_ENABLED', type: 'boolean' },
        { key: 'j_backupEnabled', label: '자동 백업', env: 'BACKUP_ENABLED', type: 'boolean' },
        { key: 'j_backupRetentionPolicy', label: '오래된 백업 삭제', env: 'BACKUP_RETENTION_POLICY', type: 'boolean' },
        { key: 'j_backupRetentionAmountToKeep', label: '백업 보존 개수', env: 'BACKUP_RETENTION_AMOUNT_TO_KEEP', type: 'number', min: 1, max: 100, step: 1 },
        { key: 'j_backupCronExpression', label: '백업 스케줄', env: 'BACKUP_CRON_EXPRESSION', type: 'text', helper: 'Cron 표현식' },
        { key: 'j_restartEnabled', label: '자동 재부팅', env: 'RESTART_ENABLED', type: 'boolean' },
        { key: 'j_restartCronExpression', label: '재부팅 스케줄', env: 'RESTART_CRON_EXPRESSION', type: 'text', helper: 'Cron 표현식' },
        { key: 'j_netServerMaxTickRate', label: '엔진 틱레이트', env: 'NETSERVERMAXTICKRATE', type: 'number', min: 30, max: 120, step: 1, helper: '권장 범위: 30~120' },
        { key: 'j_logFormatType', label: '로그 형식', env: 'LOG_FORMAT_TYPE', type: 'text' },
        { key: 'j_backupAnnounceMessagesEnabled', label: '백업 알림 메시지', env: 'BACKUP_ANNOUNCE_MESSAGES_ENABLED', type: 'boolean' },
        { key: 'j_restartDebugOverride', label: '재시작 디버그 오버라이드', env: 'RESTART_DEBUG_OVERRIDE', type: 'boolean' },
        { key: 'j_rconPlayerDetection', label: 'RCON 플레이어 감지', env: 'RCON_PLAYER_DETECTION', type: 'boolean' },
        { key: 'j_rconPlayerDebug', label: 'RCON 플레이어 디버그', env: 'RCON_PLAYER_DEBUG', type: 'boolean' },
        { key: 'j_rconPlayerDetectionStartupDelay', label: 'RCON 감지 시작 지연', env: 'RCON_PLAYER_DETECTION_STARTUP_DELAY', type: 'number', min: 1, max: 3600, step: 1 },
        { key: 'j_rconPlayerDetectionCheckInterval', label: 'RCON 감지 확인 간격', env: 'RCON_PLAYER_DETECTION_CHECK_INTERVAL', type: 'number', min: 1, max: 3600, step: 1 },
        { key: 'j_serverSettingsMode', label: '서버 설정 모드', env: 'SERVER_SETTINGS_MODE', type: 'text', helper: 'auto, manual, rcononly' },
        { key: 'j_customScriptEnabled', label: '사용자 지정 스크립트 활성화', env: 'CUSTOM_SCRIPT_ENABLED', type: 'boolean' },
        { key: 'j_customScriptPath', label: '사용자 지정 스크립트 경로', env: 'CUSTOM_SCRIPT_PATH', type: 'text' },
        { key: 'j_webhookEnabled', label: '웹훅 활성화', env: 'WEBHOOK_ENABLED', type: 'boolean' },
        { key: 'j_webhookDebugEnabled', label: '웹훅 디버그 활성화', env: 'WEBHOOK_DEBUG_ENABLED', type: 'boolean' },
        { key: 'j_webhookUrl', label: '웹훅 URL', env: 'WEBHOOK_URL', type: 'text' },
        { key: 'j_webhookContentTitle', label: '웹훅 콘텐츠 제목', env: 'WEBHOOK_CONTENT_TITLE', type: 'text' },
        { key: 'j_webhookInfoTitle', label: '웹훅 Info 제목', env: 'WEBHOOK_INFO_TITLE', type: 'text' },
        { key: 'j_webhookInfoDescription', label: '웹훅 Info 설명', env: 'WEBHOOK_INFO_DESCRIPTION', type: 'text' },
        { key: 'j_webhookInfoColor', label: '웹훅 Info 색상', env: 'WEBHOOK_INFO_COLOR', type: 'text' },
        { key: 'j_webhookInstallTitle', label: '웹훅 Install 제목', env: 'WEBHOOK_INSTALL_TITLE', type: 'text' },
        { key: 'j_webhookInstallDescription', label: '웹훅 Install 설명', env: 'WEBHOOK_INSTALL_DESCRIPTION', type: 'text' },
        { key: 'j_webhookInstallColor', label: '웹훅 Install 색상', env: 'WEBHOOK_INSTALL_COLOR', type: 'text' },
        { key: 'j_webhookRestartTitle', label: '웹훅 Restart 제목', env: 'WEBHOOK_RESTART_TITLE', type: 'text' },
        { key: 'j_webhookRestartDescription', label: '웹훅 Restart 설명', env: 'WEBHOOK_RESTART_DESCRIPTION', type: 'text' },
        { key: 'j_webhookRestartColor', label: '웹훅 Restart 색상', env: 'WEBHOOK_RESTART_COLOR', type: 'text' },
        { key: 'j_webhookStartTitle', label: '웹훅 Start 제목', env: 'WEBHOOK_START_TITLE', type: 'text' },
        { key: 'j_webhookStartDescription', label: '웹훅 Start 설명', env: 'WEBHOOK_START_DESCRIPTION', type: 'text' },
        { key: 'j_webhookStartColor', label: '웹훅 Start 색상', env: 'WEBHOOK_START_COLOR', type: 'text' },
        { key: 'j_webhookStopTitle', label: '웹훅 Stop 제목', env: 'WEBHOOK_STOP_TITLE', type: 'text' },
        { key: 'j_webhookStopDescription', label: '웹훅 Stop 설명', env: 'WEBHOOK_STOP_DESCRIPTION', type: 'text' },
        { key: 'j_webhookStopColor', label: '웹훅 Stop 색상', env: 'WEBHOOK_STOP_COLOR', type: 'text' },
        { key: 'j_webhookUpdateTitle', label: '웹훅 Update 제목', env: 'WEBHOOK_UPDATE_TITLE', type: 'text' },
        { key: 'j_webhookUpdateDescription', label: '웹훅 Update 설명', env: 'WEBHOOK_UPDATE_DESCRIPTION', type: 'text' },
        { key: 'j_webhookUpdateColor', label: '웹훅 Update 색상', env: 'WEBHOOK_UPDATE_COLOR', type: 'text' }
    ]
};

function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

const creatorCards = document.querySelectorAll('.creator-card');

function isValidAppState(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
    if (obj.creator !== 'thijsvanloef' && obj.creator !== 'jammsen') return false;
    const isPlainObj = val => val !== null && typeof val === 'object' && !Array.isArray(val);
    if (!isPlainObj(obj.connection) || !isPlainObj(obj.serverOptions) || !isPlainObj(obj.volume)) return false;
    return true;
}

function getDesktopBridge() {
    if (typeof window !== 'undefined' && window.palServerDesktop) {
        return window.palServerDesktop;
    }
    return null;
}

function updateLocalStorageUI() {
    const bridge = getDesktopBridge();
    const saveBtn = document.getElementById('btn-local-save');
    const loadBtn = document.getElementById('btn-local-load');
    const resetBtn = document.getElementById('btn-local-reset');
    const statusTxt = document.getElementById('local-storage-status');

    if (!bridge) {
        if (saveBtn) saveBtn.disabled = true;
        if (loadBtn) loadBtn.disabled = true;
        if (resetBtn) resetBtn.disabled = true;
        if (statusTxt) statusTxt.textContent = "현재 브라우저 환경에서는 로컬 저장소를 사용할 수 없습니다.";
    }
}

function setupLocalStorageListeners() {
    const bridge = getDesktopBridge();
    if (!bridge) return;

    const saveBtn = document.getElementById('btn-local-save');
    const loadBtn = document.getElementById('btn-local-load');
    const resetBtn = document.getElementById('btn-local-reset');
    const statusTxt = document.getElementById('local-storage-status');

    const setStatus = (msg, isError = false) => {
        if (!statusTxt) return;
        statusTxt.textContent = msg;
        statusTxt.style.color = isError ? 'var(--danger)' : 'var(--success)';
        setTimeout(() => {
            if (statusTxt.textContent === msg) {
                statusTxt.textContent = '';
            }
        }, 5000);
    };

    if (saveBtn) {
        saveBtn.addEventListener('click', async () => {
            try {
                saveBtn.disabled = true;
                const yamlOutput = document.getElementById('yml-output');
                const payload = {
                    draft: clone(state.draft),
                    applied: clone(state.applied),
                    yaml: yamlOutput ? yamlOutput.textContent : ''
                };
                await bridge.saveSavedData(payload);
                setStatus("성공적으로 저장되었습니다.");
            } catch (err) {
                setStatus("저장에 실패했습니다: " + err.message, true);
            } finally {
                saveBtn.disabled = false;
            }
        });
    }

    if (loadBtn) {
        loadBtn.addEventListener('click', async () => {
            try {
                loadBtn.disabled = true;
                const data = await bridge.loadSavedData();
                if (!data || data.hasSavedData === false) {
                    setStatus("저장된 데이터가 없습니다.", true);
                } else if (isValidAppState(data.draft) && isValidAppState(data.applied)) {
                    state.draft = { ...clone(defaultDraftState), ...data.draft, connection: { ...defaultDraftState.connection, ...data.draft.connection }, serverOptions: { ...defaultDraftState.serverOptions, ...data.draft.serverOptions }, volume: { ...defaultDraftState.volume, ...data.draft.volume } };
                    state.applied = { ...clone(defaultDraftState), ...data.applied, connection: { ...defaultDraftState.connection, ...data.applied.connection }, serverOptions: { ...defaultDraftState.serverOptions, ...data.applied.serverOptions }, volume: { ...defaultDraftState.volume, ...data.applied.volume } };
                    
                    const volInput = document.getElementById('volumeHostPath');
                    if (volInput && state.draft.volume && state.draft.volume.hostPath) {
                        volInput.value = state.draft.volume.hostPath;
                    }
                    updateCreatorUI();
                    updateActionBars();
                    generateComposeYaml();
                    setStatus("저장값을 불러왔습니다.");
                } else {
                    setStatus("저장된 데이터 형식이 올바르지 않습니다.", true);
                }
            } catch (err) {
                setStatus("불러오기에 실패했습니다: " + err.message, true);
            } finally {
                loadBtn.disabled = false;
            }
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', async () => {
            if (!confirm("저장된 데이터를 모두 삭제하시겠습니까?")) return;
            try {
                resetBtn.disabled = true;
                await bridge.resetSavedData();
                setStatus("저장값이 삭제되었습니다.");
            } catch (err) {
                setStatus("삭제에 실패했습니다: " + err.message, true);
            } finally {
                resetBtn.disabled = false;
            }
        });
    }
}

async function loadInitialData() {
    const bridge = getDesktopBridge();
    if (!bridge) return;
    try {
        const data = await bridge.loadSavedData();
        if (data && data.hasSavedData !== false && isValidAppState(data.draft) && isValidAppState(data.applied)) {
            state.draft = { ...clone(defaultDraftState), ...data.draft, connection: { ...defaultDraftState.connection, ...data.draft.connection }, serverOptions: { ...defaultDraftState.serverOptions, ...data.draft.serverOptions }, volume: { ...defaultDraftState.volume, ...data.draft.volume } };
            state.applied = { ...clone(defaultDraftState), ...data.applied, connection: { ...defaultDraftState.connection, ...data.applied.connection }, serverOptions: { ...defaultDraftState.serverOptions, ...data.applied.serverOptions }, volume: { ...defaultDraftState.volume, ...data.applied.volume } };
            const volInput = document.getElementById('volumeHostPath');
            if (volInput && state.draft.volume && state.draft.volume.hostPath) {
                volInput.value = state.draft.volume.hostPath;
            }
            updateCreatorUI();
            updateActionBars();
            generateComposeYaml();
        }
    } catch (err) {
        const statusTxt = document.getElementById('local-storage-status');
        if (statusTxt) {
            statusTxt.textContent = "초기 데이터를 불러올 수 없습니다.";
            statusTxt.style.color = 'var(--danger)';
        }
    }
}

function init() {
    setupEventListeners();
    setupConnectionListeners();
    setupOptionsListeners();
    setupVolumeAndGlobalListeners();
    setupDownloadListener();
    updateLocalStorageUI();
    setupLocalStorageListeners();
    updateCreatorUI();
    updateActionBars();
    generateComposeYaml();
    
    loadInitialData();
}

function renderActionButtons(sectionKey) {
    const isDirty = !isEqual(state.draft[sectionKey], state.applied[sectionKey]);
    return `
        <button type="button" class="btn btn-secondary btn-restore" data-section="${sectionKey}" ${!isDirty ? 'disabled' : ''}>복원</button>
        <button type="button" class="btn btn-primary btn-apply" data-section="${sectionKey}" ${!isDirty ? 'disabled' : ''}>적용</button>
    `;
}

function updateActionBars() {
    const actionCreator = document.getElementById('action-creator');
    if (actionCreator) actionCreator.innerHTML = renderActionButtons('creator');
    
    const actionVolume = document.getElementById('action-volume');
    if (actionVolume) actionVolume.innerHTML = renderActionButtons('volume');
    
    const actionConnection = document.getElementById('action-connection');
    if (actionConnection) actionConnection.innerHTML = renderActionButtons('connection');
    
    const actionOptions = document.getElementById('action-options');
    if (actionOptions) actionOptions.innerHTML = renderActionButtons('serverOptions');
}

function setupVolumeAndGlobalListeners() {
    document.addEventListener('click', (e) => {
        if (e.target.matches('.btn-apply')) {
            const section = e.target.dataset.section;
            state.applied[section] = clone(state.draft[section]);
            updateActionBars();
            generateComposeYaml();
        }
        
        if (e.target.matches('.btn-restore')) {
            const section = e.target.dataset.section;
            state.draft[section] = clone(state.applied[section]);
            
            if (section === 'creator') {
                updateCreatorUI();
            } else if (section === 'connection') {
                renderConnectionSettings();
            } else if (section === 'serverOptions') {
                renderServerOptions();
            } else if (section === 'volume') {
                document.getElementById('volumeHostPath').value = state.draft.volume.hostPath;
            }
            updateActionBars();
        }
        
        if (e.target.matches('#btn-reset-all')) {
            state.draft = clone(defaultDraftState);
            state.applied = clone(defaultDraftState);
            
            document.getElementById('volumeHostPath').value = state.draft.volume.hostPath;
            updateCreatorUI();
            updateActionBars();
            generateComposeYaml();
        }
    });

    const volumeInput = document.getElementById('volumeHostPath');
    if (volumeInput) {
        volumeInput.value = state.draft.volume.hostPath;
        volumeInput.addEventListener('input', (e) => {
            state.draft.volume.hostPath = e.target.value;
            updateActionBars();
        });
    }
}

function setupDownloadListener() {
    const btnDownload = document.getElementById('btn-download-yml');
    const statusText = document.getElementById('download-status');
    if (!btnDownload) return;

    btnDownload.addEventListener('click', async () => {
        const outElem = document.getElementById('yml-output');
        const yamlContent = outElem ? outElem.textContent : '';
        if (!yamlContent) {
            if (statusText) {
                statusText.textContent = 'YML 내용이 없습니다.';
                statusText.style.color = 'var(--danger)';
            }
            return;
        }

        try {
            if (window.palServerDesktop && typeof window.palServerDesktop.exportYml === 'function') {
                const result = await window.palServerDesktop.exportYml(yamlContent);
                if (result.success) {
                    if (statusText) {
                        statusText.textContent = '저장되었습니다.';
                        statusText.style.color = 'var(--success)';
                        setTimeout(() => statusText.textContent = '', 3000);
                    }
                } else if (!result.canceled) {
                    if (statusText) {
                        statusText.textContent = '저장 실패: ' + (result.error || '알 수 없는 오류');
                        statusText.style.color = 'var(--danger)';
                    }
                }
            } else {
                const blob = new Blob(['\uFEFF', yamlContent], { type: 'text/yaml;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'docker-compose.yml';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                if (statusText) {
                    statusText.textContent = '다운로드가 시작되었습니다.';
                    statusText.style.color = 'var(--success)';
                    setTimeout(() => statusText.textContent = '', 3000);
                }
            }
        } catch (e) {
            if (statusText) {
                statusText.textContent = '오류 발생: ' + e.message;
                statusText.style.color = 'var(--danger)';
            }
        }
    });
}

function setupEventListeners() {
    creatorCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const selectedCreator = e.currentTarget.dataset.creator;
            if (selectedCreator && selectedCreator !== state.draft.creator) {
                setCreator(selectedCreator);
            }
        });
    });
}

function setCreator(creatorId) {
    state.draft.creator = creatorId;
    updateCreatorUI();
    updateActionBars();
}

function updateCreatorUI() {
    creatorCards.forEach(card => {
        if (card.dataset.creator === state.draft.creator) {
            card.classList.add('active');
            card.setAttribute('aria-pressed', 'true');
        } else {
            card.classList.remove('active');
            card.setAttribute('aria-pressed', 'false');
        }
    });
    renderConnectionSettings();
    renderServerOptions();
}

function renderPortControl(key, value) {
    let safeValue = parseInt(value, 10);
    if (isNaN(safeValue) || safeValue < 1024) safeValue = 1024;
    if (safeValue > 65535) safeValue = 65535;
    return `
        <div class="port-control">
            <input type="range" class="port-slider" data-key="${key}" min="1024" max="65535" value="${safeValue}">
            <input type="number" class="port-input" data-key="${key}" min="1024" max="65535" value="${safeValue}">
        </div>
    `;
}

function sanitizeGenericNumericValue(value, min, max, step) {
    const minValue = parseFloat(min);
    const maxValue = parseFloat(max);
    const stepValue = parseFloat(step);
    let safeValue = parseFloat(value);

    if (isNaN(safeValue)) safeValue = minValue;
    if (safeValue < minValue) safeValue = minValue;
    if (safeValue > maxValue) safeValue = maxValue;

    if (Number.isInteger(stepValue)) {
        safeValue = Math.round(safeValue);
        if (safeValue < minValue) safeValue = minValue;
        if (safeValue > maxValue) safeValue = maxValue;
    }

    return safeValue;
}

function renderGenericNumericControl(key, value, min, max, step) {
    const safeValue = sanitizeGenericNumericValue(value, min, max, step);
    return `
        <div class="generic-num-control port-control">
            <input type="range" class="generic-num-slider port-slider" data-key="${key}" min="${min}" max="${max}" step="${step}" value="${safeValue}">
            <input type="number" class="generic-num-input port-input" data-key="${key}" min="${min}" max="${max}" step="${step}" value="${safeValue}">
        </div>
    `;
}

function renderBooleanControl(key, value, labelOn = '사용', labelOff = '미사용') {
    return `
        <div class="toggle-group" role="group" aria-label="${escapeHTML(labelOn)}/${escapeHTML(labelOff)}">
            <button type="button" class="toggle-btn option-toggle ${value ? 'active' : ''}" data-key="${key}" data-val="true" aria-pressed="${value}">${escapeHTML(labelOn)}</button>
            <button type="button" class="toggle-btn option-toggle ${!value ? 'active' : ''}" data-key="${key}" data-val="false" aria-pressed="${!value}">${escapeHTML(labelOff)}</button>
        </div>
    `;
}

function renderTextControl(key, value, placeholder = '') {
    return `
        <input type="text" id="${key}" data-key="${key}" value="${escapeHTML(value)}" class="text-input option-text" placeholder="${escapeHTML(placeholder)}">
    `;
}

function renderConnectionSettings() {
    const container = document.getElementById('section-connection');
    const conn = state.draft.connection;
    const isThijs = state.draft.creator === 'thijsvanloef';

    container.innerHTML = `
        <h2>2. 접속 설정</h2>
        <p class="section-desc">서버 이름, 비밀번호 및 포트 정보를 설정합니다.</p>
        
        <div class="form-grid">
            <div class="form-group">
                <label for="serverName">서버 이름 (SERVER_NAME)</label>
                <input type="text" id="serverName" data-key="serverName" value="${escapeHTML(conn.serverName)}" class="text-input" placeholder="서버 이름을 입력하세요">
            </div>

            <div class="form-group">
                <label for="serverPassword">서버 접속 비밀번호 (SERVER_PASSWORD)</label>
                <input type="password" id="serverPassword" data-key="serverPassword" value="${escapeHTML(conn.serverPassword)}" class="text-input" placeholder="접속시 필요한 비밀번호">
                <p class="helper-text">비워두면 비밀번호 없이 접속 가능합니다.</p>
            </div>

            <div class="form-group">
                <label for="adminPassword">관리자 비밀번호 (ADMIN_PASSWORD)</label>
                <input type="password" id="adminPassword" data-key="adminPassword" value="${escapeHTML(conn.adminPassword)}" class="text-input" placeholder="인게임 관리자 비밀번호">
                <p class="helper-text">RCON 등 관리자 권한 획득에 사용됩니다.</p>
            </div>

            <div class="form-divider"></div>

            <div class="form-group">
                <div class="label-row">
                    <label>외부 접속 정보 (${isThijs ? 'PUBLIC_IP / PUBLIC_PORT' : 'PUBLIC_IP'})</label>
                    <div class="toggle-group" role="group" aria-label="외부 접속 활성화">
                        <button type="button" class="toggle-btn ${conn.publicConnection ? 'active' : ''}" data-key="publicConnection" data-val="true" aria-pressed="${conn.publicConnection}">사용</button>
                        <button type="button" class="toggle-btn ${!conn.publicConnection ? 'active' : ''}" data-key="publicConnection" data-val="false" aria-pressed="${!conn.publicConnection}">미사용</button>
                    </div>
                </div>
                ${conn.publicConnection ? `
                <div class="sub-form-group">
                    <label for="publicIp">공인 IP (PUBLIC_IP)</label>
                    <input type="text" id="publicIp" data-key="publicIp" value="${escapeHTML(conn.publicIp)}" class="text-input" placeholder="예: 123.45.67.89">

                    ${isThijs ? `
                    <label for="publicPort" class="mt-sm">공인 포트 (PUBLIC_PORT)</label>
                    ${renderPortControl('publicPort', conn.publicPort)}
                    ` : `<p class="helper-text">Jammsen의 PUBLIC_PORT는 위 게임 포트(PUBLIC_PORT) 필드에서 설정됩니다.</p>`}
                </div>
                ` : ''}
            </div>

            <div class="form-group">
                <div class="label-row">
                    <label>커뮤니티 서버 노출 (${isThijs ? 'COMMUNITY' : 'COMMUNITY_SERVER'})</label>
                    <div class="toggle-group" role="group" aria-label="커뮤니티 서버 노출">
                        <button type="button" class="toggle-btn ${conn.community ? 'active' : ''}" data-key="community" data-val="true" aria-pressed="${conn.community}">노출</button>
                        <button type="button" class="toggle-btn ${!conn.community ? 'active' : ''}" data-key="community" data-val="false" aria-pressed="${!conn.community}">비노출</button>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="gamePort">게임 포트 (${isThijs ? 'PORT' : 'PUBLIC_PORT'})</label>
                ${renderPortControl('gamePort', conn.gamePort)}
            </div>
            
            ${isThijs ? `
            <div class="form-group">
                <label for="queryPort">쿼리 포트 (QUERY_PORT)</label>
                ${renderPortControl('queryPort', conn.queryPort)}
            </div>
            ` : ''}

            <div class="form-divider"></div>

            <div class="form-group">
                <div class="label-row">
                    <label>REST API 사용 (${isThijs ? 'REST_API_ENABLED' : 'RESTAPI_ENABLED'})</label>
                    <div class="toggle-group" role="group" aria-label="REST API 사용">
                        <button type="button" class="toggle-btn ${conn.restApi ? 'active' : ''}" data-key="restApi" data-val="true" aria-pressed="${conn.restApi}">사용</button>
                        <button type="button" class="toggle-btn ${!conn.restApi ? 'active' : ''}" data-key="restApi" data-val="false" aria-pressed="${!conn.restApi}">미사용</button>
                    </div>
                </div>
                ${conn.restApi ? `
                <div class="sub-form-group">
                    <label for="restApiPort">REST API 포트 (${isThijs ? 'REST_API_PORT' : 'RESTAPI_PORT'})</label>
                    ${renderPortControl('restApiPort', conn.restApiPort)}
                </div>
                ` : ''}
            </div>

            <div class="form-group">
                <div class="label-row">
                    <label>RCON 사용 (RCON_ENABLED)</label>
                    <div class="toggle-group" role="group" aria-label="RCON 사용">
                        <button type="button" class="toggle-btn ${conn.rcon ? 'active' : ''}" data-key="rcon" data-val="true" aria-pressed="${conn.rcon}">사용</button>
                        <button type="button" class="toggle-btn ${!conn.rcon ? 'active' : ''}" data-key="rcon" data-val="false" aria-pressed="${!conn.rcon}">미사용</button>
                    </div>
                </div>
                ${conn.rcon ? `
                <div class="sub-form-group">
                    <label for="rconPort">RCON 포트 (RCON_PORT)</label>
                    ${renderPortControl('rconPort', conn.rconPort)}
                </div>
                ` : ''}
            </div>
        </div>
        <div class="action-bar" id="action-connection"></div>
    `;

    container.classList.remove('placeholder-section');
    updateActionBars();
}

function renderServerOptions() {
    const container = document.getElementById('section-options');
    const isThijs = state.draft.creator === 'thijsvanloef';
    const creatorKey = isThijs ? 'thijsvanloef' : 'jammsen';

    let html = `
        <h2>3. 팰 서버 옵션</h2>
        <p class="section-desc">게임플레이 상세 설정 및 제작자 전용 운영 옵션을 구성합니다.</p>
        <div class="form-grid">
    `;

    html += `<h3 class="subsection-title">공통 게임/컨테이너 설정</h3>`;
    OPTIONS_SCHEMA.common.forEach(opt => {
        const envName = isThijs ? opt.envT : opt.envJ;
        let val = state.draft.serverOptions[opt.key];
        
        if (opt.key === 'players' && val === null) {
            val = isThijs ? 16 : 32;
        }

        html += renderOptionRow(opt, envName, val);
    });

    html += `<div class="form-divider" style="margin: var(--spacing-lg) 0;"></div>`;

    html += `<h3 class="subsection-title">${escapeHTML(state.draft.creator)} 전용 운영 설정</h3>`;
    OPTIONS_SCHEMA[creatorKey].forEach(opt => {
        const val = state.draft.serverOptions[opt.key];
        html += renderOptionRow(opt, opt.env, val);
    });

    html += `</div>
        <div class="action-bar" id="action-options"></div>
    `;
    container.innerHTML = html;
    container.classList.remove('placeholder-section');
    updateActionBars();
}

function renderOptionRow(opt, envName, value) {
    let controlHtml = '';
    
    if (opt.type === 'number') {
        controlHtml = renderGenericNumericControl(opt.key, value, opt.min, opt.max, opt.step);
    } else if (opt.type === 'boolean') {
        controlHtml = renderBooleanControl(opt.key, value);
    } else if (opt.type === 'text') {
        controlHtml = renderTextControl(opt.key, value);
    }

    return `
        <div class="form-group">
            <div class="label-row">
                <label for="${opt.key}">${escapeHTML(opt.label)} (${escapeHTML(envName)})</label>
                ${opt.type === 'boolean' ? controlHtml : ''}
            </div>
            ${opt.type !== 'boolean' ? controlHtml : ''}
            ${opt.helper ? `<p class="helper-text">${escapeHTML(opt.helper)}</p>` : ''}
        </div>
    `;
}

function setupConnectionListeners() {
    const container = document.getElementById('section-connection');
    
    container.addEventListener('input', (e) => {
        if (e.target.matches('input[type="text"], input[type="password"]')) {
            state.draft.connection[e.target.dataset.key] = e.target.value;
            updateActionBars();
        }
        
        if (e.target.matches('.port-slider')) {
            const val = parseInt(e.target.value, 10);
            state.draft.connection[e.target.dataset.key] = val;
            const numInput = e.target.parentElement.querySelector('.port-input');
            if (numInput) numInput.value = val;
            updateActionBars();
        }

        if (e.target.matches('.port-input')) {
            let val = parseInt(e.target.value, 10);
            if (isNaN(val)) return;
            if (val < 1024) val = 1024;
            if (val > 65535) val = 65535;
            state.draft.connection[e.target.dataset.key] = val;
            const slider = e.target.parentElement.querySelector('.port-slider');
            if (slider) slider.value = val;
            updateActionBars();
        }
    });

    container.addEventListener('change', (e) => {
        if (e.target.matches('.port-input')) {
            let val = parseInt(e.target.value, 10);
            if (isNaN(val) || val < 1024) val = 1024;
            if (val > 65535) val = 65535;
            e.target.value = val;
            state.draft.connection[e.target.dataset.key] = val;
            const slider = e.target.parentElement.querySelector('.port-slider');
            if (slider) slider.value = val;
            updateActionBars();
        }
    });

    container.addEventListener('click', (e) => {
        if (e.target.matches('.toggle-btn')) {
            const key = e.target.dataset.key;
            const val = e.target.dataset.val === 'true';
            if (state.draft.connection[key] !== val) {
                state.draft.connection[key] = val;
                renderConnectionSettings();
            }
        }
    });
}

function setupOptionsListeners() {
    const container = document.getElementById('section-options');
    
    container.addEventListener('input', (e) => {
        if (e.target.matches('.option-text')) {
            state.draft.serverOptions[e.target.dataset.key] = e.target.value;
            updateActionBars();
        }
        
        if (e.target.matches('.generic-num-slider')) {
            const val = sanitizeGenericNumericValue(e.target.value, e.target.min, e.target.max, e.target.step);
            state.draft.serverOptions[e.target.dataset.key] = val;
            e.target.value = val;
            const numInput = e.target.parentElement.querySelector('.generic-num-input');
            if (numInput) numInput.value = val;
            
            if (e.target.dataset.key === 'players' && state.draft.serverOptions.players === null) {
                state.draft.serverOptions.players = val;
            }
            updateActionBars();
        }

        if (e.target.matches('.generic-num-input')) {
            if (e.target.value === '') return;
            const val = sanitizeGenericNumericValue(e.target.value, e.target.min, e.target.max, e.target.step);
            state.draft.serverOptions[e.target.dataset.key] = val;
            if (Number.isInteger(parseFloat(e.target.step))) e.target.value = val;
            const slider = e.target.parentElement.querySelector('.generic-num-slider');
            if (slider) slider.value = val;
            updateActionBars();
        }
    });

    container.addEventListener('change', (e) => {
        if (e.target.matches('.generic-num-input')) {
            const val = sanitizeGenericNumericValue(e.target.value, e.target.min, e.target.max, e.target.step);
            e.target.value = val;
            state.draft.serverOptions[e.target.dataset.key] = val;
            const slider = e.target.parentElement.querySelector('.generic-num-slider');
            if (slider) slider.value = val;
            updateActionBars();
        }
    });

    container.addEventListener('click', (e) => {
        if (e.target.matches('.option-toggle')) {
            const key = e.target.dataset.key;
            const val = e.target.dataset.val === 'true';
            if (state.draft.serverOptions[key] !== val) {
                state.draft.serverOptions[key] = val;
                renderServerOptions();
            }
        }
    });
}

function yamlDoubleQuoted(str) {
    if (typeof str !== 'string') return '""';
    let escaped = '';
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === '\\') {
            escaped += '\\\\';
        } else if (char === '"') {
            escaped += '\\' + '"';
        } else if (char === '\n') {
            escaped += '\\n';
        } else if (char === '\r') {
            escaped += '\\r';
        } else if (char === '\t') {
            escaped += '\\t';
        } else {
            escaped += char;
        }
    }
    return '"' + escaped + '"';
}

function generateComposeYaml() {
    const applied = state.applied;
    const isThijs = applied.creator === 'thijsvanloef';
    const image = isThijs ? 'thijsvanloef/palworld-server-docker:latest' : 'jammsen/palworld-dedicated-server:latest';
    
    let yaml = `version: '3.9'
services:
  palworld:
    image: ${image}
    container_name: palworld-server
    restart: unless-stopped
    ports:
`;

    const conn = applied.connection;
    const gamePortStr = `      - ${conn.gamePort}:8211/udp`;
    yaml += gamePortStr + '\n';

    if (isThijs) {
        yaml += `      - ${conn.queryPort}:27015/udp\n`;
    }

    if (conn.restApi) {
        yaml += `      - ${conn.restApiPort}:8212/tcp\n`;
    }

    if (conn.rcon) {
        yaml += `      - ${conn.rconPort}:25575/tcp\n`;
    }

    const hostPath = applied.volume.hostPath || './pal_server';
    const volumeMapping = `${hostPath}:/palworld`;
    yaml += `    volumes:
      - ${yamlDoubleQuoted(volumeMapping)}
    environment:
`;

    const addEnv = (key, val) => {
        if (typeof val === 'boolean') {
            yaml += `      - ${key}=${val ? 'true' : 'false'}\n`;
        } else if (typeof val === 'number') {
            yaml += `      - ${key}=${val}\n`;
        } else if (typeof val === 'string') {
            yaml += `      - ${yamlDoubleQuoted(`${key}=${val}`)}\n`;
        }
    };

    addEnv('SERVER_NAME', conn.serverName);
    if (conn.serverPassword) addEnv('SERVER_PASSWORD', conn.serverPassword);
    if (conn.adminPassword) addEnv('ADMIN_PASSWORD', conn.adminPassword);
    
    if (isThijs) {
        addEnv('COMMUNITY', conn.community);
        addEnv('PORT', conn.gamePort);
        addEnv('QUERY_PORT', conn.queryPort);
        addEnv('REST_API_ENABLED', conn.restApi);
        if (conn.restApi) addEnv('REST_API_PORT', conn.restApiPort);
        addEnv('RCON_ENABLED', conn.rcon);
        if (conn.rcon) addEnv('RCON_PORT', conn.rconPort);
        if (conn.publicConnection) {
            addEnv('PUBLIC_IP', conn.publicIp);
            addEnv('PUBLIC_PORT', conn.publicPort);
        }
    } else {
        addEnv('COMMUNITY_SERVER', conn.community);
        addEnv('PUBLIC_PORT', conn.gamePort);
        addEnv('RESTAPI_ENABLED', conn.restApi);
        if (conn.restApi) addEnv('RESTAPI_PORT', conn.restApiPort);
        addEnv('RCON_ENABLED', conn.rcon);
        if (conn.rcon) addEnv('RCON_PORT', conn.rconPort);
        if (conn.publicConnection) {
            addEnv('PUBLIC_IP', conn.publicIp);
        }
    }

    const opts = applied.serverOptions;
    OPTIONS_SCHEMA.common.forEach(opt => {
        const envName = isThijs ? opt.envT : opt.envJ;
        let val = opts[opt.key];
        if (opt.key === 'players' && val === null) {
            val = isThijs ? 16 : 32;
        }
        addEnv(envName, val);
    });

    const creatorKey = isThijs ? 'thijsvanloef' : 'jammsen';
    OPTIONS_SCHEMA[creatorKey].forEach(opt => {
        addEnv(opt.env, opts[opt.key]);
    });

    const outElem = document.getElementById('yml-output');
    if (outElem) {
        outElem.textContent = yaml;
    }
}

document.addEventListener('DOMContentLoaded', init);
