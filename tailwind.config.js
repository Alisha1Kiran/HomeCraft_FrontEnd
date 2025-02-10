import daisyui from 'daisyui'

export default {
  daisyui: {
    themes: ['light', 'dark'],
  },
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}
