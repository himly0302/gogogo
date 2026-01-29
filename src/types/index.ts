/**
 * 通用类型定义
 */

/**
 * API 响应结构
 */
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

/**
 * 分页参数
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * 分页响应
 */
export interface PaginationResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * 加载状态
 */
export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * 通用状态
 */
export interface BaseState {
  isLoading: boolean;
  error: string | null;
}
