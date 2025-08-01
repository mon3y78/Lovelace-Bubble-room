// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs        from '@rollup/plugin-commonjs';
import json            from '@rollup/plugin-json';

export default {
  input: 'src/bubble-room.js',
  output: {
    file:                 'lovelace-bubble-room.js',
    format:               'esm',
    inlineDynamicImports: true,
  },
  external: [
    // modulI HA già presenti:
    'home-assistant-frontend/src/components/ha-entity-picker.js',
    'home-assistant-frontend/src/components/ha-expansion-panel.js',

    // ESCLUDI Material Web (non la tua card, ma i suoi moduli)
    '@material/web/chips/chip-set.js',
    '@material/web/chips/filter-chip.js',

    // altre “core” node:
    'fs', 'path', 'os', 'url', 'module', 'util', 'child_process',
  ],
  plugins: [
    json(),
    nodeResolve({ browser: true }),  // dedupe non serve più perché è esterno
    commonjs(),
    // terser(),
  ],
};
