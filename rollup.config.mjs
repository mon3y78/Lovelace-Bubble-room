import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/bubble-room.js',
  output: {
    file: 'lovelace-bubble-room.js',        // Genera il file bundle nella cartella "dist"
    format: 'esm',
    inlineDynamicImports: true
  },
  external: [
    'home-assistant-frontend/src/components/ha-entity-picker.js',
    'home-assistant-frontend/src/components/ha-expansion-panel.js',
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    terser()
  ]
};
