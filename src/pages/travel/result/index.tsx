/**
 * 结果展示页
 * 展示目的地并支持添加中途城市
 */

import { FC, useState } from 'react';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useLoad } from '@tarojs/taro';
import useTravelStore from '@/stores/travel';
import CityCard from '@/components/CityCard';
import WaypointList from '@/components/WaypointList';
import CityPicker from '@/components/CityPicker';
import { calculateDistance } from '@/utils/geo';
import type { City } from '@/types';
import './index.scss';

const TravelResult: FC = () => {
  const {
    startCity,
    destinationCity,
    waypointCities,
    addWaypointCity,
    removeWaypointCity,
    clearWaypoints,
    saveRoute,
    clearRoute,
  } = useTravelStore();


  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '目的地推荐' });
  });

  if (!startCity || !destinationCity) {
    return (
      <View className="travel-result">
        <View className="travel-result__empty">
          <Text className="travel-result__empty-text">暂无目的地</Text>
          <Button
            className="travel-result__back-button"
            onClick={() => Taro.navigateBack()}
          >
            返回
          </Button>
        </View>
      </View>
    );
  }

  // 计算距离
  const distance = calculateDistance(startCity, destinationCity);

  // 处理添加中途城市
  const handleAddWaypoint = (city: City) => {
    if (waypointCities.length >= 5) {
      Taro.showToast({
        title: '最多添加5个中途城市',
        icon: 'none',
      });
      return;
    }
    addWaypointCity(city);
    Taro.showToast({
      title: '添加成功',
      icon: 'success',
    });
  };

  // 处理保存并查看轨迹
  const handleSaveRoute = () => {
    saveRoute();
    Taro.navigateTo({ url: '/pages/travel/route/index' });
  };

  // 重新生成
  const handleRegenerate = () => {
    clearRoute();
    Taro.navigateBack();
  };

  return (
    <View className="travel-result">
      <ScrollView scrollY className="travel-result__scroll">
        {/* 目的地卡片 */}
        <CityCard city={destinationCity} distance={distance} />

        {/* 中途城市列表 */}
        <View className="travel-result__section">
          <View className="travel-result__section-header">
            <Text className="travel-result__section-title">中途城市</Text>
          </View>

          <WaypointList
            waypoints={waypointCities}
            onRemove={removeWaypointCity}
            onClear={clearWaypoints}
            max={5}
          />

          {waypointCities.length < 5 && <CityPicker onChange={handleAddWaypoint} placeholder="添加中途城市" />}
        </View>
      </ScrollView>

      {/* 底部按钮 */}
      <View className="travel-result__footer">
        <Button
          className="travel-result__secondary-button"
          onClick={handleRegenerate}
        >
          重新生成
        </Button>
        <Button className="travel-result__primary-button" onClick={handleSaveRoute}>
          查看旅行轨迹
        </Button>
      </View>
    </View>
  );
};

export default TravelResult;
