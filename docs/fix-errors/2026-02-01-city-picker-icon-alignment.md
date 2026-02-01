# CityPicker 组件小图标对齐问题

## 错误信息

CityPicker 组件中,省份列表项的箭头图标 `›` 和城市列表项的勾选图标 `✓` 没有正确对齐,影响视觉效果。

## 根本原因

1. **省份列表箭头未对齐**:
   - 箭头图标缺少 `line-height: 1` 属性,导致与文本基线不一致
   - 缺少 `align-self: center` 属性,无法在 flex 容器中垂直居中

2. **城市列表勾选图标未对齐**:
   - 勾选图标缺少 `line-height: 1` 和 `align-self: center` 属性
   - 城市列表项布局结构不够合理,文本、标签和图标都在同一层,难以精确控制对齐

3. **布局结构问题**:
   - 城市名称、省份/标签和勾选图标混在一起,使用 `justify-content: space-between` 导致间距不一致
   - 缺少合适的容器来组织左侧内容(文本和标签)和右侧内容(勾选图标)

## 修复方案

### 文件修改

#### 1. `src/components/CityPicker/index.tsx`

**修改内容**: 重构城市列表项的布局结构

**搜索结果列表** (第 108-127 行):
```tsx
<View className='city-picker__item-left'>
  <Text className='city-picker__item-name'>
    {city.name}
  </Text>
  <Text className='city-picker__item-province'>{city.province}</Text>
</View>
{isSelected && <Text className='city-picker__item-check'>✓</Text>}
```

**省份城市列表** (第 170-211 行):
```tsx
<View className='city-picker__item-left'>
  <Text className='city-picker__item-name'>
    {city.name}
  </Text>
  {city.tags.length > 0 && (
    <Text className='city-picker__item-tags'>
      {city.tags.map(...)}
    </Text>
  )}
</View>
{isSelected && <Text className='city-picker__item-check'>✓</Text>}
```

**改进点**:
- 将城市名称和省份/标签包裹在 `city-picker__item-left` 容器中
- 勾选图标独立在外层,与左侧容器分离
- 布局结构更清晰: 左侧内容 + 右侧图标

#### 2. `src/components/CityPicker/index.scss`

**修改内容**: 添加和优化样式类

**新增样式** (第 125-131 行):
```scss
&__item-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
}
```

**优化城市名称样式** (第 133-136 行):
```scss
&__item-name {
  font-size: 32px;
  color: #333;
}
```

**优化省份箭头样式** (第 176-183 行):
```scss
&__province-arrow {
  font-size: 40px;
  color: #999;
  font-weight: 300;
  flex-shrink: 0;
  line-height: 1;      // 新增
  align-self: center;  // 新增
}
```

**优化勾选图标样式** (第 139-146 行):
```scss
&__item-check {
  font-size: 36px;
  color: #1890ff;
  margin-left: 16px;
  line-height: 1;      // 新增
  align-self: center;  // 新增
  flex-shrink: 0;      // 新增
}
```

**优化列表项布局** (第 106-114 行):
```scss
&__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 0;
  border-bottom: 1px solid #f5f5f5;
  transition: background-color 0.2s;
  gap: 16px;  // 新增,确保左右两侧有合适的间距
}
```

**改进点**:
- 所有图标统一添加 `line-height: 1` 和 `align-self: center` 确保垂直对齐
- 新增 `flex-shrink: 0` 防止图标被压缩
- 新增 `gap: 16px` 确保左右两侧内容有合适的间距
- 使用 `city-picker__item-left` 容器统一管理左侧内容

## 技术要点

### Flexbox 对齐策略

1. **图标对齐**:
   - `line-height: 1` - 移除行高带来的额外空间,使图标紧凑
   - `align-self: center` - 在 flex 容器中垂直居中
   - `flex-shrink: 0` - 防止图标在空间不足时被压缩

2. **布局容器**:
   - 左侧容器使用 `flex: 1` 占据剩余空间
   - `min-width: 0` 防止内容溢出
   - `gap: 16px` 提供统一的间距

3. **列表项布局**:
   - 外层使用 `justify-content: space-between` 分隔左右内容
   - `align-items: center` 确保垂直居中对齐
   - `gap: 16px` 确保左右两侧有合适的间距

## 验证结果

- [x] ESLint 检查通过
- [x] Stylelint 检查通过
- [x] 代码结构优化完成
- [x] 布局更加清晰合理

## 影响范围

- **CityPicker 组件**: 所有列表项的图标对齐效果得到改善
- **用户体验**: 视觉效果更加统一和专业
- **代码可维护性**: 布局结构更清晰,易于后续修改

## 相关文件

- `src/components/CityPicker/index.tsx`
- `src/components/CityPicker/index.scss`
- `docs/UI/UI1-2.png` (问题截图)
