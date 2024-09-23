import type { Config } from 'tailwindcss';
import typographyPlugin from '@tailwindcss/typography';
import typography from './typography';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    // borderRadius: {
    //   DEFAULT: 'var(--whys-radius-5)',
    //   sm: 'var(--whys-radius-3)',
    //   lg: 'var(--whys-radius-6)',
    //   full: '9999px',
    // },
    typography,
    extend: {
      colors: {
        panel: 'var(--ds-panel)',
        'panel-contrast': 'var(--ds-panel)',
        overlay: 'var(--ds-overlay)',
        shadow: 'var(--ds-shadow)',
        gray: {
          line: 'var(--ds-gray-line)',
          1: 'var(--ds-gray-1)',
          2: 'var(--ds-gray-2)',
          3: 'var(--ds-gray-3)',
          4: 'var(--ds-gray-4)',
          5: 'var(--ds-gray-5)',
          6: 'var(--ds-gray-6)',
          7: 'var(--ds-gray-7)',
          8: 'var(--ds-gray-8)',
          9: 'var(--ds-gray-9)',
          10: 'var(--ds-gray-10)',
          11: 'var(--ds-gray-11)',
          12: 'var(--ds-gray-12)',
          a1: 'var(--ds-gray-a1)',
          a2: 'var(--ds-gray-a2)',
          a3: 'var(--ds-gray-a3)',
          a4: 'var(--ds-gray-a4)',
          a5: 'var(--ds-gray-a5)',
          a6: 'var(--ds-gray-a6)',
          a7: 'var(--ds-gray-a7)',
          a8: 'var(--ds-gray-a8)',
          a9: 'var(--ds-gray-a9)',
          a10: 'var(--ds-gray-a10)',
          a11: 'var(--ds-gray-a11)',
          a12: 'var(--ds-gray-a12)',
        },
        accent: {
          line: 'var(--ds-accent-line)',
          1: 'var(--ds-accent-1)',
          2: 'var(--ds-accent-2)',
          3: 'var(--ds-accent-3)',
          4: 'var(--ds-accent-4)',
          5: 'var(--ds-accent-5)',
          6: 'var(--ds-accent-6)',
          7: 'var(--ds-accent-7)',
          8: 'var(--ds-accent-8)',
          9: 'var(--ds-accent-9)',
          10: 'var(--ds-accent-10)',
          11: 'var(--ds-accent-11)',
          12: 'var(--ds-accent-12)',
          a1: 'var(--ds-accent-a1)',
          a2: 'var(--ds-accent-a2)',
          a3: 'var(--ds-accent-a3)',
          a4: 'var(--ds-accent-a4)',
          a5: 'var(--ds-accent-a5)',
          a6: 'var(--ds-accent-a6)',
          a7: 'var(--ds-accent-a7)',
          a8: 'var(--ds-accent-a8)',
          a9: 'var(--ds-accent-a9)',
          a10: 'var(--ds-accent-a10)',
          a11: 'var(--ds-accent-a11)',
          a12: 'var(--ds-accent-a12)',
        },
      },
      backgroundColor: {
        DEFAULT: 'var(--ds-gray-bg)',
        base: 'var(--ds-gray-base)',
        subtle: 'var(--ds-gray-bg-subtle)',
        hover: 'var(--ds-gray-bg-hover)',
        active: 'var(--ds-gray-bg-active)',
        solid: {
          DEFAULT: 'var(--ds-gray-solid)',
          hover: 'var(--ds-gray-solid-hover)',
        },
        accent: {
          DEFAULT: 'var(--ds-accent-bg)',
          base: 'var(--ds-accent-base)',
          subtle: 'var(--ds-accent-bg-subtle)',
          hover: 'var(--ds-accent-bg-hover)',
          active: 'var(--ds-accent-bg-active)',
          solid: {
            DEFAULT: 'var(--ds-accent-solid)',
            hover: 'var(--ds-accent-solid-hover)',
          },
        },
      },
      borderColor: {
        DEFAULT: 'var(--ds-gray-border)',
        line: 'var(--ds-gray-line)',
        hover: 'var(--ds-gray-border-hover)',
      },
      textColor: {
        base: 'var(--ds-gray-text)',
        contrast: 'var(--ds-gray-text-contrast)',
      },
    },
  },
  plugins: [typographyPlugin],
} satisfies Config;
