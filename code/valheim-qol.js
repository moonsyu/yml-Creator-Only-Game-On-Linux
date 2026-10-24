(function (root) {
    'use strict';

    // Keys and units follow Grantapher/ValheimPlus 0.10.3.0/valheim_plus.cfg.
    const fields = [
        { key: 'maxPlayers', label: '최대 접속 인원', type: 'number', value: 10, min: 1, max: 128, step: 1, help: '기본 10명. 인원 확장은 ValheimPlus가 담당하며 각 PC에도 같은 모드가 필요합니다.' },
        { key: 'disableServerPassword', label: '서버 접속 비밀번호 해제', type: 'boolean', value: false, help: '켜면 누구나 비밀번호 없이 접속할 수 있습니다. ValheimPlus 서버 기능입니다.' },
        { key: 'portalItems', label: '광물·금속 포탈 통과', type: 'boolean', value: false, help: '평소 포탈을 통과하지 못하는 아이템도 들고 이동합니다.' },
        { key: 'carryWeight', label: '기본 운반 무게', type: 'number', value: 300, min: 1, max: 10000, step: 1, help: '기본값 300. 메긴기오르드 등의 추가 효과는 별도로 더해집니다.' },
        { key: 'stackMultiplier', label: '아이템 스택 배수', type: 'number', value: 1, min: 1, max: 10, step: 0.1, help: '1배는 기본값, 2배는 한 칸에 쌓이는 최대 수량을 두 배로 늘립니다.' },
        { key: 'craftFromChest', label: '상자 재료로 제작·건설', type: 'boolean', value: false, help: '주변 상자에 든 재료를 꺼내지 않고 사용합니다.' },
        { key: 'chestRange', label: '제작 재료를 찾는 거리 (m)', type: 'number', value: 20, min: 1, max: 50, step: 1, help: '상자 재료 사용을 켰을 때 적용됩니다.' },
        { key: 'runReduction', label: '달리기 스태미나 소모 감소 (%)', type: 'number', value: 0, min: 0, max: 100, step: 1, help: '0은 기본값, 50은 절반, 100은 소모 없음입니다. 전투 중에도 적용됩니다.' },
        { key: 'jumpReduction', label: '점프 스태미나 소모 감소 (%)', type: 'number', value: 0, min: 0, max: 100, step: 1, help: '0은 기본값, 50은 절반입니다. 전투 중에도 적용됩니다.' },
        { key: 'foodMultiplier', label: '음식 지속 시간 배수', type: 'number', value: 1, min: 1, max: 10, step: 0.1, help: '2배로 설정하면 음식 효과가 두 배 오래 지속됩니다.' },
        { key: 'fullFoodEffect', label: '음식 효과를 끝까지 유지', type: 'boolean', value: false, help: '음식 효과가 시간이 지나며 줄어들지 않고, 지속 시간이 끝날 때까지 유지됩니다.' },
        { key: 'autoFuel', label: '제련소·용광로·숯가마 자동 투입', type: 'boolean', value: false, help: '주변 상자에서 원료와 연료를 가져옵니다. 숯가마는 귀중한 나무와 통나무를 사용하지 않도록 설정합니다.' },
        { key: 'autoDeposit', label: '제련 생산물을 상자에 저장', type: 'boolean', value: false, help: '제련소·용광로·숯가마의 생산물을 주변 상자에 넣습니다.' },
        { key: 'automationRange', label: '자동 투입·저장 거리 (m)', type: 'number', value: 10, min: 1, max: 50, step: 1, help: '자동 투입 또는 자동 저장을 켰을 때 적용됩니다.' },
        { key: 'workbenchRange', label: '작업대 건설 범위 (m)', type: 'number', value: 20, min: 1, max: 100, step: 1, help: '기본값 20. 작업대 주변에서 건설할 수 있는 범위를 조절합니다.' },
        { key: 'noRoof', label: '작업대 지붕 조건 해제', type: 'boolean', value: false, help: '지붕 없이 작업대를 사용할 수 있습니다.' }
    ];
    const defaults = Object.fromEntries([['enabled', false], ...fields.map(field => [field.key, field.value])]);

    function preset() {
        return { ...defaults, enabled: true, portalItems: true, carryWeight: 600, stackMultiplier: 2, craftFromChest: true, runReduction: 25, jumpReduction: 25 };
    }

    function validate(settings, loader) {
        if (typeof settings.enabled !== 'boolean') return ['편의 설정 사용 여부를 다시 선택하세요.'];
        if (!settings.enabled) return [];
        const errors = [];
        if (loader !== 'valheimplus') errors.push('편의 설정에는 ValheimPlus가 필요합니다. 편의 설정을 다시 적용하거나 기존 설정 유지로 바꾸세요.');
        for (const field of fields) {
            const value = settings[field.key];
            if (field.type === 'boolean') {
                if (typeof value !== 'boolean') errors.push(`${field.label} 사용 여부를 다시 선택하세요.`);
            } else if (typeof value !== 'number' || !Number.isFinite(value) || value < field.min || value > field.max ||
                Math.abs(value / field.step - Math.round(value / field.step)) > 1e-7) {
                errors.push(`${field.label}: ${field.min}~${field.max} 범위에서 ${field.step} 단위로 입력하세요.`);
            }
        }
        return errors;
    }

    function environment(settings) {
        if (!settings.enabled) return {};
        const errors = validate(settings, 'valheimplus');
        if (errors.length) throw new Error(errors.join(' '));
        const env = {};
        const section = (name, values) => {
            for (const [key, value] of Object.entries(values)) env[`VPCFG_${name}_${key}`] = value;
        };
        const percent = multiplier => Math.round((multiplier - 1) * 100);
        section('ValheimPlus', { enabled: true });
        section('Server', { enabled: true, enforceMod: true, serverSyncsConfig: true, maxPlayers: settings.maxPlayers, disableServerPassword: settings.disableServerPassword });
        // Write false/defaults as well, so turning a feature off updates an existing server.
        section('Items', { enabled: settings.portalItems || settings.stackMultiplier !== 1,
            noTeleportPrevention: settings.portalItems, itemStackMultiplier: percent(settings.stackMultiplier) });
        section('Player', { enabled: settings.carryWeight !== 300, baseMaximumWeight: settings.carryWeight });
        section('CraftFromChest', { enabled: settings.craftFromChest, range: settings.chestRange, ignorePrivateAreaCheck: false });
        section('Stamina', { enabled: settings.runReduction !== 0 || settings.jumpReduction !== 0,
            runStaminaDrain: -settings.runReduction, jumpStaminaDrain: -settings.jumpReduction });
        section('Food', { enabled: settings.foodMultiplier !== 1 || settings.fullFoodEffect,
            foodDurationMultiplier: percent(settings.foodMultiplier), disableFoodDegradation: settings.fullFoodEffect });
        for (const name of ['Smelter', 'Furnace', 'Kiln']) {
            section(name, { enabled: settings.autoFuel || settings.autoDeposit, autoFuel: settings.autoFuel,
                autoDeposit: settings.autoDeposit, autoRange: settings.automationRange, ignorePrivateAreaCheck: false });
        }
        section('Kiln', { dontProcessFineWood: true, dontProcessRoundLog: true });
        section('Workbench', { enabled: settings.workbenchRange !== 20 || settings.noRoof,
            workbenchRange: settings.workbenchRange, disableRoofCheck: settings.noRoof });
        return env;
    }

    const api = { defaults, fields, preset, validate, environment };
    if (typeof module === 'object' && module.exports) module.exports = api;
    else root.ValheimQol = api;
})(typeof window === 'undefined' ? globalThis : window);
