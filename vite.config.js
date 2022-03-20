import path from 'path'
import dayjs from 'dayjs'
import pkg from './package.json'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { mockServe } from './src/plugin/mockServe'
import { createSVGSprites } from './src/plugin/createSVGSprites'

const { dependencies, devDependencies, name, version } = pkg

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format(),
}

const libNameReg = /\/node_modules\/([^/]+)\//

const manualChunks = (id) => {
  if (libNameReg.test(id.toString())) {
    const libName = RegExp.$1
    switch (libName) {
      case '@vue':
      case 'echarts':
      case '@popperjs':
      case 'mavon-editor':
      case 'element-plus':
      case '@element-plus':
        return '_' + libName
      default:
        return '__vendor'
    }
  }
}

// 官方文档 https://cn.vitejs.dev/config/
export default ({ command }) => {
  return {
    base: '/admin/', // 可被命令行参数 --base=/xxx/ 覆盖

    server: {
      port: 8008,
      open: true,
      // 关于本地反向代理解决跨域 戳文档：https://cn.vitejs.dev/config/#server-proxy
    },

    build: {
      reportCompressedSize: false, // 禁用 压缩大小报告,以提高大型项目的构建性能。
      // https://www.zhihu.com/question/518443897/answer/2397938046
      rollupOptions: { manualChunks },
    },

    plugins: [
      vue(),
      vueJsx(), // 文档 https://github.com/vuejs/babel-plugin-jsx/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md
      mockServe(command),
      createSVGSprites(),
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
            @import "/src/styles/_variables";
          `,
        },
      },

      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              // 去除 warning: "@charset" must be the first rule in the file
              charset: (atRule) => atRule.name === 'charset' && atRule.remove(),
            },
          },
        ],
      },
    },

    // 定义全局常量替换方式,其中每项在开发环境下会被定义在全局，而在构建时被静态替换
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  }
}
