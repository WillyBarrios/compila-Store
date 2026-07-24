# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Usuarios de Android que desean descargar e instalar aplicaciones (archivos APK) de forma directa, rápida y sin depender de Google Play Store. También desarrolladores de código abierto que desean distribuir sus APKs a través de una página estática.

## Product Purpose
Proporcionar un catálogo/tienda estática ("App Store" minimalista y responsiva) que lista y distribuye aplicaciones Android de forma directa y segura. Las aplicaciones se alojan en GitHub Pages y los datos se consumen dinámicamente de la API pública de GitHub Releases.

## Positioning
Una tienda "App Store" estática, serverless y 100% transparente. No almacena archivos localmente, no intercepta las descargas ni modifica los APKs; todo proviene directamente del repositorio público de origen de los creadores de software.

## Operating Context
Los usuarios finales acceden principalmente desde sus teléfonos móviles Android (mobile-first) a través de un navegador web, buscando aplicaciones, revisando detalles/notas de versión e instalándolas directamente.

## Capabilities and Constraints
- **Capacidades**: Filtrado por categorías, búsqueda de texto libre, visor de detalles con notas de lanzamiento completas y carrusel de capturas de pantalla simuladas.
- **Restricciones**: Consumo exclusivo de API pública de GitHub (sujeto a límites de peticiones por IP). Sin backend propio.
- **Ajustes de Diseño**: Soporte para tema claro y tema oscuro (Light/Dark Theme). El tema claro tiene un fondo de pantalla blanquecino/off-white (no sumamente blanco) y utiliza la paleta de colores para los elementos visuales.

## Brand Commitments
- Nombre del Producto: **AppHub** (o **Compila Store**).
- Colores de Acento (Paleta provista): `#ADEEC5` (Mint Green), `#CFADED` (Pastel Purple), `#EDD4AD` (Sandy Beige), `#70987F` (Sage Green), y `#6E5B3F` (Dark Brown).

## Evidence on Hand
- Código fuente de la tienda estática React+Vite con Tailwind CSS.
- Archivo `src/apps.json` con la lista de repositorios reales de ejemplo configurados.

## Product Principles
- **Transparencia y Seguridad**: Descargas directas e inalteradas desde los releases oficiales del desarrollador en GitHub.
- **Rendimiento**: Carga rápida y concurrente en dispositivos móviles (mobile-first).
- **Simplicidad**: Interfaz intuitiva y directa enfocada en buscar y descargar.
