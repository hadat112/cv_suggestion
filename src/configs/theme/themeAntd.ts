import { ThemeConfig } from 'antd';

type antdTheme = (COLORS) => ThemeConfig;

export const antdDefaultTheme: antdTheme = (COLORS) => ({
  token: {
    colorPrimary: COLORS.primary,
    fontSize: 16,
    borderRadius: 6,
    colorBorder: COLORS['border'],
    colorBgBase: COLORS['white'],
    colorTextBase: COLORS['text-primary'],
    colorError: COLORS['red-500'],
    colorTextPlaceholder: COLORS['text-hint'],
    controlHeight: 36,
    controlHeightLG: 40,
    controlHeightSM: 28,
    controlHeightXS: 28,
  },
  components: {
    Select: {
      colorBgBase: COLORS['white'],
      algorithm: true,
    },
  },
});
