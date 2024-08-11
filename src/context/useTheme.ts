'use client';

import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Error context');
  }

  return context;
};

export default useTheme;
