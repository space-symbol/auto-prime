import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  important: true,
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '768px',
        md: '1024px',
        lg: '1440px',
        xl: '1600px',
      },
    },
    extend: {
      colors: {
        purple: 'var(--purple-color)',
        purpleDark: 'var(--purple-dark-color)',
        purpleLight: 'var(--purple-light-color)',
        gold: 'var(--gold-color)',
        goldLight: 'var(--gold-light-color)',
        orange: 'var(--orange-color-default)',
        gray: 'var(--gray-color)',
        grayLight: 'var(--gray-light-color)',
        grayDark: 'var(--gray-dark-color)',
        warningRed: 'var(--warning-red-color)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        show: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        'translate-right': {
          from: {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(0)',
          },
        },
        'translate-left': {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'show-delay': 'show 0.2s 0.1s forwards ease',
        show: 'show 0.2s ease',
        'translate-right': 'translate-right 0.2s forwards ease',
        'translate-left': 'translate-left 0.2s forwards ease',
      },
      margin: {
        navbar: 'var(--navbar-width)',
        topBar: 'var(--top-bar-height)',
        page: 'var(--page-paddings)',
        pageX: 'var(--page-padding-x)',
        pageY: 'var(--page-padding-y)',
        pageLeft: 'var(--page-padding-left)',
        pageRight: 'var(--page-padding-right)',
        pageTop: 'var(--page-padding-top)',
        pageBottom: 'var(--page-padding-bottom)',
      },
      padding: {
        navbar: 'var(--navbar-width)',
        topBar: 'var(--top-bar-height)',
        page: 'var(--page-paddings)',
        pageX: 'var(--page-padding-x)',
        pageY: 'var(--page-padding-y)',
        pageLeft: 'var(--page-padding-left)',
        pageRight: 'var(--page-padding-right)',
        pageTop: 'var(--page-padding-top)',
        pageBottom: 'var(--page-padding-bottom)',
      },
      width: {
        navbar: 'var(--navbar-width)',
      },
      height: {
        header: 'var(--header-height)',
        topBar: 'var(--top-bar-height)',
      },
      fontFamily: {
        roboto: 'var(--roboto(-font)',
        rubik: 'var(--rubik-font)',
        montserrat: 'var(--montserrat-font)',
        golos: 'var(--golos-font)',
      },
      fontSize: {
        inherit: 'inherit',
        xxs: 'var(--font-size-xss)',
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-xs)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
      },
      transitionDuration: {
        DEFAULT: 'var(--transition-duration)',
      },
      transitionProperty: {
        margin: 'margin',
        width: 'width',
        height: 'height',
        invisible: 'visibility width height opacity',
        position: 'position',
        'flex-grow': 'flex-grow',
      },
      zIndex: {
        topBar: 'var(--top-bar-z-index)',
        navbar: 'var(--navbar-z-index)',
        backdrop: 'var(--backdrop-z-index)',
      },
      backgroundColor: {
        gray: 'var(--gray-color)',
        grayDark: 'var(--gray-dark-color)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
