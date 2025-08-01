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
    // escludi i moduli HA già caricati
    'home-assistant-frontend/src/components/ha-entity-picker.js',
    'home-assistant-frontend/src/components/ha-expansion-panel.js',
    // evitiamo di bundle @material/web
    '@material/web/chips/chip-set.js',
    '@material/web/chips/filter-chip.js',
    // core node
    'fs', 'path', 'os', 'url', 'module', 'util', 'child_process',
  ],
  plugins: [
    json(),
    nodeResolve({ browser: true }), // non deduplichiamo più material
    commonjs(),
    // terser(),
  ],
};
