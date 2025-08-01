import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/bubble-room.js',
  output: {
    file: 'lovelace-bubble-room.js',
    format: 'esm',
    inlineDynamicImports: true,
    sourcemap: true,
  },
  external: [
    // i soli componenti HA già caricati globalmente
    'home-assistant-frontend/src/components/ha-entity-picker.js',
    'home-assistant-frontend/src/components/ha-expansion-panel.js',
  ],
  plugins: [
    json(),
    nodeResolve({
      browser: true,
      // evita di includere più volte Lit e Material Web
      dedupe: ['lit', '@material/web'],
    }),
    commonjs(),
    terser(), // opzionale: minimizza il bundle per produzione
  ],
};