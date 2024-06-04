import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['selector'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    screens: {
      smallest: '320px',
      xss: '375px',
      xs: '425px',
      sm: '768px',
      md: '1024px',
      lg: '1440px',
      xl: '1600px',
      '2xl': '1920px',
      '3xl': '2560px',
    },
    extend: {
      colors: {
        title: 'hsl(var(--title))',
        skeleton: 'hsl(var(--skeleton))',
        gold: 'hsl(var(--gold))',
        orange: 'hsl(var(--orange-default))',
        danger: 'hsl(var(--desctrutive))',
        warning: 'hsl(var(--warning-red))',
        link: 'hsl(var(--link))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'var(--ring)',
        page: 'hsl(var(--page))',
        background: 'hsl(var(--background))',
        'background-invert': 'hsl(var(--background-invert))',
        navbar: 'hsl(var(--navbar))',
        'navbar-foreground': 'hsl(var(--navbar-foreground))',
        scrollbar: 'hsl(var(--scrollbar))',
        table: {
          DEFAULT: 'hsl(var(--table))',
          header: {
            DEFAULT: 'hsl(var(--table-header))',
            foreground: 'hsl(var(--table-header-foreground))',
          },
          body: {
            DEFAULT: 'hsl(var(--table-body))',
            foreground: 'hsl(var(--table-body-foreground))',
          },
          footer: {
            DEFAULT: 'hsl(var(--table-footer))',
            foreground: 'hsl(var(--table-footer-foreground))',
          },
        },
        dialog: {
          DEFAULT: 'hsl(var(--dialog))',
          foreground: 'hsl(var(--dialog-foreground))',
        },
        toaser: {
          success: {
            DEFAULT: 'hsl(var(--toast-success))',
            foreground: 'hsl(var(--toast-success-foreground))',
          },
          error: {
            DEFAULT: 'hsl(var(--toast-error))',
            foreground: 'hsl(var(--toast-error-foreground))',
          },
          warning: {
            DEFAULT: 'hsl(var(--toast-warning))',
            foreground: 'hsl(var(--toast-warning-foreground))',
          },
          info: {
            DEFAULT: 'hsl(var(--toast-info))',
            foreground: 'hsl(var(--toast-info-foreground))',
          },
        },
        foreground: {
          DEFAULT: 'hsl(var(--foreground))',
          secondary: 'hsl(var(--foreground-secondary))',
        },
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
        'accent-active': {
          DEFAULT: 'hsl(var(--accent-active))',
          foreground: 'hsl(var(--accent-active-foreground))',
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
        'cancel-shake': {
          '0%': {
            transform: 'translateX(1%)',
          },
          '100%': {
            border: "0.1em solid 'var(--warning) !important'",
            transform: 'translateX(-1%)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.4s ease-out',
        'accordion-up': 'accordion-up 0.2s ease',
        'show-delay': 'show 0.2s 0.1s forwards ease',
        show: 'show 0.2s ease',
        'translate-right': 'translate-right 0.2s 0s 1 forwards ease',
        'translate-left': 'translate-left 0.2s 0s 1 forwards ease',
        'cancel-shake': 'cancel-shake 0.1s 0s 3 forwards ease',
      },
      margin: {
        navbar: 'var(--navbar-width)',
        page: 'var(--page-paddings)',
        'page-x': 'var(--page-paddings-x)',
        'page-y': 'var(--page-paddings-y)',
        'page-left': 'var(--page-padding-left)',
        'page-right': 'var(--page-padding-right)',
        'page-top': 'var(--page-padding-top)',
        'page-bottom': 'var(--page-padding-bottom)',
        'top-bar': 'var(--top-bar-height)',
      },
      padding: {
        navbar: 'var(--navbar-width)',
        'top-bar': 'var(--top-bar-height)',
        page: 'var(--page-paddings)',
        'page-x': 'var(--page-paddings-x)',
        'page-y': 'var(--page-paddings-y)',
        'page-left': 'var(--page-padding-left)',
        'page-right': 'var(--page-padding-right)',
        'page-top': 'var(--page-padding-top)',
        'page-bottom': 'var(--page-padding-bottom)',
      },
      width: {
        navbar: 'var(--navbar-width)',
      },
      height: {
        header: 'var(--header-height)',
        'top-bar': 'var(--top-bar-height)',
      },
      maxHeight: {
        full: '100%',
      },
      maxWidth: {
        full: '100%',
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
        sm: 'var(--font-size-sm)',
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
        'left-right': 'left, right',
        left: 'left',
        right: 'right',
        'top-bottom': 'top, bottom',
        top: 'top',
        bottom: 'bottom',
      },
      zIndex: {
        'top-bar': 'var(--top-bar-z-index)',
        navbar: 'var(--navbar-z-index)',
        backdrop: 'var(--backdrop-z-index)',
        'modal-menu': 'var(--modal-menu-z-index)',
      },
      boxShadow: {
        right: '0.15rem 0 1rem 0.5em hsl(0 0 0%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
