/**
 * 旅行功能状态管理
 */

import { create } from 'zustand';
import { getSmartRecommendation, getRandomDestination, getSuggestedWaypoints, createRoute } from '@/services/travel';
import { set, get } from '@/services/storage';
import type { City, TravelMode, TravelPreference, DistanceRange, TravelRoute, CityTag } from '@/types';

const STORAGE_KEY = 'travel_route_history';

interface TravelState {
  // 状态
  startCity: City | null;
  destinationCity: City | null;
  waypointCities: City[];
  travelMode: TravelMode;
  preference: TravelPreference;
  distanceRange: DistanceRange;
  isLoading: boolean;
  error: string | null;

  // 城市数据
  allCities: City[];

  // 历史记录
  routeHistory: TravelRoute[];

  // Actions
  setStartCity: (city: City) => void;
  setTravelMode: (mode: TravelMode) => void;
  setPreference: (pref: Partial<TravelPreference>) => void;
  setDistanceRange: (range: DistanceRange) => void;
  generateDestination: () => Promise<void>;
  addWaypointCity: (city: City) => void;
  removeWaypointCity: (cityId: string) => void;
  clearWaypoints: () => void;
  saveRoute: () => void;
  clearRoute: () => void;
  loadRouteHistory: () => void;
  clearHistory: () => void;
}

const useTravelStore = create<TravelState>((set, get) => ({
  // 初始状态
  startCity: null,
  destinationCity: null,
  waypointCities: [],
  travelMode: 'smart',
  preference: {
    selectedTags: [],
  },
  distanceRange: {
    min: 100,
    max: 1000,
  },
  isLoading: false,
  error: null,
  allCities: [],
  routeHistory: [],

  // Actions
  setStartCity: (city) => {
    set({ startCity: city, destinationCity: null, waypointCities: [] });
  },

  setTravelMode: (mode) => {
    set({ travelMode: mode });
  },

  setPreference: (pref) => {
    const currentPref = get().preference;
    set({ preference: { ...currentPref, ...pref } });
  },

  setDistanceRange: (range) => {
    set({ distanceRange: range });
  },

  generateDestination: async () => {
    const state = get();
    const { startCity, travelMode, preference, distanceRange } = state;

    if (!startCity) {
      set({ error: '请先选择出发城市' });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      let destination: City;

      if (travelMode === 'smart') {
        // 智能推荐模式
        destination = await getSmartRecommendation(startCity, preference);
      } else {
        // 随机选择模式
        destination = await getRandomDestination(startCity, distanceRange);
      }

      set({ destinationCity: destination, waypointCities: [] });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : '生成目的地失败' });
    } finally {
      set({ isLoading: false });
    }
  },

  addWaypointCity: (city) => {
    const state = get();
    const { waypointCities, startCity, destinationCity } = state;

    // 检查是否已添加
    if (waypointCities.some((c) => c.id === city.id)) {
      return;
    }

    // 不能添加出发城市或目的地
    if (city.id === startCity?.id || city.id === destinationCity?.id) {
      return;
    }

    set({ waypointCities: [...waypointCities, city] });
  },

  removeWaypointCity: (cityId) => {
    const state = get();
    const waypointCities = state.waypointCities.filter((city) => city.id !== cityId);
    set({ waypointCities });
  },

  clearWaypoints: () => {
    set({ waypointCities: [] });
  },

  saveRoute: () => {
    const state = get();
    const { startCity, destinationCity, waypointCities, routeHistory } = state;

    if (!startCity || !destinationCity) {
      return;
    }

    const route = createRoute(startCity, destinationCity, waypointCities);
    const newHistory = [route, ...routeHistory].slice(0, 20); // 只保留最近20条

    set({ routeHistory: newHistory });

    // 持久化到本地存储
    set(STORAGE_KEY, newHistory);
  },

  clearRoute: () => {
    set({
      destinationCity: null,
      waypointCities: [],
      error: null,
    });
  },

  loadRouteHistory: () => {
    const history = get<TravelRoute[]>(STORAGE_KEY, []);
    set({ routeHistory: history || [] });
  },

  clearHistory: () => {
    set({ routeHistory: [] });
    set(STORAGE_KEY, []);
  },
}));

export default useTravelStore;
