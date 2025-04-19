import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs        from '@rollup/plugin-commonjs';
import { terser }      from 'rollup-plugin-terser';

export default {
  input: 'src/bubble-room.js',
  output: {
    file: 'lovelace-bubble-room.js',  // singolo file
    format: 'esm',
    inlineDynamicImports: true       // <— serve per "inserire" i dynamic import nello stesso bundle
  },
  external: [
    // HA components
    'home-assistant-frontend/src/components/ha-entity-picker.js',
    'home-assistant-frontend/src/components/ha-expansion-panel.js',
    // lit & directive
    'lit',
    'lit/directives/style-map.js',
    // fitty
    'fitty',
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    terser(),
  ]
};
