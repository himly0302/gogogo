/**
 * 环境配置
 */
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const API_BASE_URL = process.env.API_BASE_URL || 'https://api.example.com';
export const CDN_BASE_URL = process.env.CDN_BASE_URL || 'https://cdn.example.com';
