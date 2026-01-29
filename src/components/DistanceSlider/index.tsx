/**
 * 距离范围选择器组件
 */

import { FC, useState } from 'react';
import { View, Text, Slider } from '@tarojs/components';
import { DISTANCE_PRESETS } from '@/constants';
import type { DistanceRange } from '@/types';
import './index.scss';

interface DistanceSliderProps {
  value?: DistanceRange;
  onChange?: (range: DistanceRange) => void;
}

const DistanceSlider: FC<DistanceSliderProps> = ({ value, onChange }) => {
  const [tempRange, setTempRange] = useState<DistanceRange>(
    value || { min: 100, max: 1000 }
  );

  const handleMinChange = (min: number) => {
    const newRange = { ...tempRange, min };
    if (newRange.min > newRange.max) {
      newRange.max = newRange.min;
    }
    setTempRange(newRange);
    onChange?.(newRange);
  };

  const handleMaxChange = (max: number) => {
    const newRange = { ...tempRange, max };
    if (newRange.max < newRange.min) {
      newRange.min = newRange.max;
    }
    setTempRange(newRange);
    onChange?.(newRange);
  };

  const handlePresetClick = (preset: typeof DISTANCE_PRESETS[number]) => {
    const newRange = { min: preset.min, max: preset.max };
    setTempRange(newRange);
    onChange?.(newRange);
  };

  return (
    <View className="distance-slider">
      {/* 距离预设 */}
      <View className="distance-slider__presets">
        {DISTANCE_PRESETS.map((preset) => {
          const isActive =
            tempRange.min === preset.min && tempRange.max === preset.max;

          return (
            <View
              key={preset.label}
              className={`distance-slider__preset ${isActive ? 'distance-slider__preset--active' : ''}`}
              onClick={() => handlePresetClick(preset)}
            >
              <Text className="distance-slider__preset-label">{preset.label}</Text>
              <Text className="distance-slider__preset-range">
                {preset.min}-{preset.max}公里
              </Text>
            </View>
          );
        })}
      </View>

      {/* 距离滑块 */}
      <View className="distance-slider__sliders">
        <View className="distance-slider__slider-item">
          <Text className="distance-slider__label">最近距离</Text>
          <Slider
            className="distance-slider__slider"
            value={tempRange.min}
            min={0}
            max={5000}
            step={50}
            activeColor="#1890ff"
            backgroundColor="#e8e8e8"
            onChange={(e) => handleMinChange(e.detail.value)}
          />
          <Text className="distance-slider__value">{tempRange.min}公里</Text>
        </View>

        <View className="distance-slider__slider-item">
          <Text className="distance-slider__label">最远距离</Text>
          <Slider
            className="distance-slider__slider"
            value={tempRange.max}
            min={0}
            max={5000}
            step={50}
            activeColor="#1890ff"
            backgroundColor="#e8e8e8"
            onChange={(e) => handleMaxChange(e.detail.value)}
          />
          <Text className="distance-slider__value">{tempRange.max}公里</Text>
        </View>
      </View>

      {/* 当前选择 */}
      <View className="distance-slider__current">
        <Text className="distance-slider__current-text">
          当前范围：{tempRange.min} - {tempRange.max} 公里
        </Text>
      </View>
    </View>
  );
};

export default DistanceSlider;
