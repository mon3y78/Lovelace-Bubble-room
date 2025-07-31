// rollup.config.mjs
import resolve  from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// …

export default {
  input: 'src/bubble-room.js',
  output: {
    file: 'dist/lovelace-bubble-room.js',
    format: 'esm',
    inlineDynamicImports: true,
  },
  // esternalizza solo i componenti HA core:
  external: id => id.startsWith('home-assistant-frontend/'),
  plugins: [
    resolve({ browser: true, preferBuiltins: false, dedupe: ['lit'] }),
    commonjs(),
    // …
  ],
};
