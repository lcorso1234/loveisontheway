'use client';

import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
}

export function BottomNavigation() {
  const [activeItem, setActiveItem] = useState('section-1');

  const navItems: NavItem[] = [
    {
      id: 'section-1',
      label: 'HOME',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      ),
      href: '#section-1'
    },
    {
      id: 'section-2',
      label: 'VIDEOS',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      ),
      href: '#section-2'
    },
    {
      id: 'section-3',
      label: 'PODCAST',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a3 3 0 0 0-3 3c0 1.642 1.358 3 3 3s3-1.358 3-3a3 3 0 0 0-3-3zm7 9h-1.046A4.494 4.494 0 0 0 16.5 9.5a4.494 4.494 0 0 0-1.454 1.5H5c-.552 0-1 .448-1 1s.448 1 1 1h10.046c.064.343.157.677.273 1H5c-.552 0-1 .448-1 1s.448 1 1 1h10.319c.116.323.209.657.273 1H5c-.552 0-1 .448-1 1s.448 1 1 1h10.592c.026.167.058.333.097.5H5c-.552 0-1 .448-1 1s.448 1 1 1h14c.552 0 1-.448 1-1V12c0-.552-.448-1-1-1z"/>
        </svg>
      ),
      href: '#section-3'
    },
    {
      id: 'section-4',
      label: 'TUTOR',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 3.68 2.89 6.72 6.5 6.98V20h1v-4.02C16.11 15.72 19 12.68 19 9c0-3.87-3.13-7-7-7z"/>
        </svg>
      ),
      href: '#section-4'
    },
    {
      id: 'section-5',
      label: 'TRANSFORM',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 13l-10-5v6l10 5 10-5v-6l-10 5z"/>
        </svg>
      ),
      href: '#section-5'
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