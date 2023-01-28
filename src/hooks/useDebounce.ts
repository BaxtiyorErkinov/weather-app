import React from 'react';

export function useDebounce<T>(value: T, delay: number = 200): T {
  const [debounceValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    let timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value]);

  return debounceValue;
}
