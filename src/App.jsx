import React, { useState, useEffect } from 'react';
import appsConfig from './apps.json';
import AppCard from './components/AppCard';
import SkeletonCard from './components/SkeletonCard';
import Sidebar from './components/Sidebar';
import HeroBanner from './components/HeroBanner';
import AppDetails from './components/AppDetails';

export default function App() {
  const [appsData, setAppsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [activeTab, setActiveTab] = useState('explorar');
  const [selectedApp, setSelectedApp] = useState(null);

  // Inicializar estado del Modo Oscuro (con persistencia en localStorage)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Si no hay preferencia guardada, verificar el sistema del usuario
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Escuchar cambios de darkMode y aplicar la clase en html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Obtener categorías únicas dinámicamente
  const categories = ['Todas', ...new Set(appsConfig.map(app => app.category))];

  useEffect(() => {
    async function fetchReleases() {
      setLoading(true);
      try {
        const promises = appsConfig.map(async (app) => {
          try {
            const response = await fetch(`https://api.github.com/repos/${app.owner}/${app.repo}/releases/latest`, {
              headers: {
                'Accept': 'application/vnd.github.v3+json'
              }
            });
            
            if (!response.ok) {
              if (response.status === 404) {
                throw new Error('Sin releases o repo privado');
              } else if (response.status === 403) {
                throw new Error('Límite de API excedido');
              }
              throw new Error(`Error: ${response.status}`);
            }
            
            const releaseData = await response.json();
            return {
              ...app,
              release: releaseData,
              error: null
            };
          } catch (err) {
            return {
              ...app,
              release: null,
              error: err.message
            };
          }
        });

        const results = await Promise.all(promises);
        setAppsData(results);
      } catch (err) {
        console.error('Error general al cargar los releases:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchReleases();
  }, []);

  // Filtrar aplicaciones según la búsqueda y categoría
  const filteredApps = appsData.filter(app => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.description && app.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      app.repo.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todas' || app.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Elegir la primera aplicación exitosa como la destacada del Editor
  const featuredApp = appsData.find(app => !app.error && app.release);

  // Volver al inicio del catálogo
  const handleBackToHome = () => {
    setSelectedApp(null);
    setActiveTab('explorar');
  };

  return (
    <div className="min-h-screen bg-store-lightBg dark:bg-store-darkBg flex flex-col md:flex-row text-store-lightText dark:text-store-beige font-sans transition-colors duration-300">
      
      {/* Sidebar de Navegación Responsivo */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedApp(null);
        }} 
        onBackToHome={handleBackToHome}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Contenedor de Contenido Principal (Scrollable) */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto pb-20 md:pb-0 scrollbar-thin">
        
        {/* Cabecera superior con buscador */}
        <header className="border-b border-[#E2DFD7] dark:border-store-card/25 py-5 px-6 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-2xl md:hidden">📦</span>
            <h1 className="text-xl font-black text-store-lightText dark:text-store-beige tracking-tight md:hidden">
              App<span className="text-store-card dark:text-store-accent">Hub</span>
            </h1>
            <span className="text-sm text-store-card dark:text-store-lavender font-bold hidden md:inline-block">
              {activeTab === 'explorar' ? 'Tienda de Aplicaciones' : 'Mi Biblioteca'}
            </span>
          </div>

          {/* Buscador visible solo en la pestaña Explorar y si no hay una app seleccionada */}
          {activeTab === 'explorar' && !selectedApp && (
            <div className="w-full sm:w-80 relative">
              <input
                id="search-input"
                type="text"
                placeholder="Buscar aplicaciones o creadores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-store-card/20 text-store-lightText rounded-xl py-2.5 pl-10 pr-4 placeholder-store-lightText/40 focus:outline-none focus:border-store-card dark:bg-store-darkBg dark:border-store-card/40 dark:text-store-beige dark:placeholder-store-beige/40 dark:focus:border-store-lavender transition-all duration-300 text-sm shadow-sm"
              />
              <svg className="absolute left-3.5 top-3.5 h-4 w-4 text-store-lightText/40 dark:text-store-beige/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}
        </header>

        {/* Cuerpo del Catálogo */}
        <main className="flex-1 p-6 md:p-10 max-w-5xl w-full mx-auto">
          
          {/* PESTAÑA: EXPLORAR */}
          {activeTab === 'explorar' && (
            <>
              {selectedApp ? (
                /* Ficha de Detalles de la App */
                <AppDetails 
                  app={selectedApp} 
                  onBack={() => setSelectedApp(null)} 
                />
              ) : (
                /* Vista general de la tienda */
                <div className="space-y-10 fade-in">
                  
                  {/* Categorías flotantes */}
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none shrink-0">
                    {categories.map((category) => (
                      <button
                        id={`category-btn-${category.toLowerCase().replace(/\s+/g, '-')}`}
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                          selectedCategory === category
                            ? 'bg-store-card text-white dark:bg-store-accent dark:text-store-bg shadow-md'
                            : 'bg-white border border-store-card/25 text-store-lightText hover:border-store-card dark:bg-store-darkBg dark:border-store-card/35 dark:text-store-beige dark:hover:border-store-lavender'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* Carga Inicial / Skeletons */}
                  {loading ? (
                    <div className="space-y-10">
                      <div className="h-60 bg-store-card/5 border-2 border-store-card/15 dark:bg-store-card/10 dark:border-store-card/25 rounded-3xl animate-pulse"></div>
                      <div className="space-y-4">
                        <div className="h-6 bg-store-card/15 dark:bg-store-card/45 rounded w-1/4"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="h-20 bg-store-card/10 dark:bg-store-card/20 rounded-2xl animate-pulse"></div>
                          <div className="h-20 bg-store-card/10 dark:bg-store-card/20 rounded-2xl animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ) : filteredApps.length > 0 ? (
                    <div className="space-y-12">
                      
                      {/* 1. Hero Banner (Elección del Editor) - Solo si hay app exitosa y no se está buscando */}
                      {featuredApp && searchQuery === '' && selectedCategory === 'Todas' && (
                        <HeroBanner 
                          app={featuredApp} 
                          onSelectApp={setSelectedApp} 
                        />
                      )}

                      {/* 2. Top Charts (Top Descargas) */}
                      {searchQuery === '' && selectedCategory === 'Todas' && (
                        <div className="space-y-4">
                          <h3 className="text-xl font-black text-store-lightText dark:text-store-beige tracking-tight flex items-center gap-2">
                            <span>📈</span> Top descargas
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {appsData.slice(0, 3).map((app, index) => {
                              const mockRating = (app.id === 'newpipe' ? '4.8' : app.id === 'ankidroid' ? '4.9' : '4.7');
                              return (
                                <div
                                  key={app.id}
                                  onClick={() => !app.error && setSelectedApp(app)}
                                  className={`flex items-center gap-4 bg-white border border-store-card/15 dark:bg-store-card/10 dark:border-store-card/20 rounded-2xl p-4 cursor-pointer hover:border-store-card dark:hover:border-store-lavender hover:scale-[1.01] transition-all duration-300 ${app.error ? 'opacity-60 cursor-not-allowed' : ''}`}
                                >
                                  <span className="text-3xl font-black text-store-card/40 dark:text-store-lavender/50 font-mono w-6 text-center">
                                    {index + 1}
                                  </span>
                                  <div className="w-12 h-12 bg-[#F3F1EC] dark:bg-store-card/40 rounded-xl flex items-center justify-center text-xl relative shrink-0">
                                    📱
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h4 className="font-extrabold text-store-lightText dark:text-store-beige truncate text-sm leading-snug">
                                      {app.name}
                                    </h4>
                                    <p className="text-[10px] text-store-lightText/60 dark:text-store-beige/50 truncate">
                                      {app.category} • {mockRating}★
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 3. Catálogo General / Grid de Apps */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-black text-store-lightText dark:text-store-beige tracking-tight flex items-center gap-2">
                          <span>📦</span> Recomendadas para ti
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {filteredApps.map((app) => {
                            if (app.error) {
                              // Tarjeta de error simplificada para mantener el diseño premium
                              return (
                                <div key={app.id} className="w-full bg-store-lightCard border-2 border-store-card/15 dark:bg-store-darkCard dark:border-store-card/20 rounded-2xl p-4 flex items-center gap-4 opacity-75">
                                  <div className="w-16 h-16 bg-[#F3F1EC] dark:bg-store-card/10 rounded-2xl flex items-center justify-center border border-store-card/10 dark:border-store-card/15">
                                    ⚠️
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h3 className="font-bold text-store-lightText/60 dark:text-store-beige/65 line-through truncate text-sm">{app.name}</h3>
                                    <p className="text-[10px] text-store-card dark:text-store-lavender/50">Error al consultar repositorio</p>
                                    <a 
                                      href={`https://github.com/${app.owner}/${app.repo}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[10px] text-store-card dark:text-store-accent font-bold hover:underline"
                                    >
                                      Visitar GitHub
                                    </a>
                                  </div>
                                </div>
                              );
                            }

                            return (
                              <AppCard
                                key={app.id}
                                app={app}
                                onSelectApp={setSelectedApp}
                              />
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  ) : (
                    /* Sin Resultados */
                    <div className="text-center py-16 border-2 border-dashed border-store-card/15 dark:border-store-card/20 rounded-3xl max-w-md mx-auto">
                      <span className="text-4xl block mb-3">🔍</span>
                      <h3 className="text-lg font-bold text-store-lightText dark:text-store-beige mb-1">Sin resultados</h3>
                      <p className="text-sm text-store-lightText/60 dark:text-store-beige/60">
                        No encontramos aplicaciones que coincidan con la búsqueda.
                      </p>
                    </div>
                  )}

                </div>
              )}
            </>
          )}

          {/* PESTAÑA: MIS APPS (Guía de instalación de APKs) */}
          {activeTab === 'mis-apps' && (
            <div className="max-w-2xl mx-auto space-y-8 text-left fade-in">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-store-lightText dark:text-store-beige tracking-tight">Cómo Instalar archivos APK</h2>
                <p className="text-sm text-store-lightText/70 dark:text-store-beige/70">
                  Dado que los archivos APK se instalan de forma externa a Google Play Store, debes habilitar los permisos necesarios en tu dispositivo Android.
                </p>
              </div>

              <div className="space-y-6">
                
                {/* Paso 1 */}
                <div className="flex gap-4 items-start bg-white border border-store-card/15 dark:bg-store-card/10 dark:border-store-card/20 p-5 rounded-2xl transition-colors">
                  <div className="w-8 h-8 rounded-full bg-store-card text-white dark:bg-store-accent dark:text-store-bg flex items-center justify-center font-extrabold shrink-0 shadow-sm">
                    1
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-store-lightText dark:text-store-beige text-base">Habilita las Fuentes Desconocidas</h4>
                    <p className="text-xs text-store-lightText/75 dark:text-store-beige/75 leading-relaxed">
                      Ve a **Ajustes** &gt; **Seguridad** o **Aplicaciones** en tu teléfono Android, y activa la casilla de **Fuentes desconocidas** o **Instalar aplicaciones desconocidas** (para el navegador web que utilices).
                    </p>
                  </div>
                </div>

                {/* Paso 2 */}
                <div className="flex gap-4 items-start bg-white border border-store-card/15 dark:bg-store-card/10 dark:border-store-card/20 p-5 rounded-2xl transition-colors">
                  <div className="w-8 h-8 rounded-full bg-store-card text-white dark:bg-store-accent dark:text-store-bg flex items-center justify-center font-extrabold shrink-0 shadow-sm">
                    2
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-store-lightText dark:text-store-beige text-base">Descarga el APK</h4>
                    <p className="text-xs text-store-lightText/75 dark:text-store-beige/75 leading-relaxed">
                      Entra a esta App Store desde tu celular Android, selecciona tu aplicación favorita y presiona **Instalar APK** para descargar el archivo de forma directa y segura.
                    </p>
                  </div>
                </div>

                {/* Paso 3 */}
                <div className="flex gap-4 items-start bg-white border border-store-card/15 dark:bg-store-card/10 dark:border-store-card/20 p-5 rounded-2xl transition-colors">
                  <div className="w-8 h-8 rounded-full bg-store-card text-white dark:bg-store-accent dark:text-store-bg flex items-center justify-center font-extrabold shrink-0 shadow-sm">
                    3
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-store-lightText dark:text-store-beige text-base">Ejecuta el archivo e Instala</h4>
                    <p className="text-xs text-store-lightText/75 dark:text-store-beige/75 leading-relaxed">
                      Una vez completada la descarga, abre la barra de notificaciones o tu administrador de archivos, selecciona el archivo `.apk` descargado y confirma la instalación.
                    </p>
                  </div>
                </div>

              </div>

              {/* Caja de seguridad e integridad */}
              <div className="bg-[#70987F]/10 border border-[#70987F]/25 dark:bg-store-accent/10 dark:border-store-accent/35 p-5 rounded-2xl space-y-2 transition-colors">
                <h4 className="font-bold text-store-card dark:text-store-accent text-sm flex items-center gap-1.5">
                  <span>🛡️</span> Descargas 100% Transparentes
                </h4>
                <p className="text-xs text-store-lightText/80 dark:text-store-beige/80 leading-relaxed">
                  Todos los archivos que descargas a través de **AppHub** se obtienen directamente de los servidores públicos de GitHub controlados por los autores originales. La aplicación no almacena, modifica ni procesa los instaladores.
                </p>
              </div>
            </div>
          )}

        </main>

        {/* Footer estático */}
        <footer className="border-t border-[#E2DFD7] dark:border-store-card/20 py-6 text-center text-xs text-store-lightText/50 dark:text-store-beige/40 shrink-0 mt-auto transition-colors">
          <p>© {new Date().getFullYear()} AppHub • Desarrollado estáticamente utilizando la API de GitHub.</p>
        </footer>

      </div>

    </div>
  );
}
