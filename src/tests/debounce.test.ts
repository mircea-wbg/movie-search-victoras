import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

describe('useDebouncedValue', () => {
  it('updates only after the delay and cancels previous timers', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ v, d }) => useDebouncedValue(v, d),
      { initialProps: { v: 'a', d: 300 } }
    );

    expect(result.current).toBe('a');

    // schimbări rapide
    rerender({ v: 'ab', d: 300 });
    rerender({ v: 'abc', d: 300 });

    // înainte de delay, valoarea veche rămâne
    act(() => { vi.advanceTimersByTime(299); });
    expect(result.current).toBe('a');

    // după delay, valoarea se actualizează
    act(() => { vi.advanceTimersByTime(1); });
    expect(result.current).toBe('abc');

    vi.useRealTimers();
  });
});
