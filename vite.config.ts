import { fileURLToPath, URL } from 'node:url'

import { defineConfig, ConfigEnv, UserConfigExport, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default (({ command, mode }: ConfigEnv): UserConfigExport => {
  // 环境变量
  let env = loadEnv(mode, process.cwd())
  // 是否为生产环境
  let isProduction = mode === 'production'

  return defineConfig({
    base: env.VITE_BASE,
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      ElementPlus({
        useSource: true
      }),
    ],
    css: {
      preprocessorOptions: {
        stylus: {
          // 添加postcss插件
          // use: [autoprefixer({
          //     overrideBrowserslist: [
          //         "Android 4.1",
          //         "iOS 7.1",
          //         "Chrome > 31",
          //         "ff > 31",
          //         "ie >= 8",
          //         "last 10 versions", // 所有主流浏览器最近10版本用
          //     ],
          //     grid: true,
          // })]
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        // 将 `@import '~` 指向你的全局样式文件，这里假设为 src/styles/global.styl
        '~': fileURLToPath(new URL('./src/assets/stylus', import.meta.url)),
      }
    },
    server: {
      // host设置为true才可以使用network的形式，以ip访问项目
      host: true,
      // 端口号
      port: 8080,
      // 自动打开浏览器
      open: false,
      // 跨域设置允许
      cors: true,
      // 如果端口已占用直接退出
      strictPort: true,
      // 接口代理
      proxy: {
        '/workwxht': {
          target: 'http://192.168.1.101:9001',
          // 允许跨域
          changeOrigin: true,
          // 重写地址
          rewrite: (path) => path.replace('/workwxht/', '/')
        }
      }

    },
    build: {
      cssCodeSplit: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 500,
      // 在生产环境移除console.log
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        },
      },
      assetsDir: 'static/assets',
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          // 静态资源分拆打包
          manualChunks(id: any) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        },
      },
    },
    define: {
      'process.env': { ...env, isProduction }
    }
  })
})