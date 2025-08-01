// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs        from '@rollup/plugin-commonjs';
import json            from '@rollup/plugin-json';

export default {
  input: 'src/bubble-room.js',
  output: {
    file:               'lovelace-bubble-room.js',
    format:             'esm',
    inlineDynamicImports: true,
  },
  external: [
    // escludi solo i componenti HA già presenti in frontend
    'home-assistant-frontend/src/components/ha-entity-picker.js',
    'home-assistant-frontend/src/components/ha-expansion-panel.js',
    'fs', 'path', 'os', 'url', 'module', 'util', 'child_process',
  ],
  plugins: [
    // Supporto per import .json
    json(),

    // Risolvi i node_modules; deduplica @material/web (e lit) così:
//                                         ──────────┬──────────                       
    nodeResolve({ browser: true, dedupe: ['@material/web', 'lit'] }),

    // Trasforma eventuali CJS in ESM
    commonjs(),

    // Se vuoi minimizzare il bundle, decommenta:
    // terser(),
  ],
};
