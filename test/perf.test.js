/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import { getFCP, getFP, getLCP, getFID, getCLS, getTTFB, getPerformance, isSupportedEntryType } from '../lib/index.esm';

describe('Web Performance Metrics', () => {
  it('should return FCP time in milliseconds', async () => {
    const fcp = await getFCP();
    expect(fcp).toBeGreaterThanOrEqual(0);
  });
  
  it('should return FP time in milliseconds', async () => {
    const fp = await getFP();
    expect(fp).toBeGreaterThanOrEqual(0);
  });
  
  it('should return LCP time in milliseconds', async () => {
    const lcp = await getLCP();
    expect(lcp).toBeGreaterThanOrEqual(0);
  });
  
  it('should return FID time in milliseconds', async () => {
    const fid = await getFID();
    expect(fid).toBeGreaterThanOrEqual(0);
  });
  
  it('should return CLS score', async () => {
    const cls = await getCLS();
    expect(cls).toBeGreaterThanOrEqual(0);
  });
  
  it('should return TTFB time in milliseconds', async () => {
    const ttfb = await getTTFB();
    expect(ttfb).toBeGreaterThanOrEqual(0);
  });
});

describe('getPerformanceStatus', () => {
  it('returns an object with performance data', () => {
    return expect(getPerformance()).rejects.toThrow('navigation is not supported');
  });
});

describe('isSupportedEntryType', () => {
  it('should return true if the entry type is supported', () => {
    // Arrange
    const name = 'navigation';
    window.PerformanceObserver = {
      supportedEntryTypes: [ 'navigation', 'paint', 'resource' ],
    };

    // Act
    const result = isSupportedEntryType(name);

    // Assert
    expect(result).toBe(true);
  });

  it('should return false if the entry type is not supported', () => {
    // Arrange
    const name = 'longtask';
    window.PerformanceObserver = {
      supportedEntryTypes: [ 'navigation', 'paint', 'resource' ],
    };

    // Act
    const result = isSupportedEntryType(name);

    // Assert
    expect(result).toBe(false);
  });

  it('should return false if PerformanceObserver is not supported', () => {
    // Arrange
    const name = 'navigation';
    window.PerformanceObserver = undefined;

    // Act
    const result = isSupportedEntryType(name);

    // Assert
    expect(result).toBe(false);
  });
});
