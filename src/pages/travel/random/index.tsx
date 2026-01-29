/**
 * 随机选择页
 * 根据距离范围随机选择目的地
 */

import { FC } from 'react';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useLoad } from '@tarojs/taro';
import useTravelStore from '@/stores/travel';
import DistanceSlider from '@/components/DistanceSlider';
import './index.scss';

const TravelRandom: FC = () => {
  const {
    startCity,
    distanceRange,
    setDistanceRange,
    generateDestination,
    isLoading,
    error,
  } = useTravelStore();

  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '随机选择' });
  });

  const handleGenerate = async () => {
    try {
      await generateDestination();

      // 跳转到结果页
      Taro.navigateTo({ url: '/pages/travel/result/index' });
    } catch (err) {
      Taro.showToast({
        title: err instanceof Error ? err.message : '生成失败',
        icon: 'none',
      });
    }
  };

  return (
    <View className="travel-random">
      <ScrollView scrollY className="travel-random__scroll">
        {/* 出发城市 */}
        <View className="travel-random__section">
          <Text className="travel-random__label">出发城市</Text>
          <View className="travel-random__city">
            <Text className="travel-random__city-name">{startCity?.name}</Text>
          </View>
        </View>

        {/* 距离范围 */}
        <View className="travel-random__section">
          <Text className="travel-random__label">
            设置距离范围
            <Text className="travel-random__label-hint">
              选择你想去的距离范围
            </Text>
          </Text>
          <DistanceSlider
            value={distanceRange}
            onChange={setDistanceRange}
          />
        </View>

        {/* 说明 */}
        <View className="travel-random__hint">
          <Text className="travel-random__hint-icon">💡</Text>
          <Text className="travel-random__hint-text">
            系统将从符合距离范围的城市中随机选择一个作为目的地
          </Text>
        </View>

        {/* 错误提示 */}
        {error && (
          <View className="travel-random__error">
            <Text className="travel-random__error-text">{error}</Text>
          </View>
        )}
      </ScrollView>

      {/* 底部按钮 */}
      <View className="travel-random__footer">
        <Button
          className="travel-random__button"
          onClick={handleGenerate}
          disabled={isLoading}
        >
          {isLoading ? '生成中...' : '随机选择目的地'}
        </Button>
      </View>
    </View>
  );
};

export default TravelRandom;
