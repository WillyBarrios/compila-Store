import React from 'react';

export default function AppDetails({ app, onBack }) {
  if (!app) return null;

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  // Formatear tamaño
  const formatSize = (bytes) => {
    if (!bytes) return 'N/A';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const apkAsset = app.release?.assets?.find(asset => asset.name.endsWith('.apk'));
  const downloadUrl = apkAsset ? apkAsset.browser_download_url : app.release?.html_url;
  const apkSize = apkAsset ? formatSize(apkAsset.size) : 'N/A';
  const publishedDate = app.release ? formatDate(app.release.published_at) : 'N/A';

  // Datos simulados consistentes para enriquecer la interfaz estilo AppHub
  const mockRating = (app.id === 'newpipe' ? '4.8' : app.id === 'ankidroid' ? '4.9' : '4.7');
  const mockReviews = (app.id === 'newpipe' ? '12K' : app.id === 'ankidroid' ? '34K' : '8K');
  const mockDownloads = (app.id === 'newpipe' ? '5M+' : app.id === 'ankidroid' ? '10M+' : '1M+');

  return (
    <div className="w-full text-left space-y-8 fade-in pb-24 md:pb-8 transition-colors duration-300">
      
      {/* Botón de Regresar */}
      <button
        id="btn-back-to-catalog"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-bold text-store-card dark:text-store-lavender hover:text-store-lightText dark:hover:text-store-accent transition-colors duration-200 cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Volver al Catálogo</span>
      </button>

      {/* Cabecera de la Ficha del App */}
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        
        {/* Icono de la App */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white dark:bg-store-darkCard rounded-[2rem] flex items-center justify-center relative shadow-md shrink-0 overflow-hidden border border-store-card/20 dark:border-store-card/30">
          <div className="absolute inset-0 bg-gradient-to-br from-store-card/10 dark:from-store-lavender/25 to-transparent"></div>
          <span className="text-5xl sm:text-6xl z-10">📱</span>
        </div>

        {/* Detalles e Instalar */}
        <div className="space-y-4 flex-1">
          <div className="space-y-1">
            <div className="flex items-center flex-wrap gap-2.5">
              <h2 className="text-3xl font-black text-store-lightText dark:text-store-beige tracking-tight leading-tight">
                {app.name}
              </h2>
              <span className="bg-store-card/10 border border-store-card/25 text-store-card dark:bg-store-accent/20 dark:border-store-accent/40 dark:text-store-accent px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                Verificado
              </span>
            </div>
            <p className="text-sm font-semibold text-store-card dark:text-store-lavender">
              @{app.owner}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            {downloadUrl ? (
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-store-card dark:bg-store-accent text-white dark:text-store-bg font-extrabold px-8 py-3.5 rounded-2xl hover:bg-store-card/95 dark:hover:bg-store-lavender transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] text-sm flex items-center gap-2 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Instalar APK</span>
              </a>
            ) : (
              <button disabled className="bg-[#EAE7DF] text-store-lightText/40 dark:bg-store-darkCard dark:text-store-beige/50 font-bold px-8 py-3.5 rounded-2xl text-sm border border-store-card/20 dark:border-store-card/30 cursor-not-allowed">
                No Disponible
              </button>
            )}
            
            <a
              href={`https://github.com/${app.owner}/${app.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-store-card/20 text-store-lightText hover:border-store-card hover:bg-store-card/5 dark:border-store-beige/25 dark:text-store-beige dark:hover:border-store-lavender dark:hover:bg-store-card/30 font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 text-sm"
            >
              Código Fuente
            </a>
          </div>
        </div>
      </div>

      {/* Fila de Estadísticas Rápidas */}
      <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#E2DFD7] dark:border-store-card/25 text-center">
        <div className="space-y-1">
          <div className="text-base sm:text-lg font-black text-store-lightText dark:text-store-beige flex items-center justify-center gap-0.5">
            {mockRating} <span className="text-store-card dark:text-store-lavender text-sm">★</span>
          </div>
          <p className="text-[10px] sm:text-xs text-store-lightText/60 dark:text-store-beige/60 uppercase font-semibold tracking-wider">{mockReviews} Reseñas</p>
        </div>
        <div className="space-y-1 border-x border-[#E2DFD7] dark:border-store-card/25">
          <div className="text-base sm:text-lg font-black text-store-lightText dark:text-store-beige">{mockDownloads}</div>
          <p className="text-[10px] sm:text-xs text-store-lightText/60 dark:text-store-beige/60 uppercase font-semibold tracking-wider">Descargas</p>
        </div>
        <div className="space-y-1">
          <div className="text-base sm:text-lg font-black text-store-lightText dark:text-store-beige">{apkSize}</div>
          <p className="text-[10px] sm:text-xs text-store-lightText/60 dark:text-store-beige/60 uppercase font-semibold tracking-wider">Tamaño APK</p>
        </div>
      </div>

      {/* Contenido Principal de Detalles (2 Columnas en Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Izquierda: Capturas y Notas */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Sección de Capturas de Pantalla (Renderizadas en CSS con Paleta) */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-store-lightText dark:text-store-beige tracking-tight">Capturas de Pantalla</h3>
            
            {/* Scroll horizontal de mockups de teléfonos */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-store-card scrollbar-track-store-bg">
              
              {/* Celular Mockup 1 */}
              <div className="w-40 h-72 bg-[#ECEAE4] dark:bg-store-darkCard border-4 border-[#D2CDC3] dark:border-store-card rounded-[1.8rem] p-2 shrink-0 flex flex-col justify-between overflow-hidden relative shadow-md transition-colors">
                <div className="w-16 h-3 bg-[#D2CDC3] dark:bg-store-card rounded-full mx-auto mb-2"></div>
                <div className="flex-1 bg-white dark:bg-store-darkBg rounded-2xl p-2 flex flex-col justify-between transition-colors">
                  <div className="space-y-1.5">
                    <div className="h-2 bg-store-card/25 dark:bg-store-card/40 rounded w-2/3"></div>
                    <div className="h-1 bg-store-card/10 dark:bg-store-card/20 rounded w-1/2"></div>
                    <div className="grid grid-cols-2 gap-1 mt-2">
                      <div className="h-6 bg-store-card/20 dark:bg-store-card/30 rounded-lg"></div>
                      <div className="h-6 bg-store-card/20 dark:bg-store-card/30 rounded-lg"></div>
                    </div>
                  </div>
                  <div className="h-12 bg-store-card/10 dark:bg-store-accent/20 border border-store-card/20 dark:border-store-accent/30 rounded-xl flex items-center justify-center text-[10px] text-store-card dark:text-store-accent font-bold">
                    Dashboard
                  </div>
                </div>
              </div>

              {/* Celular Mockup 2 */}
              <div className="w-40 h-72 bg-[#ECEAE4] dark:bg-store-darkCard border-4 border-[#D2CDC3] dark:border-store-card rounded-[1.8rem] p-2 shrink-0 flex flex-col justify-between overflow-hidden relative shadow-md transition-colors">
                <div className="w-16 h-3 bg-[#D2CDC3] dark:bg-store-card rounded-full mx-auto mb-2"></div>
                <div className="flex-1 bg-white dark:bg-store-darkBg rounded-2xl p-2 flex flex-col justify-between transition-colors">
                  <div className="space-y-2">
                    <div className="h-2 bg-store-card/25 dark:bg-store-card/40 rounded w-1/2"></div>
                    <div className="space-y-1 mt-2">
                      <div className="h-6 bg-store-card/10 dark:bg-store-card/20 rounded-lg flex items-center px-1.5 justify-between">
                        <div className="h-1.5 bg-store-lightText/20 dark:bg-store-beige/40 rounded w-1/2"></div>
                        <div className="w-2 h-2 rounded-full bg-store-card dark:bg-store-accent"></div>
                      </div>
                      <div className="h-6 bg-store-card/10 dark:bg-store-card/20 rounded-lg flex items-center px-1.5 justify-between">
                        <div className="h-1.5 bg-store-lightText/20 dark:bg-store-beige/40 rounded w-2/3"></div>
                        <div className="w-2 h-2 rounded-full bg-store-card dark:bg-store-accent"></div>
                      </div>
                      <div className="h-6 bg-store-card/10 dark:bg-store-card/20 rounded-lg flex items-center px-1.5 justify-between">
                        <div className="h-1.5 bg-store-lightText/20 dark:bg-store-beige/40 rounded w-1/3"></div>
                        <div className="w-2 h-2 rounded-full bg-store-lavender"></div>
                      </div>
                    </div>
                  </div>
                  <div className="h-4 bg-store-card/10 dark:bg-store-card/20 rounded w-full"></div>
                </div>
              </div>

              {/* Celular Mockup 3 */}
              <div className="w-40 h-72 bg-[#ECEAE4] dark:bg-store-darkCard border-4 border-[#D2CDC3] dark:border-store-card rounded-[1.8rem] p-2 shrink-0 flex flex-col justify-between overflow-hidden relative shadow-md transition-colors">
                <div className="w-16 h-3 bg-[#D2CDC3] dark:bg-store-card rounded-full mx-auto mb-2"></div>
                <div className="flex-1 bg-white dark:bg-store-darkBg rounded-2xl p-2 flex flex-col justify-between transition-colors">
                  <div className="space-y-2">
                    <div className="h-2 bg-store-card/25 dark:bg-store-card/40 rounded w-3/4"></div>
                    <div className="w-full aspect-square bg-store-card/5 dark:bg-store-card/15 rounded-xl border border-store-card/20 dark:border-store-card/35 flex items-center justify-center text-xl">
                      📊
                    </div>
                  </div>
                  <div className="h-2 bg-store-card/20 dark:bg-store-card/30 rounded w-2/3 mx-auto"></div>
                </div>
              </div>

              {/* Celular Mockup 4 */}
              <div className="w-40 h-72 bg-[#ECEAE4] dark:bg-store-darkCard border-4 border-[#D2CDC3] dark:border-store-card rounded-[1.8rem] p-2 shrink-0 flex flex-col justify-between overflow-hidden relative shadow-md transition-colors">
                <div className="w-16 h-3 bg-[#D2CDC3] dark:bg-store-card rounded-full mx-auto mb-2"></div>
                <div className="flex-1 bg-white dark:bg-store-darkBg rounded-2xl p-2 flex flex-col justify-between transition-colors">
                  <div className="space-y-3">
                    <div className="h-2 bg-store-card/25 dark:bg-store-card/40 rounded w-1/2"></div>
                    <div className="space-y-1.5">
                      <div className="h-1.5 bg-store-card/10 dark:bg-store-card/20 rounded w-full"></div>
                      <div className="h-1.5 bg-store-card/10 dark:bg-store-card/20 rounded w-full"></div>
                      <div className="h-1.5 bg-store-card/10 dark:bg-store-card/20 rounded w-4/5"></div>
                    </div>
                  </div>
                  <div className="h-8 bg-store-card/15 dark:bg-store-lavender/25 rounded-lg flex items-center justify-center text-[10px] text-store-card dark:text-store-lavender font-bold">
                    Configuración
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Notas de Versión */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-store-lightText dark:text-store-beige tracking-tight border-b border-[#E2DFD7] dark:border-store-card/20 pb-2">
              Novedades del último lanzamiento ({app.release?.tag_name || 'vLatest'})
            </h3>
            <div className="bg-white dark:bg-store-darkCard border border-store-card/15 dark:border-store-card/35 rounded-2xl p-5 md:p-6 shadow-sm overflow-x-auto transition-colors">
              <p className="text-sm text-store-lightText/90 dark:text-store-beige/90 leading-relaxed whitespace-pre-wrap font-sans">
                {app.release?.body || 'No se han detallado notas de la versión en este release.'}
              </p>
            </div>
          </div>

        </div>

        {/* Columna Derecha: Información Adicional */}
        <div className="space-y-6 lg:border-l lg:border-[#E2DFD7] lg:dark:border-store-card/25 lg:pl-8">
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-store-lightText dark:text-store-beige tracking-tight">Información de la App</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-[#E2DFD7] dark:border-store-card/10">
                <span className="text-store-lightText/60 dark:text-store-beige/60">Versión</span>
                <span className="font-bold text-store-lightText dark:text-store-beige">{app.release?.tag_name || 'vLatest'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#E2DFD7] dark:border-store-card/10">
                <span className="text-store-lightText/60 dark:text-store-beige/60">Actualizado</span>
                <span className="font-bold text-store-lightText dark:text-store-beige">{publishedDate}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#E2DFD7] dark:border-store-card/10">
                <span className="text-store-lightText/60 dark:text-store-beige/60">Tamaño del APK</span>
                <span className="font-bold text-store-lightText dark:text-store-beige">{apkSize}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#E2DFD7] dark:border-store-card/10">
                <span className="text-store-lightText/60 dark:text-store-beige/60">Categoría</span>
                <span className="font-bold text-store-card dark:text-store-lavender">{app.category}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#E2DFD7] dark:border-store-card/10">
                <span className="text-store-lightText/60 dark:text-store-beige/60">Desarrollador</span>
                <span className="font-bold text-store-lightText dark:text-store-beige">@{app.owner}</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de Seguridad (Safe to use) */}
          <div className="bg-[#70987F]/10 border border-[#70987F]/25 dark:bg-store-accent/10 dark:border-store-accent/30 rounded-2xl p-5 space-y-2.5 transition-colors">
            <div className="flex items-center gap-2 text-store-card dark:text-store-accent">
              <span className="text-xl">🛡️</span>
              <h4 className="font-extrabold text-sm uppercase tracking-wide">Uso Seguro Verificado</h4>
            </div>
            <p className="text-xs text-store-lightText/80 dark:text-store-beige/80 leading-relaxed">
              Esta aplicación es compilada y distribuida directamente desde los repositorios de GitHub del desarrollador sin modificaciones externas de terceros.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
