import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { COLORS, COLOR_MODE, INITIAL_COLOR_MODE, ThemeDisplayName } from '../configs/theme/themeConfig';
import vn from 'antd/locale/vi_VN';
import { ConfigProvider } from 'antd';
import { theme as andtTheme } from 'antd';
import { antdDefaultTheme } from '@/configs/theme/themeAntd';

interface IThemeProviderProps {
  children: React.ReactNode;
}

interface IThemeContext {
  // eslint-disable-next-line no-unused-vars
  toggleTheme?: (newTheme?: ThemeDisplayName) => void;
  theme?: ThemeDisplayName;
}

const ThemeContext = React.createContext<IThemeContext>(null);

const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<IThemeContext['theme']>();

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(INITIAL_COLOR_MODE) as ThemeDisplayName;

    setTheme(initialColorValue);
  }, []);

  const toggleTheme: IThemeContext['toggleTheme'] = useCallback(
    (args?) => {
      let newTheme = args;
      const root = document.documentElement;

      if (!newTheme || typeof newTheme !== 'string') {
        newTheme = theme === 'dark' ? 'light' : 'dark';
      }

      localStorage.setItem(COLOR_MODE, newTheme);
      setTheme(newTheme);

      Object.entries(COLORS).forEach(([name, colorByTheme]) => {
        const cssVarName = `--color-${name}`;

        root.style.setProperty(cssVarName, colorByTheme[newTheme]);
      });

      if (newTheme === 'dark') root.classList.add(newTheme);
      else root.classList.remove('dark');
    },
    [theme]
  );

  const contextValue: IThemeContext = useMemo(() => ({ toggleTheme, theme }), [theme, toggleTheme]);

  const antdTheme = useMemo(() => {
    if (!theme) return {};

    const currentColor = Object.entries(COLORS).reduce((total, [name, colorByTheme]) => {
      return { ...total, [name]: colorByTheme[theme] };
    }, {});

    return antdDefaultTheme(currentColor);
  }, [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider
        theme={{ ...antdTheme, algorithm: theme === 'dark' && andtTheme.darkAlgorithm }}
        locale={vn}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export { ThemeProvider, useTheme };
