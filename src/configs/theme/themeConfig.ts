import * as colors from './themeColor';

type PrefixColor = 'primary' | 'grey' | 'red' | 'orange' | 'green' | 'blue' | 'white' | 'yellow' | 'purple';
type ToneColor = '50' | '100' | '150' | '200' | '300' | '400' | '500';

type PrefixComponent = 'background' | 'text' | 'divider';
type TypeComponent =
  | 'primary'
  | 'secondary'
  | 'hint'
  | 'strock'
  | 'overlay'
  | 'search'
  | 'error'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5';

type ColorFormat<Prefix extends string, Tone extends string> = `${Prefix}-${Tone}`;

type FormatColor = ColorFormat<PrefixColor, ToneColor>;
type FormatComponent = ColorFormat<PrefixComponent, TypeComponent>;

type ITheme = Record<keyof Omit<IColor, 'display'>, Record<ThemeDisplayName, string>>;

export type ThemeDisplayName = 'light' | 'dark';
export type IColor = Partial<
  Record<FormatColor | FormatComponent | PrefixColor | PrefixComponent, string> & {
    display: ThemeDisplayName;
  }
>;

// Get all theme colors from themeColor.ts and merge them into one object
const mergeTheme = (): ITheme => {
  if (!colors) return;

  return Object.values(colors).reduce((acc, cur) => {
    const { display, ...rest } = cur;
    const properties = Object.keys(rest).reduce((propsAcc, propsCur) => {
      return {
        ...propsAcc,
        [propsCur]: {
          ...acc[propsCur],
          [display]: rest[propsCur],
        },
      };
    }, {});
    return {
      ...acc,
      ...properties,
    };
  }, {} as ITheme);
};

// Key name in localStorage
export const COLOR_MODE = 'color-mode';

// Key name in CSS variable
export const INITIAL_COLOR_MODE = '--initial-color-mode';
export const COLORS = mergeTheme();
