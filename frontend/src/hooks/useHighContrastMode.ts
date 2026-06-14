import { useState, useEffect } from 'react';

export function useHighContrastMode() {
  const [highContrast, setHighContrast] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('high-contrast') === 'true';
      }
    } catch (err) {
      console.error('Failed to read high-contrast from localStorage:', err);
    }
    return false;
  });

  useEffect(() => {
    if (highContrast) {
      document.documentElement.setAttribute('data-theme', 'high-contrast');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [highContrast]);

  const toggleHighContrast = (checked: boolean) => {
    setHighContrast(checked);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('high-contrast', checked ? 'true' : 'false');
      }
    } catch (err) {
      console.error('Failed to write high-contrast to localStorage:', err);
    }
  };

  return { highContrast, toggleHighContrast };
}
