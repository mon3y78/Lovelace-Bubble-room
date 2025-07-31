import resolve  from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json     from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/bubble-room.js',
  output: {
    file:               'dist/lovelace-bubble-room.js',
    format:             'esm',
    inlineDynamicImports: true,
    sourcemap:          true,
  },
  // esternalizza SOLO i componenti core di HA
  external: id => {
    return id.startsWith('home-assistant-frontend/');
  },
  plugins: [
    // Risolvi tutto da node_modules
    resolve({
      browser:       true,
      preferBuiltins:false,
      mainFields:    ['module','jsnext:main','main'],
      extensions:    ['.js','.mjs','.json'],
      dedupe:        ['lit']
    }),
    commonjs(),   // trasforma eventuali CJS
    json(),       // per importare JSON
    terser(),     // minifica l’output (opzionale)
  ],
};
