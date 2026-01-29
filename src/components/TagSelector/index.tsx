/**
 * 标签选择器组件
 */

import { FC } from 'react';
import { View, Text } from '@tarojs/components';
import { CITY_TAGS } from '@/constants';
import type { CityTag } from '@/types';
import './index.scss';

interface TagSelectorProps {
  value?: CityTag[];
  onChange?: (tags: CityTag[]) => void;
  max?: number; // 最多选择数量
}

const TagSelector: FC<TagSelectorProps> = ({ value = [], onChange, max = 5 }) => {
  const tags = Object.keys(CITY_TAGS) as CityTag[];

  const handleToggle = (tag: CityTag) => {
    const isSelected = value.includes(tag);

    if (isSelected) {
      // 取消选择
      onChange?.(value.filter((t) => t !== tag));
    } else {
      // 选择
      if (value.length >= max) {
        // 已达到最大数量
        return;
      }
      onChange?.([...value, tag]);
    }
  };

  return (
    <View className="tag-selector">
      <View className="tag-selector__list">
        {tags.map((tag) => {
          const config = CITY_TAGS[tag];
          const isSelected = value.includes(tag);

          return (
            <View
              key={tag}
              className={`tag-selector__item ${isSelected ? 'tag-selector__item--selected' : ''}`}
              onClick={() => handleToggle(tag)}
            >
              <Text className="tag-selector__icon">{config.icon}</Text>
              <Text className="tag-selector__label">{config.label}</Text>
            </View>
          );
        })}
      </View>

      {value.length > 0 && (
        <View className="tag-selector__footer">
          <Text className="tag-selector__count">
            已选择 {value.length}/{max} 个标签
          </Text>
        </View>
      )}
    </View>
  );
};

export default TagSelector;
