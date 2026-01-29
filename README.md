# Taro 项目架构模板

一个基于 **Taro 4.x + React 18 + TypeScript** 的跨端应用架构模板，已移除所有业务逻辑，可直接用于开发新项目。

## ✨ 特性

- 🚀 **开箱即用** - 完整的项目架构和最佳实践
- 📱 **多端支持** - 微信/支付宝/抖音/百度/QQ/京东/H5/鸿蒙
- 🎯 **类型安全** - 完整的 TypeScript 类型定义
- 🗃️ **状态管理** - 集成 Zustand 轻量级状态管理
- 🌏 **城市旅行** - 内置中国城市随机旅行功能
- 🛠️ **工程化** - ESLint + Prettier + Husky + Commitlint
- 📚 **完整文档** - 详细的开发指南和代码示例

## 🚀 快速开始

```bash
# 克隆项目
git clone <your-repo-url>

# 安装依赖
npm install

# 微信小程序开发
npm run dev:weapp

# 使用微信开发者工具打开 dist 目录
```

## 📖 文档

- **[架构说明文档](./README_ARCHITECTURE.md)** - 完整的架构说明和使用指南
- **[清理完成指南](./CLEANUP_GUIDE.md)** - 项目清理说明和新项目开始指南

## 🏗️ 项目结构

```
src/
├── components/          # 可复用组件
│   ├── CityPicker/     # 城市选择器
│   ├── TagSelector/    # 标签选择器
│   ├── DistanceSlider/ # 距离范围选择器
│   ├── CityCard/       # 城市卡片
│   ├── RouteMap/       # 旅行轨迹地图
│   └── WaypointList/   # 中途城市列表
├── pages/              # 页面组件
│   ├── travel/         # 旅行功能页面
│   │   ├── index/      # 旅行首页
│   │   ├── smart/      # 智能推荐页
│   │   ├── random/     # 随机选择页
│   │   ├── result/     # 结果展示页
│   │   └── route/      # 轨迹展示页
│   └── example/        # 示例页面
├── stores/             # Zustand 状态管理
│   ├── travel.ts       # 旅行状态
│   └── example.ts      # 示例状态
├── hooks/              # 自定义 React Hooks
├── services/           # API 服务、本地存储
│   ├── travel.ts       # 旅行业务服务
│   ├── api.ts          # HTTP 请求
│   └── storage.ts      # 本地存储
├── types/              # TypeScript 类型定义
│   ├── travel.ts       # 旅行相关类型
│   └── index.ts        # 通用类型
├── constants/          # 常量配置
├── utils/              # 工具函数
│   ├── geo.ts          # 地理计算
│   ├── helpers.ts      # 通用工具
│   ├── device.ts       # 设备相关
│   └── date.ts         # 日期处理
├── data/               # 静态数据
│   └── cities.ts       # 城市数据
├── config/             # 应用配置
└── assets/             # 静态资源
```

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Taro | 4.1.8 | 跨端开发框架 |
| React | 18.x | UI 框架 |
| TypeScript | 5.4.5 | 类型系统 |
| Zustand | 4.4.7 | 状态管理 |
| dayjs | 1.11.10 | 日期处理 |
| Sass | 1.75.0 | CSS 预处理器 |

## 📱 支持平台

```bash
npm run dev:weapp      # 微信小程序（主平台）
npm run dev:alipay    # 支付宝小程序
npm run dev:tt        # 抖音小程序
npm run dev:swan      # 百度小程序
npm run dev:qq        # QQ 小程序
npm run dev:jd        # 京东小程序
npm run dev:h5        # H5
```

## 💡 快速上手

### 1. 创建新页面

```bash
# 在 src/pages/ 下创建页面文件夹
mkdir -p src/pages/my-page

# 创建必要文件
touch src/pages/my-page/index.tsx
touch src/pages/my-page/index.scss
touch src/pages/my-page/index.config.ts
```

### 2. 注册路由

在 `src/app.config.ts` 中添加:

```typescript
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/my-page/index'  // 添加新页面
  ]
});
```

### 3. 创建组件

```typescript
// src/components/MyComponent/index.tsx
import { FC } from 'react';
import { View, Text } from '@tarojs/components';

const MyComponent: FC = () => {
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};

export default MyComponent;
```

### 4. 使用状态管理

```typescript
// 使用示例 Store
import useExampleStore from '@/stores/example';

function MyPage() {
  const { count, increment } = useExampleStore();
  return <View onClick={increment}>{count}</View>;
}
```

### 5. 调用 API

```typescript
import api from '@/services/api';

const getUserInfo = async () => {
  const data = await api.get('/user/info');
  console.log(data);
};
```

## 📋 代码规范

```bash
# ESLint 检查
npm run lint

# ESLint 自动修复
npm run lint:fix

# Prettier 格式化
npm run format
```

### Git 提交规范

```bash
feat: 新功能
fix: Bug 修复
docs: 文档更新
style: 代码格式调整
refactor: 重构
perf: 性能优化
test: 测试
chore: 构建/工具链更新
```

## 📚 学习资源

- [Taro 官方文档](https://taro-docs.jd.com/)
- [React 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Zustand 文档](https://github.com/pmndrs/zustand)

## 📄 许可证

MIT License

---

**注意**: 这是一个架构模板项目，已移除所有业务逻辑。请阅读 [README_ARCHITECTURE.md](./README_ARCHITECTURE.md) 了解完整的架构说明和开发指南。
