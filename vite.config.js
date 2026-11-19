import { defineConfig } from 'vite'
import plugin from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    base: '/PresyoCheck_DEV/',
    server: {
        port: 58232,
    }
})