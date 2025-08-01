// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs        from '@rollup/plugin-commonjs';
import json            from '@rollup/plugin-json';

export default {
  input:  'src/bubble-room.js',
  output: {
    file:                 'lovelace-bubble-room.js',
    format:               'esm',
    inlineDynamicImports: true,
  },
  external: [
    // SOLO i componenti HA già caricati,
    // e i core Node che non vogliamo bundlare:
    'home-assistant-frontend/src/components/ha-entity-picker.js',
    'home-assistant-frontend/src/components/ha-expansion-panel.js',
    'fs', 'path', 'os', 'url', 'module', 'util', 'child_process',
  ],
  plugins: [
    json(),
    nodeResolve({
      browser: true,
      // ─── Deduplica Lit e tutto @material/web ─────────────────
      // così Rollup li *include una sola volta* nel bundle,
      // anziché lasciarli come import esterni.
      dedupe: ['lit', '@material/web'],
    }),
    commonjs(),
    // terser(),
  ],
};
