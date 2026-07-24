/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Habilitar modo oscuro por clase
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        store: {
          bg: '#6E5B3F',       // Dark Brown (usado para fondo oscuro y texto claro)
          card: '#70987F',     // Sage Green (usado para contenedores y bordes)
          accent: '#ADEEC5',   // Mint Green (CTA / Descarga)
          lavender: '#CFADED', // Morado pastel (badges/secundarios)
          beige: '#EDD4AD',    // Beige arena (textos y acentos cálidos)
          
          // Tonos adicionales para soporte Light/Dark impecable
          lightBg: '#F7F5F0',  // Fondo blanco pero no sumamente blanco (off-white cálido)
          lightCard: '#FFFFFF',// Fondo de tarjeta para tema claro
          darkBg: '#1E1810',   // Fondo oscuro profundo cálido (basado en #6E5B3F)
          darkCard: '#2A2218', // Fondo de tarjeta para tema oscuro
          lightText: '#3E3224',// Texto oscuro suave para tema claro
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
