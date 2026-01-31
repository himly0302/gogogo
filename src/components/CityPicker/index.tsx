/**
 * 城市选择器组件
 */

import { FC, useState } from 'react';
import { View, Text, Input, ScrollView } from '@tarojs/components';
import { CITIES, getProvinces, getCitiesByProvince } from '@/data/cities';
import type { City } from '@/types';
import './index.scss';

interface CityPickerProps {
  value?: City;
  onChange?: (city: City) => void;
  placeholder?: string;
}

const CityPicker: FC<CityPickerProps> = ({ value, onChange, placeholder = '请选择城市' }) => {
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<string>('');

  const provinces = getProvinces();

  // 搜索城市
  const searchResults = keyword
    ? CITIES.filter((city) => {
        const lowerKeyword = keyword.toLowerCase();
        return (
          city.name.toLowerCase().includes(lowerKeyword) ||
          city.province.toLowerCase().includes(lowerKeyword)
        );
      })
    : [];

  // 获取选中省份的城市
  const provinceCities = selectedProvince
    ? getCitiesByProvince()[selectedProvince] || []
    : [];

  const handleSelectCity = (city: City) => {
    onChange?.(city);
    setVisible(false);
    setKeyword('');
    setSelectedProvince('');
  };

  if (!visible) {
    return (
      <View className='city-picker' onClick={() => setVisible(true)}>
        <View className='city-picker__trigger'>
          <Text className={value ? 'city-picker__value' : 'city-picker__placeholder'}>
            {value?.name || placeholder}
          </Text>
          <Text className='city-picker__arrow'>›</Text>
        </View>
      </View>
    );
  }

  return (
    <View className='city-picker__modal' onClick={() => setVisible(false)}>
      <View className='city-picker__content' onClick={(e) => e.stopPropagation()}>
        {/* 头部 */}
        <View className='city-picker__header'>
          <Text className='city-picker__title'>选择城市</Text>
          <View
            className='city-picker__close'
            onClick={(e) => {
              e.stopPropagation();
              setVisible(false);
            }}
          >
            <Text>✕</Text>
          </View>
        </View>

        {/* 搜索框 */}
        <View className='city-picker__search'>
          <Input
            className='city-picker__input'
            placeholder='搜索城市或省份'
            value={keyword}
            onInput={(e) => setKeyword(e.detail.value)}
          />
        </View>

        {/* 城市列表 */}
        <ScrollView scrollY className='city-picker__list'>
          {/* 搜索结果 */}
          {keyword && (
            <View className='city-picker__section'>
              <Text className='city-picker__section-title'>搜索结果</Text>
              {searchResults.length > 0 ? (
                searchResults.map((city) => (
                  <View
                    key={city.id}
                    className='city-picker__item'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCity(city);
                    }}
                  >
                    <Text className='city-picker__item-name'>{city.name}</Text>
                    <Text className='city-picker__item-province'>{city.province}</Text>
                  </View>
                ))
              ) : (
                <Text className='city-picker__empty'>未找到相关城市</Text>
              )}
            </View>
          )}

          {/* 按省份浏览 */}
          {!keyword && !selectedProvince && (
            <View className='city-picker__section'>
              <Text className='city-picker__section-title'>按省份选择</Text>
              {provinces.map((province) => {
                const citiesInProvince = getCitiesByProvince()[province] || [];
                return (
                  <View
                    key={province}
                    className='city-picker__province'
                    onClick={() => setSelectedProvince(province)}
                  >
                    <Text className='city-picker__province-name'>{province}</Text>
                    <Text className='city-picker__province-count'>
                      ({citiesInProvince.length})
                    </Text>
                    <Text className='city-picker__province-arrow'>›</Text>
                  </View>
                );
              })}
            </View>
          )}

          {/* 某省份的城市列表 */}
          {!keyword && selectedProvince && (
            <View className='city-picker__section'>
              <View className='city-picker__back' onClick={() => setSelectedProvince('')}>
                <Text className='city-picker__back-arrow'>‹</Text>
                <Text className='city-picker__back-text'>返回</Text>
              </View>
              <Text className='city-picker__section-title'>{selectedProvince}</Text>
              {provinceCities.map((city) => (
                <View
                  key={city.id}
                  className='city-picker__item'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectCity(city);
                  }}
                >
                  <Text className='city-picker__item-name'>{city.name}</Text>
                  {city.tags.length > 0 && (
                    <Text className='city-picker__item-tags'>
                      {city.tags.slice(0, 2).map((tag) => {
                        const tagConfig = {
                          historical: '🏛️',
                          natural: '🏔️',
                          modern: '🏙️',
                          coastal: '🏖️',
                          mountain: '⛰️',
                          food: '🍜',
                          art: '🎨',
                          ancient: '🏯',
                          ethnic: '🎭',
                          leisure: '🌴',
                        }[tag];
                        return (
                          <Text key={tag} className='city-picker__tag'>
                            {tagConfig}
                          </Text>
                        );
                      })}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default CityPicker;
