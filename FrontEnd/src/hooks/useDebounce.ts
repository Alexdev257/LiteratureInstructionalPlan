
import { useState, useEffect, useCallback, useRef } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebouncedParams<T extends Record<string, any>>(
  initialParams: T = {} as T,
  delay: number = 500,
  onParamsChange?: (params: T) => void , 
) {
  const [localParams, setLocalParams] = useState<T>(initialParams);
  const debouncedParams = useDebounce(localParams, delay);

  const onParamsChangeRef = useRef(onParamsChange);
  const isInitialMount = useRef(true);
  const isUserAction = useRef(false);
  const prevInitialParams = useRef<string>('');

  // Cập nhật ref callback
  useEffect(() => {
    onParamsChangeRef.current = onParamsChange;
  }, [onParamsChange]);

  // Chỉ sync khi initialParams thay đổi THỰC SỰ (deep compare)
  useEffect(() => {
    const currentStr = JSON.stringify(initialParams);
    if (prevInitialParams.current !== currentStr) {
      setLocalParams(initialParams);
      prevInitialParams.current = currentStr;
      isUserAction.current = false; // Không tính là user thay đổi
    }
  }, [initialParams]);

  // Gọi callback chỉ khi user thao tác
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isUserAction.current && onParamsChangeRef.current) {
      onParamsChangeRef.current(debouncedParams);
    }
    isUserAction.current = false;
  }, [debouncedParams]);

  const updateLocalParam = useCallback(<K extends keyof T>(
    key: K,
    value: T[K] | ''
  ) => {
    isUserAction.current = true;
    setLocalParams(prev => {
      const newParams = {
        ...prev,
        [key]: value === '' ? undefined : value,
      } as T;

      // Tự động reset PageNumber về 1 khi thay đổi filter (không phải pagination)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const paginationKeys: (keyof T)[] = ['PageNumber', 'page', 'PageSize', 'pageSize'] as any;
      if (!paginationKeys.includes(key) && 'PageNumber' in newParams) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (newParams as any).PageNumber = 1;
      }

      return newParams;
    });
  }, []);

  const resetParams = useCallback((overrides?: Partial<T>) => {
    isUserAction.current = true;
    const resetValue = { ...initialParams, ...overrides };
    setLocalParams(resetValue);
  }, [initialParams]);

  return {
    localParams,
    debouncedParams,
    updateLocalParam,
    setLocalParams: resetParams, 
    rawSetLocalParams: setLocalParams,
  };
}