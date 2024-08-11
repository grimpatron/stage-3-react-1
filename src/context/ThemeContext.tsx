'use client';

import { createContext, ReactNode, useState } from 'react';

interface ContextThemeInterface {
  toggleTheme: () => void;
  theme: string;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ContextThemeInterface | undefined>(undefined);

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
