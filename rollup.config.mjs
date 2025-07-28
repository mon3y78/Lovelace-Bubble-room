import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs      from '@rollup/plugin-commonjs';

export default {
  input: 'src/bubble-room.js',
  output: {
    file: 'lovelace-bubble-room.js',
    format: 'esm',
    inlineDynamicImports: true,
  },
  // Escludi solo i componenti HA già nel frontend + built‑in Node
  external: id => (
    id.startsWith('home-assistant-frontend/src/components/') ||
    ['fs','path','module','url','util'].includes(id)
  ),
  plugins: [
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs({ transformMixedEsModules: true }),
  ],
};
