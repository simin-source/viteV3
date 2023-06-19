import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver, AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { createStyleImportPlugin, ElementPlusResolve, } from 'vite-plugin-style-import';
import ElementPlus from 'unplugin-element-plus/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ElementPlus(),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name: string) => {
            return `element-plus/theme-chalk/${name}.css`
          },
        },
      ]
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: 'src/auto-imports.d.ts',
      imports: [
        'vue',
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver(), AntDesignVueResolver({ importStyle: 'less' })],
      dts: 'src/components.d.ts',
    }),
  ],
  css:{
    preprocessorOptions:{
      less:{
        modifyVars: { // 在这里自定义主题色等样式
          'primary-color': '#1da57a',
          'link-color': '#1da57a',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true,
      }
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: 'import { h } from \'vue\';',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
  },
});
