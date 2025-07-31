// rollup.config.mjs
import resolve  from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json     from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/bubble-room.js',        // il tuo entry-point
  output: {
    file:               'lovelace-bubble-room.js',
    format:             'esm',
    inlineDynamicImports: true,
  },
  // esternalizza **solo** i componenti HA già inclusi a priori
  external: [
    'home-assistant-frontend/src/components/ha-entity-picker.js',
    'home-assistant-frontend/src/components/ha-expansion-panel.js',
  ],
  plugins: [
    // Risolve i bare-specifier nel node_modules
    resolve({
      browser:      true,
      preferBuiltins: false,
      mainFields:   ['module','jsnext:main','main'],
      extensions:   ['.js','.mjs','.json'],
      dedupe:       ['lit'],           // evita duplicati di lit
    }),
    commonjs(),   // converte eventuali CJS a ESM
    json(),       // risolve import .json
    terser(),     // minifica, facoltativo
  ],
};
