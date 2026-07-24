import React from 'react';

export default function HeroBanner({ app, onSelectApp }) {
  if (!app) return null;

  // Buscar si hay archivo APK en el release actual
  const apkAsset = app.release?.assets?.find(asset => asset.name.endsWith('.apk'));
  const downloadUrl = apkAsset ? apkAsset.browser_download_url : app.release?.html_url;

  return (
    <div className="w-full bg-gradient-to-br from-[#E3ECE6] to-[#D4E3D9] dark:from-store-card dark:to-store-card/40 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-8 mb-10 shadow-md border border-store-card/20 dark:border-store-card/10 relative overflow-hidden group transition-all duration-300">
      
      {/* Elemento Decorativo de Fondo */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-store-card/10 dark:bg-store-accent/10 rounded-full blur-3xl pointer-events-none group-hover:bg-store-card/15 dark:group-hover:bg-store-accent/15 transition-all duration-700"></div>

      {/* Contenido del Texto */}
      <div className="flex-1 space-y-4 md:space-y-6 text-left z-10">
        <div className="inline-flex items-center gap-1.5 bg-store-card/10 border border-store-card/30 dark:bg-store-accent/20 dark:border-store-accent/35 text-store-card dark:text-store-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          ⭐ Elección del Editor
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl md:text-5xl font-black text-store-lightText dark:text-store-beige tracking-tight leading-none">
            {app.name}
          </h2>
          <p className="text-sm font-semibold text-store-card dark:text-store-lavender tracking-wide">
            Desarrollado por @{app.owner}
          </p>
        </div>

        <p className="text-sm md:text-base text-store-lightText/90 dark:text-store-beige/95 max-w-xl leading-relaxed">
          {app.description || "Experimenta el rendimiento y privacidad al máximo nivel con este lanzamiento recomendado."}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 pt-2">
          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-store-card dark:bg-store-accent text-white dark:text-store-bg font-extrabold px-6 py-3.5 rounded-2xl hover:bg-store-card/80 dark:hover:bg-store-lavender transition-all duration-300 shadow-md hover:scale-[1.03] active:scale-[0.97] flex items-center gap-2 text-sm cursor-pointer"
            >
              <span>Instalar</span>
              {apkAsset && <span className="text-xs font-normal opacity-80">({(apkAsset.size / (1024 * 1024)).toFixed(1)} MB)</span>}
            </a>
          )}
          
          <button
            onClick={() => onSelectApp(app)}
            className="border-2 border-store-card/30 hover:border-store-card dark:border-store-beige/35 dark:hover:border-store-lavender text-store-lightText dark:text-store-beige font-extrabold px-6 py-3.5 rounded-2xl hover:bg-white/40 dark:hover:bg-store-bg/30 transition-all duration-300 text-sm cursor-pointer"
          >
            Ver Detalles
          </button>
        </div>
      </div>

      {/* Ilustración / Icono Gigante de la Aplicación */}
      <div className="shrink-0 z-10 w-44 h-44 md:w-56 md:h-56 bg-white/60 dark:bg-store-bg/60 border border-store-card/30 dark:border-store-card/40 rounded-[2.5rem] flex items-center justify-center relative shadow-xl overflow-hidden group-hover:scale-105 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-store-card/10 dark:from-store-lavender/20 to-transparent"></div>
        <div className="text-center space-y-2">
          <span className="text-6xl md:text-7xl block animate-pulse">📱</span>
          <span className="text-[10px] bg-store-card dark:bg-store-lavender text-white dark:text-store-bg px-2.5 py-0.5 rounded-full font-extrabold shadow-sm uppercase font-mono tracking-wider">
            {app.release?.tag_name || 'vLatest'}
          </span>
        </div>
      </div>

    </div>
  );
}
