import { ThemeConfig } from 'antd';

// eslint-disable-next-line no-unused-vars
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
    controlHeightSM: 32,
    controlHeightXS: 28,
  },
  components: {
    Button: {
      colorText: COLORS.primary,
      colorBorder: COLORS.primary,
    },
    Modal: {
      paddingContentHorizontalLG: 0,
      paddingMD: 0,
      colorTextHeading: '#fff',
    },
    Select: {
      colorBgBase: COLORS['white'],
      algorithm: true,
    },
  },
});
