/**
 * 旅行功能相关类型定义
 */

/** 城市标签 */
export type CityTag =
  | 'historical' // 历史文化
  | 'natural' // 自然风光
  | 'modern' // 现代都市
  | 'coastal' // 海滨城市
  | 'mountain' // 山地城市
  | 'food' // 美食之都
  | 'art' // 艺术文化
  | 'ancient' // 古镇古城
  | 'ethnic' // 民族风情
  | 'leisure'; // 休闲度假

/** 城市信息 */
export interface City {
  id: string;
  name: string; // 城市名称
  province: string; // 所属省份
  latitude: number; // 纬度
  longitude: number; // 经度
  tags: CityTag[]; // 城市标签
  description?: string; // 城市简介
  imageUrl?: string; // 城市图片
}

/** 距离范围 */
export interface DistanceRange {
  min: number; // 最近距离（公里）
  max: number; // 最远距离（公里）
}

/** 旅行偏好 */
export interface TravelPreference {
  description?: string; // 用户填写的意愿描述
  selectedTags: CityTag[]; // 选择的标签
}

/** 旅行轨迹 */
export interface TravelRoute {
  id: string;
  startCity: City; // 出发城市
  destinationCity: City; // 目的地城市
  waypointCities: City[]; // 中途城市列表
  createdAt: number; // 创建时间戳
  totalDistance: number; // 总距离（公里）
}

/** 旅行模式 */
export type TravelMode = 'smart' | 'random';

/** 城市筛选选项 */
export interface CityFilterOptions {
  startCity: City;
  tags?: CityTag[];
  distanceRange?: DistanceRange;
  excludeCities?: City[]; // 排除的城市（如出发城市）
}
