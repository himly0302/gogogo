/**
 * 旅行业务逻辑服务
 */

import type { City, CityTag, CityFilterOptions, TravelRoute, TravelPreference, DistanceRange } from '@/types';
import { CITIES } from '@/data/cities';
import { filterCities, calculateTotalDistance } from '@/utils/geo';
import { randomItem } from '@/utils/helpers';
import { generateId } from '@/utils/helpers';

/**
 * 智能推荐目的地
 * @param startCity 出发城市
 * @param preference 旅行偏好
 * @returns 推荐的目的地城市
 */
export async function getSmartRecommendation(
  startCity: City,
  preference: TravelPreference
): Promise<City> {
  // 构建筛选选项
  const options: CityFilterOptions = {
    startCity,
    tags: preference.selectedTags.length > 0 ? preference.selectedTags : undefined,
  };

  // 筛选符合条件的城市
  const matchedCities = filterCities(options, CITIES);

  if (matchedCities.length === 0) {
    throw new Error('未找到符合条件的城市，请尝试选择更多标签');
  }

  // 如果用户填写了意愿描述，可以基于关键词进一步筛选
  // 这里简化为随机选择一个匹配的城市
  // 实际项目可以使用 AI 进行语义匹配
  const selectedCity = randomItem(matchedCities);

  return selectedCity;
}

/**
 * 随机选择目的地
 * @param startCity 出发城市
 * @param distanceRange 距离范围
 * @returns 随机的目的地城市
 */
export async function getRandomDestination(
  startCity: City,
  distanceRange: DistanceRange
): Promise<City> {
  // 筛选符合条件的城市
  const options: CityFilterOptions = {
    startCity,
    distanceRange,
  };

  const matchedCities = filterCities(options, CITIES);

  if (matchedCities.length === 0) {
    throw new Error(`未找到符合距离范围 ${distanceRange.min}-${distanceRange.max} 公里的城市`);
  }

  // 随机选择一个城市
  const selectedCity = randomItem(matchedCities);

  return selectedCity;
}

/**
 * 获取推荐的中途城市
 * @param startCity 出发城市
 * @param destCity 目的地城市
 * @param count 推荐数量（默认3个）
 * @returns 推荐的中途城市列表
 */
export async function getSuggestedWaypoints(
  startCity: City,
  destCity: City,
  count: number = 3
): Promise<City[]> {
  // 计算两城市之间的中点
  const midLat = (startCity.latitude + destCity.latitude) / 2;
  const midLon = (startCity.longitude + destCity.longitude) / 2;

  // 创建一个虚拟的中点城市
  const midPoint: City = {
    id: 'midpoint',
    name: '中点',
    province: '',
    latitude: midLat,
    longitude: midLon,
    tags: [],
  };

  // 寻找距离中点最近的城市
  const candidates = CITIES.filter(
    (city) => city.id !== startCity.id && city.id !== destCity.id
  );

  // 按距离中点的距离排序
  const sorted = candidates.slice().sort((a, b) => {
    const distA = Math.sqrt(
      Math.pow(a.latitude - midLat, 2) + Math.pow(a.longitude - midLon, 2)
    );
    const distB = Math.sqrt(
      Math.pow(b.latitude - midLat, 2) + Math.pow(b.longitude - midLon, 2)
    );
    return distA - distB;
  });

  // 返回最近的几个城市
  return sorted.slice(0, count);
}

/**
 * 创建旅行轨迹
 * @param startCity 出发城市
 * @param destinationCity 目的地城市
 * @param waypointCities 中途城市列表
 * @returns 旅行轨迹对象
 */
export function createRoute(
  startCity: City,
  destinationCity: City,
  waypointCities: City[] = []
): TravelRoute {
  // 构建完整的城市列表：出发城市 -> 中途城市 -> 目的地
  const allCities = [startCity, ...waypointCities, destinationCity];

  // 计算总距离
  const totalDistance = calculateTotalDistance(allCities);

  return {
    id: generateId('route'),
    startCity,
    destinationCity,
    waypointCities,
    createdAt: Date.now(),
    totalDistance,
  };
}

/**
 * 根据关键词搜索城市
 * @param keyword 搜索关键词（城市名或省份）
 * @returns 匹配的城市列表
 */
export function searchCities(keyword: string): City[] {
  if (!keyword.trim()) {
    return CITIES.slice(0, 20); // 返回前20个城市
  }

  const lowerKeyword = keyword.toLowerCase();

  return CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(lowerKeyword) ||
      city.province.toLowerCase().includes(lowerKeyword)
  );
}

/**
 * 获取城市详情
 * @param cityId 城市ID
 * @returns 城市信息，未找到返回 null
 */
export function getCityById(cityId: string): City | null {
  return CITIES.find((city) => city.id === cityId) || null;
}

/**
 * 获取热门城市（随机选择）
 * @param count 返回数量
 * @returns 热门城市列表
 */
export function getPopularCities(count: number = 10): City[] {
  // 简化实现：随机选择
  // 实际项目中可以根据城市热度排序
  const shuffled = [...CITIES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * 验证城市标签组合
 * @param tags 用户选择的标签
 * @returns 是否有城市匹配这些标签
 */
export function validateTagCombination(tags: CityTag[]): boolean {
  if (tags.length === 0) return true;

  const citiesWithTags = CITIES.filter((city) =>
    tags.some((tag) => city.tags.includes(tag))
  );

  return citiesWithTags.length > 0;
}

/**
 * 获取推荐的标签
 * @param startCity 出发城市
 * @returns 推荐的标签列表
 */
export function getRecommendedTags(startCity?: City): CityTag[] {
  // 简化实现：返回所有标签
  // 实际项目中可以根据出发城市位置推荐周边城市的特色标签
  const allTags: CityTag[] = [
    'historical',
    'natural',
    'modern',
    'coastal',
    'mountain',
    'food',
    'art',
    'ancient',
    'ethnic',
    'leisure',
  ];

  return allTags;
}
