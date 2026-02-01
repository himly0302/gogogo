/**
 * 旅行轨迹地图组件
 */

import { FC, useEffect, useRef } from 'react';
import { View, Canvas, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import type { TravelRoute } from '@/types';
import { formatDistance } from '@/utils/geo';
import './index.scss';

interface RouteMapProps {
  route: TravelRoute;
}

const RouteMap: FC<RouteMapProps> = ({ route }) => {
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const query = Taro.createSelectorQuery();
    query
      .select('#route-map-canvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0]) return;

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        // 设置画布大小
        const dpr = Taro.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);

        // 绘制路线
        drawRoute(ctx, route, res[0].width, res[0].height);
      });
  }, [route]);

  const drawRoute = (
    ctx: any,
    routeData: TravelRoute,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    // 构建城市列表
    const cities = [routeData.startCity, ...routeData.waypointCities, routeData.destinationCity];

    if (cities.length === 0) return;

    // 计算边距和可用区域
    const padding = 60;
    const availableWidth = canvasWidth - padding * 2;
    const availableHeight = canvasHeight - padding * 2;

    // 找到经纬度的最大最小值
    const minLat = Math.min(...cities.map((c) => c.latitude));
    const maxLat = Math.max(...cities.map((c) => c.latitude));
    const minLon = Math.min(...cities.map((c) => c.longitude));
    const maxLon = Math.max(...cities.map((c) => c.longitude));

    // 计算每个城市的坐标
    const points = cities.map((city) => {
      const x =
        padding +
        ((city.longitude - minLon) / (maxLon - minLon || 1)) * availableWidth;
      const y =
        padding +
        ((city.latitude - minLat) / (maxLat - minLat || 1)) * availableHeight;
      return { x, y, city };
    });

    // 绘制路线
    ctx.beginPath();
    ctx.strokeStyle = '#1890ff';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);

    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });

    ctx.stroke();
    ctx.setLineDash([]);

    // 绘制城市点
    points.forEach((point, index) => {
      // 起点和终点用大圆点
      if (index === 0 || index === points.length - 1) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = index === 0 ? '#52c41a' : '#ff4d4f';
        ctx.fill();
      } else {
        // 中途城市用小圆点
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#1890ff';
        ctx.fill();
      }

      // 绘制城市名称
      ctx.font = '24px sans-serif';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.fillText(point.city.name, point.x, point.y - 15);
    });
  };

  // 构建城市列表
  const cities = [route.startCity, ...route.waypointCities, route.destinationCity];

  return (
    <View className='route-map'>
      <Canvas
        id='route-map-canvas'
        ref={canvasRef}
        type='2d'
        className='route-map__canvas'
      />

      {/* 路线信息 */}
      <View className='route-map__info'>
        <Text className='route-map__total-distance'>
          总距离：{formatDistance(route.totalDistance)}
        </Text>
        <Text className='route-map__city-count'>
          途经 {cities.length} 个城市
        </Text>
      </View>

      {/* 城市列表 */}
      <View className='route-map__cities'>
        {cities.map((city, index) => (
          <View key={city.id} className='route-map__city-item'>
            <View className={`route-map__city-badge route-map__city-badge--${index === 0 ? 'start' : index === cities.length - 1 ? 'end' : 'waypoint'}`}>
              <Text className='route-map__city-badge-text'>
                {index === 0 ? '起' : index === cities.length - 1 ? '终' : index}
              </Text>
            </View>
            <Text className='route-map__city-name'>{city.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RouteMap;
