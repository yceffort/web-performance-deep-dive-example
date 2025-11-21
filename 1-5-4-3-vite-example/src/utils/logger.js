// utils/logger.js - 로깅 유틸리티
import { formatDate } from './date.js';

export const logger = {
  info(message) {
    console.log(`[INFO ${formatDate(new Date())}] ${message}`);
  },
  error(message, error) {
    console.error(`[ERROR ${formatDate(new Date())}] ${message}`, error);
  }
};
