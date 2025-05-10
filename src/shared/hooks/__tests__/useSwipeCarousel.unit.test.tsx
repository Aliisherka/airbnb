import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useSwipeCarousel } from "../useSwipeCarousel";


describe('useSwipeCarousel', () => {
  test('swipes to the next image', async () => {
    const { result } = renderHook(() => useSwipeCarousel(3));

    act(() => {
      result.current.handleTouchStart({ touches: [{ clientX: 300 }] } as any);
    });

    act(() => {
      result.current.handleTouchMove({ touches: [{ clientX: 100 }] } as any);
    });

    await act(async () => {
      result.current.handleTouchEnd();
    });

    expect(result.current.currentIndex).toBe(1);
  })

  test('swipes to the previous image', async () => {
    const { result } = renderHook(() => useSwipeCarousel(3));

    act(() => {
      result.current.setCurrentIndex(1);
    });

    act(() => {
      result.current.handleTouchStart({ touches: [{ clientX: 100 }] } as any);
    });

    act(() => {
      result.current.handleTouchMove({ touches: [{ clientX: 300 }] } as any);
    });

    await act(async () => {
      result.current.handleTouchEnd();
    });

    expect(result.current.currentIndex).toBe(0);
  });
})