module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  enabled: process.env.NODE_ENV === 'production',
  theme: {
    screens: {
      mobile: '375px',
      desktop: '1440px',
    },
    extend: {
      colors: {
        'dark-blue': '#334253',
        'grayish-blue': '#67727e',
        'very-light-gray': '#F5F6FA',
        'light-gray': '#E9EBF0',
        white: '#ffffff',
        'moderate-blue': '#5357B6',
        'light-grayish-blue': '#C5C6EF',
        'soft-red': '#ED6368',
        'pale-red': '#FFB8BB',
      },
      boxShadow: {
        card: '0px 40px 40px -20px rgba(13, 48, 189, 0.15)',
        button: '0px 20px 20px rgba(56, 42, 225, 0.19)',
      },
      fontSize: {
        body: ['16px', '24px'],
        'heading-lg': '24px',
        'heading-md': '16px',
        flair: '13px',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      spacing: {
        '100px': '100px',
      },
    },
  },
  plugins: [],
}
