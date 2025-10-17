'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const breakfastImages = [
    {
      url: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&h=800&fit=crop",
      alt: "Golden waffle"
    },
    {
      url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=800&fit=crop",
      alt: "Pancakes with berries"
    },
    {
      url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=800&fit=crop",
      alt: "French toast"
    },
    {
      url: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&h=800&fit=crop",
      alt: "Breakfast platter"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % breakfastImages.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [breakfastImages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
      {/* Background overlay with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-800/30"></div>
      
      <main className="relative z-10">
        {/* Hero Section */}
        <div className="p-6">
          <div className="w-full max-w-7xl mx-auto">
            <div className="rounded-3xl relative overflow-hidden w-full min-h-screen">
              {/* Full-screen Image Slider Background */}
              <div className="absolute inset-0">
                {breakfastImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-900/60 to-slate-900/70"></div>

              {/* Content on top of slider */}
              <div className="relative z-10 p-16 min-h-screen flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  {/* Left Content */}
                  <div>
                    <h1 className="text-5xl lg:text-6xl text-white leading-tight mb-8" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 700, letterSpacing: '0.05em' }}>
                      JUST LIKE MOTHER'S
                      <br />AND BETTER
                      <br />THAN OTHERS
                    </h1>
                  </div>

                  {/* Right Content */}
                  <div className="text-right">
                    <p className="text-white/90 text-lg leading-relaxed mb-8 font-bold">
                      Start your morning right with our famous golden waffles, 
                      made fresh daily with the finest ingredients. From classic 
                      buttermilk to seasonal specialties, every bite delivers 
                      comfort and joy. Experience the warmth of home-cooked 
                      goodness at Kingsberry Waffle House.
                    </p>
                  </div>
                </div>

                {/* Slider indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {breakfastImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-white w-8' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Navigation - Kingsberry Waffle House Theme */}
      <nav className="fixed bottom-[18px] left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-amber-900/95 backdrop-blur-lg rounded-[32px] px-6 py-3 shadow-2xl border border-amber-700/50">
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div className="bg-white rounded-[16px] p-3 flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=100&h=100&fit=crop" 
                  alt="Waffle" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-900 font-bold text-sm">KINGSBERRY</span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              <button className="px-6 py-3 text-amber-100 font-medium text-sm hover:bg-amber-800/50 rounded-[20px] transition-all duration-200">
                HOME
              </button>
              <button className="px-6 py-3 text-amber-100 font-medium text-sm hover:bg-amber-800/50 rounded-[20px] transition-all duration-200">
                MENU
              </button>
              <button className="px-6 py-3 text-amber-100 font-medium text-sm hover:bg-amber-800/50 rounded-[20px] transition-all duration-200">
                ABOUT US
              </button>
              <button className="px-6 py-3 text-amber-100 font-medium text-sm hover:bg-amber-800/50 rounded-[20px] transition-all duration-200">
                CONTACT US
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-600 rounded-[16px] flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z"/>
                </svg>
              </button>
              <button className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-600 rounded-[16px] flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
