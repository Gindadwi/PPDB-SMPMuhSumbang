
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },

      backgroundImage: {
        imageDekstop: ("url(/src/assets/bg-dekstop.png)"),
        imageMobile: ("url(/src/assets/bg-Mobile.png)"),
        imageInformasi: ("url(/src/assets/bg-informasi.jpg)"),
      },

      colors: {
        warnaUtama: "#004B79",
        btnColor: "#1D87CA",
        AboutFooter: '#0768A4'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

