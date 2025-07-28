import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs        from '@rollup/plugin-commonjs';
import json            from '@rollup/plugin-json';
import { terser }      from 'rollup-plugin-terser';

export default {
  input: 'src/bubble-room.js',
  output: {
    // Un unico file ESM con dentro tutti i dynamic import
    file: 'lovelace-bubble-room.js',
    format: 'esm',
    inlineDynamicImports: true,
  },
  // Escludi solo i componenti HA già presenti nel frontend
  external: [
    'home-assistant-frontend/src/components/ha-entity-picker.js',
    'home-assistant-frontend/src/components/ha-expansion-panel.js',
  ],
  plugins: [
    // 1) Risolve lit, fitty e i tuoi helper locali
    nodeResolve({ browser: true }),
    // 2) Permette di importare JSON da node_modules
    json(),
    // 3) Converte ogni CommonJS in ESM (incluso picomatch, source‑map codec, ecc.)
    commonjs({
      include: /node_modules/,
      transformMixedEsModules: true,
    }),
    // 4) (Opzionale) minimizza l’output
    // terser(),
  ],
};
