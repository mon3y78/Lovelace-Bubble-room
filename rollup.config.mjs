import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs      from '@rollup/plugin-commonjs';

export default {
  input: 'src/bubble-room.js',
  output: {
    file: 'lovelace-bubble-room.js',
    format: 'esm',
    inlineDynamicImports: true
  },
  external: id =>
    // escludi solo i componenti Home Assistant già presenti nel frontend
    id.startsWith('home-assistant-frontend/src/components/') ||
    // escludi eventuali altri moduli che vuoi caricare direttamente da CDN o frontend
    id === '@material/mwc-icon',
  plugins: [
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs()
  ]
};
