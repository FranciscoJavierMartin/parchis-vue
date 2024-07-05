import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        screen: 'var(--bg-image)',
      },
      colors: {
        game: {
          red: '#e02a29',
          blue: '#0b92fe',
          yellow: '#fbc620',
          green: '#84c525',
        },
      },
      keyframes: {
        bounceIn: {
          'from, 20%, 40%, 60%, 80%, to': {
            'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          },
          '0%': {
            opacity: '0',
            transform: 'scale3d(0.3, 0.3, 0.3)',
          },
          '20%': {
            transform: 'scale3d(1.1, 1.1, 1.1)',
          },
          '40%': {
            transform: 'scale3d(0.9, 0.9, 0.9)',
          },
          '60%': {
            opacity: '1',
            transform: 'scale3d(1.03, 1.03, 1.03)',
          },
          '80%': {
            transform: 'scale3d(0.97, 0.97, 0.97)',
          },
          to: {
            opacity: '1',
            transform: 'scale3d(1, 1, 1)',
          },
        },
        bounceOut: {
          '20%': {
            transform: 'scale3d(0.9, 0.9, 0.9)',
          },
          '50%, 55%': {
            opacity: '1',
            transform: 'scale3d(1.1, 1.1, 1.1)',
          },
          to: {
            opacity: '0',
            transform: 'scale3d(0.3, 0.3, 0.3)',
          },
        },
        fadeInLeft: {
          from: {
            opacity: '0',
            transform: 'translate3d(-100%, 0, 0)',
          },
          to: {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translate3d(0, 100%, 0)',
          },
          to: {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
        },
        fadeOutDown: {
          from: {
            opacity: '1',
          },
          to: {
            opacity: '0',
            transform: 'translate3d(0, 100%, 0)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
