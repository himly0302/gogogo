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

/**
 * 旅行功能相关常量
 */
export const TRAVEL_STORAGE_KEYS = {
  ROUTE_HISTORY: 'travel_route_history',
  LAST_START_CITY: 'travel_last_start_city',
  LAST_TRAVEL_MODE: 'travel_last_mode',
} as const;

/**
 * 距离预设选项
 */
export const DISTANCE_PRESETS = [
  { label: '周边游', min: 0, max: 300 },
  { label: '短途游', min: 300, max: 800 },
  { label: '中途游', min: 800, max: 1500 },
  { label: '长途游', min: 1500, max: 3000 },
  { label: '远途游', min: 3000, max: 5000 },
] as const;

/**
 * 城市标签配置
 */
export const CITY_TAGS = {
  historical: { label: '历史文化', icon: '🏛️' },
  natural: { label: '自然风光', icon: '🏔️' },
  modern: { label: '现代都市', icon: '🏙️' },
  coastal: { label: '海滨城市', icon: '🏖️' },
  mountain: { label: '山地城市', icon: '⛰️' },
  food: { label: '美食之都', icon: '🍜' },
  art: { label: '艺术文化', icon: '🎨' },
  ancient: { label: '古镇古城', icon: '🏯' },
  ethnic: { label: '民族风情', icon: '🎭' },
  leisure: { label: '休闲度假', icon: '🌴' },
} as const;
