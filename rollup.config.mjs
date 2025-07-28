// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs      from '@rollup/plugin-commonjs';
import alias         from '@rollup/plugin-alias';
import path          from 'path';
// import { terser }    from 'rollup-plugin-terser'; // abilita in produzione

export default {
  input: 'src/bubble-room.js',
  output: {
    file: 'lovelace-bubble-room.js',
    format: 'esm',
    inlineDynamicImports: true,
  },
  // Escludi solo i componenti Home Assistant già forniti globalmente
  external: id =>
    id.startsWith('home-assistant-frontend/src/components/'),
  plugins: [
    // Permette di risolvere @material e lit dalla cartella node_modules
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    // Trasforma eventuali CommonJS dei tuoi moduli o delle dipendenze
    commonjs(),

    // Opzionale: mappa gli alias se usi percorsi personalizzati
    alias({
      entries: [
        { find: '@helpers', replacement: path.resolve(__dirname, 'src/helpers') },
        { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      ]
    }),

    // Minifica in produzione
    // terser(),
  ],
};
