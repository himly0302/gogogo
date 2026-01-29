/**
 * 中途城市列表组件
 */

import { FC } from 'react';
import { View, Text } from '@tarojs/components';
import type { City } from '@/types';
import './index.scss';

interface WaypointListProps {
  waypoints: City[];
  onRemove?: (cityId: string) => void;
  onClear?: () => void;
  max?: number;
}

const WaypointList: FC<WaypointListProps> = ({
  waypoints,
  onRemove,
  onClear,
  max = 5,
}) => {
  if (waypoints.length === 0) {
    return (
      <View className="waypoint-list waypoint-list--empty">
        <Text className="waypoint-list__empty-text">暂无中途城市</Text>
        <Text className="waypoint-list__empty-hint">最多可添加 {max} 个中途城市</Text>
      </View>
    );
  }

  return (
    <View className="waypoint-list">
      <View className="waypoint-list__header">
        <Text className="waypoint-list__title">
          中途城市 ({waypoints.length}/{max})
        </Text>
        {onClear && (
          <Text className="waypoint-list__clear" onClick={onClear}>
            清空
          </Text>
        )}
      </View>

      <View className="waypoint-list__items">
        {waypoints.map((city, index) => (
          <View key={city.id} className="waypoint-list__item">
            <View className="waypoint-list__number">{index + 1}</View>
            <View className="waypoint-list__content">
              <Text className="waypoint-list__name">{city.name}</Text>
              <Text className="waypoint-list__province">{city.province}</Text>
            </View>
            {onRemove && (
              <View
                className="waypoint-list__remove"
                onClick={() => onRemove(city.id)}
              >
                <Text className="waypoint-list__remove-icon">×</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default WaypointList;
