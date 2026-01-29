/**
 * 常量配置
 */

/**
 * 本地存储键
 */
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'user_info',
  SETTINGS: 'settings'
} as const;

/**
 * API 端点
 */
export const API_ENDPOINTS = {
  // 认证
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',

  // 用户
  USER_INFO: '/user/info',
  USER_UPDATE: '/user/update',

  // 通用
  UPLOAD: '/upload'
} as const;

/**
 * 常用配置
 */
export const CONFIG = {
  // 分页
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,

  // 上传
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],

  // 缓存
  CACHE_EXPIRE_TIME: 30 * 60 * 1000 // 30分钟
} as const;
