# 中国随机城市旅行 需求文档

> 📅 **生成时间**：2026-01-29
> 🎯 **目标**：实现中国城市随机旅行目的地推荐功能，支持智能推荐和随机选择两种模式
> 🚦 **优先级**：P0（核心功能）

---

## 1. 功能概述

- **功能目标**：帮助用户发现新的旅行目的地，支持基于偏好的智能推荐和基于距离的随机选择，可添加中途城市形成完整旅行轨迹
- **优先级**：P0（必须）- 作为应用核心功能

### 核心功能模块

| 模块 | 描述 | 优先级 |
|------|------|--------|
| 出发城市选择 | 用户选择或定位当前出发城市 | P0 |
| 智能推荐模式 | 根据意愿描述和标签推荐目的地 | P0 |
| 随机选择模式 | 根据距离范围随机选择目的地 | P0 |
| 中途城市添加 | 可选添加中途停留城市形成旅行轨迹 | P1 |
| 旅行轨迹展示 | 可视化展示完整旅行路线 | P1 |

---

## 2. 技术栈与相关模块

### 当前技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Taro | 4.1.8 | 跨平台小程序框架 |
| React | 18.x | UI 组件库 |
| TypeScript | 5.4.5 | 类型检查 |
| Zustand | 4.4.7 | 状态管理 |
| dayjs | 1.11.10 | 日期处理 |
| Sass | 1.75.0 | 样式预处理器 |

### 相关现有模块

| 模块 | 路径 | 复用方式 |
|------|------|----------|
| API 服务 | `src/services/api.ts` | 用于城市数据请求 |
| 存储服务 | `src/services/storage.ts` | 缓存城市数据和历史记录 |
| 通用工具 | `src/utils/helpers.ts` | 复用 `randomItem`、`generateId` 等 |
| 类型定义 | `src/types/index.ts` | 扩展新类型 |
| 常量配置 | `src/constants/index.ts` | 添加新常量 |

### 新增依赖

无需新增外部依赖，使用现有技术栈即可实现。

---

## 3. 改动方案

### 3.1 数据模型

#### 城市数据模型

```typescript
// src/types/travel.ts

/** 城市信息 */
interface City {
  id: string;
  name: string;           // 城市名称
  province: string;       // 所属省份
  latitude: number;       // 纬度
  longitude: number;      // 经度
  tags: CityTag[];        // 城市标签
  description?: string;   // 城市简介
  imageUrl?: string;      // 城市图片
}

/** 城市标签 */
type CityTag =
  | 'historical'    // 历史文化
  | 'natural'       // 自然风光
  | 'modern'        // 现代都市
  | 'coastal'       // 海滨城市
  | 'mountain'      // 山地城市
  | 'food'          // 美食之都
  | 'art'           // 艺术文化
  | 'ancient'       // 古镇古城
  | 'ethnic'        // 民族风情
  | 'leisure';      // 休闲度假

/** 距离范围 */
interface DistanceRange {
  min: number;  // 最近距离（公里）
  max: number;  // 最远距离（公里）
}

/** 旅行偏好 */
interface TravelPreference {
  description?: string;     // 用户填写的意愿描述
  selectedTags: CityTag[];  // 选择的标签
}

/** 旅行轨迹 */
interface TravelRoute {
  id: string;
  startCity: City;          // 出发城市
  destinationCity: City;    // 目的地城市
  waypointCities: City[];   // 中途城市列表
  createdAt: number;        // 创建时间戳
  totalDistance: number;    // 总距离（公里）
}

/** 旅行模式 */
type TravelMode = 'smart' | 'random';
```

### 3.2 状态管理

```typescript
// src/stores/travel.ts

interface TravelState {
  // 状态
  startCity: City | null;           // 出发城市
  destinationCity: City | null;     // 目的地城市
  waypointCities: City[];           // 中途城市
  travelMode: TravelMode;           // 旅行模式
  preference: TravelPreference;     // 旅行偏好
  distanceRange: DistanceRange;     // 距离范围
  isLoading: boolean;
  error: string | null;

  // 城市数据
  allCities: City[];                // 全部城市列表

  // 历史记录
  routeHistory: TravelRoute[];      // 历史旅行轨迹

  // Actions
  setStartCity: (city: City) => void;
  setTravelMode: (mode: TravelMode) => void;
  setPreference: (pref: Partial<TravelPreference>) => void;
  setDistanceRange: (range: DistanceRange) => void;
  generateDestination: () => Promise<void>;
  addWaypointCity: (city: City) => void;
  removeWaypointCity: (cityId: string) => void;
  saveRoute: () => void;
  clearRoute: () => void;
  loadCities: () => Promise<void>;
}
```

### 3.3 UI 改动

#### 新增页面

| 页面 | 路径 | 描述 |
|------|------|------|
| 旅行首页 | `pages/travel/index` | 模式选择、出发城市设置 |
| 智能推荐页 | `pages/travel/smart` | 意愿填写、标签选择 |
| 随机选择页 | `pages/travel/random` | 距离范围设置 |
| 结果页 | `pages/travel/result` | 展示目的地、添加中途城市 |
| 轨迹页 | `pages/travel/route` | 完整旅行轨迹展示 |

#### 新增组件

| 组件 | 路径 | 描述 |
|------|------|------|
| CityPicker | `components/CityPicker` | 城市选择器组件 |
| TagSelector | `components/TagSelector` | 标签多选组件 |
| DistanceSlider | `components/DistanceSlider` | 距离范围滑块 |
| CityCard | `components/CityCard` | 城市信息卡片 |
| RouteMap | `components/RouteMap` | 旅行轨迹地图 |
| WaypointList | `components/WaypointList` | 中途城市列表 |

### 3.4 文件清单

#### 新增文件

```
src/
├── types/
│   └── travel.ts                    # 旅行相关类型定义
├── stores/
│   └── travel.ts                    # 旅行状态管理
├── services/
│   └── travel.ts                    # 旅行业务逻辑服务
├── data/
│   └── cities.ts                    # 中国城市静态数据
├── pages/
│   └── travel/
│       ├── index/                   # 旅行首页
│       │   ├── index.tsx
│       │   ├── index.config.ts
│       │   └── index.scss
│       ├── smart/                   # 智能推荐页
│       │   ├── index.tsx
│       │   ├── index.config.ts
│       │   └── index.scss
│       ├── random/                  # 随机选择页
│       │   ├── index.tsx
│       │   ├── index.config.ts
│       │   └── index.scss
│       ├── result/                  # 结果展示页
│       │   ├── index.tsx
│       │   ├── index.config.ts
│       │   └── index.scss
│       └── route/                   # 轨迹展示页
│           ├── index.tsx
│           ├── index.config.ts
│           └── index.scss
├── components/
│   ├── CityPicker/
│   │   ├── index.tsx
│   │   └── index.scss
│   ├── TagSelector/
│   │   ├── index.tsx
│   │   └── index.scss
│   ├── DistanceSlider/
│   │   ├── index.tsx
│   │   └── index.scss
│   ├── CityCard/
│   │   ├── index.tsx
│   │   └── index.scss
│   ├── RouteMap/
│   │   ├── index.tsx
│   │   └── index.scss
│   └── WaypointList/
│       ├── index.tsx
│       └── index.scss
└── utils/
    └── geo.ts                       # 地理计算工具函数

tests/
└── travel/
    ├── travel.store.test.ts         # Store 单元测试
    ├── travel.service.test.ts       # Service 单元测试
    └── geo.utils.test.ts            # 地理工具测试
```

#### 修改文件

| 文件 | 修改内容 |
|------|----------|
| `src/app.config.ts` | 添加新页面路由配置 |
| `src/types/index.ts` | 导出旅行相关类型 |
| `src/constants/index.ts` | 添加旅行相关常量 |
| `src/pages/index/index.tsx` | 添加入口导航到旅行功能 |

---

## 4. 实施步骤

### 步骤 1：数据层（预计任务数：4）

**1.1 创建类型定义**
- [ ] 创建 `src/types/travel.ts` 定义所有旅行相关类型
- [ ] 在 `src/types/index.ts` 中导出

**1.2 创建城市数据**
- [ ] 创建 `src/data/cities.ts` 包含中国主要城市数据（约 50-100 个城市）
- [ ] 城市数据包含：名称、省份、经纬度、标签

**1.3 创建地理工具函数**
- [ ] 创建 `src/utils/geo.ts`
- [ ] 实现 `calculateDistance(city1, city2)` 两点距离计算（Haversine 公式）
- [ ] 实现 `filterCitiesByDistance(origin, cities, range)` 按距离筛选城市
- [ ] 实现 `filterCitiesByTags(cities, tags)` 按标签筛选城市

**1.4 创建旅行服务**
- [ ] 创建 `src/services/travel.ts`
- [ ] 实现 `getSmartRecommendation(preference, startCity)` 智能推荐
- [ ] 实现 `getRandomDestination(startCity, distanceRange)` 随机选择
- [ ] 实现 `getSuggestedWaypoints(startCity, destCity)` 推荐中途城市

### 步骤 2：状态管理（预计任务数：2）

**2.1 创建 Travel Store**
- [ ] 创建 `src/stores/travel.ts`
- [ ] 实现状态和 Actions
- [ ] 集成本地存储持久化历史记录

**2.2 添加常量配置**
- [ ] 在 `src/constants/index.ts` 添加：
  - `TRAVEL_STORAGE_KEYS`：历史记录存储键
  - `DISTANCE_PRESETS`：距离预设选项
  - `CITY_TAGS`：城市标签配置

### 步骤 3：组件层（预计任务数：6）

**3.1 CityPicker 组件**
- [ ] 实现城市选择器，支持搜索和省份分组

**3.2 TagSelector 组件**
- [ ] 实现标签多选组件，展示所有城市标签

**3.3 DistanceSlider 组件**
- [ ] 实现双端滑块，设置最近/最远距离

**3.4 CityCard 组件**
- [ ] 实现城市信息卡片，展示城市详情

**3.5 RouteMap 组件**
- [ ] 实现简易地图展示旅行轨迹（可使用 Canvas 绘制）

**3.6 WaypointList 组件**
- [ ] 实现中途城市列表，支持添加/删除

### 步骤 4：页面层（预计任务数：5）

**4.1 旅行首页**
- [ ] 创建 `pages/travel/index`
- [ ] 实现模式选择（智能推荐/随机选择）
- [ ] 实现出发城市选择
- [ ] 配置页面路由

**4.2 智能推荐页**
- [ ] 创建 `pages/travel/smart`
- [ ] 实现意愿描述输入
- [ ] 实现标签选择
- [ ] 生成推荐结果

**4.3 随机选择页**
- [ ] 创建 `pages/travel/random`
- [ ] 实现距离范围设置
- [ ] 随机生成目的地

**4.4 结果展示页**
- [ ] 创建 `pages/travel/result`
- [ ] 展示目的地信息
- [ ] 支持添加中途城市
- [ ] 支持重新生成

**4.5 轨迹展示页**
- [ ] 创建 `pages/travel/route`
- [ ] 展示完整旅行轨迹
- [ ] 显示总距离和途经城市

### 步骤 5：集成与测试（预计任务数：3）

**5.1 路由配置**
- [ ] 更新 `src/app.config.ts` 添加所有新页面路由
- [ ] 更新首页添加入口导航

**5.2 单元测试**
- [ ] 创建 `tests/travel/` 目录
- [ ] 编写 Store 测试
- [ ] 编写 Service 测试
- [ ] 编写地理工具测试

**5.3 集成测试**
- [ ] 测试完整用户流程
- [ ] 测试边界情况（无匹配城市等）
- [ ] 响应式适配验证

### 步骤 6：文档更新与提交代码（⚠️ 必须执行）

> **⚠️ 强制要求**：此步骤必须执行，不可跳过。

**6.1 更新 CHANGELOG.md**（必须）

```markdown
## [1.1.0] - 2026-01-XX

### Added
- **中国随机城市旅行功能**：全新旅行目的地推荐功能
  - 智能推荐模式：根据用户意愿和标签推荐目的地
  - 随机选择模式：根据距离范围随机选择目的地
  - 中途城市添加：支持添加中途停留城市形成旅行轨迹
  - 旅行轨迹展示：可视化展示完整旅行路线
  - 相关文件：`src/pages/travel/`、`src/stores/travel.ts`
```

**6.2 更新 README.md**（必须）

添加功能说明和使用入口描述。

**6.3 提交代码**（必须）

```bash
git add .
git commit -m "feat: 添加中国随机城市旅行功能

- 实现智能推荐和随机选择两种模式
- 支持中途城市添加和旅行轨迹展示
- 包含完整的类型定义和状态管理"
```

**6.4 自我检查**
- [ ] 新功能是否按需求正常工作
- [ ] 现有功能是否正常（未被破坏）
- [ ] CHANGELOG.md 是否已更新
- [ ] README.md 是否已更新
- [ ] 所有相关文件是否已提交

---

## 5. 风险提示

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 城市数据量大 | 页面加载慢 | 使用静态数据 + 懒加载 |
| 距离计算精度 | 推荐不准确 | 使用 Haversine 公式确保精度 |
| 地图展示兼容性 | 不同平台表现不一 | 使用 Canvas 绘制简易地图 |
| 标签匹配率低 | 用户体验差 | 提供模糊匹配和相关推荐 |

---

## 6. 附录

### A. 城市标签定义

| 标签 | 英文 | 示例城市 |
|------|------|----------|
| 历史文化 | historical | 西安、洛阳、南京 |
| 自然风光 | natural | 桂林、张家界、九寨沟 |
| 现代都市 | modern | 上海、深圳、广州 |
| 海滨城市 | coastal | 青岛、厦门、三亚 |
| 山地城市 | mountain | 丽江、拉萨、黄山 |
| 美食之都 | food | 成都、重庆、广州 |
| 艺术文化 | art | 北京、杭州、苏州 |
| 古镇古城 | ancient | 平遥、凤凰、周庄 |
| 民族风情 | ethnic | 大理、西双版纳、喀什 |
| 休闲度假 | leisure | 三亚、北海、威海 |

### B. 距离预设

| 选项 | 范围（公里） |
|------|-------------|
| 周边游 | 0 - 300 |
| 短途游 | 300 - 800 |
| 中途游 | 800 - 1500 |
| 长途游 | 1500 - 3000 |
| 远途游 | 3000+ |
