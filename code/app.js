const defaultDraftState = {
    game: 'palworld',
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
        timezone: "Asia/Seoul",
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
        j_playerDetectionEnabled: true,
        j_playerDetectionDebug: false,
        j_playerDetectionStartupDelay: 60,
        j_playerDetectionCheckInterval: 15,
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
        j_webhookInstallTitle: "Installing server",
        j_webhookInstallDescription: "Server is being installed",
        j_webhookInstallColor: "2849520",
        j_webhookRestartTitle: "Automatic restart",
        j_webhookRestartDelayedDescription: "The automatic gameserver restart has been triggered, if the server has still players, restart will be in 15 minutes",
        j_webhookRestartNowDescription: "The gameserver is empty, restarting now",
        j_webhookRestartColor: "15593515",
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
    },
    coreKeeperConnection: {
        worldName: "Core Keeper Server",
        gameId: "",
        maxPlayers: 10,
        directConnection: false,
        serverIp: "",
        serverPort: 27015,
        password: "",
        allowOnlyPlatform: ""
    },
    coreKeeperOptions: {
        worldIndex: 0,
        worldSeed: "",
        hashedWorldSeed: "",
        worldMode: "0",
        season: "",
        activateContent: "",
        activateAllContent: false,
        puid: 1000,
        pgid: 1000,
        arm64Device: "generic",
        useDepotDownloader: false,
        modsEnabled: false,
        modioApiKey: "",
        modioApiUrl: "",
        mods: ""
    },
    coreKeeperVolume: {
        filesPath: "./core-keeper-files",
        dataPath: "./core-keeper-data"
    },
    valheimConnection: {
        serverName: "Valheim Server",
        worldName: "Dedicated",
        serverPassword: "",
        serverPort: 2456,
        serverPublic: true,
        crossplay: false,
        serverSecretFile: ""
    },
    valheimOptions: {
        ...ValheimSettings.defaults
    },
    valheimVolume: {
        configPath: "./valheim-config",
        dataPath: "./valheim-data"
    },
    valheimQol: { ...ValheimQol.defaults },
    valheimMods: {
        packages: "",
        files: [],
        configs: []
    }
};

// File bytes stay in this session; saved settings contain only file descriptors.
const valheimModFiles = new Map();

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
        { key: 'difficulty', label: '난이도', envT: 'DIFFICULTY', envJ: 'DIFFICULTY', type: 'text', helper: '난이도를 설정합니다. (사용 가능 값: None, Normal, Difficult)' },
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
        { key: 'deathPenalty', label: '사망 패널티', envT: 'DEATH_PENALTY', envJ: 'DEATH_PENALTY', type: 'text', helper: '사망 패널티를 설정합니다. (사용 가능 값: None, Item, ItemAndEquipment, All)' },
        { key: 'crossplayPlatforms', label: '크로스플레이 플랫폼', envT: 'CROSSPLAY_PLATFORMS', envJ: 'CROSSPLAY_PLATFORMS', type: 'text' },
        { key: 'useAuth', label: '서버 인증 사용', envT: 'USEAUTH', envJ: 'USEAUTH', type: 'boolean' },
        { key: 'isPvp', label: 'PVP 사용', envT: 'IS_PVP', envJ: 'IS_PVP', type: 'boolean' },
        { key: 'enableFriendlyFire', label: '아군 피해 허용', envT: 'ENABLE_FRIENDLY_FIRE', envJ: 'ENABLE_FRIENDLY_FIRE', type: 'boolean' },
        { key: 'enableInvaderEnemy', label: '침입 이벤트 허용', envT: 'ENABLE_INVADER_ENEMY', envJ: 'ENABLE_INVADER_ENEMY', type: 'boolean' },
        { key: 'enableFastTravel', label: '빠른 이동 허용', envT: 'ENABLE_FAST_TRAVEL', envJ: 'ENABLE_FAST_TRAVEL', type: 'boolean' },
        { key: 'randomizerType', label: '랜더마이저 유형', envT: 'RANDOMIZER_TYPE', envJ: 'RANDOMIZER_TYPE', type: 'text', helper: '랜더마이저 유형을 설정합니다. (사용 가능 값: None 등)' },
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
        { key: 'timezone', label: '타임존', envT: 'TZ', envJ: 'TZ', type: 'select', options: ['Asia/Seoul', 'UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Singapore', 'Australia/Sydney'], helper: '서버의 타임존(시간대)을 설정합니다. (기본값: Asia/Seoul)' },
        { key: 'serverDescription', label: '서버 설명', envT: 'SERVER_DESCRIPTION', envJ: 'SERVER_DESCRIPTION', type: 'text', helper: '서버 브라우저에 표시될 서버의 설명(소개글)을 설정합니다.' },
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
        { key: 't_autoRebootCronExpression', label: '재부팅 스케줄', env: 'AUTO_REBOOT_CRON_EXPRESSION', type: 'text', helper: '재부팅 스케줄을 설정합니다. (형식: Cron 표현식, 예: 0 0 * * *)' },
        { key: 't_autoRebootWarnMinutes', label: '재부팅 경고 분', env: 'AUTO_REBOOT_WARN_MINUTES', type: 'number', min: 1, max: 60, step: 1 },
        { key: 't_logFormatType', label: '로그 형식', env: 'LOG_FORMAT_TYPE', type: 'text', helper: '로그 형식을 설정합니다. (사용 가능 값: default, logfmt, json 등)' },
        { key: 't_autoUpdateEnabled', label: '자동 업데이트', env: 'AUTO_UPDATE_ENABLED', type: 'boolean' },
        { key: 't_autoUpdateCronExpression', label: '자동 업데이트 스케줄', env: 'AUTO_UPDATE_CRON_EXPRESSION', type: 'text', helper: '자동 업데이트 스케줄을 설정합니다. (형식: Cron 표현식)' },
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
        { key: 'j_backupCronExpression', label: '백업 스케줄', env: 'BACKUP_CRON_EXPRESSION', type: 'text', helper: '백업 스케줄을 설정합니다. (형식: Cron 표현식)' },
        { key: 'j_restartEnabled', label: '자동 재부팅', env: 'RESTART_ENABLED', type: 'boolean' },
        { key: 'j_restartCronExpression', label: '재부팅 스케줄', env: 'RESTART_CRON_EXPRESSION', type: 'text', helper: '재부팅 스케줄을 설정합니다. (형식: Cron 표현식)' },
        { key: 'j_netServerMaxTickRate', label: '엔진 틱레이트', env: 'NETSERVERMAXTICKRATE', type: 'number', min: 30, max: 120, step: 1, helper: '엔진 틱레이트를 설정합니다. (권장 범위: 30~120)' },
        { key: 'j_logFormatType', label: '로그 형식', env: 'LOG_FORMAT_TYPE', type: 'text' },
        { key: 'j_backupAnnounceMessagesEnabled', label: '백업 알림 메시지', env: 'BACKUP_ANNOUNCE_MESSAGES_ENABLED', type: 'boolean' },
        { key: 'j_restartDebugOverride', label: '재시작 디버그 오버라이드', env: 'RESTART_DEBUG_OVERRIDE', type: 'boolean', helper: '재시작 시 디버그 모드를 활성화하여 더 자세한 로그를 출력하도록 설정합니다.' },
        { key: 'j_playerDetectionEnabled', label: '플레이어 감지 활성화', env: 'PLAYER_DETECTION_ENABLED', type: 'boolean', helper: '플레이어 감지 기능을 켜거나 끄는 설정입니다.' },
        { key: 'j_playerDetectionDebug', label: '플레이어 감지 디버그', env: 'PLAYER_DETECTION_DEBUG', type: 'boolean', helper: '플레이어 감지 디버깅용 로그 출력을 설정합니다.' },
        { key: 'j_playerDetectionStartupDelay', label: '감지 시작 지연', env: 'PLAYER_DETECTION_STARTUP_DELAY', type: 'number', min: 1, max: 3600, step: 1, helper: '서버 시작 후 플레이어 감지를 시작할 때까지의 대기 시간(초)을 설정합니다.' },
        { key: 'j_playerDetectionCheckInterval', label: '감지 확인 간격', env: 'PLAYER_DETECTION_CHECK_INTERVAL', type: 'number', min: 1, max: 3600, step: 1, helper: '플레이어 존재 여부 확인 주기(초)를 설정합니다.' },
        { key: 'j_serverSettingsMode', label: '서버 설정 모드', env: 'SERVER_SETTINGS_MODE', type: 'text', helper: '서버 설정 모드를 설정합니다. (사용 가능 값: auto, manual, rcononly)' },
        { key: 'j_customScriptEnabled', label: '사용자 지정 스크립트 활성화', env: 'CUSTOM_SCRIPT_ENABLED', type: 'boolean' },
        { key: 'j_customScriptPath', label: '사용자 지정 스크립트 경로', env: 'CUSTOM_SCRIPT_PATH', type: 'text' },
        { key: 'j_webhookEnabled', label: '웹훅 활성화', env: 'WEBHOOK_ENABLED', type: 'boolean', helper: '웹훅이란 서버 이벤트를 Discord 같은 외부 서비스로 보내는 알림 방식입니다. 이 설정은 웹훅 알림 기능을 켜거나 끄는 설정입니다.' },
        { key: 'j_webhookDebugEnabled', label: '웹훅 디버그 활성화', env: 'WEBHOOK_DEBUG_ENABLED', type: 'boolean', helper: '웹훅 디버그 로그 출력 여부를 설정합니다.' },
        { key: 'j_webhookUrl', label: '웹훅 URL', env: 'WEBHOOK_URL', type: 'text', helper: '웹훅 알림을 보낼 대상 주소를 설정합니다.' },
        { key: 'j_webhookContentTitle', label: '웹훅 콘텐츠 제목', env: 'WEBHOOK_CONTENT_TITLE', type: 'text', helper: '웹훅 알림의 콘텐츠 제목을 설정합니다.' },
        { key: 'j_webhookInfoTitle', label: '웹훅 Info 제목', env: 'WEBHOOK_INFO_TITLE', type: 'text', helper: '정보(Info) 이벤트 발생 시 웹훅 메시지 제목을 설정합니다.' },
        { key: 'j_webhookInfoDescription', label: '웹훅 Info 설명', env: 'WEBHOOK_INFO_DESCRIPTION', type: 'text', helper: '정보(Info) 이벤트 발생 시 웹훅 메시지 본문을 설정합니다.' },
        { key: 'j_webhookInfoColor', label: '웹훅 Info 색상', env: 'WEBHOOK_INFO_COLOR', type: 'text', helper: '정보(Info) 이벤트 발생 시 웹훅 메시지 색상을 설정합니다.' },
        { key: 'j_webhookInstallTitle', label: '웹훅 설치 제목', env: 'WEBHOOK_INSTALL_TITLE', type: 'text', helper: '서버 설치 이벤트 발생 시 웹훅 메시지 제목을 설정합니다.' },
        { key: 'j_webhookInstallDescription', label: '웹훅 설치 설명', env: 'WEBHOOK_INSTALL_DESCRIPTION', type: 'text', helper: '서버 설치 이벤트 발생 시 웹훅 메시지 본문을 설정합니다.' },
        { key: 'j_webhookInstallColor', label: '웹훅 설치 색상', env: 'WEBHOOK_INSTALL_COLOR', type: 'text', helper: '서버 설치 이벤트 발생 시 웹훅 메시지 색상을 설정합니다.' },
        { key: 'j_webhookRestartTitle', label: '웹훅 재시작 제목', env: 'WEBHOOK_RESTART_TITLE', type: 'text', helper: '서버 재시작 이벤트 발생 시 웹훅 메시지 제목을 설정합니다.' },
        { key: 'j_webhookRestartDelayedDescription', label: '웹훅 지연 재시작 설명', env: 'WEBHOOK_RESTART_DELAYED_DESCRIPTION', type: 'text', helper: '플레이어가 있을 때의 지연 재시작 웹훅 메시지 본문을 설정합니다.' },
        { key: 'j_webhookRestartNowDescription', label: '웹훅 즉시 재시작 설명', env: 'WEBHOOK_RESTART_NOW_DESCRIPTION', type: 'text', helper: '플레이어가 없을 때의 즉시 재시작 웹훅 메시지 본문을 설정합니다.' },
        { key: 'j_webhookRestartColor', label: '웹훅 재시작 색상', env: 'WEBHOOK_RESTART_COLOR', type: 'text', helper: '서버 재시작 이벤트 발생 시 웹훅 메시지 색상을 설정합니다.' },
        { key: 'j_webhookStartTitle', label: '웹훅 Start 제목', env: 'WEBHOOK_START_TITLE', type: 'text', helper: '서버 시작 이벤트 발생 시 웹훅 메시지 제목을 설정합니다.' },
        { key: 'j_webhookStartDescription', label: '웹훅 Start 설명', env: 'WEBHOOK_START_DESCRIPTION', type: 'text', helper: '서버 시작 이벤트 발생 시 웹훅 메시지 본문을 설정합니다.' },
        { key: 'j_webhookStartColor', label: '웹훅 Start 색상', env: 'WEBHOOK_START_COLOR', type: 'text', helper: '서버 시작 이벤트 발생 시 웹훅 메시지 색상을 설정합니다.' },
        { key: 'j_webhookStopTitle', label: '웹훅 Stop 제목', env: 'WEBHOOK_STOP_TITLE', type: 'text', helper: '서버 정지 이벤트 발생 시 웹훅 메시지 제목을 설정합니다.' },
        { key: 'j_webhookStopDescription', label: '웹훅 Stop 설명', env: 'WEBHOOK_STOP_DESCRIPTION', type: 'text', helper: '서버 정지 이벤트 발생 시 웹훅 메시지 본문을 설정합니다.' },
        { key: 'j_webhookStopColor', label: '웹훅 Stop 색상', env: 'WEBHOOK_STOP_COLOR', type: 'text', helper: '서버 정지 이벤트 발생 시 웹훅 메시지 색상을 설정합니다.' },
        { key: 'j_webhookUpdateTitle', label: '웹훅 Update 제목', env: 'WEBHOOK_UPDATE_TITLE', type: 'text', helper: '서버 업데이트 이벤트 발생 시 웹훅 메시지 제목을 설정합니다.' },
        { key: 'j_webhookUpdateDescription', label: '웹훅 Update 설명', env: 'WEBHOOK_UPDATE_DESCRIPTION', type: 'text', helper: '서버 업데이트 이벤트 발생 시 웹훅 메시지 본문을 설정합니다.' },
        { key: 'j_webhookUpdateColor', label: '웹훅 Update 색상', env: 'WEBHOOK_UPDATE_COLOR', type: 'text', helper: '서버 업데이트 이벤트 발생 시 웹훅 메시지 색상을 설정합니다.' }
    ]
};

// https://github.com/community-valheim-tools/valheim-server-docker#environment-variables
const VALHEIM_OPTIONS_SCHEMA = ValheimSettings.fields;

const GAME_SECTIONS = {
    palworld: { connection: 'connection', options: 'serverOptions', volume: 'volume' },
    corekeeper: { connection: 'coreKeeperConnection', options: 'coreKeeperOptions', volume: 'coreKeeperVolume' },
    valheim: { connection: 'valheimConnection', options: 'valheimOptions', volume: 'valheimVolume' }
};

const CORE_KEEPER_OPTIONS_SCHEMA = [
    { key: 'worldIndex', label: '월드 인덱스', env: 'WORLD_INDEX', type: 'number', min: 0, max: 99, step: 1 },
    { key: 'worldSeed', label: '월드 시드', env: 'WORLD_SEED', type: 'text', helper: '비워두면 새 월드 생성 시 무작위 시드를 사용합니다.' },
    { key: 'hashedWorldSeed', label: '해시 월드 시드', env: 'HASHED_WORLD_SEED', type: 'text', helper: 'Core Keeper 1.1 이상용 해시 시드입니다. 일반 시드를 사용한다면 비워두세요.' },
    {
        key: 'worldMode',
        label: '월드 모드',
        env: 'WORLD_MODE',
        type: 'select',
        options: [
            { value: '2', label: 'Creative · 창작 모드 (2)' },
            { value: '4', label: 'Casual · 쉬움 (4)' },
            { value: '0', label: 'Normal · 보통 (0)' },
            { value: '1', label: 'Hard · 어려움 (1)' }
        ]
    },
    {
        key: 'season',
        label: '시즌 강제 지정',
        env: 'SEASON',
        type: 'select',
        helper: '자동을 선택하면 실제 날짜에 따른 시즌을 사용합니다.',
        options: [
            { value: '', label: '자동 (환경변수 미설정)' },
            { value: '0', label: 'None (0)' },
            { value: '1', label: 'Easter (1)' },
            { value: '2', label: 'Halloween (2)' },
            { value: '3', label: 'Christmas (3)' },
            { value: '4', label: 'Valentine (4)' },
            { value: '5', label: 'Anniversary (5)' },
            { value: '6', label: 'Cherry Blossom (6)' },
            { value: '7', label: 'Lunar New Year (7)' }
        ]
    },
    {
        key: 'activateContent',
        label: '기존 월드 콘텐츠 활성화',
        env: 'ACTIVATE_CONTENT',
        type: 'content-bundles',
        helper: '필요한 콘텐츠를 버튼으로 선택하세요. 월드에 한 번 적용된 콘텐츠는 다시 비활성화할 수 없으므로 먼저 백업하는 것을 권장합니다.'
    },
    { key: 'puid', label: '컨테이너 사용자 ID', env: 'PUID', type: 'number', min: 0, max: 65535, step: 1 },
    { key: 'pgid', label: '컨테이너 그룹 ID', env: 'PGID', type: 'number', min: 0, max: 65535, step: 1 },
    {
        key: 'arm64Device',
        label: 'ARM64 장치 프로필',
        env: 'ARM64_DEVICE',
        type: 'select',
        options: ['generic', 'rpi3', 'rpi4-pre3', 'rpi5', 'rpi5_16k', 'm1', 'adlink']
    },
    { key: 'useDepotDownloader', label: 'DepotDownloader 사용', env: 'USE_DEPOT_DOWNLOADER', type: 'boolean', helper: '32비트 호환성이 없는 시스템에서 SteamCMD 대신 사용합니다.' },
    {
        key: 'modsEnabled',
        label: 'mod.io 모드 사용',
        env: 'MODS_ENABLED',
        type: 'boolean',
        helper: '아래 링크에서 모드를 찾고 API 키를 발급받은 뒤 모드 사용을 켜세요.',
        links: [
            { label: '① Core Keeper 모드 찾기', href: 'https://mod.io/g/corekeeper' },
            { label: '② mod.io API 키 발급', href: 'https://mod.io/me/access' },
            { label: '③ 서버 모드 설정 가이드', href: 'https://github.com/escapingnetwork/core-keeper-dedicated#mod-support' }
        ]
    },
    { key: 'modioApiKey', label: 'mod.io API 키', env: 'MODIO_API_KEY', type: 'text', sensitive: true, helper: 'mod.io API 키 발급 페이지에서 생성한 API Key를 입력합니다.' },
    { key: 'modioApiUrl', label: 'mod.io API URL', env: 'MODIO_API_URL', type: 'text', helper: 'API 키와 함께 표시되는 API 경로를 입력합니다. 예: https://u-xxxx.modapi.io/v1' },
    { key: 'mods', label: '설치할 모드', env: 'MODS', type: 'text', helper: '모드 페이지 URL의 마지막 문자열 ID를 쉼표로 구분해 입력합니다. 예: core-lib,ck-qol. 의존성은 자동 설치되지 않습니다.' }
];

const CORE_KEEPER_CONTENT_BUNDLES = [
    {
        value: 'GiantCicadaBossDungeon',
        title: '모래 속 여왕',
        subtitle: 'Nimruza 보스 던전',
        description: '시작의 사막에 니므루자 보스와 전용 던전을 추가합니다. 이미 탐험한 사막 일부가 덮어써질 수 있습니다.'
    },
    {
        value: 'NatureBiomeCicadas',
        title: '여왕의 자손',
        subtitle: '자연 생물군계 매미',
        description: '아제오스의 황야에 새로운 매미 적을 추가합니다. 이미 탐험한 황야 일부가 덮어써질 수 있습니다.'
    },
    {
        value: 'GuaranteedOases',
        title: '오아시스 보장',
        subtitle: '오아시스와 드롬블',
        description: '시작의 사막에 오아시스가 최소 몇 곳 생성되도록 보장합니다. 생성 위치의 기존 지형은 덮어써집니다.'
    },
    {
        value: 'BiomeStatues',
        title: '타이탄 성소',
        subtitle: '6개의 타이탄 성소',
        description: '각 진행 구간에 스캐너·소환 아이템 제작과 웨이포인트 해금이 가능한 타이탄 성소 6곳을 추가합니다.'
    },
    {
        value: 'AbioticFactor',
        title: 'Abiotic Factor 협업',
        subtitle: '연구 시설 균열',
        description: '잊힌 폐허에 협업 연구 시설 장면과 전용 적·펫·장비를 추가합니다. 이미 탐험한 일부가 덮어써질 수 있습니다.'
    }
];

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

function renderHintIcon(text, labelStr) {
    if (!text) return '';
    const safeText = escapeHTML(text);
    const ariaLabel = labelStr ? escapeHTML(`${labelStr} 도움말`) : '도움말';
    return `
        <span class="hint-wrapper">
            <button type="button" class="hint-icon" aria-label="${ariaLabel}" aria-expanded="false">?</button>
            <span class="hint-tooltip" role="tooltip">${safeText}</span>
        </span>
    `;
}

function isValidAppState(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
    if (obj.creator !== 'thijsvanloef' && obj.creator !== 'jammsen') return false;
    if (obj.game !== undefined && !Object.hasOwn(GAME_SECTIONS, obj.game)) return false;
    const isPlainObj = val => val !== null && typeof val === 'object' && !Array.isArray(val);
    if (!isPlainObj(obj.connection) || !isPlainObj(obj.serverOptions) || !isPlainObj(obj.volume)) return false;
    if (obj.coreKeeperConnection !== undefined && !isPlainObj(obj.coreKeeperConnection)) return false;
    if (obj.coreKeeperOptions !== undefined && !isPlainObj(obj.coreKeeperOptions)) return false;
    if (obj.coreKeeperVolume !== undefined && !isPlainObj(obj.coreKeeperVolume)) return false;
    if (obj.valheimConnection !== undefined && !isPlainObj(obj.valheimConnection)) return false;
    if (obj.valheimOptions !== undefined && !isPlainObj(obj.valheimOptions)) return false;
    if (obj.valheimVolume !== undefined && !isPlainObj(obj.valheimVolume)) return false;
    if (obj.valheimQol !== undefined && !isPlainObj(obj.valheimQol)) return false;
    if (obj.valheimMods !== undefined && (!isPlainObj(obj.valheimMods) || typeof obj.valheimMods.packages !== 'string' ||
        !Array.isArray(obj.valheimMods.files) || !Array.isArray(obj.valheimMods.configs) ||
        obj.valheimMods.files.some(file => !isPlainObj(file) || typeof file.id !== 'string' || typeof file.name !== 'string' || !Number.isFinite(file.size) || file.size < 0) ||
        obj.valheimMods.configs.some(file => !isPlainObj(file) || typeof file.name !== 'string' || typeof file.content !== 'string'))) return false;
    return true;
}

function mergeSavedAppState(savedState) {
    return {
        ...clone(defaultDraftState),
        ...savedState,
        connection: { ...defaultDraftState.connection, ...savedState.connection },
        serverOptions: { ...defaultDraftState.serverOptions, ...savedState.serverOptions },
        volume: { ...defaultDraftState.volume, ...savedState.volume },
        coreKeeperConnection: { ...defaultDraftState.coreKeeperConnection, ...savedState.coreKeeperConnection },
        coreKeeperOptions: { ...defaultDraftState.coreKeeperOptions, ...savedState.coreKeeperOptions },
        coreKeeperVolume: { ...defaultDraftState.coreKeeperVolume, ...savedState.coreKeeperVolume },
        valheimConnection: { ...defaultDraftState.valheimConnection, ...savedState.valheimConnection },
        valheimOptions: { ...defaultDraftState.valheimOptions, ...savedState.valheimOptions },
        valheimVolume: { ...defaultDraftState.valheimVolume, ...savedState.valheimVolume },
        valheimQol: { ...defaultDraftState.valheimQol, ...savedState.valheimQol },
        valheimMods: { ...clone(defaultDraftState.valheimMods), ...savedState.valheimMods }
    };
}

function getDesktopBridge() {
    if (typeof window !== 'undefined') {
        return window.gameServerDesktop || window.palServerDesktop || null;
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
                    state.draft = mergeSavedAppState(data.draft);
                    state.applied = mergeSavedAppState(data.applied);
                    renderAppSections();
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
            state.draft = mergeSavedAppState(data.draft);
            state.applied = mergeSavedAppState(data.applied);
            renderAppSections();
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
    setupValheimModsListeners();
    setupValheimQolListeners();
    updateLocalStorageUI();
    setupLocalStorageListeners();
    renderAppSections();
    updateActionBars();
    generateComposeYaml();
    
    loadInitialData();
}

function renderActionButtons(sectionKey) {
    const isDirty = !isEqual(state.draft[sectionKey], state.applied[sectionKey]) ||
        (sectionKey === 'valheimOptions' && (!isEqual(state.draft.valheimQol, state.applied.valheimQol) || !isEqual(state.draft.valheimMods, state.applied.valheimMods))) ||
        (sectionKey === 'valheimQol' && state.draft.valheimQol.enabled && state.applied.valheimOptions.modMode !== 'valheimplus');
    return `
        <button type="button" class="btn btn-secondary btn-restore" data-section="${sectionKey}" ${!isDirty ? 'disabled' : ''}>복원</button>
        <button type="button" class="btn btn-primary btn-apply" data-section="${sectionKey}" ${!isDirty ? 'disabled' : ''}>적용</button>
    `;
}

function updateActionBars() {
    const sections = GAME_SECTIONS[state.draft.game];
    const actionGame = document.getElementById('action-game');
    if (actionGame) actionGame.innerHTML = renderActionButtons('game');

    const actionCreator = document.getElementById('action-creator');
    if (actionCreator) actionCreator.innerHTML = state.draft.game === 'palworld' ? renderActionButtons('creator') : '';
    
    const actionVolume = document.getElementById('action-volume');
    if (actionVolume) actionVolume.innerHTML = renderActionButtons(sections.volume);
    
    const actionConnection = document.getElementById('action-connection');
    if (actionConnection) actionConnection.innerHTML = renderActionButtons(sections.connection);
    
    const actionOptions = document.getElementById('action-options');
    if (actionOptions) actionOptions.innerHTML = renderActionButtons(sections.options);
    const actionMods = document.getElementById('action-valheim-mods');
    if (actionMods) actionMods.innerHTML = renderActionButtons('valheimMods');
    const actionQol = document.getElementById('action-valheim-qol');
    if (actionQol) actionQol.innerHTML = renderActionButtons('valheimQol');
}

function setupVolumeAndGlobalListeners() {
    document.addEventListener('click', (e) => {
        if (e.target.matches('.btn-apply')) {
            const section = e.target.dataset.section;
            state.applied[section] = clone(state.draft[section]);
            if (section === 'valheimOptions') {
                state.applied.valheimQol = clone(state.draft.valheimQol);
                state.applied.valheimMods = clone(state.draft.valheimMods);
                if (state.applied.valheimQol.enabled) {
                    state.draft.valheimOptions.modMode = 'valheimplus';
                    state.applied.valheimOptions.modMode = 'valheimplus';
                    const loader = document.getElementById('modMode');
                    if (loader) loader.value = 'valheimplus';
                }
            }
            if (section === 'valheimMods') {
                state.applied.valheimOptions.modMode = state.draft.valheimOptions.modMode;
            }
            if (section === 'valheimQol' && state.applied.valheimQol.enabled) {
                state.draft.valheimOptions.modMode = 'valheimplus';
                state.applied.valheimOptions.modMode = 'valheimplus';
                renderServerOptions();
            }
            updateActionBars();
            generateComposeYaml();
        }
        
        if (e.target.matches('.btn-restore')) {
            const section = e.target.dataset.section;
            state.draft[section] = clone(state.applied[section]);
            if (section === 'valheimOptions') {
                state.draft.valheimQol = clone(state.applied.valheimQol);
                state.draft.valheimMods = clone(state.applied.valheimMods);
            }
            
            if (section === 'game') {
                renderAppSections();
            } else if (section === 'creator') {
                renderCreatorSection();
                renderConnectionSettings();
                renderServerOptions();
            } else if (section === GAME_SECTIONS[state.draft.game].connection) {
                renderConnectionSettings();
            } else if (section === GAME_SECTIONS[state.draft.game].options) {
                renderServerOptions();
            } else if (section === GAME_SECTIONS[state.draft.game].volume) {
                renderVolumeSettings();
            } else if (section === 'valheimMods') {
                renderValheimMods();
            } else if (section === 'valheimQol') {
                renderValheimQol();
            }
            updateActionBars();
        }
        
        if (e.target.matches('#btn-reset-all')) {
            state.draft = clone(defaultDraftState);
            state.applied = clone(defaultDraftState);
            valheimModFiles.clear();

            renderAppSections();
            updateActionBars();
            generateComposeYaml();
        }
    });

    document.addEventListener('input', (e) => {
        if (e.target.matches('[data-volume-key]')) {
            const volumeState = state.draft[GAME_SECTIONS[state.draft.game].volume];
            volumeState[e.target.dataset.volumeKey] = e.target.value;
            updateActionBars();
        }
    });
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
            const bridge = getDesktopBridge();
            if (bridge && typeof bridge.exportYml === 'function') {
                const result = await bridge.exportYml(yamlContent);
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

function needsValheimModBundle(applied) {
    return applied.game === 'valheim' && applied.valheimOptions.modMode !== 'vanilla';
}

function renderValheimQol() {
    const container = document.getElementById('section-valheim-qol');
    if (!container) return;
    container.hidden = state.draft.game !== 'valheim';
    if (container.hidden) return;
    const settings = state.draft.valheimQol;
    container.innerHTML = `
        <h3 class="subsection-title">ValheimPlus 플레이 편의 설정</h3>
        <p class="section-desc">광물 포탈, 운반 무게, 상자 재료 사용, 스태미나와 생산 자동화를 설정합니다. 직접 설정 후 적용하면 ValheimPlus가 선택됩니다.</p>
        <div class="form-group">
            <label for="valheim-qol-mode">편의 설정 방식</label>
            <select id="valheim-qol-mode" class="text-input">
                <option value="keep" ${!settings.enabled ? 'selected' : ''}>기존 설정 유지</option>
                <option value="custom" ${settings.enabled ? 'selected' : ''}>이 화면에서 직접 설정</option>
            </select>
            <p class="helper-text">기존 설정 유지는 서버 설정 파일을 그대로 사용합니다. 이미 적용한 기능을 끄려면 직접 설정에서 끄거나 기본값을 적용하세요.</p>
        </div>
        <div class="qol-presets">
            <button type="button" id="btn-qol-recommended" class="btn btn-secondary">추천 편의값 채우기</button>
            <button type="button" id="btn-qol-defaults" class="btn btn-secondary">편의 기능 기본값으로 채우기</button>
        </div>
        <p class="helper-text">추천값: 광물 포탈 허용 · 운반 무게 600 · 스택 2배 · 상자 재료 사용 · 달리기/점프 소모 25% 감소. 적용 버튼을 눌러 반영하세요.</p>
        <fieldset class="qol-fields" ${!settings.enabled ? 'disabled' : ''}>
            <legend>원하는 편의 기능</legend>
            <div class="form-grid">${ValheimQol.fields.map(field => `
                <div class="form-group">
                    <label for="qol-${field.key}" class="${field.type === 'boolean' ? 'qol-checkbox-label' : ''}">
                        ${field.type === 'boolean' ? `<input type="checkbox" id="qol-${field.key}" data-qol-key="${field.key}" ${settings[field.key] ? 'checked' : ''}>` : ''}
                        ${escapeHTML(field.label)}
                    </label>
                    ${field.type === 'number' ? `<input type="number" id="qol-${field.key}" data-qol-key="${field.key}" class="text-input" min="${field.min}" max="${field.max}" step="${field.step}" value="${escapeHTML(settings[field.key])}">` : ''}
                    <p class="helper-text">${escapeHTML(field.help)}</p>
                </div>`).join('')}</div>
        </fieldset>
        <p class="helper-text">서버와 각 사용자 PC에 같은 버전의 ValheimPlus가 필요합니다. 서버 설정은 접속한 PC에 동기화됩니다. 직접 입력한 valheim_plus.cfg의 동일 항목보다 이 화면 값이 우선합니다.</p>
        <a class="option-link" href="https://github.com/Grantapher/ValheimPlus/releases/latest" target="_blank" rel="noopener noreferrer">사용자 PC용 ValheimPlus 다운로드·설치 안내 ↗</a>
    `;
    updateActionBars();
}

function setupValheimQolListeners() {
    const container = document.getElementById('section-options');
    if (!container) return;
    container.addEventListener('click', event => {
        if (event.target.id === 'btn-qol-recommended') state.draft.valheimQol = ValheimQol.preset();
        else if (event.target.id === 'btn-qol-defaults') state.draft.valheimQol = { ...ValheimQol.defaults, enabled: true };
        else return;
        renderValheimQol();
    });
    container.addEventListener('change', event => {
        if (event.target.id !== 'valheim-qol-mode') return;
        state.draft.valheimQol.enabled = event.target.value === 'custom';
        renderValheimQol();
    });
    container.addEventListener('input', event => {
        const field = ValheimQol.fields.find(candidate => candidate.key === event.target.dataset.qolKey);
        if (!field || !state.draft.valheimQol.enabled) return;
        state.draft.valheimQol[field.key] = field.type === 'boolean' ? event.target.checked :
            (event.target.value === '' ? null : Number(event.target.value));
        updateActionBars();
    });
}

function renderValheimMods() {
    const previewTitle = document.getElementById('preview-title');
    if (previewTitle) previewTitle.textContent = '5. YML 미리보기';
    const container = document.getElementById('section-valheim-mods');
    if (!container) return;
    container.hidden = state.draft.game !== 'valheim';
    if (container.hidden) return;
    const mods = state.draft.valheimMods;
    container.innerHTML = `
        <h3 class="subsection-title">추가 Valheim 모드 설치·설정</h3>
        <p class="section-desc">Thunderstore 모드와 내 PC의 ZIP·DLL을 함께 넣을 수 있습니다. 모드를 적용한 뒤 실행 묶음 ZIP을 내려받으세요.</p>
        <div class="form-group">
            <label for="valheimPackages">Thunderstore 링크 또는 모드 ID</label>
            <textarea id="valheimPackages" class="text-input mod-textarea" rows="4" placeholder="제작자-모드명-1.2.3 또는 Thunderstore 모드 링크&#10;한 줄에 하나씩 입력하세요.">${escapeHTML(mods.packages)}</textarea>
            <p class="helper-text">서버 시작 전에 의존 모드까지 설치합니다. 버전을 생략하면 첫 설치 시 최신 버전을 선택하고 이후 같은 묶음에서는 유지합니다.</p>
            <a class="option-link" href="https://thunderstore.io/c/valheim/" target="_blank" rel="noopener noreferrer">Thunderstore에서 Valheim 모드 찾기 ↗</a>
        </div>
        <div class="form-group mt-sm">
            <label for="valheimModUpload">내 PC의 모드 파일 추가 (ZIP·DLL)</label>
            <input id="valheimModUpload" type="file" class="text-input" accept=".zip,.dll" multiple>
            <p class="helper-text">합계 32 MiB까지 첨부할 수 있습니다. ZIP의 manifest.json에 있는 의존 모드는 자동 설치합니다. DLL만 첨부할 때는 필요한 의존 모드를 위 목록에 추가하세요.</p>
            <ul class="mod-file-list">${mods.files.map(file => `<li><span>${escapeHTML(file.name)} (${(file.size / 1024).toFixed(1)} KiB)${valheimModFiles.has(file.id) ? '' : ' — 다시 선택 필요'}</span><button type="button" class="btn btn-secondary" data-remove-mod="${escapeHTML(file.id)}" aria-label="${escapeHTML(file.name)} 제거">제거</button></li>`).join('')}</ul>
            <p class="helper-text">첨부 파일은 실행 묶음에 포함됩니다. 로컬 설정 저장에는 파일 목록만 저장되므로 앱을 다시 열면 파일을 다시 선택해 주세요.</p>
        </div>
        <div class="form-group mt-sm">
            <label for="valheimConfigUpload">모드 설정 파일 불러오기 (.cfg)</label>
            <input id="valheimConfigUpload" type="file" class="text-input" accept=".cfg" multiple>
            <p class="helper-text">모드가 생성한 .cfg를 불러와 아래에서 수정하거나 새 설정을 추가하세요. 파일당 128 KiB까지 지원합니다. 기존 서버 설정은 유지하며, 아래에 지정한 파일만 덮어씁니다.</p>
            <button type="button" id="btn-add-mod-config" class="btn btn-secondary">설정 파일 직접 추가</button>
        </div>
        <div class="mod-config-list">${mods.configs.map((config, index) => `
            <div class="mod-config-editor">
                <label for="mod-config-name-${index}">설정 파일 이름</label>
                <input id="mod-config-name-${index}" class="text-input mod-config-name" data-config-index="${index}" value="${escapeHTML(config.name)}" placeholder="예: 모드가 생성한 파일명.cfg">
                <label for="mod-config-content-${index}">설정 내용</label>
                <textarea id="mod-config-content-${index}" class="text-input mod-textarea mod-config-content" data-config-index="${index}" rows="8" spellcheck="false">${escapeHTML(config.content)}</textarea>
                <button type="button" class="btn btn-secondary" data-remove-config="${index}">이 설정 제외</button>
            </div>`).join('')}</div>
        <p class="helper-text mt-sm">모드를 처음 추가하면 BepInEx를 선택합니다. ValheimPlus 편의 설정을 직접 지정하면 적용 시 ValheimPlus를 선택합니다. 아래 서버 옵션 적용 버튼으로 로더·모드·편의 설정을 함께 반영하세요. 클라이언트 전용 모드는 제외하고, 플레이어에게도 필요한 모드는 각 PC에 설치하세요.</p>
        <p id="valheim-mod-status" class="helper-text" role="status"></p>
    `;
    updateActionBars();
}

function setupValheimModsListeners() {
    const container = document.getElementById('section-options');
    if (!container) return;
    const enableLoader = () => {
        if (ValheimMods.hasContent(state.draft.valheimMods) && state.draft.valheimOptions.modMode === 'vanilla') {
            state.draft.valheimOptions.modMode = 'bepinex';
            const loader = document.getElementById('modMode');
            if (loader) loader.value = 'bepinex';
        }
    };
    container.addEventListener('input', event => {
        const input = event.target;
        if (input.id !== 'valheimPackages' && !input.matches('.mod-config-name, .mod-config-content')) return;
        if (input.id === 'valheimPackages') state.draft.valheimMods.packages = input.value;
        if (input.matches('.mod-config-name, .mod-config-content')) {
            const config = state.draft.valheimMods.configs[Number(input.dataset.configIndex)];
            if (config) config[input.matches('.mod-config-name') ? 'name' : 'content'] = input.value;
        }
        enableLoader();
        updateActionBars();
    });
    container.addEventListener('click', event => {
        const target = event.target;
        if (target.id === 'btn-add-mod-config') {
            state.draft.valheimMods.configs.push({ name: '', content: '' });
        } else if (target.matches('[data-remove-mod]')) {
            state.draft.valheimMods.files = state.draft.valheimMods.files.filter(file => file.id !== target.dataset.removeMod);
        } else if (target.matches('[data-remove-config]')) {
            state.draft.valheimMods.configs.splice(Number(target.dataset.removeConfig), 1);
        } else return;
        enableLoader();
        renderValheimMods();
    });
    container.addEventListener('change', async event => {
        if (!['valheimModUpload', 'valheimConfigUpload'].includes(event.target.id)) return;
        const input = event.target;
        const mods = state.draft.valheimMods;
        const incoming = Array.from(input.files || []);
        try {
            if (input.id === 'valheimModUpload') {
                const names = new Set(incoming.map(file => file.name));
                const retained = mods.files.filter(file => !names.has(file.name));
                if (retained.reduce((size, file) => size + file.size, 0) + incoming.reduce((size, file) => size + file.size, 0) > ValheimMods.MAX_UPLOAD_BYTES) throw new Error('첨부 파일 합계는 32 MiB 이하여야 합니다.');
                const additions = [];
                for (const file of incoming) {
                    if (!/\.(zip|dll)$/i.test(file.name) || /[\\/:\x00-\x1f]/.test(file.name)) throw new Error('ZIP 또는 DLL만 첨부할 수 있습니다.');
                    additions.push({ descriptor: { id: crypto.randomUUID(), name: file.name, size: file.size }, data: new Uint8Array(await file.arrayBuffer()) });
                }
                if (state.draft.valheimMods !== mods) return;
                for (const file of additions) valheimModFiles.set(file.descriptor.id, file.data);
                mods.files = retained.concat(additions.map(file => file.descriptor));
            } else {
                const additions = [];
                for (const file of incoming) {
                    if (!ValheimMods.safeConfigName(file.name) || file.size > ValheimMods.MAX_CONFIG_BYTES) throw new Error('각각 128 KiB 이하의 .cfg 파일을 선택하세요.');
                    additions.push({ name: file.name, content: await file.text() });
                }
                if (state.draft.valheimMods !== mods) return;
                mods.configs = mods.configs.filter(config => !additions.some(file => file.name === config.name)).concat(additions);
            }
            enableLoader();
            renderValheimMods();
        } catch (error) {
            const status = document.getElementById('valheim-mod-status');
            if (status) status.textContent = error.message;
        } finally {
            input.value = '';
        }
    });
    const bundleButton = document.getElementById('btn-download-bundle');
    if (bundleButton) bundleButton.addEventListener('click', async () => {
        const status = document.getElementById('download-status');
        try {
            const errors = validateValheimSettings(state.applied);
            if (errors.length) throw new Error(errors.join(' '));
            bundleButton.disabled = true;
            const bytes = ValheimMods.buildBundle(state.applied, buildValheimComposeYaml(state.applied), valheimModFiles, VALHEIM_MOD_INSTALLER_SOURCE, fflate.zipSync);
            const bridge = getDesktopBridge();
            if (bridge && typeof bridge.exportBundle === 'function') {
                const result = await bridge.exportBundle(bytes);
                if (result.canceled) return;
                if (!result.success) throw new Error(result.error || '묶음을 저장하지 못했습니다.');
            } else {
                const url = URL.createObjectURL(new Blob([bytes], { type: 'application/zip' }));
                const link = document.createElement('a');
                link.href = url;
                link.download = 'valheim-server-bundle.zip';
                document.body.appendChild(link);
                link.click();
                link.remove();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            }
            if (status) status.textContent = '실행 묶음을 저장했습니다. 서버에서 압축을 풀고 docker compose up -d 를 실행하세요.';
        } catch (error) {
            if (status) status.textContent = '실행 묶음 생성 실패: ' + error.message;
        } finally {
            generateComposeYaml();
        }
    });
}

function setupEventListeners() {
    document.addEventListener('click', (e) => {
        const gameCard = e.target.closest('.game-card');
        if (gameCard) {
            const selectedGame = gameCard.dataset.game;
            if (selectedGame && selectedGame !== state.draft.game) {
                setGame(selectedGame);
            }
            return;
        }

        const creatorCard = e.target.closest('.creator-card[data-creator]');
        if (creatorCard) {
            const selectedCreator = creatorCard.dataset.creator;
            if (selectedCreator && selectedCreator !== state.draft.creator) {
                setCreator(selectedCreator);
            }
            return;
        }

        const hintIcon = e.target.closest('.hint-icon');
        if (hintIcon) {
            e.preventDefault();
            e.stopPropagation();
            const wrapper = hintIcon.closest('.hint-wrapper');
            const isActive = wrapper.classList.contains('active');
            
            document.querySelectorAll('.hint-wrapper.active').forEach(w => w.classList.remove('active'));
            document.querySelectorAll('.hint-icon').forEach(i => i.setAttribute('aria-expanded', 'false'));
            
            if (!isActive) {
                wrapper.classList.add('active');
                hintIcon.setAttribute('aria-expanded', 'true');
            }
        } else {
            document.querySelectorAll('.hint-wrapper.active').forEach(w => w.classList.remove('active'));
            document.querySelectorAll('.hint-icon').forEach(i => i.setAttribute('aria-expanded', 'false'));
        }
    });
}

function setGame(gameId) {
    if (!Object.hasOwn(GAME_SECTIONS, gameId)) return;
    state.draft.game = gameId;
    renderAppSections();
    updateActionBars();
}

function setCreator(creatorId) {
    state.draft.creator = creatorId;
    renderCreatorSection();
    renderConnectionSettings();
    renderServerOptions();
    updateActionBars();
}

function updateGameUI() {
    document.querySelectorAll('.game-card').forEach(card => {
        if (card.dataset.game === state.draft.game) {
            card.classList.add('active');
            card.setAttribute('aria-pressed', 'true');
        } else {
            card.classList.remove('active');
            card.setAttribute('aria-pressed', 'false');
        }
    });
}

function renderCreatorSection() {
    const container = document.getElementById('section-creator');
    if (!container) return;

    if (state.draft.game === 'valheim') {
        container.innerHTML = `
            <h2>2. Valheim Docker 이미지</h2>
            <p class="section-desc">Docker Hub에서 다운로드 수가 가장 많은 Valheim 전용 서버 이미지입니다. 자동 업데이트·백업·BepInEx·ValheimPlus를 지원합니다.</p>
            <div class="creator-cards">
                <div class="creator-card active fixed-card" aria-label="lloesche 이미지 선택됨">
                    <div class="card-icon">⚔️</div>
                    <div class="card-content">
                        <h3>lloesche</h3>
                        <p>${ValheimSettings.image}</p>
                        <span class="badge">Docker Hub 다운로드 1위</span>
                    </div>
                </div>
            </div>
            <p class="helper-text">2026-10-25 확인: 약 3,515만 다운로드 · 별 220개. 유지보수: community-valheim-tools.</p>
            <a class="option-link" href="https://hub.docker.com/r/lloesche/valheim-server" target="_blank" rel="noopener noreferrer">Docker Hub 이미지·설정 문서 ↗</a>
        `;
        return;
    }

    if (state.draft.game === 'corekeeper') {
        container.innerHTML = `
            <h2>2. Core Keeper Docker 이미지</h2>
            <p class="section-desc">공식 설정 문서가 제공되는 커뮤니티 이미지로 Compose 파일을 구성합니다.</p>
            <div class="creator-cards">
                <div class="creator-card active fixed-card" aria-label="escaping 이미지 선택됨">
                    <div class="card-icon">⛏️</div>
                    <div class="card-content">
                        <h3>escapingnetwork</h3>
                        <p>escaping/core-keeper-dedicated:latest</p>
                        <span class="badge">Core Keeper</span>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <h2>2. Palworld Docker 이미지 선택 ${renderHintIcon('사용할 Palworld 서버의 베이스 이미지를 제공하는 제작자를 선택합니다.', 'Docker 이미지 선택')}</h2>
        <p class="section-desc">사용할 Docker 이미지의 제작자를 선택해주세요.</p>
        <div class="creator-cards">
            <button class="creator-card ${state.draft.creator === 'thijsvanloef' ? 'active' : ''}" data-creator="thijsvanloef" aria-label="thijsvanloef 선택" aria-pressed="${state.draft.creator === 'thijsvanloef'}">
                <div class="card-icon">🚀</div>
                <div class="card-content">
                    <h3>thijsvanloef</h3>
                    <p>thijsvanloef/palworld-server-docker</p>
                    <span class="badge">추천</span>
                </div>
            </button>
            <button class="creator-card ${state.draft.creator === 'jammsen' ? 'active' : ''}" data-creator="jammsen" aria-label="jammsen 선택" aria-pressed="${state.draft.creator === 'jammsen'}">
                <div class="card-icon">⚡</div>
                <div class="card-content">
                    <h3>jammsen</h3>
                    <p>jammsen/palworld-dedicated-server</p>
                </div>
            </button>
        </div>
        <div class="action-bar" id="action-creator"></div>
    `;
}

function renderAppSections() {
    updateGameUI();
    renderCreatorSection();
    renderConnectionSettings();
    renderServerOptions();
    renderVolumeSettings();
    renderValheimQol();
    renderValheimMods();
}

function renderVolumeSettings() {
    const container = document.getElementById('volume-settings-fields');
    if (!container) return;

    if (state.draft.game === 'valheim') {
        const volume = state.draft.valheimVolume;
        container.innerHTML = `
            <div class="form-group">
                <label for="valheimConfigPath">월드·설정 폴더</label>
                <input type="text" id="valheimConfigPath" data-volume-key="configPath" class="text-input" value="${escapeHTML(volume.configPath)}" placeholder="./valheim-config">
                <p class="helper-text">/config에 연결됩니다. worlds_local의 월드, 관리자 목록, 백업과 모드 설정을 보존합니다.</p>
            </div>
            <div class="form-group mt-sm">
                <label for="valheimDataPath">서버 프로그램 폴더</label>
                <input type="text" id="valheimDataPath" data-volume-key="dataPath" class="text-input" value="${escapeHTML(volume.dataPath)}" placeholder="./valheim-data">
                <p class="helper-text">/opt/valheim에 연결되어 서버 실행 파일과 다운로드 캐시를 유지합니다. 월드·설정 폴더와 다른 경로를 지정하세요.</p>
            </div>
        `;
    } else if (state.draft.game === 'corekeeper') {
        const volume = state.draft.coreKeeperVolume;
        container.innerHTML = `
            <div class="form-group">
                <label for="coreKeeperFilesPath">서버 프로그램 폴더 ${renderHintIcon('서버 실행 파일을 유지하는 선택 볼륨입니다. 제거해도 데이터 볼륨의 월드는 보존됩니다.', '서버 프로그램 폴더')}</label>
                <input type="text" id="coreKeeperFilesPath" data-volume-key="filesPath" class="text-input" value="${escapeHTML(volume.filesPath)}" placeholder="./core-keeper-files">
                <p class="helper-text">컨테이너의 /home/steam/core-keeper-dedicated에 연결됩니다.</p>
            </div>
            <div class="form-group mt-sm">
                <label for="coreKeeperDataPath">월드 데이터 폴더 ${renderHintIcon('월드와 설정을 보존하는 필수 볼륨입니다.', '월드 데이터 폴더')}</label>
                <input type="text" id="coreKeeperDataPath" data-volume-key="dataPath" class="text-input" value="${escapeHTML(volume.dataPath)}" placeholder="./core-keeper-data">
                <p class="helper-text">컨테이너의 /home/steam/core-keeper-data에 연결됩니다.</p>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="form-group">
                <label for="volumeHostPath">서버 데이터 폴더 (volume) ${renderHintIcon('호스트의 파일 시스템과 컨테이너를 연결하여 Palworld 데이터를 유지합니다.', '서버 데이터 폴더')}</label>
                <input type="text" id="volumeHostPath" data-volume-key="hostPath" class="text-input" value="${escapeHTML(state.draft.volume.hostPath)}" placeholder="./pal_server">
                <p class="helper-text">컨테이너의 /palworld에 연결됩니다.</p>
            </div>
        `;
    }

    updateActionBars();
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

function renderCoreKeeperConnectionSettings(container) {
    const conn = state.draft.coreKeeperConnection;
    const platformOptions = [
        { value: '', label: '전체 플랫폼 허용' },
        { value: '1', label: 'Steam만 허용 (1)' },
        { value: '2', label: 'Epic만 허용 (2)' },
        { value: '3', label: 'Microsoft만 허용 (3)' },
        { value: '4', label: 'GOG만 허용 (4)' }
    ];

    container.innerHTML = `
        <h2>3. Core Keeper 접속 설정</h2>
        <p class="section-desc">월드 이름과 접속 방식을 설정합니다. 기본 SDR 방식은 포트 개방 없이 Game ID로 접속합니다.</p>
        <div class="form-grid">
            <div class="form-group">
                <label for="worldName">월드 이름 (WORLD_NAME) ${renderHintIcon('서버에서 사용할 Core Keeper 월드 이름입니다.', '월드 이름')}</label>
                <input type="text" id="worldName" data-key="worldName" value="${escapeHTML(conn.worldName)}" class="text-input" placeholder="Core Keeper Server">
            </div>

            <div class="form-group">
                <label for="gameId">고정 Game ID (GAME_ID) ${renderHintIcon('15~28자의 영숫자 ID입니다. 비워두면 최초 실행 시 자동 생성됩니다.', 'Game ID')}</label>
                <input type="text" id="gameId" data-key="gameId" value="${escapeHTML(conn.gameId)}" class="text-input" maxlength="28" placeholder="비워두면 자동 생성">
                <p class="helper-text">자동 생성된 ID는 컨테이너의 GameID.txt 또는 로그에서 확인할 수 있습니다.</p>
            </div>

            <div class="form-group">
                <label for="maxPlayers">최대 플레이어 수 (MAX_PLAYERS)</label>
                <input type="number" id="maxPlayers" data-key="maxPlayers" class="text-input connection-number" min="1" max="100" step="1" value="${escapeHTML(String(conn.maxPlayers))}">
            </div>

            <div class="form-divider"></div>

            <div class="form-group">
                <div class="label-row">
                    <label>직접 연결 모드 (SERVER_PORT) ${renderHintIcon('활성화하면 SDR 대신 IP와 UDP 포트로 직접 접속하며, 라우터와 방화벽에서 포트를 열어야 합니다.', '직접 연결 모드')}</label>
                    <div class="toggle-group" role="group" aria-label="직접 연결 모드">
                        <button type="button" class="toggle-btn ${conn.directConnection ? 'active' : ''}" data-key="directConnection" data-val="true" aria-pressed="${conn.directConnection}">사용</button>
                        <button type="button" class="toggle-btn ${!conn.directConnection ? 'active' : ''}" data-key="directConnection" data-val="false" aria-pressed="${!conn.directConnection}">SDR 사용</button>
                    </div>
                </div>

                ${conn.directConnection ? `
                    <div class="sub-form-group">
                        <label for="serverIp">바인드 IP (SERVER_IP)</label>
                        <input type="text" id="serverIp" data-key="serverIp" value="${escapeHTML(conn.serverIp)}" class="text-input" placeholder="비워두면 0.0.0.0">

                        <label for="serverPort" class="mt-sm">직접 연결 UDP 포트 (SERVER_PORT)</label>
                        ${renderPortControl('serverPort', conn.serverPort)}

                        <label for="coreKeeperPassword" class="mt-sm">접속 비밀번호 (PASSWORD)</label>
                        <input type="password" id="coreKeeperPassword" data-key="password" value="${escapeHTML(conn.password)}" class="text-input" maxlength="28" placeholder="최대 28자">

                        <label for="allowOnlyPlatform" class="mt-sm">허용 플랫폼 (ALLOW_ONLY_PLATFORM)</label>
                        <select id="allowOnlyPlatform" data-key="allowOnlyPlatform" class="text-input connection-select">
                            ${platformOptions.map(option => `<option value="${option.value}" ${conn.allowOnlyPlatform === option.value ? 'selected' : ''}>${option.label}</option>`).join('')}
                        </select>
                    </div>
                ` : '<p class="helper-text">SDR은 Steam 릴레이를 사용하므로 인바운드 포트 매핑이 필요하지 않습니다.</p>'}
            </div>
        </div>
        <div class="action-bar" id="action-connection"></div>
    `;

    container.classList.remove('placeholder-section');
    updateActionBars();
}

function renderValheimConnectionSettings(container) {
    const conn = state.draft.valheimConnection;
    container.innerHTML = `
        <h2>3. Valheim 접속 설정</h2>
        <p class="section-desc">서버 이름과 월드, 접속 비밀번호를 입력하고 적용하세요. 비밀번호는 5자 이상이어야 합니다. 비밀번호 파일도 사용할 수 있습니다.</p>
        <div class="form-grid">
            <div class="form-group">
                <label for="valheimServerName">서버 이름 (SERVER_NAME)</label>
                <input type="text" id="valheimServerName" data-key="serverName" value="${escapeHTML(conn.serverName)}" class="text-input" placeholder="Valheim Server" required>
            </div>
            <div class="form-group">
                <label for="valheimWorldName">월드 이름 (WORLD_NAME)</label>
                <input type="text" id="valheimWorldName" data-key="worldName" value="${escapeHTML(conn.worldName)}" class="text-input" placeholder="Dedicated" required>
                <p class="helper-text">기존 월드는 worlds_local 안의 월드 이름과 일치시켜 주세요. 이전 형식의 세이브는 .db/.fwl 확장자를 제외한 이름입니다.</p>
            </div>
            <div class="form-group">
                <label for="valheimServerPassword">접속 비밀번호 (SERVER_PASS)</label>
                <input type="password" id="valheimServerPassword" data-key="serverPassword" value="${escapeHTML(conn.serverPassword)}" class="text-input" minlength="5" autocomplete="new-password" placeholder="5자 이상 입력" required>
            </div>
            <div class="form-group">
                <label for="valheimServerSecretFile">접속 비밀번호 파일 (SERVER_PASS_FILE)</label>
                <input type="text" id="valheimServerSecretFile" data-key="serverSecretFile" value="${escapeHTML(conn.serverSecretFile)}" class="text-input" placeholder="예: ./secrets/server_pass.txt">
                <p class="helper-text">선택 사항. Docker 호스트의 파일을 Compose secret으로 연결하며 직접 입력한 비밀번호보다 우선합니다. 파일 내용은 5자 이상이어야 합니다. 생성기가 이 파일을 만들거나 실행 묶음에 포함하지 않으므로 서버에 직접 준비하세요.</p>
            </div>
            <div class="form-group">
                <label for="valheimServerPort">시작 UDP 포트 (SERVER_PORT)</label>
                <input type="number" id="valheimServerPort" data-key="serverPort" value="${escapeHTML(String(conn.serverPort))}" class="text-input connection-number" min="1024" max="65533" step="1">
                <p class="helper-text">시작 포트와 다음 포트를 함께 사용합니다. 크로스플레이를 켜면 세 번째 포트도 포함합니다.</p>
            </div>
            <div class="form-group">
                <div class="label-row"><label>서버 목록 공개 (SERVER_PUBLIC)</label>
                    ${renderBooleanControl('serverPublic', conn.serverPublic, '공개', '비공개')}
                </div>
            </div>
            <div class="form-group">
                <div class="label-row"><label>크로스플레이 (CROSSPLAY)</label>
                    ${renderBooleanControl('crossplay', conn.crossplay)}
                </div>
                <p class="helper-text">${conn.crossplay
                    ? 'PlayFab을 통해 Steam·Xbox·Microsoft Store 등의 클라이언트가 접속합니다. LAN IP 접속은 지원하지 않으므로 참가 코드를 사용하세요.'
                    : 'Steam 전용입니다. 외부 접속에는 시작 포트와 다음 UDP 포트의 방화벽·포트포워딩 설정이 필요합니다.'}</p>
            </div>
        </div>
        <div class="action-bar" id="action-connection"></div>
    `;
    container.classList.remove('placeholder-section');
    updateActionBars();
}

function renderConnectionSettings() {
    const container = document.getElementById('section-connection');
    if (state.draft.game === 'valheim') {
        renderValheimConnectionSettings(container);
        return;
    }
    if (state.draft.game === 'corekeeper') {
        renderCoreKeeperConnectionSettings(container);
        return;
    }

    const conn = state.draft.connection;
    const isThijs = state.draft.creator === 'thijsvanloef';

    container.innerHTML = `
        <h2>3. Palworld 접속 설정</h2>
        <p class="section-desc">서버 이름, 비밀번호 및 포트 정보를 설정합니다.</p>
        
        <div class="form-grid">
            <div class="form-group">
                <label for="serverName">서버 이름 (SERVER_NAME) ${renderHintIcon('서버 목록에 표시될 이름입니다.', '서버 이름')}</label>
                <input type="text" id="serverName" data-key="serverName" value="${escapeHTML(conn.serverName)}" class="text-input" placeholder="서버 이름을 입력하세요">
            </div>

            <div class="form-group">
                <label for="serverPassword">서버 접속 비밀번호 (SERVER_PASSWORD) ${renderHintIcon('서버에 접속할 때 필요한 비밀번호입니다. 비워두면 공개 서버가 됩니다.', '서버 접속 비밀번호')}</label>
                <input type="password" id="serverPassword" data-key="serverPassword" value="${escapeHTML(conn.serverPassword)}" class="text-input" placeholder="접속시 필요한 비밀번호">
                <p class="helper-text">비워두면 비밀번호 없이 접속 가능합니다.</p>
            </div>

            <div class="form-group">
                <label for="adminPassword">관리자 비밀번호 (ADMIN_PASSWORD) ${renderHintIcon('인게임에서 /AdminPassword 명령어로 관리자 권한을 얻거나 RCON 접속에 사용됩니다.', '관리자 비밀번호')}</label>
                <input type="password" id="adminPassword" data-key="adminPassword" value="${escapeHTML(conn.adminPassword)}" class="text-input" placeholder="인게임 관리자 비밀번호">
                <p class="helper-text">RCON 등 관리자 권한 획득에 사용됩니다.</p>
            </div>

            <div class="form-divider"></div>

            <div class="form-group">
                <div class="label-row">
                    <label>외부 접속 정보 (${isThijs ? 'PUBLIC_IP / PUBLIC_PORT' : 'PUBLIC_IP'}) ${renderHintIcon('공인 IP를 통해 외부에서 접속할 수 있도록 설정합니다.', '외부 접속 정보')}</label>
                    <div class="toggle-group" role="group" aria-label="외부 접속 활성화">
                        <button type="button" class="toggle-btn ${conn.publicConnection ? 'active' : ''}" data-key="publicConnection" data-val="true" aria-pressed="${conn.publicConnection}">사용</button>
                        <button type="button" class="toggle-btn ${!conn.publicConnection ? 'active' : ''}" data-key="publicConnection" data-val="false" aria-pressed="${!conn.publicConnection}">미사용</button>
                    </div>
                </div>
                ${conn.publicConnection ? `
                <div class="sub-form-group">
                    <label for="publicIp">공인 IP (PUBLIC_IP) ${renderHintIcon('외부 접속용 공인 IP 주소입니다.', '공인 IP')}</label>
                    <input type="text" id="publicIp" data-key="publicIp" value="${escapeHTML(conn.publicIp)}" class="text-input" placeholder="예: 123.45.67.89">

                    ${isThijs ? `
                    <label for="publicPort" class="mt-sm">공인 포트 (PUBLIC_PORT) ${renderHintIcon('외부에서 접속할 때 사용하는 포트 번호입니다.', '공인 포트')}</label>
                    ${renderPortControl('publicPort', conn.publicPort)}
                    ` : `<p class="helper-text">Jammsen의 PUBLIC_PORT는 위 게임 포트(PUBLIC_PORT) 필드에서 설정됩니다.</p>`}
                </div>
                ` : ''}
            </div>

            <div class="form-group">
                <div class="label-row">
                    <label>커뮤니티 서버 노출 (${isThijs ? 'COMMUNITY' : 'COMMUNITY_SERVER'}) ${renderHintIcon('공식 커뮤니티 서버 목록에 이 서버를 표시할지 여부입니다.', '커뮤니티 서버 노출')}</label>
                    <div class="toggle-group" role="group" aria-label="커뮤니티 서버 노출">
                        <button type="button" class="toggle-btn ${conn.community ? 'active' : ''}" data-key="community" data-val="true" aria-pressed="${conn.community}">노출</button>
                        <button type="button" class="toggle-btn ${!conn.community ? 'active' : ''}" data-key="community" data-val="false" aria-pressed="${!conn.community}">비노출</button>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="gamePort">게임 포트 (${isThijs ? 'PORT' : 'PUBLIC_PORT'}) ${renderHintIcon('게임 클라이언트가 접속하는 기본 UDP 포트입니다.', '게임 포트')}</label>
                ${renderPortControl('gamePort', conn.gamePort)}
            </div>
            
            ${isThijs ? `
            <div class="form-group">
                <label for="queryPort">쿼리 포트 (QUERY_PORT) ${renderHintIcon('서버 상태 조회용 UDP 쿼리 포트입니다.', '쿼리 포트')}</label>
                ${renderPortControl('queryPort', conn.queryPort)}
            </div>
            ` : ''}

            <div class="form-divider"></div>

            <div class="form-group">
                <div class="label-row">
                    <label>REST API 사용 (${isThijs ? 'REST_API_ENABLED' : 'RESTAPI_ENABLED'}) ${renderHintIcon('외부에서 HTTP 요청으로 서버를 관리할 수 있는 REST API 기능을 활성화합니다.', 'REST API 사용')}</label>
                    <div class="toggle-group" role="group" aria-label="REST API 사용">
                        <button type="button" class="toggle-btn ${conn.restApi ? 'active' : ''}" data-key="restApi" data-val="true" aria-pressed="${conn.restApi}">사용</button>
                        <button type="button" class="toggle-btn ${!conn.restApi ? 'active' : ''}" data-key="restApi" data-val="false" aria-pressed="${!conn.restApi}">미사용</button>
                    </div>
                </div>
                ${conn.restApi ? `
                <div class="sub-form-group">
                    <label for="restApiPort">REST API 포트 (${isThijs ? 'REST_API_PORT' : 'RESTAPI_PORT'}) ${renderHintIcon('REST API 서비스가 사용할 TCP 포트입니다.', 'REST API 포트')}</label>
                    ${renderPortControl('restApiPort', conn.restApiPort)}
                </div>
                ` : ''}
            </div>

            <div class="form-group">
                <div class="label-row">
                    <label>RCON 사용 (RCON_ENABLED) ${renderHintIcon('RCON 프로토콜을 이용한 원격 서버 관리 기능을 활성화합니다.', 'RCON 사용')}</label>
                    <div class="toggle-group" role="group" aria-label="RCON 사용">
                        <button type="button" class="toggle-btn ${conn.rcon ? 'active' : ''}" data-key="rcon" data-val="true" aria-pressed="${conn.rcon}">사용</button>
                        <button type="button" class="toggle-btn ${!conn.rcon ? 'active' : ''}" data-key="rcon" data-val="false" aria-pressed="${!conn.rcon}">미사용</button>
                    </div>
                </div>
                ${conn.rcon ? `
                <div class="sub-form-group">
                    <label for="rconPort">RCON 포트 (RCON_PORT) ${renderHintIcon('RCON 서비스가 사용할 TCP 포트입니다.', 'RCON 포트')}</label>
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
    if (state.draft.game === 'valheim') {
        const openGroups = new Set(Array.from(container.querySelectorAll?.('details[data-group][open]') || []).map(element => element.dataset.group));
        container.innerHTML = `
            <h2>4. Valheim 서버 옵션</h2>
            <p class="section-desc">월드 규칙, 저장·운영, 모드와 편의 기능을 설정한 뒤 아래 적용 버튼을 누르세요.</p>
            ${ValheimSettings.groups.map(group => {
                const content = `<h3 class="subsection-title">${escapeHTML(group.label)}</h3>
                    <p class="helper-text">${escapeHTML(group.help)}</p>
                    <div class="form-grid">${VALHEIM_OPTIONS_SCHEMA.filter(opt => opt.group === group.key).map(opt => renderOptionRow(opt, opt.env, state.draft.valheimOptions[opt.key])).join('')}</div>`;
                const mods = group.key === 'mods' ? '<div id="section-valheim-qol"></div><div id="section-valheim-mods"></div>' : '';
                return ['logs', 'hooks', 'advanced'].includes(group.key)
                    ? `<details class="valheim-advanced" data-group="${group.key}" ${openGroups.has(group.key) ? 'open' : ''}><summary>${escapeHTML(group.label)}</summary>${content}</details>`
                    : `<div class="valheim-option-group">${content}${mods}</div>`;
            }).join('')}
            <p class="helper-text">비공개 서버의 유휴 판정 값 IDLE_DATAGRAM_WINDOW / MAX_COUNT는 현재 이미지에서 3초 / 30개로 고정되어 환경변수로 바꿀 수 없습니다.</p>
            <div class="action-bar" id="action-options"></div>
        `;
        container.classList.remove('placeholder-section');
        renderValheimQol();
        renderValheimMods();
        updateActionBars();
        return;
    }
    if (state.draft.game === 'corekeeper') {
        let coreHtml = `
            <h2>4. Core Keeper 서버 옵션</h2>
            <p class="section-desc">월드 생성, 컨테이너 권한, ARM 호환성 및 mod.io 모드를 설정합니다.</p>
            <div class="form-grid">
        `;

        CORE_KEEPER_OPTIONS_SCHEMA.forEach(opt => {
            if (['modioApiKey', 'modioApiUrl', 'mods'].includes(opt.key) && !state.draft.coreKeeperOptions.modsEnabled) {
                return;
            }
            coreHtml += renderOptionRow(opt, opt.env, state.draft.coreKeeperOptions[opt.key]);
        });

        coreHtml += `</div><div class="action-bar" id="action-options"></div>`;
        container.innerHTML = coreHtml;
        container.classList.remove('placeholder-section');
        updateActionBars();
        return;
    }

    const isThijs = state.draft.creator === 'thijsvanloef';
    const creatorKey = isThijs ? 'thijsvanloef' : 'jammsen';

    let html = `
        <h2>4. Palworld 서버 옵션</h2>
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

function cronToKorean(cron) {
    if (!cron || typeof cron !== 'string') return '설정 안 됨';
    const parts = cron.trim().split(/\s+/);
    if (parts.length !== 5) return '지원하지 않는 형식이거나 복잡한 Cron 식 (기본 동작 사용)';
    
    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
    
    if (minute === '0' && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
        return '매시간 마다';
    }
    if (minute === '0' && !isNaN(hour) && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
        return `매일 ${hour}시 마다`;
    }
    if (!isNaN(minute) && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
        return `매시간 ${minute}분 마다`;
    }
    if (!isNaN(minute) && !isNaN(hour) && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
        return `매일 ${hour}시 ${minute}분 마다`;
    }
    
    return '사용자 지정 스케줄 (자세한 주기는 직접 확인 필요)';
}

function renderSelectControl(key, value, options) {
    let html = `<select class="text-input option-select" data-key="${escapeHTML(key)}" id="${escapeHTML(key)}">`;
    options.forEach(o => {
        const optionValue = typeof o === 'object' ? o.value : o;
        const optionLabel = typeof o === 'object' ? o.label : o;
        const isSelected = (String(value) === String(optionValue)) ? 'selected' : '';
        html += `<option value="${escapeHTML(String(optionValue))}" ${isSelected}>${escapeHTML(String(optionLabel))}</option>`;
    });
    html += `</select>`;
    return html;
}

function parseCoreKeeperContentBundles(value) {
    const requested = new Set(String(value || '').split(',').map(item => item.trim()).filter(Boolean));
    return CORE_KEEPER_CONTENT_BUNDLES
        .map(bundle => bundle.value)
        .filter(bundleValue => requested.has(bundleValue));
}

function toggleCoreKeeperContentBundle(options, bundleValue) {
    const validValues = CORE_KEEPER_CONTENT_BUNDLES.map(bundle => bundle.value);
    if (!validValues.includes(bundleValue)) return;

    const selected = new Set(options.activateAllContent
        ? validValues
        : parseCoreKeeperContentBundles(options.activateContent));

    if (selected.has(bundleValue)) {
        selected.delete(bundleValue);
    } else {
        selected.add(bundleValue);
    }

    options.activateAllContent = false;
    options.activateContent = validValues.filter(value => selected.has(value)).join(',');
}

function renderCoreKeeperContentBundles(value, activateAllContent) {
    const selected = new Set(activateAllContent
        ? CORE_KEEPER_CONTENT_BUNDLES.map(bundle => bundle.value)
        : parseCoreKeeperContentBundles(value));

    return `
        <div class="content-bundle-grid" id="activateContent" role="group" aria-label="Core Keeper 기존 월드 콘텐츠 선택">
            ${CORE_KEEPER_CONTENT_BUNDLES.map(bundle => {
                const isActive = selected.has(bundle.value);
                return `
                    <button type="button"
                            class="content-bundle-btn ${isActive ? 'active' : ''}"
                            data-content-bundle="${escapeHTML(bundle.value)}"
                            aria-pressed="${isActive}">
                        <span class="content-bundle-check" aria-hidden="true">${isActive ? '✓' : '+'}</span>
                        <span class="content-bundle-copy">
                            <strong>${escapeHTML(bundle.title)}</strong>
                            <span class="content-bundle-subtitle">${escapeHTML(bundle.subtitle)}</span>
                            <span class="content-bundle-description">${escapeHTML(bundle.description)}</span>
                            <code>${escapeHTML(bundle.value)}</code>
                        </span>
                    </button>
                `;
            }).join('')}
        </div>
        ${activateAllContent ? '<p class="content-bundle-legacy-note">기존 저장값의 모든 콘텐츠 활성화 설정이 적용되어 있습니다. 개별 버튼을 누르면 선택 방식으로 전환됩니다.</p>' : ''}
    `;
}

function renderOptionRow(opt, envName, value) {
    let controlHtml = '';
    
    if (opt.type === 'number') {
        controlHtml = renderGenericNumericControl(opt.key, value, opt.min, opt.max, opt.step);
    } else if (opt.type === 'optional-number') {
        controlHtml = `<input type="number" id="${opt.key}" data-key="${opt.key}" value="${escapeHTML(value)}" class="text-input option-optional-number" min="${opt.min}" max="${opt.max}" step="${opt.step}" placeholder="게임 기본값">`;
    } else if (opt.type === 'textarea') {
        controlHtml = `<textarea id="${opt.key}" data-key="${opt.key}" class="text-input option-text mod-textarea" rows="3" spellcheck="false">${escapeHTML(value)}</textarea>`;
    } else if (opt.type === 'boolean') {
        controlHtml = renderBooleanControl(opt.key, value);
    } else if (opt.type === 'text') {
        controlHtml = opt.sensitive
            ? `<input type="password" id="${escapeHTML(opt.key)}" data-key="${escapeHTML(opt.key)}" value="${escapeHTML(value)}" class="text-input option-text" autocomplete="off">`
            : renderTextControl(opt.key, value);
    } else if (opt.type === 'select') {
        controlHtml = renderSelectControl(opt.key, value, opt.options);
    } else if (opt.type === 'content-bundles') {
        controlHtml = renderCoreKeeperContentBundles(value, state.draft.coreKeeperOptions.activateAllContent);
    }

    let cronPreviewHtml = '';
    if (['t_autoRebootCronExpression', 't_autoUpdateCronExpression', 'j_backupCronExpression', 'j_restartCronExpression'].includes(opt.key)) {
        const koreanPreview = cronToKorean(value);
        cronPreviewHtml = `<div class="cron-preview-container" style="margin-top: 5px; font-size: 0.9em; color: var(--color-text-muted, #8b949e);">📝 스케줄: <span class="cron-preview-text" id="cron-preview-${opt.key}">${escapeHTML(koreanPreview)}</span></div>`;
    }

    const hintText = opt.helper ? opt.helper : `${opt.label} 기능을 설정합니다.`;
    const linksHtml = Array.isArray(opt.links) && opt.links.length > 0
        ? `
            <nav class="option-links" aria-label="${escapeHTML(opt.label)} 관련 링크">
                ${opt.links.map(link => `
                    <a class="option-link" href="${escapeHTML(link.href)}" target="_blank" rel="noopener noreferrer">
                        ${escapeHTML(link.label)} <span aria-hidden="true">↗</span>
                    </a>
                `).join('')}
            </nav>
        `
        : '';

    return `
        <div class="form-group ${['content-bundles', 'textarea'].includes(opt.type) ? 'form-group-wide' : ''}">
            <div class="label-row">
                <label for="${opt.key}">
                    ${escapeHTML(opt.label)} (${escapeHTML(envName)})
                    ${renderHintIcon(hintText, opt.label)}
                </label>
                ${opt.type === 'boolean' ? controlHtml : ''}
            </div>
            ${opt.type !== 'boolean' ? controlHtml : ''}
            ${cronPreviewHtml}
            ${opt.helper ? `<p class="helper-text">${escapeHTML(opt.helper)}</p>` : ''}
            ${linksHtml}
        </div>
    `;
}

function setupConnectionListeners() {
    const container = document.getElementById('section-connection');
    const getDraftConnection = () => state.draft[GAME_SECTIONS[state.draft.game].connection];
    
    container.addEventListener('input', (e) => {
        if (e.target.matches('input[type="text"], input[type="password"]')) {
            getDraftConnection()[e.target.dataset.key] = e.target.value;
            updateActionBars();
        }
        
        if (e.target.matches('.port-slider')) {
            const val = parseInt(e.target.value, 10);
            getDraftConnection()[e.target.dataset.key] = val;
            const numInput = e.target.parentElement.querySelector('.port-input');
            if (numInput) numInput.value = val;
            updateActionBars();
        }

        if (e.target.matches('.port-input')) {
            let val = parseInt(e.target.value, 10);
            if (isNaN(val)) return;
            if (val < 1024) val = 1024;
            if (val > 65535) val = 65535;
            getDraftConnection()[e.target.dataset.key] = val;
            const slider = e.target.parentElement.querySelector('.port-slider');
            if (slider) slider.value = val;
            updateActionBars();
        }

        if (e.target.matches('.connection-number')) {
            if (e.target.value === '') return;
            const val = sanitizeGenericNumericValue(e.target.value, e.target.min, e.target.max, e.target.step);
            getDraftConnection()[e.target.dataset.key] = val;
            updateActionBars();
        }
    });

    container.addEventListener('change', (e) => {
        if (e.target.matches('.port-input')) {
            let val = parseInt(e.target.value, 10);
            if (isNaN(val) || val < 1024) val = 1024;
            if (val > 65535) val = 65535;
            e.target.value = val;
            getDraftConnection()[e.target.dataset.key] = val;
            const slider = e.target.parentElement.querySelector('.port-slider');
            if (slider) slider.value = val;
            updateActionBars();
        }

        if (e.target.matches('.connection-number')) {
            const val = sanitizeGenericNumericValue(e.target.value, e.target.min, e.target.max, e.target.step);
            e.target.value = val;
            getDraftConnection()[e.target.dataset.key] = val;
            updateActionBars();
        }

        if (e.target.matches('.connection-select')) {
            getDraftConnection()[e.target.dataset.key] = e.target.value;
            updateActionBars();
        }
    });

    container.addEventListener('click', (e) => {
        if (e.target.matches('.toggle-btn')) {
            const key = e.target.dataset.key;
            const val = e.target.dataset.val === 'true';
            const connection = getDraftConnection();
            if (connection[key] !== val) {
                connection[key] = val;
                renderConnectionSettings();
            }
        }
    });
}

function setupOptionsListeners() {
    const container = document.getElementById('section-options');
    const getDraftOptions = () => state.draft[GAME_SECTIONS[state.draft.game].options];
    
    container.addEventListener('input', (e) => {
        if (e.target.matches('.option-optional-number')) {
            getDraftOptions()[e.target.dataset.key] = e.target.value === '' ? '' : Number(e.target.value);
            updateActionBars();
        }
        if (e.target.matches('.option-text')) {
            getDraftOptions()[e.target.dataset.key] = e.target.value;
            if (['t_autoRebootCronExpression', 't_autoUpdateCronExpression', 'j_backupCronExpression', 'j_restartCronExpression'].includes(e.target.dataset.key)) {
                const previewSpan = document.getElementById(`cron-preview-${e.target.dataset.key}`);
                if (previewSpan) {
                    previewSpan.textContent = cronToKorean(e.target.value);
                }
            }
            updateActionBars();
        }
        
        if (e.target.matches('.option-select')) {
            getDraftOptions()[e.target.dataset.key] = e.target.value;
            updateActionBars();
        }
        
        if (e.target.matches('.generic-num-slider')) {
            const val = sanitizeGenericNumericValue(e.target.value, e.target.min, e.target.max, e.target.step);
            getDraftOptions()[e.target.dataset.key] = val;
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
            getDraftOptions()[e.target.dataset.key] = val;
            if (Number.isInteger(parseFloat(e.target.step))) e.target.value = val;
            const slider = e.target.parentElement.querySelector('.generic-num-slider');
            if (slider) slider.value = val;
            updateActionBars();
        }
    });

    container.addEventListener('change', (e) => {
        if (e.target.matches('.option-select')) {
            getDraftOptions()[e.target.dataset.key] = e.target.value;
            updateActionBars();
        }
        
        if (e.target.matches('.generic-num-input')) {
            const val = sanitizeGenericNumericValue(e.target.value, e.target.min, e.target.max, e.target.step);
            e.target.value = val;
            getDraftOptions()[e.target.dataset.key] = val;
            const slider = e.target.parentElement.querySelector('.generic-num-slider');
            if (slider) slider.value = val;
            updateActionBars();
        }
    });

    container.addEventListener('click', (e) => {
        const contentBundleButton = e.target.closest('.content-bundle-btn');
        if (contentBundleButton && container.contains(contentBundleButton)) {
            toggleCoreKeeperContentBundle(getDraftOptions(), contentBundleButton.dataset.contentBundle);
            renderServerOptions();
            return;
        }

        if (e.target.matches('.option-toggle')) {
            const key = e.target.dataset.key;
            const val = e.target.dataset.val === 'true';
            const options = getDraftOptions();
            if (options[key] !== val) {
                options[key] = val;
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

function buildCoreKeeperComposeYaml(applied) {
    const conn = applied.coreKeeperConnection;
    const opts = applied.coreKeeperOptions;
    const volume = applied.coreKeeperVolume;
    const filesPath = volume.filesPath || './core-keeper-files';
    const dataPath = volume.dataPath || './core-keeper-data';

    let yaml = `services:
  core-keeper:
    image: escaping/core-keeper-dedicated:latest
    container_name: core-keeper-dedicated
    restart: unless-stopped
    stop_grace_period: 2m
`;

    if (conn.directConnection) {
        yaml += `    ports:\n      - ${yamlDoubleQuoted(`${conn.serverPort}:${conn.serverPort}/udp`)}\n`;
    }

    yaml += `    volumes:
      - ${yamlDoubleQuoted(`${filesPath}:/home/steam/core-keeper-dedicated`)}
      - ${yamlDoubleQuoted(`${dataPath}:/home/steam/core-keeper-data`)}
    environment:
`;

    const addEnv = (key, value) => {
        if (typeof value === 'boolean') {
            yaml += `      - ${key}=${value ? 'true' : 'false'}\n`;
        } else if (typeof value === 'number') {
            yaml += `      - ${key}=${value}\n`;
        } else if (typeof value === 'string') {
            yaml += `      - ${yamlDoubleQuoted(`${key}=${value}`)}\n`;
        }
    };

    addEnv('PUID', opts.puid);
    addEnv('PGID', opts.pgid);
    addEnv('ARM64_DEVICE', opts.arm64Device);
    addEnv('USE_DEPOT_DOWNLOADER', opts.useDepotDownloader);
    addEnv('WORLD_INDEX', opts.worldIndex);
    addEnv('WORLD_NAME', conn.worldName);
    addEnv('WORLD_SEED', opts.worldSeed);
    addEnv('HASHED_WORLD_SEED', opts.hashedWorldSeed);
    addEnv('WORLD_MODE', opts.worldMode);
    if (opts.season !== '') addEnv('SEASON', opts.season);
    if (conn.gameId) addEnv('GAME_ID', conn.gameId);
    addEnv('MAX_PLAYERS', conn.maxPlayers);

    if (conn.directConnection) {
        if (conn.serverIp) addEnv('SERVER_IP', conn.serverIp);
        addEnv('SERVER_PORT', conn.serverPort);
        if (conn.password) addEnv('PASSWORD', conn.password);
        if (conn.allowOnlyPlatform !== '') addEnv('ALLOW_ONLY_PLATFORM', conn.allowOnlyPlatform);
    }

    if (opts.activateContent) addEnv('ACTIVATE_CONTENT', opts.activateContent);
    addEnv('ACTIVATE_ALL_CONTENT', opts.activateAllContent);
    addEnv('MODS_ENABLED', opts.modsEnabled);
    if (opts.modsEnabled) {
        if (opts.modioApiKey) addEnv('MODIO_API_KEY', opts.modioApiKey);
        if (opts.modioApiUrl) addEnv('MODIO_API_URL', opts.modioApiUrl);
        if (opts.mods) addEnv('MODS', opts.mods);
    }

    return yaml;
}

function validateValheimSettings(applied, uploadedFiles) {
    const conn = applied.valheimConnection;
    const errors = [];
    if (typeof conn.serverName !== 'string' || !conn.serverName.trim()) errors.push('서버 이름을 입력하세요.');
    if (typeof conn.worldName !== 'string' || !conn.worldName.trim()) errors.push('월드 이름을 입력하세요.');
    if (typeof conn.serverSecretFile !== 'string') errors.push('비밀번호 파일 경로를 확인하세요.');
    const passwordDisabled = applied.valheimOptions.modMode === 'valheimplus' && applied.valheimQol.enabled && applied.valheimQol.disableServerPassword === true;
    if (!passwordDisabled && !(typeof conn.serverSecretFile === 'string' && conn.serverSecretFile.trim()) && (typeof conn.serverPassword !== 'string' || conn.serverPassword.length < 5)) errors.push('접속 비밀번호를 5자 이상 입력하세요.');
    if (!Number.isInteger(conn.serverPort) || conn.serverPort < 1024 || conn.serverPort > 65533) {
        errors.push('시작 UDP 포트는 1024~65533 사이의 정수여야 합니다.');
    }
    if (!['vanilla', 'bepinex', 'valheimplus'].includes(applied.valheimOptions.modMode)) errors.push('모드 로더를 다시 선택하세요.');
    errors.push(...ValheimMods.validate(applied.valheimMods, applied.valheimOptions.modMode, uploadedFiles));
    const qolErrors = ValheimQol.validate(applied.valheimQol, applied.valheimOptions.modMode);
    errors.push(...qolErrors);
    errors.push(...ValheimSettings.validate(applied.valheimOptions, conn, qolErrors.length ? {} : ValheimQol.environment(applied.valheimQol)));
    return errors;
}

function buildValheimComposeYaml(applied) {
    const errors = validateValheimSettings(applied);
    if (errors.length) throw new Error(errors.join(' '));

    const conn = applied.valheimConnection;
    const opts = applied.valheimOptions;
    const volume = applied.valheimVolume;
    // Compose interpolates dollar signs even inside YAML quotes. Keep user input literal.
    const quote = value => yamlDoubleQuoted(String(value).replace(/\$/g, () => '$$'));
    const lastPort = conn.serverPort + (conn.crossplay ? 2 : 1);
    let yaml = `services:
  valheim:
    image: ${ValheimSettings.image}
    container_name: valheim-server
    restart: unless-stopped
    stop_grace_period: 2m
    cap_add:
      - SYS_NICE
    ports:
      - "${conn.serverPort}-${lastPort}:${conn.serverPort}-${lastPort}/udp"
`;
    for (const prefix of ['status', 'supervisor']) {
        if (opts[`${prefix}Http`]) yaml += `      - ${quote(`${opts[`${prefix}Bind`]}:${opts[`${prefix}HostPort`]}:${opts[`${prefix}HttpPort`]}/tcp`)}\n`;
    }
    yaml += `    volumes:
      - ${quote(`${volume.configPath || './valheim-config'}:/config`)}
      - ${quote(`${volume.dataPath || './valheim-data'}:/opt/valheim`)}
`;
    if (needsValheimModBundle(applied)) yaml += `      - "./valheim-mods:/mod-bundle:ro"\n`;
    const secrets = {};
    if (conn.serverSecretFile.trim()) secrets.server_pass = conn.serverSecretFile.trim();
    if (opts.supervisorSecretFile.trim()) secrets.supervisor_pass = opts.supervisorSecretFile.trim();
    if (Object.keys(secrets).length) yaml += `    secrets:\n${Object.keys(secrets).map(name => `      - ${name}\n`).join('')}`;
    yaml += '    environment:\n';
    const addEnv = (key, value) => { yaml += `      - ${quote(`${key}=${value}`)}\n`; };
    addEnv('SERVER_NAME', conn.serverName);
    addEnv('WORLD_NAME', conn.worldName);
    if (secrets.server_pass) addEnv('SERVER_PASS_FILE', '/run/secrets/server_pass');
    else addEnv('SERVER_PASS', conn.serverPassword);
    addEnv('SERVER_PORT', conn.serverPort);
    addEnv('SERVER_PUBLIC', conn.serverPublic);
    addEnv('CROSSPLAY', conn.crossplay);

    const environment = { ...ValheimSettings.environment(opts), ...ValheimQol.environment(applied.valheimQol) };
    if (needsValheimModBundle(applied)) {
        const install = 'python3 /mod-bundle/install.py --bundle /mod-bundle --config /config || exit 1';
        // A user hook must never replace the installer or allow a failed installation to continue.
        environment.PRE_SUPERVISOR_HOOK = environment.PRE_SUPERVISOR_HOOK ? `${install}\n${environment.PRE_SUPERVISOR_HOOK}` : install;
    }
    for (const [key, value] of Object.entries(environment)) addEnv(key, value);
    if (Object.keys(secrets).length) yaml += `secrets:\n${Object.entries(secrets).map(([name, file]) => `  ${name}:\n    file: ${quote(file)}\n`).join('')}`;
    return yaml;
}

function generateComposeYaml() {
    const applied = state.applied;
    const errors = applied.game === 'valheim' ? validateValheimSettings(applied, valheimModFiles) : [];
    const validation = document.getElementById('yaml-validation');
    const download = document.getElementById('btn-download-yml');
    const bundleDownload = document.getElementById('btn-download-bundle');
    const bundleHelp = document.getElementById('bundle-help');
    const needsBundle = needsValheimModBundle(applied);
    if (validation) {
        validation.textContent = errors.length ? `${errors.join(' ')} 해당 설정을 수정한 뒤 적용하세요.` : '';
        validation.hidden = errors.length === 0;
    }
    if (download) download.disabled = errors.length > 0 || needsBundle;
    if (bundleDownload) {
        bundleDownload.hidden = !needsBundle;
        bundleDownload.disabled = errors.length > 0;
    }
    if (bundleHelp) bundleHelp.hidden = !needsBundle;
    if (applied.game === 'valheim') {
        const output = document.getElementById('yml-output');
        if (output) output.textContent = errors.length ? '' : buildValheimComposeYaml(applied);
        return;
    }
    if (applied.game === 'corekeeper') {
        const coreKeeperYaml = buildCoreKeeperComposeYaml(applied);
        const coreKeeperOutput = document.getElementById('yml-output');
        if (coreKeeperOutput) {
            coreKeeperOutput.textContent = coreKeeperYaml;
        }
        return;
    }

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
