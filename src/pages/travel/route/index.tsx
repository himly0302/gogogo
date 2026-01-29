/**
 * 旅行轨迹展示页
 * 展示完整的旅行路线和历史记录
 */

import { FC, useState } from 'react';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useLoad } from '@tarojs/taro';
import useTravelStore from '@/stores/travel';
import RouteMap from '@/components/RouteMap';
import CityCard from '@/components/CityCard';
import { createRoute } from '@/services/travel';
import type { TravelRoute } from '@/types';
import './index.scss';

const TravelRoutePage: FC = () => {
  const { startCity, destinationCity, waypointCities, routeHistory, clearHistory } =
    useTravelStore();

  const [currentRoute, setCurrentRoute] = useState<TravelRoute | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '旅行轨迹' });

    // 如果有当前行程，创建轨迹
    if (startCity && destinationCity) {
      const route = createRoute(startCity, destinationCity, waypointCities);
      setCurrentRoute(route);
    }
  });

  // 查看历史记录
  const handleViewHistory = (route: TravelRoute) => {
    setCurrentRoute(route);
    setShowHistory(false);
  };

  // 返回首页
  const handleBackHome = () => {
    Taro.reLaunch({ url: '/pages/travel/index' });
  };

  return (
    <View className="travel-route">
      <ScrollView scrollY className="travel-route__scroll">
        {/* 当前轨迹 */}
        {currentRoute && (
          <View className="travel-route__section">
            <View className="travel-route__section-header">
              <Text className="travel-route__section-title">当前旅行轨迹</Text>
              <Button
                className="travel-route__history-button"
                onClick={() => setShowHistory(!showHistory)}
              >
                {showHistory ? '隐藏' : '历史'}
              </Button>
            </View>

            <RouteMap route={currentRoute} />

            {/* 城市详情 */}
            <View className="travel-route__cities">
              <CityCard city={currentRoute.startCity} />
              {currentRoute.waypointCities.map((city) => (
                <CityCard key={city.id} city={city} />
              ))}
              <CityCard city={currentRoute.destinationCity} />
            </View>
          </View>
        )}

        {/* 历史记录 */}
        {showHistory && (
          <View className="travel-route__section">
            <View className="travel-route__section-header">
              <Text className="travel-route__section-title">历史记录</Text>
              <Button
                className="travel-route__clear-button"
                onClick={() => {
                  Taro.showModal({
                    title: '确认清空',
                    content: '确定要清空所有历史记录吗？',
                    success: (res) => {
                      if (res.confirm) {
                        clearHistory();
                        Taro.showToast({ title: '已清空', icon: 'success' });
                      }
                    },
                  });
                }}
              >
                清空
              </Button>
            </View>

            {routeHistory.length > 0 ? (
              <View className="travel-route__history-list">
                {routeHistory.map((route) => (
                  <View
                    key={route.id}
                    className="travel-route__history-item"
                    onClick={() => handleViewHistory(route)}
                  >
                    <View className="travel-route__history-route">
                      <Text className="travel-route__history-city">
                        {route.startCity.name}
                      </Text>
                      <Text className="travel-route__history-arrow">→</Text>
                      {route.waypointCities.map((city) => (
                        <Text key={city.id} className="travel-route__history-city">
                          {city.name}
                        </Text>
                      ))}
                      <Text className="travel-route__history-arrow">→</Text>
                      <Text className="travel-route__history-city">
                        {route.destinationCity.name}
                      </Text>
                    </View>
                    <Text className="travel-route__history-date">
                      {new Date(route.createdAt).toLocaleString()}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View className="travel-route__empty">
                <Text className="travel-route__empty-text">暂无历史记录</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* 底部按钮 */}
      <View className="travel-route__footer">
        <Button className="travel-route__button" onClick={handleBackHome}>
          开始新的旅程
        </Button>
      </View>
    </View>
  );
};

export default TravelRoutePage;
