(function (root) {
    'use strict';
    // Sources:
    //   https://docs.palworldgame.com/settings-and-operation/configuration/
    //   https://palworld-server-docker.loef.dev/getting-started/configuration/game-settings
    //   https://palworld-server-docker.loef.dev/getting-started/configuration/server-settings
    const entries = {
        'palworld.players': {
            what: ['서버 동시 접속 최대 플레이어 수'],
            effect: ['값 올림: 더 많은 인원 동시 접속 가능', '값 내림: 접속 인원 제한됨', '허용 범위: 1~32', '게임 자체 기본값: 32', 'thijsvanloef 이미지 기본값: 16'],
            tip: ['인원 많을수록 CPU·메모리 사용량 크게 늘어남', '서버 사양에 맞게 설정 권장']
        },
        'palworld.difficulty': {
            what: ['게임 난이도 프리셋 값'],
            effect: ['사용 가능 값: None, Normal, Difficult', '기본값: None'],
            tip: ['전용 서버: 경험치·데미지 배율 등 개별 설정이 실제 밸런스 결정', '이 값만으로 난이도가 확실히 달라지는지는 공식 문서에 명시 없음', '원하는 밸런스는 개별 배율로 조정하는 편이 확실함']
        },
        'palworld.expRate': {
            what: ['플레이어·팰이 얻는 경험치 배율'],
            effect: ['값 올림: 레벨업 빨라짐', '값 내림: 레벨업 느려짐', '기본값: 1.0'],
            tip: ['빠른 진행을 원하는 소규모 서버: 2.0~3.0 권장']
        },
        'palworld.palCaptureRate': {
            what: ['팰 스피어 포획 성공 확률 배율'],
            effect: ['값 올림: 포획 쉬워짐', '값 내림: 포획 어려워짐', '기본값: 1.0']
        },
        'palworld.palSpawnNumRate': {
            what: ['필드에 나타나는 야생 팰 수 배율'],
            effect: ['값 올림: 야생 팰 더 많이 출현', '값 내림: 야생 팰 적게 출현', '기본값: 1.0'],
            tip: ['공식 문서 기준 서버 성능에 영향 있음', '높이면 서버 부하·렉 늘어날 수 있음', '조금씩 올리는 것 권장']
        },
        'palworld.dayTimeSpeedRate': {
            what: ['낮 시간 흐름 속도 배율'],
            effect: ['값 올림: 낮이 빨리 지나가 짧아짐', '값 내림: 낮이 길어짐', '기본값: 1.0']
        },
        'palworld.nightTimeSpeedRate': {
            what: ['밤 시간 흐름 속도 배율'],
            effect: ['값 올림: 밤이 빨리 지나가 짧아짐', '값 내림: 밤이 길어짐', '기본값: 1.0'],
            tip: ['밤이 지루할 때: 낮은 그대로, 이 값만 2.0 정도로 올리는 방법이 많이 쓰임']
        },
        'palworld.playerDamageRateAttack': {
            what: ['플레이어가 입히는 데미지 배율'],
            effect: ['값 올림: 플레이어 공격 강해짐', '값 내림: 플레이어 공격 약해짐', '기본값: 1.0']
        },
        'palworld.playerDamageRateDefense': {
            what: ['플레이어가 받는 데미지 배율'],
            effect: ['값 올림: 받는 피해 늘어 게임 어려워짐', '값 내림: 받는 피해 줄어 게임 쉬워짐', '기본값: 1.0'],
            tip: ['이름과 달리 방어력이 아닌 받는 피해량임', '쉽게 하려면 값 낮춤']
        },
        'palworld.palDamageRateAttack': {
            what: ['팰이 입히는 데미지 배율'],
            effect: ['값 올림: 팰 공격 강해짐', '값 내림: 팰 공격 약해짐', '기본값: 1.0']
        },
        'palworld.palDamageRateDefense': {
            what: ['팰이 받는 데미지 배율'],
            effect: ['값 올림: 팰이 받는 피해 늘어남', '값 내림: 팰이 받는 피해 줄어듦', '기본값: 1.0'],
            tip: ['이름과 달리 방어력이 아닌 받는 피해량임', '팰을 튼튼하게 하려면 값 낮춤']
        },
        'palworld.collectionDropRate': {
            what: ['나무·돌·광석 등 채집 시 얻는 아이템 수 배율'],
            effect: ['값 올림: 채집 한 번에 더 많은 자원 획득', '값 내림: 획득량 줄어듦', '기본값: 1.0']
        },
        'palworld.enemyDropItemRate': {
            what: ['적(야생 팰 등) 처치 시 드롭 아이템 양 배율'],
            effect: ['값 올림: 드롭 아이템 늘어남', '값 내림: 드롭 아이템 줄어듦', '기본값: 1.0']
        },
        'palworld.workSpeedRate': {
            what: ['제작·건설·거점 작업 등의 작업 속도 배율'],
            effect: ['값 올림: 제작·작업 빨리 끝남', '값 내림: 제작·작업 오래 걸림', '기본값: 1.0']
        },
        'palworld.palEggDefaultHatchingTime': {
            what: ['거대 알(Huge Egg) 부화 소요 시간(단위: 시간)'],
            effect: ['값 올림: 부화 오래 걸림', '값 내림: 부화 빨라짐', '0: 사실상 즉시 부화', '기본값: 72(시간)'],
            tip: ['공식 문서 기준 다른 알도 부화에 시간 필요함', '이 값을 기준으로 알 크기에 따라 시간 정해짐']
        },
        'palworld.dropItemMaxNum': {
            what: ['월드에 동시에 떨어져 있을 수 있는 드롭 아이템 최대 개수'],
            effect: ['값 올림: 더 많은 아이템이 바닥에 남음', '값 내림: 한도 넘는 아이템 정리됨', '기본값: 3000'],
            tip: ['너무 높이면 서버 부하 늘어날 수 있음']
        },
        'palworld.baseCampWorkerMaxNum': {
            what: ['거점 하나에 배치 가능한 작업 팰 최대 수'],
            effect: ['값 올림: 거점에서 더 많은 팰 작업 가능', '값 내림: 배치 수 줄어듦', '기본값: 15', '최대: 50'],
            tip: ['공식 문서 기준 값 높을수록 서버 처리 부하 커짐']
        },
        'palworld.guildPlayerMaxNum': {
            what: ['길드 하나에 가입 가능한 최대 플레이어 수'],
            effect: ['값 올림: 큰 길드 생성 가능', '값 내림: 길드 인원 제한됨', '기본값: 20']
        },
        'palworld.deathPenalty': {
            what: ['플레이어 사망 시 떨어뜨리는 대상 설정'],
            effect: ['None: 아무것도 떨어뜨리지 않음', 'Item: 장비 제외 소지 아이템 드롭', 'ItemAndEquipment: 소지 아이템·장비 모두 드롭', 'All: 아이템·장비·데리고 있던 팰 모두 드롭', '기본값: Item'],
            tip: ['대소문자 포함 정확히 입력해야 함']
        },
        'palworld.crossplayPlatforms': {
            what: ['서버 접속 허용 플랫폼 목록'],
            effect: ['입력 형식: 괄호 안에 쉼표로 구분', '사용 가능 값: Steam, Xbox, PS5, Mac', '목록에서 빠진 플랫폼: 접속 불가', '기본값: (Steam,Xbox,PS5,Mac)'],
            tip: ['예: Steam 사용자만 받기 → (Steam) 입력']
        },
        'palworld.useAuth': {
            what: ['접속 플레이어 계정 인증 사용 여부'],
            effect: ['켜짐: 정식 계정 인증 거친 플레이어만 접속 가능', '꺼짐: 인증 절차 생략', '기본값: 켜짐'],
            tip: ['특별한 이유 없으면 켜 두기 권장', '밴 목록 등 일부 기능이 인증에 의존할 수 있음']
        },
        'palworld.isPvp': {
            what: ['PvP(플레이어 대 플레이어) 모드 사용 여부'],
            effect: ['켜짐: PvP 관련 규칙 적용 서버', '꺼짐: 일반 협동(PvE) 서버로 동작', '기본값: 꺼짐'],
            tip: ['실제 플레이어 간 데미지는 플레이어 간 데미지 설정도 함께 켜야 함']
        },
        'palworld.enableFriendlyFire': {
            what: ['아군(같은 길드 등)끼리 피해 가능 여부'],
            effect: ['켜짐: 아군 공격에도 피해 입음', '꺼짐: 아군 공격에 피해 없음', '기본값: 꺼짐']
        },
        'palworld.enableInvaderEnemy': {
            what: ['거점 적 습격(침입 이벤트) 허용 여부'],
            effect: ['켜짐: 거점이 주기적으로 습격받음', '꺼짐: 습격 발생 안 함', '기본값: 켜짐'],
            tip: ['습격으로 인한 렉·건물 파손이 부담되면 끌 수 있음']
        },
        'palworld.enableFastTravel': {
            what: ['빠른 이동(순간이동) 기능 사용 여부'],
            effect: ['켜짐: 빠른 이동 지점 사이 순간이동 가능', '꺼짐: 직접 걷거나 탈것으로 이동', '기본값: 켜짐']
        },
        'palworld.randomizerType': {
            what: ['야생 팰 출현을 무작위로 섞는 랜더마이저 방식'],
            effect: ['None: 랜더마이저 미사용(원래 출현 그대로)', 'Region: 지역 단위로 출현 팰 무작위 변경', 'All: 모든 출현 완전 무작위', '기본값: None'],
            tip: ['월드 생성 시점에 적용되는 것으로 알려짐', '기존 월드에서 바꾸면 반영 안 될 수 있음(공식 문서에 명시 없음)']
        },
        'palworld.randomizerSeed': {
            what: ['랜더마이저 무작위 배치 생성용 시드 값'],
            effect: ['같은 시드: 같은 무작위 배치 생성', '다른 시드: 다른 배치 생성', '기본값: 빈 문자열(비워 둠)'],
            tip: ['랜더마이저 유형이 None이면 의미 없음']
        },
        'palworld.isRandomizerPalLevelRandom': {
            what: ['랜더마이저 사용 시 야생 팰 레벨 무작위 여부'],
            effect: ['켜짐: 지역과 관계없이 팰 레벨 완전 무작위', '꺼짐: 각 지역 원래 레벨 범위 안에서 결정', '기본값: 꺼짐'],
            tip: ['켜면 초반 지역에 고레벨 팰 출현 가능', '난이도 크게 오를 수 있음']
        },
        'palworld.playerStomachDecreaseRate': {
            what: ['플레이어 배고픔(포만도) 감소 속도 배율'],
            effect: ['값 올림: 더 빨리 배고파짐', '값 내림: 천천히 배고파짐', '기본값: 1.0']
        },
        'palworld.playerStaminaDecreaseRate': {
            what: ['플레이어 스태미나 소모 속도 배율'],
            effect: ['값 올림: 달리기·등반 등에서 스태미나 빨리 닳음', '값 내림: 스태미나 오래 버팀', '기본값: 1.0']
        },
        'palworld.playerAutoHpRegenRate': {
            what: ['플레이어 HP 자연 회복 속도 배율'],
            effect: ['값 올림: HP 빨리 회복됨', '값 내림: HP 느리게 회복됨', '기본값: 1.0']
        },
        'palworld.playerAutoHpRegenRateInSleep': {
            what: ['플레이어 수면 중 HP 회복 속도 배율'],
            effect: ['값 올림: 수면 중 HP 빨리 회복됨', '값 내림: 수면 중 HP 느리게 회복됨', '기본값: 1.0']
        },
        'palworld.palStomachDecreaseRate': {
            what: ['팰 배고픔(포만도) 감소 속도 배율'],
            effect: ['값 올림: 팰이 빨리 배고파져 먹이 더 필요함', '값 내림: 먹이 소모 줄어듦', '기본값: 1.0']
        },
        'palworld.palStaminaDecreaseRate': {
            what: ['팰 스태미나 소모 속도 배율'],
            effect: ['값 올림: 탈것 팰 등의 스태미나 빨리 닳음', '값 내림: 스태미나 오래 버팀', '기본값: 1.0']
        },
        'palworld.palAutoHpRegenRate': {
            what: ['팰 HP 자연 회복 속도 배율'],
            effect: ['값 올림: 팰 HP 빨리 회복됨', '값 내림: 팰 HP 느리게 회복됨', '기본값: 1.0']
        },
        'palworld.palAutoHpRegenRateInSleep': {
            what: ['팰 휴식 중(팰 박스 안) HP 회복 속도 배율'],
            effect: ['값 올림: 팰 박스 안 HP 빨리 회복됨', '값 내림: 팰 박스 안 HP 느리게 회복됨', '기본값: 1.0']
        },
        'palworld.enablePlayerToPlayerDamage': {
            what: ['플레이어끼리 데미지 가능 여부'],
            effect: ['켜짐: 다른 플레이어 공격해 피해 줄 수 있음', '꺼짐: 플레이어 간 공격 피해 없음', '기본값: 꺼짐'],
            tip: ['PvP 서버: PVP 사용과 함께 켜는 것이 일반적임']
        },
        'palworld.activeUnko': {
            what: ['팰 배설물(운코) 생성 기능 사용 여부'],
            effect: ['켜짐: 거점 팰이 배설물 남김', '꺼짐: 배설물 생기지 않음', '기본값: 꺼짐'],
            tip: ['켜면 바닥 오브젝트 늘어 서버 부하 약간 늘 수 있음']
        },
        'palworld.enableAimAssistPad': {
            what: ['게임패드(컨트롤러) 사용자 조준 보정 허용 여부'],
            effect: ['켜짐: 패드 사용자 조준 보정 받음', '꺼짐: 조준 보정 비활성화', '기본값: 켜짐']
        },
        'palworld.enableAimAssistKeyboard': {
            what: ['키보드/마우스 사용자 조준 보정 허용 여부'],
            effect: ['켜짐: 키보드/마우스 사용자도 조준 보정 받음', '꺼짐: 조준 보정 없음', '기본값: 꺼짐']
        },
        'palworld.dropItemMaxNumUnko': {
            what: ['월드에 동시 존재 가능한 배설물(운코) 최대 개수'],
            effect: ['값 올림: 더 많은 배설물이 남음', '값 내림: 한도 넘는 배설물 정리됨', '기본값: 100'],
            tip: ['운코 활성화가 꺼져 있으면 의미 없음']
        },
        'palworld.baseCampMaxNum': {
            what: ['서버 전체에 만들 수 있는 거점 총 개수'],
            effect: ['값 올림: 서버 전체 거점 더 많이 건설 가능', '값 내림: 거점 수 제한됨', '기본값: 128'],
            tip: ['거점 많을수록 서버 부하 커짐']
        },
        'palworld.dropItemAliveMaxHours': {
            what: ['바닥에 떨어진 아이템 유지 시간(단위: 시간)'],
            effect: ['값 올림: 아이템 오래 남음', '값 내림: 아이템 빨리 사라짐', '기본값: 1.0(시간)']
        },
        'palworld.autoResetGuildNoOnlinePlayers': {
            what: ['일정 시간 길드원 전원 미접속 시 길드 자동 정리 여부'],
            effect: ['켜짐: 미접속 시간 기준 넘은 길드의 건물·거점 팰 삭제됨', '꺼짐: 접속 여부와 관계없이 유지됨', '기본값: 꺼짐'],
            tip: ['데이터 삭제 기능이므로 신중히 사용', '기준 시간: 길드 초기화 미접속 시간에서 설정']
        },
        'palworld.autoResetGuildTimeNoOnlinePlayers': {
            what: ['미접속 길드 자동 초기화 실행까지 미접속 시간(단위: 시간)'],
            effect: ['값 올림: 더 오래 미접속해야 초기화됨', '값 내림: 더 빨리 초기화됨', '기본값: 72(시간)'],
            tip: ['미접속 길드 자동 초기화가 꺼져 있으면 무시됨']
        },
        'palworld.characterRecreateInHardcore': {
            what: ['하드코어 모드 사망 후 캐릭터 재생성 가능 여부'],
            effect: ['켜짐: 사망 후 캐릭터 다시 만들어 플레이 이어감', '꺼짐: 사망한 캐릭터로 더 이상 플레이 불가', '기본값: 꺼짐'],
            tip: ['하드코어가 켜져 있을 때만 의미 있음']
        },
        'palworld.hardcore': {
            what: ['하드코어 모드 사용 여부'],
            effect: ['켜짐: 사망 시 부활 불가', '꺼짐: 일반적으로 부활함', '기본값: 꺼짐'],
            tip: ['팰 로스트·하드코어 캐릭터 재생성 설정과 함께 조정하는 경우 많음']
        },
        'palworld.palLost': {
            what: ['사망 시 데리고 있던 팰 영구 손실 여부'],
            effect: ['켜짐: 사망 시 팰 영구 소멸', '꺼짐: 팰 잃지 않음', '기본값: 꺼짐']
        },
        'palworld.canPickupOtherGuildDeathPenaltyDrop': {
            what: ['다른 길드 플레이어 사망 드롭 아이템 줍기 가능 여부'],
            effect: ['켜짐: 다른 길드 사망 드롭 아이템 획득 가능', '꺼짐: 주울 수 없음', '기본값: 꺼짐'],
            tip: ['PvP 서버에 약탈 요소를 넣을 때 사용']
        },
        'palworld.enableNonLoginPenalty': {
            what: ['장기 미접속 플레이어 불이익 적용 여부'],
            effect: ['켜짐: 장기간 미접속 시 페널티 적용', '꺼짐: 페널티 없음', '기본값: 켜짐'],
            tip: ['공식 문서에 페널티 구체 내용 명시 없음', '거점 팰 상태 등에 영향 준다는 보고 있으나 확실하지 않음']
        },
        'palworld.isStartLocationSelectByMap': {
            what: ['최초 시작 시 지도에서 시작 위치 선택 가능 여부'],
            effect: ['켜짐: 지도에서 시작 지점 선택', '꺼짐: 기본 시작 지점에서 시작', '기본값: 꺼짐']
        },
        'palworld.existPlayerAfterLogout': {
            what: ['로그아웃한 플레이어 캐릭터 월드 잔류 여부'],
            effect: ['켜짐: 로그아웃 후에도 그 자리에 잠든 상태로 남음(공격받을 수 있음)', '꺼짐: 로그아웃과 함께 캐릭터 사라짐', '기본값: 꺼짐'],
            tip: ['PvP 서버에서 로그아웃으로 위험 회피하는 것 방지용']
        },
        'palworld.enableDefenseOtherGuildPlayer': {
            what: ['다른 길드 플레이어 대상 거점 방어 기능 작동 여부'],
            effect: ['켜짐: 거점 방어 시설 등이 다른 길드 플레이어도 공격', '꺼짐: 다른 길드 플레이어에게 방어 미작동', '기본값: 꺼짐'],
            tip: ['주로 PvP 서버용 설정', '정확한 동작 범위는 공식 문서에 자세히 나와 있지 않음']
        },
        'palworld.invisibleOtherGuildBaseCampAreaFx': {
            what: ['다른 길드 거점 영역 경계 효과 숨김 여부'],
            effect: ['켜짐: 다른 길드 거점 영역 표시 안 보임', '꺼짐: 영역 표시 보임', '기본값: 꺼짐']
        },
        'palworld.buildAreaLimit': {
            what: ['빠른 이동 지점 등 주요 구조물 근처 건축 금지 여부'],
            effect: ['켜짐: 해당 구조물 주변 건축 불가', '꺼짐: 제한 없이 건축 가능', '기본값: 꺼짐'],
            tip: ['공용 시설 주변을 막아 버리는 행위 방지에 유용함']
        },
        'palworld.itemWeightRate': {
            what: ['아이템 무게 배율'],
            effect: ['값 올림: 아이템 무거워져 적게 들 수 있음', '값 내림: 가벼워져 더 많이 들 수 있음', '기본값: 1.0']
        },
        'palworld.coopPlayerMaxNum': {
            what: ['협동(Co-op) 플레이 최대 인원'],
            effect: ['값 올림: 협동 인원 늘어남', '값 내림: 협동 인원 줄어듦', '기본값: 4'],
            tip: ['주로 일반 협동 세션용 설정', '전용 서버 접속 인원은 최대 플레이어 수에서 설정']
        },
        'palworld.autoSaveSpan': {
            what: ['월드 자동 저장 간격(단위: 초)'],
            effect: ['값 올림: 저장 빈도 줄어 부하 낮아짐', '값 올림: 서버 갑자기 꺼지면 잃는 진행 늘어남', '값 내림: 자주 저장해 안전함', '값 내림: 디스크 부하 늘어남', '기본값: 30(초)']
        },
        'palworld.useBackupSaveData': {
            what: ['게임 서버 자체 월드 백업 기능 사용 여부'],
            effect: ['켜짐: 서버가 주기적으로 월드 백업 생성', '꺼짐: 자체 백업 생성 안 함', 'thijsvanloef 이미지 기본값: 켜짐'],
            tip: ['공식 문서 기준 켜면 디스크 부하 늘어남', '컨테이너 자체 백업 기능과는 별개임']
        },
        'palworld.supplyDropSpan': {
            what: ['운석·보급품 낙하 간격(단위: 분)'],
            effect: ['값 올림: 보급 이벤트 드물게 발생', '값 내림: 보급 이벤트 자주 발생', '기본값: 180(분)']
        },
        'palworld.chatPostLimitPerMinute': {
            what: ['플레이어 1명이 1분 동안 보낼 수 있는 채팅 최대 수'],
            effect: ['값 올림: 채팅 더 자유로움', '값 내림: 도배 강하게 막음', '기본값: 30']
        },
        'palworld.showPlayerList': {
            what: ['ESC 메뉴 접속자 목록 표시 여부'],
            effect: ['켜짐: ESC 메뉴에서 접속자 목록 볼 수 있음', '꺼짐: 목록 표시 안 됨', '기본값: 꺼짐']
        },
        'palworld.banListUrl': {
            what: ['서버가 참조할 차단(밴) 목록 파일 주소'],
            effect: ['입력한 주소 목록에 있는 플레이어: 접속 차단됨', '기본값: 공식 밴 목록 주소(https://api.palworldgame.com/api/banlist.txt)'],
            tip: ['특별한 이유 없으면 기본값 유지 권장']
        },
        'palworld.enablePredatorBossPal': {
            what: ['포식자(Predator) 보스 팰 출현 허용 여부'],
            effect: ['켜짐: 강력한 포식자 보스 팰 월드에 등장', '꺼짐: 등장 안 함', '기본값: 켜짐']
        },
        'palworld.maxBuildingLimitNum': {
            what: ['플레이어 1명이 지을 수 있는 건축물 최대 개수'],
            effect: ['값 올림: 더 많이 건축 가능', '값 내림: 건축 제한됨', '0: 무제한', '기본값: 0'],
            tip: ['이 앱의 입력 최소값: 1', '무제한으로 두려면 값을 비워 기본값 사용', '건물 많을수록 서버 부하 커짐']
        },
        'palworld.serverReplicatePawnCullDistance': {
            what: ['플레이어 주변 팰 정보 동기화 거리(단위: cm)'],
            effect: ['값 올림: 멀리 있는 팰까지 보임', '값 올림: 서버·네트워크 부하 늘어남', '값 내림: 부하 줄어듦', '값 내림: 팰이 가까이 와서야 나타남', '공식 허용 범위: 5000~15000', '기본값: 15000'],
            tip: ['이 앱의 입력 범위는 더 넓음', '공식 범위(5000~15000) 안에서 설정 권장']
        },
        'palworld.equipmentDurabilityDamageRate': {
            what: ['장비 내구도 감소 속도 배율'],
            effect: ['값 올림: 장비 빨리 닳음', '값 내림: 장비 오래 씀', '기본값: 1.0']
        },
        'palworld.itemContainerForceMarkDirtyInterval': {
            what: ['상자 등 보관함 창 열어 둔 상태에서 내용 강제 재동기화 간격(단위: 초)'],
            effect: ['값 내림: 보관함 내용 더 자주 갱신됨', '값 내림: 부하 늘어남', '값 올림: 부하 줄어듦', '값 올림: 갱신 늦어질 수 있음', '기본값: 1.0(초)'],
            tip: ['특별한 문제 없으면 기본값 권장']
        },
        'palworld.allowGlobalPalboxExport': {
            what: ['글로벌 팰 박스로 팰 저장(내보내기) 허용 여부'],
            effect: ['켜짐: 이 서버의 팰을 글로벌 팰 박스로 내보내기 가능', '꺼짐: 내보내기 불가', '기본값: 켜짐']
        },
        'palworld.allowGlobalPalboxImport': {
            what: ['글로벌 팰 박스에서 팰 불러오기(가져오기) 허용 여부'],
            effect: ['켜짐: 다른 월드에서 키운 팰을 이 서버로 가져오기 가능', '꺼짐: 가져오기 불가', '기본값: 꺼짐'],
            tip: ['켜면 다른 월드의 강한 팰 유입 가능', '서버 밸런스 무너질 수 있음']
        },
        'palworld.puid': {
            what: ['컨테이너 안 게임 서버 프로세스의 리눅스 사용자 ID'],
            effect: ['게임 플레이에는 영향 없음', '저장 폴더 파일의 소유자·권한 결정', '호스트 저장 폴더 소유자 ID와 맞추면 권한 문제 없음', '기본값: 1000'],
            tip: ['확인 방법: 호스트에서 id -u 명령', '0(root) 사용 불가']
        },
        'palworld.pgid': {
            what: ['컨테이너 안 게임 서버 프로세스의 리눅스 그룹 ID'],
            effect: ['게임 플레이에는 영향 없음', '저장 폴더 파일의 그룹 권한 결정', '기본값: 1000'],
            tip: ['확인 방법: 호스트에서 id -g 명령', '0(root) 사용 불가']
        },
        'palworld.timezone': {
            what: ['컨테이너가 사용할 시간대'],
            effect: ['로그·백업 파일 이름의 시각 기준', '자동 재부팅 등 예약 작업 실행 시각 기준', '선택 가능 값: Asia/Seoul, UTC, America/New_York, America/Los_Angeles, Europe/London, Europe/Berlin, Asia/Tokyo, Asia/Singapore, Australia/Sydney', 'thijsvanloef 이미지 기본값: UTC'],
            tip: ['게임 안 낮/밤 시간과는 무관함', '한국에서 운영 시 Asia/Seoul 권장']
        },
        'palworld.serverDescription': {
            what: ['서버 목록(커뮤니티 서버 브라우저)에 표시되는 서버 소개글'],
            effect: ['입력 문구가 서버 목록에 서버 설명으로 표시됨', '게임 플레이에는 영향 없음', '기본값: 비어 있음']
        },
        'palworld.buildObjectHpRate': {
            what: ['건축물 내구도(HP) 배율'],
            effect: ['값 올림: 건물 튼튼해짐', '값 내림: 건물 쉽게 부서짐', '기본값: 1.0']
        },
        'palworld.buildObjectDamageRate': {
            what: ['건축물이 받는 데미지 배율'],
            effect: ['값 올림: 건물이 공격에 더 큰 피해 받음', '값 내림: 건물 피해 줄어듦', '기본값: 1.0'],
            tip: ['습격에 건물이 자주 부서질 때: 값 낮춤']
        },
        'palworld.buildObjectDeteriorationDamageRate': {
            what: ['건축물 자연 열화(낡음) 속도 배율'],
            effect: ['값 올림: 건물 빨리 낡아 부서짐', '값 내림: 건물 천천히 낡음', '0에 가까울수록: 거의 낡지 않음', '기본값: 1.0'],
            tip: ['거점 범위 밖 건물이 시간이 지나 사라지는 현상과 관련된 설정']
        },
        'palworld.collectionObjectHpRate': {
            what: ['나무·바위 등 채집 대상 오브젝트 HP 배율'],
            effect: ['값 올림: 채집물 부수려면 더 많이 때려야 함', '값 내림: 채집물 쉽게 부서짐', '기본값: 1.0']
        },
        'palworld.collectionObjectRespawnSpeedRate': {
            what: ['채집한 나무·바위 등 재생성 간격 배율'],
            effect: ['공식 문서 설명: 재생성 간격', '값 올림: 다시 생기기까지 오래 걸림', '값 내림: 빨리 다시 생김', '기본값: 1.0'],
            tip: ['설정 이름의 속도(Speed) 때문에 반대로 오해하기 쉬움', '방향이 헷갈리면 조금씩 바꿔 보며 확인']
        },
        'palworld.baseCampMaxNumInGuild': {
            what: ['길드 하나가 가질 수 있는 거점 최대 개수'],
            effect: ['값 올림: 길드당 더 많은 거점 건설 가능', '값 내림: 거점 수 제한됨', '기본값: 4', '최대: 10'],
            tip: ['공식 문서 기준 값 높을수록 서버 처리 부하 커짐']
        },
        'palworld.isMultiplay': {
            what: ['멀티플레이 모드 여부 설정'],
            effect: ['사용 가능 값: 켜짐/꺼짐', '기본값: 꺼짐'],
            tip: ['공식 문서에 설명 없음', '전용 서버에서 변경 시 실제 효과 확인되지 않음', '기본값 유지 권장']
        },
        'palworld.region': {
            what: ['서버 지역 정보 문자열'],
            effect: ['자유 문자열', '기본값: 비어 있음'],
            tip: ['공식 문서에 설명 없음', '실제 효과(서버 목록 표시 등) 확인되지 않음', '특별한 이유 없으면 비워 둠']
        }
    };
    const help = root.OptionHelp = root.OptionHelp || {};
    Object.assign(help, entries);
    if (typeof module !== 'undefined' && module.exports) module.exports = entries;
})(typeof globalThis !== 'undefined' ? globalThis : this);
