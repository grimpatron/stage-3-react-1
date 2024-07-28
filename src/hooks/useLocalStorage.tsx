import { useState } from 'react';

function useLocalStorage(key: string) {
  const [value, setValue] = useState<string | null>(localStorage.getItem(key));

  const setStoredValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;
