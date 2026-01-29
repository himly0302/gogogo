/**
 * 设备信息工具函数
 */
import Taro from '@tarojs/taro';

/**
 * 获取系统信息
 */
export const getSystemInfo = () => {
  try {
    return Taro.getSystemInfoSync();
  } catch (error) {
    console.error('Failed to get system info:', error);
    return null;
  }
};

/**
 * 获取网络类型
 */
export const getNetworkType = async (): Promise<string> => {
  try {
    const { networkType } = await Taro.getNetworkType();
    return networkType;
  } catch (error) {
    console.error('Failed to get network type:', error);
    return 'unknown';
  }
};

/**
 * rpx 转 px
 */
export const rpx2px = (rpx: number): number => {
  const systemInfo = getSystemInfo();
  if (!systemInfo) return rpx;
  return (rpx * systemInfo.windowWidth) / 750;
};
