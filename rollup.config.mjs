import resolve  from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json     from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/bubble-room.js',
  output: {
    file:   'lovelace-bubble-room.js',
    format: 'esm',
    inlineDynamicImports: true,
    sourcemap: false,
  },
  //  ⇣  SEGNA COME ESTERNI tutti i path che iniziano con "@material/web/"
  external: id =>
    id.startsWith('@material/web/') ||
    id.startsWith('home-assistant-frontend/'),
  plugins: [
    json(),
    resolve({
      browser: true,
      preferBuiltins: false,
      dedupe: ['lit'],          // evita doppie copie di lit
    }),
    commonjs(),
    terser(),                   // facoltativo
  ],
};
