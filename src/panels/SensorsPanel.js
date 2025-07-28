// rollup.config.mjs
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs      from '@rollup/plugin-commonjs';

export default {
  input: 'src/bubble-room.js',
  output: {
    file: 'lovelace-bubble-room.js',
    format: 'esm',
    inlineDynamicImports: true,
  },
  external: id => (
    id.startsWith('home-assistant-frontend/src/components/') ||
    id === '@material/mwc-icon'
  ),
  plugins: [
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs(),
  ],
};
