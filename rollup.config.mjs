import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs      from '@rollup/plugin-commonjs';

export default {
  input: 'src/bubble-room.js',
  output: {
    file: 'lovelace-bubble-room.js',
    format: 'esm',
    inlineDynamicImports: true,
  },
  // escludi SOLO i componenti HA già nel frontend
  external: id => (
    id.startsWith('home-assistant-frontend/src/components/')
  ),
  plugins: [
    // risolve lit, fitty, @material e i tuoi helper locali
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs(),
  ],
};
