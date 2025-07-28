// rollup.config.js
import { nodeResolve }  from '@rollup/plugin-node-resolve';
import commonjs         from '@rollup/plugin-commonjs';
import { terser }       from 'rollup-plugin-terser';


export default {
  input: 'src/bubble-room.js',
  output: {
    // genera un unico bundle
    file: 'lovelace-bubble-room.js',
    format: 'esm',
    // inietta dentro questo file TUTTI i vostri import(...) dinamici
    inlineDynamicImports: true,
  },
  external: id => (
    id.startsWith('home-assistant-frontend/src/components/') ||
    id === '@material/mwc-icon'
  ),
  plugins: [
    // risolve lit, fitty, e tutti i tuoi helper locali
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs(),
  ],
};
