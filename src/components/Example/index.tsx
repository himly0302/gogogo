/**
 * 示例组件模板
 *
 * 展示组件的基本结构和最佳实践
 */
import { FC } from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';

interface ExampleProps {
  title?: string;
  content?: string;
  onClick?: () => void;
}

const Example: FC<ExampleProps> = ({
  title = '示例标题',
  content = '示例内容',
  onClick
}) => {
  const handleClick = () => {
    console.log('Component clicked');
    onClick?.();
  };

  return (
    <View className="example-component" onClick={handleClick}>
      <Text className="example-title">{title}</Text>
      <Text className="example-content">{content}</Text>
    </View>
  );
};

export default Example;
