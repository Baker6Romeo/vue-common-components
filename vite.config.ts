// Plugins
import vue from '@vitejs/plugin-vue'
import typescript2 from 'rollup-plugin-typescript2'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'

// Utilities
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      formats: ['es', 'cjs'],
      name: 'CommonComponents',
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['vue', 'vuetify/lib'],
      output: {
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify',
          'vuetify/components': 'VuetifyComponents',
          'vuetify/directives': 'VuetifyDirectives'
        },
      },
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
    vuetify({autoImport: true}),
    // Must come after vue stuff or bad things happen
    typescript2({
      check: false,
      include: ['src/components/**/*.vue'],
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationMap: true,
          sourceMap: true,
        },
      },
      exclude: ['vite.config.ts'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
