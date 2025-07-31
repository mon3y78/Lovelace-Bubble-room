// rollup.config.mjs
import resolve    from '@rollup/plugin-node-resolve';
import commonjs   from '@rollup/plugin-commonjs';
import json       from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input:  'src/bubble-room.js',
  output: {
    file:                'lovelace-bubble-room.js',
    format:              'esm',
    inlineDynamicImports:true,
  },
  // escludi SOLO i moduli HA che NON vuoi bundle-are
  external: [
    'home-assistant-frontend/src/components/ha-entity-picker.js',
    'home-assistant-frontend/src/components/ha-expansion-panel.js',
    // …e i built-in Node che non servono in browser…
    'fs','path','os','url','module','util','child_process',
  ],
  plugins: [
    json(),
    resolve({
      browser:      true,
      preferBuiltins:false,
      extensions:   ['.js','.mjs','.json'],
      mainFields:   ['module','jsnext:main','main'],
    }),
    commonjs(),
    // terser(), // se vuoi minificare
  ],
};
