/**
 * 示例 Hook - 自定义 Hook 模板
 *
 * 使用说明：
 * 1. 复制此文件创建新的 hook
 * 2. 根据功能需求实现逻辑
 * 3. 在组件中使用: const { value, onChange } = useExample();
 */
import { useState, useCallback, useEffect } from 'react';

interface UseExampleOptions {
  initialValue?: any;
  onChange?: (value: any) => void;
}

export const useExample = (options: UseExampleOptions = {}) => {
  const { initialValue = '', onChange } = options;
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  // 示例方法
  const updateValue = useCallback((newValue: any) => {
    setValue(newValue);
    onChange?.(newValue);
  }, [onChange]);

  // 示例异步操作
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: 实现数据获取逻辑
      // const response = await api.get('/data');
      // updateValue(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 清理副作用
  useEffect(() => {
    return () => {
      // TODO: 清理逻辑（如取消请求、清除定时器等）
    };
  }, []);

  return {
    value,
    setValue: updateValue,
    isLoading,
    fetchData
  };
};
