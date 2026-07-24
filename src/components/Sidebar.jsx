import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, onBackToHome, darkMode, setDarkMode }) {
  const menuItems = [
    { id: 'explorar', name: 'Explorar', icon: '🔍' },
    { id: 'mis-apps', name: 'Mis Apps', icon: '📦' }
  ];

  return (
    <>
      {/* Sidebar para Escritorio (Desktop) */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-[#ECEAE4] border-r border-[#E2DFD7] dark:bg-store-darkCard dark:border-store-card/15 h-screen sticky top-0 text-store-lightText dark:text-store-beige p-6 justify-between shrink-0 transition-colors duration-300">
        <div className="space-y-8">
          {/* Logo */}
          <div 
            onClick={onBackToHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <span className="text-3xl transition-transform duration-300 group-hover:scale-110">📦</span>
            <div className="font-extrabold text-2xl tracking-tight text-store-lightText dark:text-store-beige">
              App<span className="text-store-card dark:text-store-accent">Hub</span>
            </div>
          </div>

          {/* Menú de Navegación */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`sidebar-tab-${item.id}`}
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all duration-300 text-left cursor-pointer ${
                    isActive 
                      ? 'bg-white text-store-card dark:bg-store-darkBg dark:text-store-lavender shadow-md translate-x-1' 
                      : 'hover:bg-white/50 dark:hover:bg-store-darkBg/30 text-store-lightText/70 dark:text-store-beige/70 hover:text-store-lightText dark:hover:text-store-beige'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Botón de Cambio de Tema + Perfil */}
        <div className="space-y-4 border-t border-[#E2DFD7] dark:border-store-card/15 pt-6">
          {/* Alternador de Tema Claro/Oscuro */}
          <button
            id="theme-toggle-desktop"
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-store-card/30 hover:border-store-card dark:border-store-card/25 dark:hover:border-store-lavender transition-all text-xs font-bold cursor-pointer"
          >
            <span>{darkMode ? 'Tema Claro ☀️' : 'Tema Oscuro 🌙'}</span>
            <span className="text-sm">{darkMode ? '☀️' : '🌙'}</span>
          </button>

          {/* Info del Desarrollador */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-store-card/20 dark:bg-store-darkBg flex items-center justify-center font-bold text-store-card dark:text-store-accent border border-store-card/10">
              A
            </div>
            <div>
              <h4 className="text-xs font-bold text-store-lightText dark:text-store-beige">Desarrollador</h4>
              <p className="text-[10px] text-store-lightText/60 dark:text-store-beige/65">Modo Administrador</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Barra de Navegación Inferior para Móviles */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#ECEAE4] border-t border-[#E2DFD7] dark:bg-store-darkCard dark:border-store-card/15 z-50 flex justify-around py-3 px-6 shadow-xl transition-colors duration-300">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              id={`mobile-tab-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-store-card dark:text-store-lavender font-bold scale-105' 
                  : 'text-store-lightText/70 dark:text-store-beige/70 hover:text-store-lightText dark:hover:text-store-beige'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] tracking-wide">{item.name}</span>
            </button>
          );
        })}
        {/* Toggle para móviles */}
        <button
          id="theme-toggle-mobile"
          onClick={() => setDarkMode(!darkMode)}
          className="flex flex-col items-center gap-1 py-1 px-4 text-store-lightText/70 dark:text-store-beige/70"
        >
          <span className="text-xl">{darkMode ? '☀️' : '🌙'}</span>
          <span className="text-[10px] tracking-wide">Tema</span>
        </button>
      </nav>
    </>
  );
}
