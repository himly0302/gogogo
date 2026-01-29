/**
 * API 服务模板
 *
 * 使用说明：
 * 1. 配置基础 URL 和拦截器
 * 2. 定义 API 接口方法
 * 3. 在组件或 store 中调用
 */
import Taro from '@tarojs/taro';

// 配置基础 URL
const BASE_URL = 'https://api.example.com';

// 请求拦截器
const requestInterceptor = (config: any) => {
  // 添加通用 headers
  config.header = {
    'Content-Type': 'application/json',
    ...config.header
  };

  // 添加 token
  const token = getToken();
  if (token) {
    config.header['Authorization'] = `Bearer ${token}`;
  }

  return config;
};

// 响应拦截器
const responseInterceptor = (response: any) => {
  const { statusCode, data } = response;

  if (statusCode >= 200 && statusCode < 300) {
    return data;
  }

  // 错误处理
  handleError(response);
  return Promise.reject(response);
};

// 获取 Token
const getToken = (): string | null => {
  try {
    return Taro.getStorageSync('token') || null;
  } catch {
    return null;
  }
};

// 错误处理
const handleError = (error: any) => {
  console.error('API Error:', error);

  switch (error.statusCode) {
    case 401:
      // 未授权，跳转登录
      Taro.showToast({ title: '请先登录', icon: 'none' });
      break;
    case 403:
      Taro.showToast({ title: '无权限访问', icon: 'none' });
      break;
    case 404:
      Taro.showToast({ title: '请求资源不存在', icon: 'none' });
      break;
    case 500:
      Taro.showToast({ title: '服务器错误', icon: 'none' });
      break;
    default:
      Taro.showToast({ title: '网络请求失败', icon: 'none' });
  }
};

// 通用请求方法
const request = async <T = any>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
): Promise<T> => {
  const config = {
    url: `${BASE_URL}${url}`,
    method,
    data,
    header: {}
  };

  const interceptedConfig = requestInterceptor(config);

  try {
    const response = await Taro.request(interceptedConfig);
    return responseInterceptor(response);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// API 接口方法示例
const api = {
  // GET 请求
  get: <T = any>(url: string, data?: any): Promise<T> => {
    return request<T>(url, 'GET', data);
  },

  // POST 请求
  post: <T = any>(url: string, data?: any): Promise<T> => {
    return request<T>(url, 'POST', data);
  },

  // PUT 请求
  put: <T = any>(url: string, data?: any): Promise<T> => {
    return request<T>(url, 'PUT', data);
  },

  // DELETE 请求
  delete: <T = any>(url: string, data?: any): Promise<T> => {
    return request<T>(url, 'DELETE', data);
  }
};

export default api;
