import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd(), '')};

  return defineConfig({
    plugins: [react(),],
    server: {
      strictPort: true,
      hmr: {
        host: process.env.VITE_CLIENT_HOST,
        protocol: process.env.VITE_CLIENT_PROTOCOL
      },
      port: 3000,
      host: true
    }
  })
}