'use client';

import { useState, useEffect } from 'react';

function useLocalStorage(key: string) {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    setValue(storedValue);
  }, [key]);

  const setStoredValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;
