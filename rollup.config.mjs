// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs        from '@rollup/plugin-commonjs';
import json            from '@rollup/plugin-json';
// import { terser }    from 'rollup-plugin-terser';  // riattiva se vuoi minimizzare

export default {
  input: 'src/bubble-room.js',
  output: {
    file: 'lovelace-bubble-room.js',
    format: 'esm',
    inlineDynamicImports: true,
  },
  external: [
    // escludi solo i componenti HA già caricati globalmente
    'home-assistant-frontend/src/components/ha-entity-picker.js',
    'home-assistant-frontend/src/components/ha-expansion-panel.js',
  ],
  plugins: [
    // risolve lit, fitty, @material e i tuoi helper locali
    nodeResolve({ browser: true, preferBuiltins: false }),
    json(),
    commonjs(),
  ],
};
