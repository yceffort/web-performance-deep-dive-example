import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Footer 컴포넌트를 별도 청크로 분리
          'footer': ['./src/components/Footer.jsx']
        }
      }
    }
  }
})
