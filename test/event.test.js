/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import { cancelBubble } from '../lib/index.esm';

describe('cancelBubble', () => {
  it('should call stopPropagation if available', () => {
    const eventMock = {
      stopPropagation: jest.fn(),
      cancelBubble: false,
    };

    cancelBubble(eventMock);

    expect(eventMock.stopPropagation).toHaveBeenCalled();
    expect(eventMock.cancelBubble).toBe(false);
  });

  it('should set cancelBubble to true if stopPropagation is not available', () => {
    const eventMock = {
      stopPropagation: undefined,
      cancelBubble: false,
    };

    cancelBubble(eventMock);

    expect(eventMock.cancelBubble).toBe(true);
  });
});
