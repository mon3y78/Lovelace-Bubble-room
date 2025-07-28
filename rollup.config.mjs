import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs      from '@rollup/plugin-commonjs';
import json          from '@rollup/plugin-json';
import { builtinModules } from 'module';

export default {
  input: 'src/bubble-room.js',
  output: {
    file: 'lovelace-bubble-room.js',
    format: 'esm',
    inlineDynamicImports: true,
    sourcemap: true,
  },
  external: id => {
    // 1) Componenti HASS già globali
    if (id.startsWith('home-assistant-frontend/src/components/')) return true;
    // 2) @material/mwc-icon
    if (id === '@material/mwc-icon') return true;
    // 3) Tutti i built‑in di Node
    return false;
  },
  plugins: [
    json(),
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs(),
  ],
};
