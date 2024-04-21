import { COLORS } from './src/configs/theme/themeConfig';
import type { Config } from 'tailwindcss';

const getConfig = (): Config => {
  const properties = Object.keys(COLORS).reduce((acc, cur) => {
    return {
      ...acc,
      [`th-${cur}`]: `var(--color-${cur})`,
    };
  }, {});

  return {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    corePlugins: {
      preflight: false,
    },
    darkMode: 'class',
    theme: {
      extend: {
        colors: properties,
        screens: {
          loginmd: { raw: '(max-height: 800px)' },
        },
      },
    },
    plugins: [],
  };
};

export default getConfig();
