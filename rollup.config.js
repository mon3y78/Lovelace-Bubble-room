import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/bubble-room.js',
  output: {
    file: 'dist/lovelace-bubble-room.js',        // Genera tutti i file bundle nella cartella "dist"
    format: 'esm',
    // Se preferisci un unico file bundle, scommenta la riga seguente:
    inlineDynamicImports: true
  },
  plugins: [
    resolve(),
    commonjs(),
    terser()
  ]
};