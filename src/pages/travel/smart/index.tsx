/**
 * 智能推荐页
 * 根据用户意愿和标签推荐目的地
 */

import { FC, useState } from 'react';
import { View, Text, Button, Textarea, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useLoad } from '@tarojs/taro';
import useTravelStore from '@/stores/travel';
import TagSelector from '@/components/TagSelector';
import './index.scss';

const TravelSmart: FC = () => {
  const {
    startCity,
    preference,
    setPreference,
    generateDestination,
    isLoading,
    error,
  } = useTravelStore();

  const [description, setDescription] = useState(preference.description || '');
  const [selectedTags, setSelectedTags] = useState(preference.selectedTags || []);

  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '智能推荐' });
  });

  const handleGenerate = async () => {
    if (selectedTags.length === 0 && !description.trim()) {
      Taro.showToast({
        title: '请选择标签或填写意愿',
        icon: 'none',
      });
      return;
    }

    // 更新偏好
    setPreference({
      description: description.trim(),
      selectedTags,
    });

    try {
      await generateDestination();

      // 跳转到结果页
      Taro.navigateTo({ url: '/pages/travel/result/index' });
    } catch (err) {
      Taro.showToast({
        title: err instanceof Error ? err.message : '生成失败',
        icon: 'none',
      });
    }
  };

  return (
    <View className="travel-smart">
      <ScrollView scrollY className="travel-smart__scroll">
        {/* 出发城市 */}
        <View className="travel-smart__section">
          <Text className="travel-smart__label">出发城市</Text>
          <View className="travel-smart__city">
            <Text className="travel-smart__city-name">{startCity?.name}</Text>
          </View>
        </View>

        {/* 标签选择 */}
        <View className="travel-smart__section">
          <Text className="travel-smart__label">
            选择标签
            <Text className="travel-smart__label-hint">
              最多选择3个标签
            </Text>
          </Text>
          <TagSelector
            value={selectedTags}
            onChange={setSelectedTags}
            max={3}
          />
        </View>

         {/* 意愿描述 */}
        <View className="travel-smart__section">
          <Text className="travel-smart__label">
            旅行意愿（可选）
            <Text className="travel-smart__label-hint">
              告诉我们你想体验什么样的旅行
            </Text>
          </Text>
          <Textarea
            className="travel-smart__textarea"
            placeholder="例如：我想去一个有历史文化、美食丰富、适合慢节奏生活的城市..."
            value={description}
            onInput={(e) => setDescription(e.detail.value)}
            maxlength={200}
            autoHeight
          />
        </View>

        {/* 错误提示 */}
        {error && (
          <View className="travel-smart__error">
            <Text className="travel-smart__error-text">{error}</Text>
          </View>
        )}
      </ScrollView>

      {/* 底部按钮 */}
      <View className="travel-smart__footer">
        <Button
          className="travel-smart__button"
          onClick={handleGenerate}
          disabled={isLoading}
        >
          {isLoading ? '生成中...' : '生成目的地'}
        </Button>
      </View>
    </View>
  );
};

export default TravelSmart;
