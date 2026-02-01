# Changelog

所有重要更改都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.1.8] - 2026-02-01

### Fixed
- **移除未使用的 allCities 字段**：清理 travel store 中的冗余代码
  - 从 TravelState 接口中删除 allCities 定义
  - 从 store 初始状态中删除 allCities 初始化
  - 从 CityPicker 组件中删除 allCities 相关逻辑
  - 修复 storage 模块导入方式，使用默认导出避免命名冲突
  - 相关文件：
    - `src/stores/travel.ts`
    - `src/components/CityPicker/index.tsx`

## [1.1.7] - 2026-02-01

### Fixed
- **CityPicker 城市数据缓存**：修复选择城市时未使用 travel store 缓存逻辑的问题
  - 在 CityPicker 组件中集成 useTravelStore，使用 allCities 字段缓存选中的城市
  - 修改 handleSelectCity 函数，将选中的城市添加到 store 的 allCities 数组中
  - 同时更新 startCity 状态，确保旅行功能的出发城市正确设置
  - 避免重复添加相同城市，通过 city.id 进行去重判断
  - 相关：`src/components/CityPicker/index.tsx`

## [1.1.6] - 2026-02-01

### Fixed
- **CityPicker 小图标对齐问题**：修复省份列表箭头和城市列表勾选图标的对齐问题
  - 重构城市列表项布局结构，将文本/标签与勾选图标分离到不同容器
  - 为所有图标添加 `line-height: 1`、`align-self: center` 和 `flex-shrink: 0` 确保对齐
  - 添加 `city-picker__item-left` 容器统一管理左侧内容
  - 优化列表项间距和布局，视觉效果更加统一专业
  - 相关文件：
    - `src/components/CityPicker/index.tsx`
    - `src/components/CityPicker/index.scss`

## [1.1.5] - 2026-01-31

### Fixed
- **CityPicker 返回箭头对齐和选中状态问题**：修复省份城市列表的 UI 细节问题
  - 修复返回箭头和文字的垂直对齐，添加 `line-height: 1` 和 `justify-content`
  - 为已选中的城市添加视觉区分：背景色、蓝色文字、加粗、勾选图标
  - 优化选中状态的样式类，符合 stylelint 规范
  - 相关文件：
    - `src/components/CityPicker/index.tsx`
    - `src/components/CityPicker/index.scss`

## [1.1.4] - 2026-01-31

### Fixed
- **CityPicker 已选城市时默认显示问题**：修复已选择城市时打开弹窗仍显示所有省份的问题
  - 添加 `useEffect` 监听弹窗打开状态和选中城市
  - 当弹窗打开且有选中城市时，自动定位到该城市所在省份
  - 弹窗关闭时重置搜索关键词和选中省份状态
  - 相关：`src/components/CityPicker/index.tsx`

## [1.1.3] - 2026-01-31

### Fixed
- **CityPicker 选择城市后弹窗未关闭**：修复点击城市项后弹窗无法自动关闭的问题
  - 在城市列表项的 onClick 事件中添加 `stopPropagation()` 阻止事件冒泡
  - 确保点击事件不被父容器拦截，正确触发 `handleSelectCity` 函数
  - 搜索结果和省份城市列表均已修复
  - 相关：`src/components/CityPicker/index.tsx`

## [1.1.2] - 2026-01-31

### Fixed
- **CityPicker 样式问题**：修复城市选择器搜索栏和省份列表的对齐问题
  - 搜索框添加最大宽度并居中显示（max-width: 600px + margin: 0 auto）
  - 省份列表项优化 Flex 布局，确保省份名称、数字和箭头对齐
  - 添加 `gap` 和 `flex-shrink` 属性防止内容挤压
  - 相关：`src/components/CityPicker/index.scss`

## [1.1.1] - 2026-01-31

### Fixed
- **CityPicker 关闭按钮点击无效**：修复城市选择器弹窗关闭按钮无法响应点击的问题
  - 将关闭按钮从 `Text` 组件改为 `View` 组件包裹
  - 添加 `stopPropagation()` 阻止事件冒泡
  - 相关：`src/components/CityPicker/index.tsx`

## [1.1.0] - 2026-01-29

### Added
- **中国随机城市旅行功能**：全新旅行目的地推荐功能
  - 智能推荐模式：根据用户意愿和标签推荐目的地
  - 随机选择模式：根据距离范围随机选择目的地
  - 中途城市添加：支持添加中途停留城市形成旅行轨迹
  - 旅行轨迹展示：可视化展示完整旅行路线和地图
  - 历史记录：保存和查看历史旅行轨迹
  - 相关文件：
    - `src/pages/travel/` - 旅行相关页面
    - `src/components/CityPicker/` - 城市选择器组件
    - `src/components/TagSelector/` - 标签选择器组件
    - `src/components/DistanceSlider/` - 距离范围选择器组件
    - `src/components/CityCard/` - 城市卡片组件
    - `src/components/RouteMap/` - 旅行轨迹地图组件
    - `src/components/WaypointList/` - 中途城市列表组件
    - `src/stores/travel.ts` - 旅行状态管理
    - `src/services/travel.ts` - 旅行业务逻辑服务
    - `src/utils/geo.ts` - 地理计算工具函数
    - `src/data/cities.ts` - 中国城市数据（70+ 城市）
    - `src/types/travel.ts` - 旅行相关类型定义
    - `tests/travel/` - 功能单元测试
