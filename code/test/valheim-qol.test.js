const assert = require('node:assert/strict');
const test = require('node:test');
const qol = require('../valheim-qol.js');

test('convenience values use ValheimPlus percentage modifiers and exact config keys', () => {
    const env = qol.environment({ ...qol.preset(), foodMultiplier: 2.5, fullFoodEffect: true,
        autoFuel: true, autoDeposit: true, automationRange: 15, workbenchRange: 40, noRoof: true });
    assert.equal(env.VPCFG_Items_noTeleportPrevention, true);
    assert.equal(env.VPCFG_Items_itemStackMultiplier, 100);
    assert.equal(env.VPCFG_Player_baseMaximumWeight, 600);
    assert.equal(env.VPCFG_CraftFromChest_enabled, true);
    assert.equal(env.VPCFG_Food_foodDurationMultiplier, 150);
    assert.equal(env.VPCFG_Food_disableFoodDegradation, true);
    assert.equal(env.VPCFG_Stamina_runStaminaDrain, -25);
    assert.equal(env.VPCFG_Stamina_jumpStaminaDrain, -25);
    for (const section of ['Smelter', 'Furnace', 'Kiln']) {
        assert.equal(env[`VPCFG_${section}_enabled`], true);
        assert.equal(env[`VPCFG_${section}_autoFuel`], true);
        assert.equal(env[`VPCFG_${section}_autoDeposit`], true);
        assert.equal(env[`VPCFG_${section}_autoRange`], 15);
        assert.equal(env[`VPCFG_${section}_ignorePrivateAreaCheck`], false);
    }
    assert.equal(env.VPCFG_Kiln_dontProcessFineWood, true);
    assert.equal(env.VPCFG_Workbench_workbenchRange, 40);
    assert.equal(env.VPCFG_Workbench_disableRoofCheck, true);
    assert.equal(env.VPCFG_Server_enforceMod, true);
    assert.equal(env.VPCFG_Server_serverSyncsConfig, true);
});

test('defaults explicitly turn off previously applied features, keep mode emits nothing', () => {
    assert.deepEqual(qol.environment(qol.defaults), {});
    const env = qol.environment({ ...qol.defaults, enabled: true });
    assert.equal(env.VPCFG_Items_noTeleportPrevention, false);
    assert.equal(env.VPCFG_Items_itemStackMultiplier, 0);
    assert.equal(env.VPCFG_Player_baseMaximumWeight, 300);
    assert.equal(env.VPCFG_Smelter_autoFuel, false);
    assert.equal(env.VPCFG_Food_foodDurationMultiplier, 0);
    for (const section of ['Items', 'Player', 'CraftFromChest', 'Stamina', 'Food', 'Smelter', 'Furnace', 'Kiln', 'Workbench']) {
        assert.equal(env[`VPCFG_${section}_enabled`], false);
    }
});

test('convenience inputs reject invalid types, range, precision and wrong loader', () => {
    assert.deepEqual(qol.validate(qol.preset(), 'valheimplus'), []);
    assert.match(qol.validate(qol.preset(), 'bepinex').join(), /ValheimPlus/);
    for (const [key, value] of [['carryWeight', null], ['carryWeight', '600'], ['portalItems', 'false'],
        ['stackMultiplier', 1.23], ['foodMultiplier', Infinity], ['chestRange', 0], ['runReduction', 101], ['jumpReduction', -1]]) {
        assert.ok(qol.validate({ ...qol.preset(), [key]: value }, 'valheimplus').length, key);
    }
    assert.equal(qol.environment({ ...qol.preset(), stackMultiplier: 1.1 }).VPCFG_Items_itemStackMultiplier, 10);
});
