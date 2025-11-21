import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 각 모듈을 개별 청크로 분리
        manualChunks: (id) => {
          if (id.includes('src/ui.js')) return 'ui';
          if (id.includes('src/utils/logger.js')) return 'logger';
          if (id.includes('src/utils/date.js')) return 'date';
          if (id.includes('src/chart')) return 'chart';
        }
      }
    }
  }
});
