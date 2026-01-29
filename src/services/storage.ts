/**
 * 本地存储服务
 *
 * 封装 Taro.setStorageSync / Taro.getStorageSync
 * 提供类型安全的存储操作
 */
import Taro from '@tarojs/taro';

class StorageService {
  /**
   * 设置存储
   */
  set<T = any>(key: string, value: T): boolean {
    try {
      const data = typeof value === 'string' ? value : JSON.stringify(value);
      Taro.setStorageSync(key, data);
      return true;
    } catch (error) {
      console.error(`[Storage] Failed to set ${key}:`, error);
      return false;
    }
  }

  /**
   * 获取存储
   */
  get<T = any>(key: string, defaultValue?: T): T | null {
    try {
      const data = Taro.getStorageSync(key);
      if (!data) return defaultValue || null;

      // 尝试解析 JSON
      try {
        return JSON.parse(data) as T;
      } catch {
        return data as unknown as T;
      }
    } catch (error) {
      console.error(`[Storage] Failed to get ${key}:`, error);
      return defaultValue || null;
    }
  }

  /**
   * 移除存储
   */
  remove(key: string): boolean {
    try {
      Taro.removeStorageSync(key);
      return true;
    } catch (error) {
      console.error(`[Storage] Failed to remove ${key}:`, error);
      return false;
    }
  }

  /**
   * 清空所有存储
   */
  clear(): boolean {
    try {
      Taro.clearStorageSync();
      return true;
    } catch (error) {
      console.error('[Storage] Failed to clear storage:', error);
      return false;
    }
  }

  /**
   * 检查键是否存在
   */
  has(key: string): boolean {
    try {
      const data = Taro.getStorageSync(key);
      return data !== '' && data !== null && data !== undefined;
    } catch {
      return false;
    }
  }

  /**
   * 获取存储信息
   */
  async getInfo() {
    try {
      return await Taro.getStorageInfo();
    } catch (error) {
      console.error('[Storage] Failed to get storage info:', error);
      return null;
    }
  }
}

export default new StorageService();
