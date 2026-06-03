import assert from 'node:assert/strict';
import { maybeAutoDiscover } from '../src/helpers/auto-discovery.js';

const baseHass = {
  states: {
    'binary_sensor.motion': { state: 'on', attributes: { device_class: 'motion' } },
    'binary_sensor.office_motion': { state: 'off', attributes: { device_class: 'motion' } },
    'sensor.temp': { state: '20', attributes: { device_class: 'temperature' } },
    'sensor.office_temp': { state: '19', attributes: { device_class: 'temperature' } },
    'light.lamp': { state: 'off', attributes: {} },
    'switch.fan': { state: 'off', attributes: {} },
    'climate.home': { state: 'heat', attributes: {} },
    'camera.front': { state: 'idle', attributes: {} },
  },
  entities: {
    'binary_sensor.motion': { area_id: 'living_room' },
    'sensor.temp': { area_id: 'living_room' },
    'light.lamp': { area_id: 'living_room' },
    'climate.home': { area_id: 'living_room' },
    'camera.front': { area_id: 'living_room' },
    'binary_sensor.office_motion': { area_id: 'office' },
    'sensor.office_temp': { area_id: 'office' },
    'switch.fan': { area_id: 'office' },
  },
};

function testNoCandidatesNoMutation() {
  const config = {
    auto_discovery_sections: { sensor: true, subbutton: true },
  };
  const result = maybeAutoDiscover({ states: {} }, config, undefined);
  assert.equal(result, config, 'empty autodiscovery should return the original config object');
}

function testAutofillAllEnabledSections() {
  const config = {
    auto_discovery_sections: {
      presence: true,
      sensor: true,
      mushroom: true,
      subbutton: true,
      climate: true,
      camera: true,
    },
  };

  const result = maybeAutoDiscover(baseHass, config, undefined);
  assert.equal(result.entities.presence.entity, 'binary_sensor.motion');
  assert.equal(result.entities.sensor1, undefined);
  assert.equal(result.entities.mushroom1.entity, 'binary_sensor.motion');
  assert.equal(result.entities.climate.entity, 'climate.home');
  assert.equal(result.entities.camera.entity, 'camera.front');
  assert.equal(result.subbuttons.length, 4);
  const subbuttonIds = result.subbuttons.map((item) => item.entity_id);
  assert.equal(new Set(subbuttonIds).size, subbuttonIds.length);
  assert.deepEqual(
    subbuttonIds,
    ['binary_sensor.motion', 'binary_sensor.office_motion', 'light.lamp', 'switch.fan'],
  );
}

function testPreservesExistingSelections() {
  const config = {
    auto_discovery_sections: {
      sensor: true,
      subbutton: true,
      climate: true,
    },
    entities: {
      sensor1: { entity: 'sensor.office_temp' },
      climate: { entity: 'climate.home', icon: 'mdi:thermostat' },
    },
    subbuttons: [{ entity_id: 'switch.fan', icon: 'mdi:fan' }],
  };

  const result = maybeAutoDiscover(baseHass, config, undefined);
  assert.equal(result.entities.sensor1.entity, 'sensor.office_temp');
  assert.equal(result.entities.climate.entity, 'climate.home');
  assert.equal(result.entities.climate.icon, 'mdi:thermostat');
  assert.equal(result.subbuttons[0].entity_id, 'switch.fan');
  assert.equal(result.subbuttons[0].icon, 'mdi:fan');
  assert.equal(new Set(result.subbuttons.map((item) => item.entity_id)).size, result.subbuttons.length);
}

function testAreaScopedAutofill() {
  const config = {
    area: 'office',
    area_id: 'office',
    auto_discovery_sections: {
      sensor: true,
      presence: true,
      subbutton: true,
    },
  };

  const result = maybeAutoDiscover(baseHass, config, 'area');
  assert.equal(result.entities.sensor1, undefined);
  assert.equal(result.entities.presence.entity, 'binary_sensor.office_motion');
  assert.equal(result.subbuttons[0].entity_id, 'binary_sensor.office_motion');
  assert.equal(result.subbuttons[1].entity_id, 'switch.fan');
}

testNoCandidatesNoMutation();
testAutofillAllEnabledSections();
testPreservesExistingSelections();
testAreaScopedAutofill();

console.log('auto-discovery tests passed');
