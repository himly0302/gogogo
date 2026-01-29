# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 语言规范

**所有回复和生成的内容必须使用中文。**

## 项目概述

这是一个**Taro 项目架构模板**，已移除所有业务逻辑，可直接用于开发新项目。

**技术栈**:
- Taro 4.1.8
- React 18.x
- TypeScript 5.4.5
- Zustand 4.4.7（状态管理）
- dayjs 1.11.10（日期处理）
- Sass 1.75.0（样式）

**开发模式**: 单人开发 + AI 辅助（Claude Code）

**支持平台**: 微信、支付宝、抖音、百度、京东、QQ 小程序，H5，鸿蒙 Hybrid

## 开发命令

### 构建与开发
```bash
# 开发模式（微信小程序）
npm run dev:weapp

# 其他平台
npm run dev:alipay    # 支付宝
npm run dev:h5        # H5

# 生产构建
npm run build:weapp
```

### 代码检查
```bash
# ESLint
npx eslint src/

# Stylelint
npx stylelint "src/**/*.scss"

# TypeScript 类型检查
npx tsc --noEmit
```

## 架构设计

### 目录结构
```
src/
├── components/        # 可复用 UI 组件
│   └── Example/      # 示例组件
├── pages/            # 页面组件
│   ├── index/        # 主页
│   └── example/      # 示例页面
├── stores/           # Zustand 状态管理
│   └── example.ts    # 示例 Store
├── hooks/            # 自定义 React Hooks
│   └── useExample.ts # 示例 Hook
├── services/         # 业务逻辑 & 外部 API
│   ├── api.ts       # API 服务
│   └── storage.ts   # 本地存储
├── types/            # TypeScript 类型定义
│   └── index.ts     # 通用类型
├── constants/        # 常量配置
│   └── index.ts     # 通用常量
├── utils/            # 工具函数
│   ├── helpers.ts   # 通用工具
│   ├── device.ts    # 设备相关
│   └── date.ts      # 日期处理
├── config/           # 应用配置
│   ├── index.ts     # 配置导出
│   └── env.ts       # 环境变量
└── assets/           # 静态资源
```

### 状态管理模式

使用 **Zustand** 进行状态管理。示例：
```typescript
// src/stores/example.ts
import { create } from 'zustand';

const useExampleStore = create((set, get) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 }))
}));

export default useExampleStore;
```

### 页面组件

页面使用函数组件 + Hooks：
```typescript
import { FC } from 'react';
import { View, Text } from '@tarojs/components';

const MyPage: FC = () => {
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};

export default MyPage;
```

### API 服务

统一的 API 调用封装（参考 `src/services/api.ts`）：
- 请求/响应拦截器
- 错误处理
- Token 管理

## TypeScript 规范

- 优先使用类型推断
- 接口定义使用 `interface`
- 组件 Props 使用接口定义
- 避免使用 `any`

## 样式规范

- 使用 SCSS
- 遵循 BEM 命名规范
- 避免深层嵌套（最多 3 层）

## Git 提交规范

使用 Conventional Commits：
- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式
- `refactor:` 重构
- `perf:` 性能优化
- `test:` 测试
- `chore:` 构建/工具

## 文档

- **README.md** - 项目说明
- **README_ARCHITECTURE.md** - 完整架构文档
- **CLEANUP_GUIDE.md** - 清理指南

## 开发注意事项

1. 所有新页面需要在 `src/app.config.ts` 中注册
2. 组件使用 PascalCase 命名
3. 文件名使用 kebab-case 或 PascalCase
4. 导入路径使用 `@/` 别名
5. 遵循 ESLint 和 Prettier 规则
