import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
// vue-jsx 插件说明 https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md
import vueJsx from '@vitejs/plugin-vue-jsx'
// mockjs插件使用说明 https://github.com/anncwb/vite-plugin-mock/blob/main/README.zh_CN.md
// 首次运行错误可输入: node .\node_modules\vite-plugin-mock\node_modules\esbuild\install.js
import { viteMockServe } from 'vite-plugin-mock'
import { svgLoader } from './src/plugin/svg-loader'

// 官方文档 https://cn.vitejs.dev/config/
export default ({ command }) => {
  return {
    base: '/vite/',

    server: {
      port: 8008,
      open: true,
    },

    build: {
      brotliSize: false, // 禁用 brotli 压缩大小报告,以提高大型项目的构建性能。
    },

    plugins: [
      vue(),
      vueJsx({}),
      svgLoader('/src/icons/'),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && true,
        //  这样可以控制关闭mock的时候不让mock打包到最终代码内  默认注入为项目根目录下src/main.{ts,js}
        injectCode: `
          import { setupProdMockServer } from '/mock/mockProdServer';
          setupProdMockServer();
        `,
      }),
    ],

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 别名 `@` 指向 `src` 目录 PS:IDEA编辑器还是不能识别
        assets: '/src/assets',
        comp: '/src/components',
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/_variables";',
        },
      },
    },
  }
}
