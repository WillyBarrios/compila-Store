---
name: AppHub Design System
description: A clean, modern static App Store design with light/dark support, warm off-white and charcoal bases, and a natural forest-sage palette.
colors:
  primary: "#70987F"      # Sage Green - Tarjetas, bordes y contenedores principales
  accent: "#ADEEC5"       # Mint Green - Botones de descarga y CTAs principales
  secondary: "#CFADED"    # Pastel Purple - Versiones, acentos y hover en dark mode
  neutral: "#EDD4AD"      # Sandy Beige - Textos primarios y realces en dark mode
  light-bg: "#F7F5F0"     # Warm Off-White - Fondo en modo claro
  light-card: "#FFFFFF"   # Pure White - Tarjetas en modo claro
  dark-bg: "#1E1810"      # Charcoal Brown - Fondo en modo oscuro
  dark-card: "#2A2218"    # Soft Black-Brown - Tarjetas en modo oscuro
  light-text: "#3E3224"   # Muted Dark Brown - Texto principal en modo claro
typography:
  scale:
    "10": "0.625rem"     # 10px - Badges, etiquetas secundarias
    "12": "0.75rem"      # 12px - Metadatos, etiquetas
    "14": "0.875rem"     # 14px - Controles, cuerpo secundario
    "16": "1rem"         # 16px - Cuerpo principal
    "20": "1.25rem"      # 20px - Títulos de tarjeta
    "24": "1.5rem"       # 24px - Títulos de sección
    "32": "2rem"         # 32px - Títulos principales
  display:
    fontFamily: "Outfit, Inter, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.1
  body:
    fontFamily: "Outfit, Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#1E1810"
    rounded: "{rounded.lg}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
---

# Design System: AppHub

## Overview

**Creative North Star: "El Claro del Bosque" (The Forest Clearing)**

AppHub es una tienda estática diseñada bajo principios de legibilidad inmediata y un alto sentido táctil. El diseño rechaza el típico "blanco cegador" o los "negros de laboratorio" sin vida, optando en su lugar por un fondo claro blanquecino, cálido y orgánico (`#F7F5F0`) que simula el color del papel de fibra natural, y un fondo oscuro profundo a base de carbón y café oscuro (`#1E1810`) que evoca la calidez de la madera oscura.

Los colores de acento se inspiran en elementos orgánicos: verde salvia (`#70987F`) para el esqueleto estructural y los bordes, verde menta brillante (`#ADEEC5`) para las acciones principales (como la instalación de APKs), y morado lavanda (`#CFADED`) para los badges y etiquetas complementarias.

**Key Characteristics:**
- **Calidez Orgánica**: Fondos off-white y café carbón que reducen la fatiga visual.
- **Micro-interacciones Fluidas**: Transiciones suaves al alternar temas y al hacer hover en componentes.
- **Claridad de Estados**: El color acento verde menta está estrictamente reservado para la instalación y descarga de APKs.

## Colors

El sistema utiliza una paleta restrained pero de alto impacto para codificar la interactividad.

### Primary
- **Verde Salvia** (`#70987F`): Utilizado para la identidad estructural. Define los bordes de tarjetas, líneas de separación y fondos del sidebar en tema claro.

### Secondary
- **Verde Menta** (`#ADEEC5`): El color acento CTA. Reservado únicamente para los botones "Instalar" y estados de éxito.
- **Morado Lavanda** (`#CFADED`): Utilizado para badges de versión, resaltados interactivos y el tema activo en el menú lateral.

### Neutral
- **Beige Arena** (`#EDD4AD`): El color del texto primario en tema oscuro y de pequeños acentos ornamentales.
- **Muted Dark Brown** (`#3E3224`): El color del texto principal en tema claro, evitando el contraste estridente del negro puro.

**The Contrast Preservation Rule.** Ningún texto descriptivo puede colocarse sobre fondos de acento sin cumplir con un contraste mínimo de (4.5:1). En modo claro, los textos secundarios se derivan del color base marrón (`#3E3224`) con una opacidad del 70%, no de grises genéricos.

## Typography

**Display Font:** Outfit (con fallback Inter y sans-serif)
**Body Font:** Outfit (con fallback Inter)

La tipografía transmite un carácter moderno, limpio y con una personalidad geométrica suave.

### Hierarchy
- **Display** (ExtraBold (900), `clamp(2rem, 5vw, 3.5rem)`, 1.1): Utilizado para el título principal del catálogo e insignias gigantes.
- **Headline** (Bold (800), 1.75rem, 1.2): Utilizado en el Hero Banner y títulos de la ficha de la app.
- **Title** (Bold (700), 1.25rem, 1.3): Títulos de tarjetas y secciones menores.
- **Body** (Regular (400), 1rem, 1.5): Notas de versión, descripciones y guías de usuario.
- **Label** (Bold (700), 0.75rem, normal, uppercase): Utilizado en badges, categorías e información técnica de la app.

## Layout

AppHub utiliza una grilla fluida adaptada a dispositivos móviles (mobile-first), ya que es el principal medio de consumo de aplicaciones Android.
- **Móviles**: Columnas de grilla simple. Menú de navegación inferior fijo de altura (64px).
- **Escritorio**: Diseño a dos columnas con una barra lateral izquierda fija de ancho (256px) y área de contenido con scroll vertical independiente y margen lateral máximo de (1024px).
- **Espaciado**: Se utiliza un ritmo basado en multiplicadores de 8px (8px, 16px, 24px, 40px) para mantener un ritmo vertical y horizontal constante.

## Elevation & Depth

El sistema es plano por defecto en tema oscuro, utilizando la delimitación por bordes de verde salvia (`#70987F`) para estructurar la profundidad. En tema claro, se permite un sombreado difuso y sutil para elevar las tarjetas sobre el fondo blanquecino.

**The Flat-Border Rule.** En tema oscuro no se utilizan sombras proyectadas; la elevación se representa mediante la delimitación por bordes sólidos de baja opacidad y el cambio sutil en los fondos de tarjetas (`#2A2218`).

## Shapes

- **Bordes Redondeados**: Se aplican radios amplios y amigables para acentuar el carácter táctil de la tienda.
  - Tarjetas pequeñas y badges: (12px / rounded-xl)
  - Tarjetas de aplicación y Hero Banner: (16px / rounded-2xl a 24px / rounded-3xl)
  - Botones principales: (16px / rounded-2xl)

## Components

### Buttons
- **Shape**: Redondeado de (16px / rounded-2xl).
- **Primary (Instalar)**: Fondo verde menta (`#ADEEC5`) y texto marrón oscuro (`#1E1810`). En modo claro, utiliza un fondo verde salvia (`#70987F`) con texto blanco en el botón secundario.
- **Hover**: Transición a morado lavanda (`#CFADED`) en 300ms.

### Cards / Containers
- **Corner Style**: Redondeado de (16px / rounded-2xl).
- **Background**: Blanco puro (`#FFFFFF`) en modo claro; café oscuro suave (`#2A2218`) en modo oscuro.
- **Border**: Borde perimetral sólido de (2px) con opacidad del 20% al 30% del verde salvia (`#70987F`).

### Navigation (Sidebar / Bottom Nav)
- **Fondo**: Beige claro (`#ECEAE4`) en modo claro; café oscuro (`#2A2218`) en modo oscuro.
- **Elemento Activo**: Fondo blanco (modo claro) o fondo oscuro profundo (modo oscuro) con texto en morado lavanda (`#CFADED`).

## Do's and Don'ts

### Do:
- **Do** utilizar el fondo blanquecino `#F7F5F0` en modo claro para evitar la fatiga visual.
- **Do** reservar el color verde menta `#ADEEC5` exclusivamente para llamadas a la acción relacionadas con descargar o instalar APKs.
- **Do** incluir la insignia "Verificado" para transmitir seguridad al usuario.

### Don't:
- **Don't** utilizar sombras negras o grises fuertes en modo claro; usar sombras sutiles con tono sage/beige.
- **Don't** utilizar color negro puro (#000000) o blanco puro (#ffffff) para textos principales.
- **Don't** rebasar el límite de 3 aplicaciones en la sección "Top Descargas".
