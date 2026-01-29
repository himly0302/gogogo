/**
 * 日期时间工具函数
 */
import dayjs from 'dayjs';

/**
 * 获取今天的日期字符串 (YYYY-MM-DD)
 */
export const getToday = (): string => {
  return dayjs().format('YYYY-MM-DD');
};

/**
 * 检查是否是同一天
 */
export const isSameDay = (date1: string | number, date2: string | number): boolean => {
  return dayjs(date1).format('YYYY-MM-DD') === dayjs(date2).format('YYYY-MM-DD');
};

/**
 * 获取当前时间戳
 */
export const getNow = (): number => {
  return Date.now();
};

/**
 * 格式化时间
 */
export const formatTime = (timestamp: number, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  return dayjs(timestamp).format(format);
};
