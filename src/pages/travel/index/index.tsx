/**
 * 旅行首页
 * 选择出发城市和旅行模式
 */

import { FC, useEffect } from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useLoad } from '@tarojs/taro';
import useTravelStore from '@/stores/travel';
import CityPicker from '@/components/CityPicker';
import './index.scss';

const TravelIndex: FC = () => {
  const { startCity, setStartCity, setTravelMode, loadRouteHistory } =
    useTravelStore();

  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '随机城市旅行' });
    loadRouteHistory();
  });

  const handleModeSelect = (mode: 'smart' | 'random') => {
    if (!startCity) {
      Taro.showToast({
        title: '请先选择出发城市',
        icon: 'none',
      });
      return;
    }

    setTravelMode(mode);

    // 跳转到对应的页面
    if (mode === 'smart') {
      Taro.navigateTo({ url: '/pages/travel/smart/index' });
    } else {
      Taro.navigateTo({ url: '/pages/travel/random/index' });
    }
  };

  const handleHistoryClick = () => {
    Taro.navigateTo({ url: '/pages/travel/route/index' });
  };

  return (
    <View className="travel-index">
      {/* 头部 */}
      <View className="travel-index__header">
        <Text className="travel-index__title">开始你的旅程</Text>
        <Text className="travel-index__subtitle">
          随机发现中国美丽城市
        </Text>
      </View>

      {/* 出发城市选择 */}
      <View className="travel-index__section">
        <Text className="travel-index__section-title">选择出发城市</Text>
        <CityPicker
          value={startCity || undefined}
          onChange={setStartCity}
          placeholder="点击选择出发城市"
        />
      </View>

      {/* 旅行模式选择 */}
      <View className="travel-index__section">
        <Text className="travel-index__section-title">选择旅行模式</Text>

        <View className="travel-index__modes">
          <View
            className="travel-index__mode"
            onClick={() => handleModeSelect('smart')}
          >
            <View className="travel-index__mode-icon">🎯</View>
            <Text className="travel-index__mode-title">智能推荐</Text>
            <Text className="travel-index__mode-desc">
              根据你的兴趣推荐目的地
            </Text>
          </View>

          <View
            className="travel-index__mode"
            onClick={() => handleModeSelect('random')}
          >
            <View className="travel-index__mode-icon">🎲</View>
            <Text className="travel-index__mode-title">随机选择</Text>
            <Text className="travel-index__mode-desc">
              根据距离随机探索城市
            </Text>
          </View>
        </View>
      </View>

      {/* 历史记录 */}
      <View className="travel-index__section">
        <View className="travel-index__history" onClick={handleHistoryClick}>
          <Text className="travel-index__history-text">查看历史记录</Text>
          <Text className="travel-index__history-arrow">›</Text>
        </View>
      </View>
    </View>
  );
};

export default TravelIndex;
