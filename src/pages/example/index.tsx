/**
 * 示例页面模板
 *
 * 展示页面的基本结构和最佳实践
 */
import { FC, useEffect } from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import useExampleStore from '../../stores/example';
import { useExample } from '../../hooks';
import Example from '../../components/Example';
import './index.scss';

const ExamplePage: FC = () => {
  // 使用 Zustand Store
  const { count, increment, decrement, fetchData, isLoading } = useExampleStore();

  // 使用自定义 Hook
  const { value: customValue, setValue } = useExample({ initialValue: 'Hello' });

  useEffect(() => {
    // 页面加载时执行
    console.log('Page mounted');

    return () => {
      // 页面卸载时清理
      console.log('Page unmounted');
    };
  }, []);

  const handleFetch = () => {
    fetchData();
  };

  const handleNavigate = () => {
    Taro.navigateTo({
      url: '/pages/index/index'
    });
  };

  return (
    <View className="example-page">
      <View className="header">
        <Text className="title">示例页面</Text>
      </View>

      <View className="content">
        {/* Zustand 示例 */}
        <View className="section">
          <Text className="section-title">状态管理示例</Text>
          <Text className="count">计数: {count}</Text>
          <View className="buttons">
            <Button onClick={decrement}>减少</Button>
            <Button onClick={increment}>增加</Button>
          </View>
        </View>

        {/* Hook 示例 */}
        <View className="section">
          <Text className="section-title">自定义 Hook 示例</Text>
          <Text className="value">值: {customValue}</Text>
          <Button onClick={() => setValue('New Value')}>更新值</Button>
        </View>

        {/* 组件示例 */}
        <View className="section">
          <Text className="section-title">组件示例</Text>
          <Example
            title="示例组件"
            content="这是一个示例组件"
            onClick={() => Taro.showToast({ title: '点击了组件', icon: 'success' })}
          />
        </View>

        {/* API 示例 */}
        <View className="section">
          <Text className="section-title">API 请求示例</Text>
          <Button onClick={handleFetch} loading={isLoading}>
            {isLoading ? '加载中...' : '获取数据'}
          </Button>
        </View>

        {/* 导航示例 */}
        <View className="section">
          <Text className="section-title">导航示例</Text>
          <Button onClick={handleNavigate}>跳转到主页</Button>
        </View>
      </View>
    </View>
  );
};

export default ExamplePage;
