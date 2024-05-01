import { COLORS, COLOR_MODE, INITIAL_COLOR_MODE } from '@/configs/theme/themeConfig';
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

function setColorsByTheme() {
  const colors = 'colorsValue';
  const colorModeKey = 'colorKey';
  const colorModeCssProp = 'initialColorMode';
  let colorMode = 'light';

  const persistedPreference = localStorage.getItem(colorModeKey);
  const hasUsedToggle = typeof persistedPreference === 'string';

  if (hasUsedToggle) {
    colorMode = persistedPreference;
  }

  const root = document.documentElement;

  root.style.setProperty(colorModeCssProp, colorMode);

  Object.entries(colors).forEach(([name, colorByTheme]) => {
    const cssVarName = `--color-${name}`;

    root.style.setProperty(cssVarName, colorByTheme[colorMode]);
  });

  if (colorMode === 'dark') root.classList.add(colorMode);
}

const injectedFn = String(setColorsByTheme)
  .replace('"colorsValue"', JSON.stringify(COLORS))
  .replace('colorKey', COLOR_MODE)
  .replace('initialColorMode', INITIAL_COLOR_MODE);

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Script
          id="inline-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(${injectedFn})()`,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
