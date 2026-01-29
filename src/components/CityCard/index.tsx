/**
 * 城市卡片组件
 */

import { FC } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { CITY_TAGS } from '@/constants';
import type { City } from '@/types';
import './index.scss';

interface CityCardProps {
  city: City;
  distance?: number; // 距离（可选）
  onClick?: () => void;
}

const CityCard: FC<CityCardProps> = ({ city, distance, onClick }) => {
  return (
    <View className="city-card" onClick={onClick}>
      {/* 城市图片 */}
      {city.imageUrl && (
        <Image
          className="city-card__image"
          src={city.imageUrl}
          mode="aspectFill"
        />
      )}

      {/* 城市信息 */}
      <View className="city-card__content">
        <View className="city-card__header">
          <Text className="city-card__name">{city.name}</Text>
          {distance !== undefined && (
            <Text className="city-card__distance">{distance}公里</Text>
          )}
        </View>

        <Text className="city-card__province">{city.province}</Text>

        {/* 标签 */}
        {city.tags.length > 0 && (
          <View className="city-card__tags">
            {city.tags.map((tag) => {
              const config = CITY_TAGS[tag];
              return (
                <View key={tag} className="city-card__tag">
                  <Text className="city-card__tag-icon">{config.icon}</Text>
                  <Text className="city-card__tag-label">{config.label}</Text>
                </View>
              );
            })}
          </View>
        )}

        {/* 描述 */}
        {city.description && (
          <Text className="city-card__description">{city.description}</Text>
        )}
      </View>
    </View>
  );
};

export default CityCard;
