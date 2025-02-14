import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/bubble-room.js',
  output: {
    file: 'dist/lovelace-bubble-room.js',        // Genera il file bundle nella cartella "dist"
    format: 'esm',
    inlineDynamicImports: true
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    terser()
  ]
};
