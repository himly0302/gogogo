/**
 * 示例 Store - Zustand 状态管理模板
 *
 * 使用说明：
 * 1. 复制此文件创建新的 store
 * 2. 根据业务需求修改状态和 actions
 * 3. 在组件中使用: const useStore = useExampleStore();
 */
import { create } from 'zustand';

// 定义状态接口
interface ExampleState {
  count: number;
  isLoading: boolean;
  data: any[] | null;
}

// 定义 Store 接口（包含 actions）
interface ExampleStore extends ExampleState {
  // Actions
  increment: () => void;
  decrement: () => void;
  fetchData: () => Promise<void>;
  reset: () => void;
}

// 创建 Store
const useExampleStore = create<ExampleStore>((set, get) => ({
  // 初始状态
  count: 0,
  isLoading: false,
  data: null,

  // Actions
  increment: () => {
    set(state => ({ count: state.count + 1 }));
  },

  decrement: () => {
    set(state => ({ count: state.count - 1 }));
  },

  fetchData: async () => {
    set({ isLoading: true });
    try {
      // TODO: 实现数据获取逻辑
      // const response = await api.get('/data');
      // set({ data: response.data });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ count: 0, isLoading: false, data: null });
  }
}));

export default useExampleStore;
