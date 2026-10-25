(function (root) {
    'use strict';
    // Sources:
    //   https://docs.palworldgame.com/settings-and-operation/configuration/
    //   https://palworld-server-docker.loef.dev/getting-started/configuration/game-settings
    //   https://palworld-server-docker.loef.dev/getting-started/configuration/server-settings
    const entries = {
        'palworld.players': {
            what: '서버에 동시에 접속할 수 있는 최대 플레이어 수입니다.',
            effect: '값을 올리면 더 많은 사람이 함께 접속할 수 있고, 내리면 접속 인원이 제한됩니다. 허용 범위는 1~32이며, 게임 자체 기본값은 32, thijsvanloef 이미지 기본값은 16입니다.',
            tip: '인원이 많을수록 CPU와 메모리 사용량이 크게 늘어납니다. 서버 사양에 맞게 정하는 것을 권장합니다.'
        },
        'palworld.difficulty': {
            what: '게임 난이도 프리셋 값입니다.',
            effect: '사용 가능 값은 None, Normal, Difficult입니다. 기본값은 None입니다.',
            tip: '전용 서버에서는 이 값보다 경험치, 데미지 배율 같은 개별 설정이 실제 밸런스를 결정합니다. 이 값만 바꿔서 난이도가 확실히 달라지는지는 공식 문서에 명시되어 있지 않으니, 원하는 밸런스는 개별 배율로 조정하는 것이 확실합니다.'
        },
        'palworld.expRate': {
            what: '플레이어와 팰이 얻는 경험치의 배율입니다.',
            effect: '값을 올리면 레벨업이 빨라지고, 내리면 느려집니다. 기본값은 1.0입니다.',
            tip: '2.0~3.0 정도면 빠른 진행을 원하는 소규모 서버에 적당합니다.'
        },
        'palworld.palCaptureRate': {
            what: '팰 스피어로 팰을 포획할 때의 성공 확률 배율입니다.',
            effect: '값을 올리면 포획이 쉬워지고, 내리면 어려워집니다. 기본값은 1.0입니다.'
        },
        'palworld.palSpawnNumRate': {
            what: '필드에 나타나는 야생 팰의 수 배율입니다.',
            effect: '값을 올리면 야생 팰이 더 많이 출현하고, 내리면 적게 출현합니다. 기본값은 1.0입니다.',
            tip: '공식 문서에 따르면 이 값은 서버 성능에 영향을 줍니다. 높이면 서버 부하와 렉이 늘어날 수 있으니 조금씩 올리는 것을 권장합니다.'
        },
        'palworld.dayTimeSpeedRate': {
            what: '낮 시간이 흘러가는 속도의 배율입니다.',
            effect: '값을 올리면 낮이 빨리 지나가 짧아지고, 내리면 낮이 길어집니다. 기본값은 1.0입니다.'
        },
        'palworld.nightTimeSpeedRate': {
            what: '밤 시간이 흘러가는 속도의 배율입니다.',
            effect: '값을 올리면 밤이 빨리 지나가 짧아지고, 내리면 밤이 길어집니다. 기본값은 1.0입니다.',
            tip: '밤이 지루하다면 낮은 그대로 두고 이 값만 2.0 정도로 올리는 방법이 많이 쓰입니다.'
        },
        'palworld.playerDamageRateAttack': {
            what: '플레이어가 입히는 데미지의 배율입니다.',
            effect: '값을 올리면 플레이어의 공격이 강해지고, 내리면 약해집니다. 기본값은 1.0입니다.'
        },
        'palworld.playerDamageRateDefense': {
            what: '플레이어가 받는 데미지의 배율입니다.',
            effect: '값을 올리면 플레이어가 더 많은 피해를 받아 게임이 어려워지고, 내리면 받는 피해가 줄어 쉬워집니다. 기본값은 1.0입니다.',
            tip: '이름과 달리 방어력이 아니라 받는 피해량입니다. 쉽게 하려면 값을 낮추세요.'
        },
        'palworld.palDamageRateAttack': {
            what: '팰이 입히는 데미지의 배율입니다.',
            effect: '값을 올리면 팰의 공격이 강해지고, 내리면 약해집니다. 기본값은 1.0입니다.'
        },
        'palworld.palDamageRateDefense': {
            what: '팰이 받는 데미지의 배율입니다.',
            effect: '값을 올리면 팰이 더 많은 피해를 받고, 내리면 받는 피해가 줄어듭니다. 기본값은 1.0입니다.',
            tip: '이름과 달리 방어력이 아니라 받는 피해량입니다. 팰을 튼튼하게 하려면 값을 낮추세요.'
        },
        'palworld.collectionDropRate': {
            what: '나무, 돌, 광석 등을 채집할 때 얻는 아이템 수의 배율입니다.',
            effect: '값을 올리면 채집 한 번에 더 많은 자원을 얻고, 내리면 적게 얻습니다. 기본값은 1.0입니다.'
        },
        'palworld.enemyDropItemRate': {
            what: '적(야생 팰 등)을 쓰러뜨렸을 때 떨어뜨리는 아이템 양의 배율입니다.',
            effect: '값을 올리면 드롭 아이템이 늘어나고, 내리면 줄어듭니다. 기본값은 1.0입니다.'
        },
        'palworld.workSpeedRate': {
            what: '제작, 건설, 거점 작업 등의 작업 속도 배율입니다.',
            effect: '값을 올리면 제작과 작업이 빨리 끝나고, 내리면 오래 걸립니다. 기본값은 1.0입니다.'
        },
        'palworld.palEggDefaultHatchingTime': {
            what: '거대 알(Huge Egg)이 부화하는 데 걸리는 시간(단위: 시간)입니다.',
            effect: '값을 올리면 부화가 오래 걸리고, 내리면 빨라집니다. 0이면 사실상 바로 부화합니다. 기본값은 72(시간)입니다.',
            tip: '공식 문서에 따르면 다른 종류의 알도 부화에 시간이 필요하며, 이 값을 기준으로 알 크기에 따라 시간이 정해집니다.'
        },
        'palworld.dropItemMaxNum': {
            what: '월드에 동시에 떨어져 있을 수 있는 드롭 아이템의 최대 개수입니다.',
            effect: '값을 올리면 더 많은 아이템이 바닥에 남아 있을 수 있고, 내리면 한도를 넘는 아이템이 정리됩니다. 기본값은 3000입니다.',
            tip: '너무 높이면 서버 부하가 늘어날 수 있습니다.'
        },
        'palworld.baseCampWorkerMaxNum': {
            what: '거점 하나에 배치할 수 있는 작업 팰의 최대 수입니다.',
            effect: '값을 올리면 거점에서 더 많은 팰이 일할 수 있고, 내리면 적게 배치됩니다. 기본값은 15, 최대 50입니다.',
            tip: '공식 문서에 따르면 값을 높일수록 서버 처리 부하가 커집니다.'
        },
        'palworld.guildPlayerMaxNum': {
            what: '길드 하나에 가입할 수 있는 최대 플레이어 수입니다.',
            effect: '값을 올리면 큰 길드를 만들 수 있고, 내리면 길드 인원이 제한됩니다. 기본값은 20입니다.'
        },
        'palworld.deathPenalty': {
            what: '플레이어가 사망했을 때 무엇을 떨어뜨리는지 정하는 설정입니다.',
            effect: 'None: 아무것도 떨어뜨리지 않습니다. Item: 장비를 제외한 소지 아이템을 떨어뜨립니다. ItemAndEquipment: 소지 아이템과 장비를 모두 떨어뜨립니다. All: 아이템, 장비에 더해 데리고 있던 팰까지 떨어뜨립니다. 기본값은 Item입니다.',
            tip: '대소문자를 포함해 정확히 입력해야 합니다.'
        },
        'palworld.crossplayPlatforms': {
            what: '서버에 접속을 허용할 플랫폼 목록입니다.',
            effect: '괄호 안에 쉼표로 구분해 입력합니다. 사용 가능 값은 Steam, Xbox, PS5, Mac입니다. 목록에서 빠진 플랫폼의 플레이어는 접속할 수 없습니다. 기본값은 (Steam,Xbox,PS5,Mac)입니다.',
            tip: '예: Steam 사용자만 받으려면 (Steam)으로 입력합니다.'
        },
        'palworld.useAuth': {
            what: '접속하는 플레이어의 계정 인증을 사용할지 정합니다.',
            effect: '켜면 정식 계정 인증을 거친 플레이어만 접속할 수 있습니다. 끄면 인증 절차를 생략합니다. 기본값은 켜짐입니다.',
            tip: '특별한 이유가 없다면 켜 두는 것을 권장합니다. 밴 목록 등 일부 기능이 인증에 의존할 수 있습니다.'
        },
        'palworld.isPvp': {
            what: 'PvP(플레이어 대 플레이어) 모드를 사용할지 정합니다.',
            effect: '켜면 PvP 관련 규칙이 적용되는 서버가 됩니다. 끄면 일반 협동(PvE) 서버로 동작합니다. 기본값은 꺼짐입니다.',
            tip: '실제로 플레이어끼리 데미지를 주고받으려면 플레이어 간 데미지 설정도 함께 켜야 합니다.'
        },
        'palworld.enableFriendlyFire': {
            what: '아군(같은 길드 등)끼리 피해를 줄 수 있는지 정합니다.',
            effect: '켜면 아군의 공격에도 피해를 입습니다. 끄면 아군 공격에 피해를 입지 않습니다. 기본값은 꺼짐입니다.'
        },
        'palworld.enableInvaderEnemy': {
            what: '거점에 적이 습격해 오는 침입 이벤트를 허용할지 정합니다.',
            effect: '켜면 거점이 주기적으로 습격을 받습니다. 끄면 습격이 발생하지 않습니다. 기본값은 켜짐입니다.',
            tip: '습격으로 인한 렉이나 건물 파손이 부담스럽다면 끌 수 있습니다.'
        },
        'palworld.enableFastTravel': {
            what: '빠른 이동(순간이동) 기능을 사용할 수 있는지 정합니다.',
            effect: '켜면 빠른 이동 지점 사이를 순간이동할 수 있습니다. 끄면 직접 걷거나 탈것으로 이동해야 합니다. 기본값은 켜짐입니다.'
        },
        'palworld.randomizerType': {
            what: '야생 팰 출현을 무작위로 섞는 랜더마이저 방식입니다.',
            effect: 'None: 랜더마이저를 사용하지 않습니다(원래 출현 그대로). Region: 지역 단위로 출현 팰을 무작위로 바꿉니다. All: 모든 출현을 완전히 무작위로 바꿉니다. 기본값은 None입니다.',
            tip: '랜더마이저는 월드 생성 시점에 적용되는 것으로 알려져 있어, 기존 월드에서 바꾸면 반영되지 않을 수 있습니다(공식 문서에 명시되어 있지 않음).'
        },
        'palworld.randomizerSeed': {
            what: '랜더마이저가 무작위 배치를 만들 때 사용하는 시드 값입니다.',
            effect: '같은 시드를 쓰면 같은 무작위 배치가 만들어지고, 다른 시드를 쓰면 다른 배치가 됩니다. 비워 두면 기본값(빈 문자열)입니다.',
            tip: '랜더마이저 유형이 None이면 의미가 없습니다.'
        },
        'palworld.isRandomizerPalLevelRandom': {
            what: '랜더마이저 사용 시 야생 팰의 레벨도 무작위로 할지 정합니다.',
            effect: '켜면 팰 레벨이 지역과 관계없이 완전히 무작위가 됩니다. 끄면 각 지역의 원래 레벨 범위 안에서 정해집니다. 기본값은 꺼짐입니다.',
            tip: '켜면 초반 지역에 고레벨 팰이 나올 수 있어 난이도가 크게 오를 수 있습니다.'
        },
        'palworld.playerStomachDecreaseRate': {
            what: '플레이어의 배고픔(포만도)이 줄어드는 속도 배율입니다.',
            effect: '값을 올리면 더 빨리 배고파지고, 내리면 천천히 배고파집니다. 기본값은 1.0입니다.'
        },
        'palworld.playerStaminaDecreaseRate': {
            what: '플레이어의 스태미나가 소모되는 속도 배율입니다.',
            effect: '값을 올리면 달리기, 등반 등에서 스태미나가 빨리 닳고, 내리면 오래 버팁니다. 기본값은 1.0입니다.'
        },
        'palworld.playerAutoHpRegenRate': {
            what: '플레이어 HP가 자연 회복되는 속도 배율입니다.',
            effect: '값을 올리면 HP가 빨리 회복되고, 내리면 느리게 회복됩니다. 기본값은 1.0입니다.'
        },
        'palworld.playerAutoHpRegenRateInSleep': {
            what: '플레이어가 잠잘 때 HP가 회복되는 속도 배율입니다.',
            effect: '값을 올리면 수면 중 HP가 빨리 회복되고, 내리면 느리게 회복됩니다. 기본값은 1.0입니다.'
        },
        'palworld.palStomachDecreaseRate': {
            what: '팰의 배고픔(포만도)이 줄어드는 속도 배율입니다.',
            effect: '값을 올리면 팰이 빨리 배고파져 먹이가 더 많이 필요하고, 내리면 먹이 소모가 줄어듭니다. 기본값은 1.0입니다.'
        },
        'palworld.palStaminaDecreaseRate': {
            what: '팰의 스태미나가 소모되는 속도 배율입니다.',
            effect: '값을 올리면 탈것 팰 등의 스태미나가 빨리 닳고, 내리면 오래 버팁니다. 기본값은 1.0입니다.'
        },
        'palworld.palAutoHpRegenRate': {
            what: '팰 HP가 자연 회복되는 속도 배율입니다.',
            effect: '값을 올리면 팰 HP가 빨리 회복되고, 내리면 느리게 회복됩니다. 기본값은 1.0입니다.'
        },
        'palworld.palAutoHpRegenRateInSleep': {
            what: '팰이 쉬는 동안(팰 박스 안에 있을 때) HP가 회복되는 속도 배율입니다.',
            effect: '값을 올리면 팰 박스 안에서 HP가 빨리 회복되고, 내리면 느리게 회복됩니다. 기본값은 1.0입니다.'
        },
        'palworld.enablePlayerToPlayerDamage': {
            what: '플레이어끼리 서로 데미지를 줄 수 있는지 정합니다.',
            effect: '켜면 다른 플레이어를 공격해 피해를 줄 수 있습니다. 끄면 플레이어 간 공격이 피해를 주지 않습니다. 기본값은 꺼짐입니다.',
            tip: 'PvP 서버를 만들려면 PVP 사용과 함께 켜는 것이 일반적입니다.'
        },
        'palworld.activeUnko': {
            what: '팰이 배설물(운코)을 남기는 기능을 사용할지 정합니다.',
            effect: '켜면 거점의 팰이 배설물을 남깁니다. 끄면 배설물이 생기지 않습니다. 기본값은 꺼짐입니다.',
            tip: '켜면 바닥 오브젝트가 늘어 서버 부하가 약간 늘 수 있습니다.'
        },
        'palworld.enableAimAssistPad': {
            what: '게임패드(컨트롤러) 사용자의 조준 보정을 허용할지 정합니다.',
            effect: '켜면 패드 사용자가 조준 보정을 받을 수 있습니다. 끄면 조준 보정이 비활성화됩니다. 기본값은 켜짐입니다.'
        },
        'palworld.enableAimAssistKeyboard': {
            what: '키보드/마우스 사용자의 조준 보정을 허용할지 정합니다.',
            effect: '켜면 키보드/마우스 사용자도 조준 보정을 받습니다. 끄면 받지 않습니다. 기본값은 꺼짐입니다.'
        },
        'palworld.dropItemMaxNumUnko': {
            what: '월드에 동시에 존재할 수 있는 배설물(운코)의 최대 개수입니다.',
            effect: '값을 올리면 더 많은 배설물이 남을 수 있고, 내리면 한도를 넘는 배설물이 정리됩니다. 기본값은 100입니다.',
            tip: '운코 활성화가 꺼져 있으면 의미가 없습니다.'
        },
        'palworld.baseCampMaxNum': {
            what: '서버 전체에 만들 수 있는 거점의 총 개수입니다.',
            effect: '값을 올리면 서버 전체에서 더 많은 거점을 지을 수 있고, 내리면 제한됩니다. 기본값은 128입니다.',
            tip: '거점이 많을수록 서버 부하가 커집니다.'
        },
        'palworld.dropItemAliveMaxHours': {
            what: '바닥에 떨어진 아이템이 사라지기 전까지 남아 있는 시간(단위: 시간)입니다.',
            effect: '값을 올리면 아이템이 오래 남아 있고, 내리면 빨리 사라집니다. 기본값은 1.0(시간)입니다.'
        },
        'palworld.autoResetGuildNoOnlinePlayers': {
            what: '길드원이 일정 시간 아무도 접속하지 않으면 그 길드를 자동으로 정리할지 정합니다.',
            effect: '켜면 미접속 시간이 기준을 넘은 길드의 건물과 거점 팰이 삭제됩니다. 끄면 접속 여부와 관계없이 유지됩니다. 기본값은 꺼짐입니다.',
            tip: '데이터가 삭제되는 기능이므로 신중히 사용하세요. 기준 시간은 길드 초기화 미접속 시간에서 정합니다.'
        },
        'palworld.autoResetGuildTimeNoOnlinePlayers': {
            what: '미접속 길드 자동 초기화가 실행되기까지의 미접속 시간(단위: 시간)입니다.',
            effect: '값을 올리면 더 오래 미접속해야 초기화되고, 내리면 더 빨리 초기화됩니다. 기본값은 72(시간)입니다.',
            tip: '미접속 길드 자동 초기화가 꺼져 있으면 이 값은 무시됩니다.'
        },
        'palworld.characterRecreateInHardcore': {
            what: '하드코어 모드에서 사망한 뒤 캐릭터를 새로 만들 수 있는지 정합니다.',
            effect: '켜면 사망 후 캐릭터를 다시 만들어 플레이를 이어갈 수 있습니다. 끄면 사망한 캐릭터로는 더 이상 플레이할 수 없습니다. 기본값은 꺼짐입니다.',
            tip: '하드코어가 켜져 있을 때만 의미가 있습니다.'
        },
        'palworld.hardcore': {
            what: '하드코어 모드를 사용할지 정합니다.',
            effect: '켜면 사망 시 부활할 수 없습니다. 끄면 일반적으로 부활합니다. 기본값은 꺼짐입니다.',
            tip: '팰 로스트, 하드코어 캐릭터 재생성 설정과 함께 조정하는 경우가 많습니다.'
        },
        'palworld.palLost': {
            what: '사망 시 데리고 있던 팰을 영구히 잃게 할지 정합니다.',
            effect: '켜면 사망할 때 팰이 영구적으로 사라집니다. 끄면 팰을 잃지 않습니다. 기본값은 꺼짐입니다.'
        },
        'palworld.canPickupOtherGuildDeathPenaltyDrop': {
            what: '다른 길드 플레이어가 사망하며 떨어뜨린 아이템을 주울 수 있는지 정합니다.',
            effect: '켜면 다른 길드의 사망 드롭 아이템을 가져갈 수 있습니다. 끄면 주울 수 없습니다. 기본값은 꺼짐입니다.',
            tip: 'PvP 서버에서 약탈 요소를 넣고 싶을 때 켭니다.'
        },
        'palworld.enableNonLoginPenalty': {
            what: '오랫동안 접속하지 않은 플레이어에게 불이익을 줄지 정합니다.',
            effect: '켜면 장기간 미접속 시 페널티가 적용됩니다. 끄면 페널티가 없습니다. 기본값은 켜짐입니다.',
            tip: '공식 문서에는 페널티의 구체적인 내용이 명시되어 있지 않습니다. 거점 팰 상태 등에 영향을 준다는 보고가 있으나 확실하지 않습니다.'
        },
        'palworld.isStartLocationSelectByMap': {
            what: '처음 시작할 때 지도에서 시작 위치를 고를 수 있게 할지 정합니다.',
            effect: '켜면 플레이어가 지도에서 시작 지점을 선택합니다. 끄면 기본 시작 지점에서 시작합니다. 기본값은 꺼짐입니다.'
        },
        'palworld.existPlayerAfterLogout': {
            what: '로그아웃한 플레이어의 캐릭터를 월드에 남겨 둘지 정합니다.',
            effect: '켜면 로그아웃해도 캐릭터가 그 자리에서 잠든 상태로 남습니다(공격받을 수 있음). 끄면 로그아웃과 함께 캐릭터가 사라집니다. 기본값은 꺼짐입니다.',
            tip: 'PvP 서버에서 로그아웃으로 위험을 피하는 것을 막을 때 사용합니다.'
        },
        'palworld.enableDefenseOtherGuildPlayer': {
            what: '다른 길드 플레이어에 대해 거점 방어 기능이 작동하게 할지 정합니다.',
            effect: '켜면 거점 방어 시설 등이 다른 길드 플레이어도 공격 대상으로 삼습니다. 끄면 다른 길드 플레이어에게는 방어가 작동하지 않습니다. 기본값은 꺼짐입니다.',
            tip: '주로 PvP 서버용 설정입니다. 정확한 동작 범위는 공식 문서에 자세히 나와 있지 않습니다.'
        },
        'palworld.invisibleOtherGuildBaseCampAreaFx': {
            what: '다른 길드 거점의 영역 경계 효과를 숨길지 정합니다.',
            effect: '켜면 다른 길드 거점의 영역 표시가 보이지 않습니다. 끄면 보입니다. 기본값은 꺼짐입니다.'
        },
        'palworld.buildAreaLimit': {
            what: '빠른 이동 지점 같은 주요 구조물 근처에 건축을 금지할지 정합니다.',
            effect: '켜면 해당 구조물 주변에 건물을 지을 수 없습니다. 끄면 제한 없이 지을 수 있습니다. 기본값은 꺼짐입니다.',
            tip: '공용 시설 주변을 막아 버리는 행위를 방지하는 데 유용합니다.'
        },
        'palworld.itemWeightRate': {
            what: '아이템 무게의 배율입니다.',
            effect: '값을 올리면 아이템이 무거워져 적게 들 수 있고, 내리면 가벼워져 더 많이 들 수 있습니다. 기본값은 1.0입니다.'
        },
        'palworld.coopPlayerMaxNum': {
            what: '협동(Co-op) 플레이 시 함께할 수 있는 최대 인원입니다.',
            effect: '값을 올리면 협동 인원이 늘고, 내리면 줄어듭니다. 기본값은 4입니다.',
            tip: '주로 일반 협동 세션용 설정이며, 전용 서버 접속 인원은 최대 플레이어 수에서 정합니다.'
        },
        'palworld.autoSaveSpan': {
            what: '월드를 자동 저장하는 간격(단위: 초)입니다.',
            effect: '값을 올리면 저장 빈도가 줄어 부하가 낮아지지만 서버가 갑자기 꺼졌을 때 잃는 진행이 늘어납니다. 내리면 자주 저장해 안전하지만 디스크 부하가 늘어납니다. 기본값은 30(초)입니다.'
        },
        'palworld.useBackupSaveData': {
            what: '게임 서버 자체의 월드 백업 기능을 사용할지 정합니다.',
            effect: '켜면 서버가 주기적으로 월드 백업을 만듭니다. 끄면 자체 백업을 만들지 않습니다. thijsvanloef 이미지 기본값은 켜짐입니다.',
            tip: '공식 문서에 따르면 켜면 디스크 부하가 늘어납니다. 컨테이너 자체 백업 기능과는 별개입니다.'
        },
        'palworld.supplyDropSpan': {
            what: '운석과 보급품이 떨어지는 간격(단위: 분)입니다.',
            effect: '값을 올리면 보급 이벤트가 드물게 발생하고, 내리면 자주 발생합니다. 기본값은 180(분)입니다.'
        },
        'palworld.chatPostLimitPerMinute': {
            what: '플레이어 한 명이 1분 동안 보낼 수 있는 채팅 메시지의 최대 수입니다.',
            effect: '값을 올리면 채팅을 더 자유롭게 할 수 있고, 내리면 도배를 강하게 막습니다. 기본값은 30입니다.'
        },
        'palworld.showPlayerList': {
            what: 'ESC 메뉴에서 접속 중인 플레이어 목록을 보여줄지 정합니다.',
            effect: '켜면 플레이어들이 ESC 메뉴에서 접속자 목록을 볼 수 있습니다. 끄면 표시되지 않습니다. 기본값은 꺼짐입니다.'
        },
        'palworld.banListUrl': {
            what: '서버가 참조할 차단(밴) 목록 파일의 주소입니다.',
            effect: '입력한 주소의 목록에 있는 플레이어는 접속이 차단됩니다. 기본값은 공식 밴 목록 주소(https://api.palworldgame.com/api/banlist.txt)입니다.',
            tip: '특별한 이유가 없다면 기본값을 유지하는 것을 권장합니다.'
        },
        'palworld.enablePredatorBossPal': {
            what: '포식자(Predator) 보스 팰의 출현을 허용할지 정합니다.',
            effect: '켜면 강력한 포식자 보스 팰이 월드에 등장합니다. 끄면 등장하지 않습니다. 기본값은 켜짐입니다.'
        },
        'palworld.maxBuildingLimitNum': {
            what: '플레이어 한 명이 지을 수 있는 건축물의 최대 개수입니다.',
            effect: '값을 올리면 더 많이 지을 수 있고, 내리면 건축이 제한됩니다. 0이면 무제한이며 기본값도 0입니다.',
            tip: '이 앱의 입력 최소값은 1이므로 무제한으로 두려면 값을 비워 기본값을 쓰세요. 건물이 많을수록 서버 부하가 커집니다.'
        },
        'palworld.serverReplicatePawnCullDistance': {
            what: '플레이어 주변 어느 거리까지의 팰 정보를 동기화할지 정하는 거리(단위: cm)입니다.',
            effect: '값을 올리면 멀리 있는 팰까지 보이지만 서버와 네트워크 부하가 늘어납니다. 내리면 부하가 줄지만 팰이 가까이 와서야 나타납니다. 공식 허용 범위는 5000~15000이며 기본값은 15000입니다.',
            tip: '이 앱의 입력 범위는 더 넓지만 공식 범위(5000~15000) 안에서 설정하는 것을 권장합니다.'
        },
        'palworld.equipmentDurabilityDamageRate': {
            what: '장비 내구도가 닳는 속도 배율입니다.',
            effect: '값을 올리면 장비가 빨리 닳고, 내리면 오래 씁니다. 기본값은 1.0입니다.'
        },
        'palworld.itemContainerForceMarkDirtyInterval': {
            what: '상자 등 아이템 보관함 창을 열어 두었을 때 내용을 강제로 다시 동기화하는 간격(단위: 초)입니다.',
            effect: '값을 내리면 보관함 내용이 더 자주 갱신되지만 부하가 늘고, 올리면 부하가 줄지만 갱신이 늦어질 수 있습니다. 기본값은 1.0(초)입니다.',
            tip: '특별한 문제가 없다면 기본값을 권장합니다.'
        },
        'palworld.allowGlobalPalboxExport': {
            what: '글로벌 팰 박스에 팰을 저장(내보내기)할 수 있게 할지 정합니다.',
            effect: '켜면 이 서버의 팰을 글로벌 팰 박스로 내보낼 수 있습니다. 끄면 내보낼 수 없습니다. 기본값은 켜짐입니다.'
        },
        'palworld.allowGlobalPalboxImport': {
            what: '글로벌 팰 박스에서 팰을 불러오기(가져오기)할 수 있게 할지 정합니다.',
            effect: '켜면 다른 월드에서 키운 팰을 이 서버로 가져올 수 있습니다. 끄면 가져올 수 없습니다. 기본값은 꺼짐입니다.',
            tip: '켜면 다른 월드의 강한 팰을 들여올 수 있어 서버 밸런스가 무너질 수 있습니다.'
        },
        'palworld.puid': {
            what: '컨테이너 안에서 게임 서버 프로세스가 실행될 리눅스 사용자 ID입니다.',
            effect: '이 값은 게임 플레이에는 영향이 없고, 저장 폴더 파일의 소유자와 권한을 결정합니다. 호스트에서 저장 폴더를 소유한 사용자의 ID와 맞추면 권한 문제가 생기지 않습니다. 기본값은 1000입니다.',
            tip: '호스트에서 id -u 명령으로 확인할 수 있습니다. 0(root)은 사용할 수 없습니다.'
        },
        'palworld.pgid': {
            what: '컨테이너 안에서 게임 서버 프로세스가 실행될 리눅스 그룹 ID입니다.',
            effect: '이 값은 게임 플레이에는 영향이 없고, 저장 폴더 파일의 그룹 권한을 결정합니다. 기본값은 1000입니다.',
            tip: '호스트에서 id -g 명령으로 확인할 수 있습니다. 0(root)은 사용할 수 없습니다.'
        },
        'palworld.timezone': {
            what: '컨테이너가 사용할 시간대입니다.',
            effect: '로그와 백업 파일 이름의 시각, 자동 재부팅 같은 예약 작업의 실행 시각 기준이 됩니다. 선택 가능 값: Asia/Seoul, UTC, America/New_York, America/Los_Angeles, Europe/London, Europe/Berlin, Asia/Tokyo, Asia/Singapore, Australia/Sydney. thijsvanloef 이미지 기본값은 UTC입니다.',
            tip: '게임 안의 낮/밤 시간과는 관계없습니다. 한국에서 운영한다면 Asia/Seoul을 권장합니다.'
        },
        'palworld.serverDescription': {
            what: '서버 목록(커뮤니티 서버 브라우저)에 표시되는 서버 소개글입니다.',
            effect: '입력한 문구가 서버 목록에서 서버 설명으로 보입니다. 게임 플레이에는 영향이 없습니다. 기본값은 비어 있음입니다.'
        },
        'palworld.buildObjectHpRate': {
            what: '건축물의 내구도(HP) 배율입니다.',
            effect: '값을 올리면 건물이 튼튼해지고, 내리면 쉽게 부서집니다. 기본값은 1.0입니다.'
        },
        'palworld.buildObjectDamageRate': {
            what: '건축물이 받는 데미지의 배율입니다.',
            effect: '값을 올리면 건물이 공격에 더 큰 피해를 받고, 내리면 피해를 덜 받습니다. 기본값은 1.0입니다.',
            tip: '습격에 건물이 자주 부서진다면 값을 낮추세요.'
        },
        'palworld.buildObjectDeteriorationDamageRate': {
            what: '건축물이 시간이 지나며 자연적으로 낡는(열화) 속도 배율입니다.',
            effect: '값을 올리면 건물이 빨리 낡아 부서지고, 내리면 천천히 낡습니다. 0에 가까울수록 거의 낡지 않습니다. 기본값은 1.0입니다.',
            tip: '거점 범위 밖에 지은 건물이 시간이 지나 사라지는 현상과 관련된 설정입니다.'
        },
        'palworld.collectionObjectHpRate': {
            what: '나무, 바위 등 채집 대상 오브젝트의 HP 배율입니다.',
            effect: '값을 올리면 채집물을 부수는 데 더 많이 때려야 하고, 내리면 쉽게 부서집니다. 기본값은 1.0입니다.'
        },
        'palworld.collectionObjectRespawnSpeedRate': {
            what: '채집한 나무, 바위 등이 다시 생겨나는 간격의 배율입니다.',
            effect: '공식 문서는 이 값을 재생성 간격으로 설명합니다. 따라서 값을 올리면 다시 생기기까지 오래 걸리고, 내리면 빨리 다시 생깁니다. 기본값은 1.0입니다.',
            tip: '설정 이름에는 속도(Speed)가 들어 있어 반대로 오해하기 쉽습니다. 방향이 헷갈리면 조금씩 바꿔 보며 확인하세요.'
        },
        'palworld.baseCampMaxNumInGuild': {
            what: '길드 하나가 가질 수 있는 거점의 최대 개수입니다.',
            effect: '값을 올리면 길드당 더 많은 거점을 만들 수 있고, 내리면 제한됩니다. 기본값은 4, 최대 10입니다.',
            tip: '공식 문서에 따르면 값을 높일수록 서버 처리 부하가 커집니다.'
        },
        'palworld.isMultiplay': {
            what: '멀티플레이 모드 여부를 나타내는 설정입니다.',
            effect: '사용 가능 값은 켜짐/꺼짐이며 기본값은 꺼짐입니다.',
            tip: '공식 문서에 설명이 없으며, 전용 서버에서 이 값을 바꿨을 때의 실제 효과는 확인되지 않았습니다. 기본값 유지를 권장합니다.'
        },
        'palworld.region': {
            what: '서버의 지역 정보를 나타내는 문자열입니다.',
            effect: '자유 문자열이며 기본값은 비어 있음입니다.',
            tip: '공식 문서에 설명이 없어 실제 효과(서버 목록 표시 등)는 확인되지 않았습니다. 특별한 이유가 없다면 비워 두세요.'
        }
    };
    const help = root.OptionHelp = root.OptionHelp || {};
    Object.assign(help, entries);
    if (typeof module !== 'undefined' && module.exports) module.exports = entries;
})(typeof globalThis !== 'undefined' ? globalThis : this);
