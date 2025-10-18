'use client';

import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
}

export function BottomNavigation() {
  const [activeItem, setActiveItem] = useState('home');

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'HOME',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      ),
      href: '#home'
    },
    {
      id: 'menu',
      label: 'MENU',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h10"/>
        </svg>
      ),
      href: '#menu'
    },
    {
      id: 'media',
      label: 'MEDIA',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      ),
      href: '#blog'
    },
    {
      id: 'share',
      label: 'SHARE',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 5.08V3l5 4-5 4V8.9C9 8.9 6 10 4 13c1-4 4-6.9 9-7.92zM5 18h2v2H5zm6 0h2v2h-2zm6 0h2v2h-2z"/>
        </svg>
      ),
      href: '#share'
    }
  ];

  const handleItemClick = (itemId: string, href?: string) => {
    setActiveItem(itemId);
    if (href) {
      // anchor navigation
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-[18px] left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-red-900/20 backdrop-blur-xl border border-red-500/30 rounded-[45px] px-4 py-3 shadow-2xl shadow-red-500/20 backdrop-saturate-150">
        <div className="flex items-center space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id, item.href)}
              className={`
                flex flex-col items-center justify-center
                px-3 py-2 rounded-[30px] min-w-[60px] h-[60px]
                transition-all duration-300 ease-in-out
                group hover:scale-105
                ${activeItem === item.id 
                  ? 'bg-gradient-to-t from-red-600/80 to-red-500/80 text-white shadow-lg shadow-red-500/40 backdrop-blur-sm' 
                  : 'text-red-200 hover:text-red-100 hover:bg-red-500/20 backdrop-blur-sm'
                }
              `}
            >
              <div className={`
                transition-transform duration-200
                ${activeItem === item.id ? 'scale-110' : 'group-hover:scale-105'}
              `}>
                {item.icon}
              </div>
              <span className={`
                text-xs font-semibold mt-1 transition-colors duration-200
                ${activeItem === item.id ? 'text-white' : 'text-red-200/90'}
              `}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Red glass glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-rose-500/30 rounded-[45px] blur-xl -z-10 animate-pulse"></div>
    </nav>
  );
}
