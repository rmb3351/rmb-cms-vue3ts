import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
// element自动按需导入配置
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
      views: resolve('src/views'),
      components: resolve('src/components'),
      assets: resolve('src/assets'),
      store: resolve('src/store'),
      service: resolve('src/service')
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        // 导入这个文件里的全局less变量
        additionalData: '@import "./src/assets/css/global.less";'
      }
    }
  }
});
