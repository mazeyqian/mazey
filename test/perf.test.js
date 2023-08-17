/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import { getFCP, getFP, getLCP, getFID, getCLS, getTTFB } from '../lib/index.esm';

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
