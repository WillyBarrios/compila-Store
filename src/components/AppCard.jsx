import React from 'react';

export default function AppCard({ app, onSelectApp }) {
  // Calificación simulada para el estilo tienda
  const mockRating = (app.id === 'newpipe' ? '4.8' : app.id === 'ankidroid' ? '4.9' : '4.7');

  return (
    <div 
      onClick={() => onSelectApp(app)}
      className="w-full bg-store-lightCard border-2 border-store-card/20 dark:bg-store-darkCard dark:border-store-card/30 hover:border-store-card dark:hover:border-store-lavender rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm hover:shadow-md group"
    >
      
      {/* Icono de la App (Caja con gradiente y emoji) */}
      <div className="w-16 h-16 bg-[#F3F1EC] dark:bg-store-bg/40 rounded-2xl flex items-center justify-center relative shrink-0 shadow-inner group-hover:bg-[#EAE7DF] dark:group-hover:bg-store-card/50 transition-colors overflow-hidden border border-store-card/15 dark:border-store-card/25">
        <div className="absolute inset-0 bg-gradient-to-tr from-store-card/10 dark:from-store-lavender/10 to-transparent"></div>
        <span className="text-3xl z-10 transition-transform duration-300 group-hover:scale-110">📱</span>
      </div>

      {/* Información Resumida */}
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex justify-between items-start gap-1">
          <h3 className="font-extrabold text-store-lightText dark:text-store-beige truncate text-base leading-tight group-hover:text-store-card dark:group-hover:text-store-accent transition-colors duration-200">
            {app.name}
          </h3>
        </div>

        <p className="text-xs text-store-lightText/70 dark:text-store-beige/70 font-medium truncate">
          {app.category} • @{app.owner}
        </p>

        {/* Fila de estrellas y estado gratis */}
        <div className="flex items-center gap-3 pt-0.5">
          <span className="inline-flex items-center text-xs font-bold text-store-lightText/60 dark:text-store-beige/60 gap-0.5">
            {mockRating} <span className="text-store-card dark:text-store-lavender">★</span>
          </span>
          <span className="text-[10px] text-store-card bg-store-card/10 border border-store-card/20 dark:text-store-accent dark:bg-store-accent/15 dark:border-store-accent/25 px-1.5 py-0.2 rounded font-bold uppercase">
            Gratis
          </span>
        </div>
      </div>

      {/* Flecha indicadora de navegación */}
      <div className="text-store-lightText/40 dark:text-store-beige/35 group-hover:text-store-card dark:group-hover:text-store-lavender transition-colors pr-1 shrink-0">
        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </div>

    </div>
  );
}
