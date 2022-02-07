import path from 'path'
import pkg from './package.json'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { svgLoader } from './src/plugin/svgLoader'
import { mockServe } from './src/plugin/mockServe'

const { dependencies, devDependencies, name, version } = pkg

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: new Date().toLocaleString(),
}

// 官方文档 https://cn.vitejs.dev/config/
export default ({ command }) => {
  return {
    base: '/admin/', // 可被命令行参数 --base=/xxx/ 覆盖

    server: {
      port: 8008,
      open: true,
      // 关于本地反向代理解决跨域
      // 戳文档：https://cn.vitejs.dev/config/#server-proxy
    },

    build: {
      brotliSize: false, // 禁用 brotli 压缩大小报告,以提高大型项目的构建性能。
    },

    plugins: [
      vue(),
      vueJsx(), // 文档 https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md
      svgLoader('/src/icons/'),
      mockServe(command),
    ],

    resolve: {
      alias: {
        // 别名 `@` 指向 `src` 目录 PS:IDEA编辑器还是不能识别
        '@': path.resolve(__dirname, 'src'),
        assets: '/src/assets',
        comp: '/src/components',
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/styles/_variables";
          `,
        },
      },
    },
    // 定义全局常量替换方式,其中每项在开发环境下会被定义在全局，而在构建时被静态替换
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  }
}
