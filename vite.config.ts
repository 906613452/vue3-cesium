import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  envDir: 'configs',
  plugins: [vue(),cesium()],
  server: {
    host: '0.0.0.0', // 这个用于启动
    port: 8092, // 指定启动端口
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    commonjsOptions: {
      strictRequires: true, // 兼容commonjs
    },
  },
})
