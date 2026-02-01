# RouteMap 组件 Taro 导入缺失错误

## 错误信息

```
ReferenceError: _createSelectorQuery is not defined
    at eval (index.tsx:21:1)
    at commitHookEffectListMount
```

## 根本原因

`src/components/RouteMap/index.tsx` 组件在第 22 行使用了 `Taro.createSelectorQuery()`，但**文件头部缺少 Taro 的导入语句**。

## 修复方案

- **文件**：`src/components/RouteMap/index.tsx`
- **修改**：
  1. 添加 `import Taro from '@tarojs/taro';` 导入语句
  2. 移除未使用的 `City` 类型和 `calculateTotalDistance` 函数导入
  3. 修复 `drawRoute` 函数内部参数与外部作用域变量重名问题（`route` → `routeData`）
  4. 统一 JSX 引号风格为单引号（ESLint 规则）

## 验证结果

- [x] ESLint 检查通过
- [x] 代码风格符合项目规范
