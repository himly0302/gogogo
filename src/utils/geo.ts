/**
 * 地理计算相关工具函数
 */

import type { City, CityTag, DistanceRange, CityFilterOptions } from '@/types';

/**
 * 地球半径（公里）
 */
const EARTH_RADIUS = 6371;

/**
 * 使用 Haversine 公式计算两个城市之间的距离
 * @param city1 城市1
 * @param city2 城市2
 * @returns 距离（公里）
 */
export function calculateDistance(city1: City, city2: City): number {
  const lat1 = (city1.latitude * Math.PI) / 180;
  const lat2 = (city2.latitude * Math.PI) / 180;
  const deltaLat = ((city2.latitude - city1.latitude) * Math.PI) / 180;
  const deltaLon = ((city2.longitude - city1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(EARTH_RADIUS * c);
}

/**
 * 计算多个城市的总距离
 * @param cities 城市列表（按顺序）
 * @returns 总距离（公里）
 */
export function calculateTotalDistance(cities: City[]): number {
  if (cities.length < 2) return 0;

  let total = 0;
  for (let i = 0; i < cities.length - 1; i++) {
    total += calculateDistance(cities[i], cities[i + 1]);
  }

  return total;
}

/**
 * 根据距离范围筛选城市
 * @param origin 出发城市
 * @param cities 候选城市列表
 * @param range 距离范围
 * @returns 符合距离范围的城市列表
 */
export function filterCitiesByDistance(
  origin: City,
  cities: City[],
  range: DistanceRange
): City[] {
  return cities.filter((city) => {
    if (city.id === origin.id) return false;

    const distance = calculateDistance(origin, city);
    return distance >= range.min && distance <= range.max;
  });
}

/**
 * 根据标签筛选城市
 * @param cities 候选城市列表
 * @param tags 城市标签
 * @returns 包含任一标签的城市列表
 */
export function filterCitiesByTags(cities: City[], tags: CityTag[]): City[] {
  if (tags.length === 0) return cities;

  return cities.filter((city) => tags.some((tag) => city.tags.includes(tag)));
}

/**
 * 综合筛选城市
 * @param options 筛选选项
 * @param cities 候选城市列表
 * @returns 符合条件的城市列表
 */
export function filterCities(options: CityFilterOptions, cities: City[]): City[] {
  let result = [...cities];

  // 排除出发城市
  result = result.filter((city) => city.id !== options.startCity.id);

  // 排除指定城市
  if (options.excludeCities?.length) {
    const excludeIds = new Set(options.excludeCities.map((c) => c.id));
    result = result.filter((city) => !excludeIds.has(city.id));
  }

  // 按标签筛选
  if (options.tags && options.tags.length > 0) {
    result = filterCitiesByTags(result, options.tags);
  }

  // 按距离筛选
  if (options.distanceRange) {
    result = filterCitiesByDistance(options.startCity, result, options.distanceRange);
  }

  return result;
}

/**
 * 根据距离对城市排序
 * @param origin 出发城市
 * @param cities 城市列表
 * @returns 按距离升序排序的城市列表
 */
export function sortCitiesByDistance(origin: City, cities: City[]): City[] {
  return [...cities].sort((a, b) => {
    const distA = calculateDistance(origin, a);
    const distB = calculateDistance(origin, b);
    return distA - distB;
  });
}

/**
 * 获取城市之间的方位角（用于路线方向指示）
 * @param from 出发城市
 * @param to 目标城市
 * @returns 方位角（0-360度）
 */
export function calculateBearing(from: City, to: City): number {
  const lat1 = (from.latitude * Math.PI) / 180;
  const lat2 = (to.latitude * Math.PI) / 180;
  const deltaLon = ((to.longitude - from.longitude) * Math.PI) / 180;

  const y = Math.sin(deltaLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);

  const bearing = (Math.atan2(y, x) * 180) / Math.PI;
  return (bearing + 360) % 360;
}

/**
 * 格式化距离显示
 * @param distance 距离（公里）
 * @returns 格式化后的字符串
 */
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}米`;
  }
  if (distance >= 1000) {
    return `${(distance / 1000).toFixed(1)}千公里`;
  }
  return `${Math.round(distance)}公里`;
}
