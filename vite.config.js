import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    vue(),

    createSvgIconsPlugin({
/* 指定需要缓存的图标文件夹:  @/assets/images/icons*/
      // eslint-disable-next-line no-undef
      iconDirs: [path.resolve(__dirname, 'src/assets/images/icons')],
      //或者：二选一
      // iconDirs: [path.resolve(process.cwd(), 'src/assets/images/icons')],
/* 指定symbolId格式
[dir] 代表图标所在的文件夹名称，[name] 代表图标的名称。
生成的 symbolId 将会包含图标的文件夹名称和图标的名称，用于在 SVG Sprite 中唯一标识一个图标 */
      symbolId: 'icon-[dir]-[name]'
    }),
    
  ],

  resolve: {
    alias: {
/* 作用就是：用 @ 符号来代替 src 目录*/
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

/* 
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, 'src/assets/images/icons')],
      symbolId: 'icon-[dir]-[name]'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
*/
