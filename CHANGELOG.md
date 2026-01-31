# Changelog

所有重要更改都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

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
