/**
 * 旅行服务单元测试
 */

import {
  getSmartRecommendation,
  getRandomDestination,
  searchCities,
  getCityById,
} from '@/services/travel';
import { CITIES } from '@/data/cities';
import type { City, TravelPreference, DistanceRange } from '@/types';

describe('旅行服务', () => {
  describe('getSmartRecommendation', () => {
    it('应该根据标签推荐城市', async () => {
      const startCity: City = CITIES.find(c => c.id === 'beijing')!;
      const preference: TravelPreference = {
        selectedTags: ['historical'],
      };

      const result = await getSmartRecommendation(startCity, preference);

      expect(result).toBeDefined();
      expect(result.tags).toContain('historical');
      expect(result.id).not.toBe(startCity.id);
    });

    it('应该在没有匹配城市时抛出错误', async () => {
      const startCity: City = CITIES.find(c => c.id === 'beijing')!;
      const preference: TravelPreference = {
        selectedTags: ['coastal', 'leisure'] as any, // 不存在的标签组合
      };

      await expect(
        getSmartRecommendation(startCity, preference)
      ).rejects.toThrow();
    });
  });

  describe('getRandomDestination', () => {
    it('应该根据距离范围随机选择城市', async () => {
      const startCity: City = CITIES.find(c => c.id === 'beijing')!;
      const range: DistanceRange = { min: 100, max: 500 };

      const result = await getRandomDestination(startCity, range);

      expect(result).toBeDefined();
      expect(result.id).not.toBe(startCity.id);
    });

    it('应该在没有匹配城市时抛出错误', async () => {
      const startCity: City = CITIES.find(c => c.id === 'beijing')!;
      const range: DistanceRange = { min: 10000, max: 20000 };

      await expect(
        getRandomDestination(startCity, range)
      ).rejects.toThrow();
    });
  });

  describe('searchCities', () => {
    it('应该根据城市名搜索', () => {
      const result = searchCities('北京');
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].name).toContain('北京');
    });

    it('应该根据省份搜索', () => {
      const result = searchCities('北京');
      expect(result.length).toBeGreaterThan(0);
    });

    it('空关键词应该返回城市列表', () => {
      const result = searchCities('');
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toBeLessThanOrEqual(20);
    });
  });

  describe('getCityById', () => {
    it('应该根据ID返回城市', () => {
      const result = getCityById('beijing');
      expect(result).toBeDefined();
      expect(result?.name).toBe('北京');
    });

    it('不存在的ID应该返回null', () => {
      const result = getCityById('non-existent');
      expect(result).toBeNull();
    });
  });
});
