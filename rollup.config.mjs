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
  external: [
    // escludi solo i componenti HA che sono già caricati globalmente
    'home-assistant-frontend/src/components/ha-entity-picker.js',
    'home-assistant-frontend/src/components/ha-expansion-panel.js',
    '@material/mwc-icon',
  ],
  plugins: [
    // risolve i pacchetti node_modules, inclusi lit e fitty
    nodeResolve({ browser: true }),
    // converte eventuali CommonJS (per es. fitty)
    commonjs(),
    // minimizza
    //terser(),
  ],
};
