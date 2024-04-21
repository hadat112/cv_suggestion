import { Noto_Sans } from 'next/font/google';
import { ThemeConfig } from 'antd';
const notoSans = Noto_Sans({ weight: '400', subsets: ['latin'], display: 'swap' });

// eslint-disable-next-line no-unused-vars
type antdTheme = (COLORS) => ThemeConfig;

export const antdDefaultTheme: antdTheme = (COLORS) => ({
  token: {
    fontFamily: notoSans.style.fontFamily,
    colorPrimary: COLORS.primary,
    fontSize: 16,
    borderRadius: 6,
    colorBorder: COLORS['divider-1'],
    colorBgBase: COLORS['background'],
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
      colorBgBase: COLORS['background'],
      algorithm: true,
    },
  },
});
