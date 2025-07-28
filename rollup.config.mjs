import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs      from '@rollup/plugin-commonjs';

export default {
  input: 'src/bubble-room.js',
  output: {
    file: 'lovelace-bubble-room.js',
    format: 'esm',
    inlineDynamicImports: true,
  },
  // Esternalizziamo solo i componenti Home Assistant (già caricati) e @material/mwc-icon
  external: id =>
    id.startsWith('home-assistant-frontend/src/components/') ||
    id === '@material/mwc-icon',

  plugins: [
    // 1) risolve lit, fitty, i tuoi helper locali
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    // 2) converte solo il tuo codice CommonJS (esclude node_modules)
    commonjs({
      include: 'src/**',
      exclude: 'node_modules/**',
    }),
  ],
};
