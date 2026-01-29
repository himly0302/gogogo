/**
 * 旅行 Store 单元测试
 */

import { calculateDistance, filterCitiesByDistance, filterCitiesByTags } from '@/utils/geo';
import { CITIES } from '@/data/cities';
import type { City, DistanceRange, CityTag } from '@/types';

describe('地理工具函数', () => {
  describe('calculateDistance', () => {
    it('应该正确计算两个城市之间的距离', () => {
      const beijing: City = CITIES.find(c => c.id === 'beijing')!;
      const shanghai: City = CITIES.find(c => c.id === 'shanghai')!;

      const distance = calculateDistance(beijing, shanghai);

      // 北京到上海大约 1000-1200 公里
      expect(distance).toBeGreaterThan(900);
      expect(distance).toBeLessThan(1300);
    });

    it('同一城市距离应该为0', () => {
      const beijing: City = CITIES.find(c => c.id === 'beijing')!;
      const distance = calculateDistance(beijing, beijing);
      expect(distance).toBe(0);
    });
  });

  describe('filterCitiesByDistance', () => {
    it('应该根据距离范围正确筛选城市', () => {
      const beijing: City = CITIES.find(c => c.id === 'beijing')!;
      const range: DistanceRange = { min: 100, max: 500 };

      const result = filterCitiesByDistance(beijing, CITIES, range);

      result.forEach(city => {
        const distance = calculateDistance(beijing, city);
        expect(distance).toBeGreaterThanOrEqual(range.min);
        expect(distance).toBeLessThanOrEqual(range.max);
      });
    });

    it('应该排除出发城市', () => {
      const beijing: City = CITIES.find(c => c.id === 'beijing')!;
      const range: DistanceRange = { min: 0, max: 5000 };

      const result = filterCitiesByDistance(beijing, CITIES, range);

      expect(result.some(c => c.id === 'beijing')).toBe(false);
    });
  });

  describe('filterCitiesByTags', () => {
    it('应该根据标签正确筛选城市', () => {
      const tags: CityTag[] = ['historical'];

      const result = filterCitiesByTags(CITIES, tags);

      result.forEach(city => {
        expect(city.tags).toContain('historical');
      });
    });

    it('空标签应该返回所有城市', () => {
      const result = filterCitiesByTags(CITIES, []);
      expect(result.length).toBe(CITIES.length);
    });

    it('应该匹配包含任一标签的城市', () => {
      const tags: CityTag[] = ['historical', 'modern'];

      const result = filterCitiesByTags(CITIES, tags);

      result.forEach(city => {
        const hasTag = tags.some(tag => city.tags.includes(tag));
        expect(hasTag).toBe(true);
      });
    });
  });
});
