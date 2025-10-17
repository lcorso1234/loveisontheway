'use client';

import { useEffect, useState } from 'react';

const breakfastImages = [
  {
    url: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&h=800&fit=crop',
    alt: 'Golden waffle',
  },
  {
    url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=800&fit=crop',
    alt: 'Pancakes with berries',
  },
  {
    url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=800&fit=crop',
    alt: 'French toast',
  },
  {
    url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&h=800&fit=crop',
    alt: 'Breakfast platter',
  },
];

const menuSections = [
  {
    title: 'Signature Waffles',
    highlight: 'Neon Drizzle Specials',
    items: [
      {
        name: 'Glow Up Berry Blast',
        price: '$12',
        description: 'Belgian waffle, neon berry compote, whipped cloud, pop rocks crunch.',
      },
      {
        name: 'Midnight Maple Groove',
        price: '$11',
        description: 'Charcoal waffle, smoked maple syrup, chili honey butter, candied pecans.',
      },
      {
        name: 'Electric Citrus Stack',
        price: '$13',
        description: 'Lemon-lime waffle, creamsicle glaze, toasted meringue, sugared peel.',
      },
    ],
  },
  {
    title: 'All-Day Classics',
    highlight: 'Retro Comfort Hits',
    items: [
      {
        name: 'Turbo Biscuit Tower',
        price: '$14',
        description: 'Buttermilk biscuits, sausage gravy, fried egg, jalapeño jam.',
      },
      {
        name: 'Boom Box Breakfast',
        price: '$15',
        description: '2 eggs your way, crispy bacon, disco hash, buttered toast duo.',
      },
      {
        name: 'Mixtape Melt',
        price: '$13',
        description: 'Sourdough melt, maple ham, smoked gouda, spicy honey mustard.',
      },
    ],
  },
  {
    title: 'Sugar Rush Shakes',
    highlight: 'Diner Fountain Vibes',
    items: [
      {
        name: 'Bubblegum Synthwave',
        price: '$8',
        description: 'Bubblegum shake, cotton candy cloud, neon sprinkles, cassette straw.',
      },
      {
        name: 'Cherry Pop Rocket',
        price: '$8',
        description: 'Cherry cola shake, fizz foam topper, maraschino trio, pop candy rim.',
      },
      {
        name: 'Keytar Key Lime',
        price: '$9',
        description: 'Key lime pie shake, graham crumble, lime whip, glow sugar dust.',
      },
    ],
  },
];

type MediaCategoryKey = 'video' | 'podcast' | 'gallery';

const mediaCategories: Record<
  MediaCategoryKey,
  {
    title: string;
    tagline: string;
    items: Array<{
      title: string;
      meta: string;
      description: string;
    }>;
  }
> = {
  video: {
    title: 'Video',
    tagline: 'Retro Reels & Kitchen Feels',
    items: [
      {
        title: 'Behind the Griddle: Neon Waffle Lab',
        meta: '4:32 • VHS Remaster',
        description: 'Step into the glow lab where the signature berry drizzle first came to life.',
      },
      {
        title: 'Breakfast Breakdance Battle',
        meta: '6:18 • Live at Kingsberry',
        description: 'The diner floor turns into a dance-off powered by syrupy beats and sizzling skillets.',
      },
      {
        title: 'Chef Cam: 90’s Remix Specials',
        meta: '3:55 • Chef Toni',
        description: 'Chef Toni drops a weekly remix menu and spins the hottest Saturday playlist.',
      },
      {
        title: 'Midnight Service Neon Tour',
        meta: '5:41 • GlowCam',
        description: 'Ride along for the midnight shift when the diner truly lights up the block.',
      },
    ],
  },
  podcast: {
    title: 'Podcast',
    tagline: 'Stories from the Syrup Booth',
    items: [
      {
        title: 'Episode 12: Diner Daydreams',
        meta: '28:15 • Hosted by DJ Maple',
        description: 'How the Kingsberry crew brainstorms the wildest waffle ideas with local artists.',
      },
      {
        title: 'Episode 18: The Sweet Heat Debate',
        meta: '32:04 • Chef Panel',
        description: 'Spicy maple vs. honey habanero—chefs weigh in and fans call the hotline.',
      },
      {
        title: 'Episode 22: Vinyl & Vanilla',
        meta: '24:19 • Special Guest',
        description: 'A vinyl curator spins breakfast tracks while tasting the newest shake flights.',
      },
      {
        title: 'Episode 27: Graveyard Shift Legends',
        meta: '35:42 • Night Crew',
        description: 'Late-night regulars share stories that made the neon lights legendary.',
      },
    ],
  },
  gallery: {
    title: 'Gallery',
    tagline: 'Polaroids from the Glow Booth',
    items: [
      {
        title: 'Mixtape Brunch Crowd',
        meta: 'Polaroid • 9:30 AM',
        description: 'Stacks of waffles and stacks of cassette tapes traded between tables.',
      },
      {
        title: 'Retro Booth #7',
        meta: '35mm Film • Booth Sessions',
        description: 'Couples leaning into neon-lit milkshakes with checkerboard jackets.',
      },
      {
        title: 'Kingsberry Skate Jam',
        meta: 'Instant Film • Parking Lot',
        description: 'Half-pipe pop-up with maple-scented fog and custom waffle decks.',
      },
      {
        title: 'Glow-in-the-Dark Menu Drop',
        meta: 'Digital • Launch Night',
        description: 'Servers unveiling the new menu under blacklight with glowing typography.',
      },
    ],
  },
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = breakfastImages.length;
  const [activeCategory, setActiveCategory] = useState<MediaCategoryKey>('video');
  const [activePage, setActivePage] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const itemsPerPage = 2;
  const selectedCategory = mediaCategories[activeCategory];
  const totalMediaPages = Math.ceil(selectedCategory.items.length / itemsPerPage);
  const pagedMediaItems = selectedCategory.items.slice(
    activePage * itemsPerPage,
    activePage * itemsPerPage + itemsPerPage,
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'menu', 'blog'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#1f2428] text-white">
      {/* Decorative overlays */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-transparent via-pink-400/60 to-transparent animate-pulse z-10"
          style={{ boxShadow: '0 0 15px rgba(255, 107, 138, 0.4)' }}
        ></div>
        <div
          className="absolute top-0 right-0 w-4 h-full bg-gradient-to-b from-transparent via-orange-300/60 to-transparent animate-pulse z-10"
          style={{ animationDelay: '0.5s', boxShadow: '0 0 15px rgba(255, 179, 71, 0.4)' }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-transparent via-rose-400/60 to-transparent animate-pulse z-10"
          style={{ animationDelay: '1s', boxShadow: '0 0 15px rgba(255, 143, 163, 0.4)' }}
        ></div>
        <div
          className="absolute top-0 left-0 w-4 h-full bg-gradient-to-b from-transparent via-pink-300/60 to-transparent animate-pulse z-10"
          style={{ animationDelay: '1.5s', boxShadow: '0 0 15px rgba(255, 182, 193, 0.35)' }}
        ></div>
        <div
          className="absolute top-20 left-32 w-16 h-16 rounded-full bg-yellow-300/20 animate-bounce z-10"
          style={{ animationDuration: '3s' }}
        ></div>
        <div
          className="absolute bottom-40 left-48 w-12 h-12 rounded-lg bg-orange-300/20 animate-bounce z-10"
          style={{ animationDuration: '4s', animationDelay: '1s', transform: 'rotate(45deg)' }}
        ></div>
        <div
          className="absolute top-1/3 left-1/4 w-10 h-10 bg-pink-300/20 z-10"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', animation: 'spin 8s linear infinite' }}
        ></div>
      </div>

      <main id="home" className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen overflow-hidden rounded-[18px] border border-white/10 bg-gradient-to-br from-gray-800/40 via-gray-700/30 to-gray-800/40 px-6 py-10 lg:px-16 backdrop-blur-sm">
        {/* Left Side - Text Content */}
        <section className="relative z-20 flex flex-col justify-center rounded-t-[18px] bg-gradient-to-br from-gray-800/70 via-gray-700/60 to-gray-800/70 p-12 backdrop-blur-sm lg:rounded-l-[18px] lg:rounded-br-none lg:rounded-tr-none lg:p-16">
          <h1
            className="text-4xl lg:text-6xl text-white leading-tight mb-8 animate-gradient-x"
            style={{
              fontFamily: "'Luckiest Guy', 'Bangers', 'Orbitron', 'Arial Black', cursive",
              fontWeight: 900,
              letterSpacing: '0.08em',
              textShadow:
                '0 0 15px rgba(255, 107, 138, 0.6), 0 0 30px rgba(255, 143, 163, 0.4), 3px 3px 0px #FF8FA3',
            }}
          >
            Just like Mother&apos;s
            <br />
            and better than others
          </h1>
          <p
            className="text-white/95 text-lg lg:text-xl leading-relaxed mb-8 font-bold"
            style={{ textShadow: '0 0 8px rgba(255, 107, 138, 0.5), 2px 2px 0px rgba(255, 143, 163, 0.3)' }}
          >
            Get your groove on with neon waffles, wild toppings, and a blast of 90&apos;s flavor!
            <br />
            Kingsberry Diner serves up breakfast with attitude—bright, bold, and totally rad.
            <br />
            Step into a world of color, comfort, and classic jams.
          </p>
          {/* Slider indicators */}
          <div className="flex space-x-3 mt-8">
            {breakfastImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative h-8 w-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  index === currentSlide
                    ? 'bg-gradient-to-br from-pink-400 to-rose-500 border-yellow-300 text-white scale-125 animate-pulse'
                    : 'bg-gradient-to-br from-gray-600 to-gray-700 border-pink-300/50 text-pink-200 hover:from-pink-500/60 hover:to-rose-500/60 hover:border-yellow-200 hover:scale-110'
                }`}
                style={{ fontWeight: 900, fontSize: '0.85rem', borderWidth: '2px' }}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </section>

        {/* Right Side - Image Slider */}
        <section className="relative overflow-hidden rounded-b-[18px] lg:rounded-r-[18px] lg:rounded-bl-none lg:rounded-tl-none">
          <div className="absolute inset-0">
            {breakfastImages.map((image, index) => (
              <div
                key={image.alt}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/25 via-rose-400/30 to-red-400/25 mix-blend-screen"></div>
        </section>
      </main>

      <section id="menu" className="relative px-6 py-10 lg:px-16 text-white">
        <div className="relative w-full overflow-hidden rounded-[18px] border border-red-400/40 bg-black backdrop-blur-lg">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage:
                'linear-gradient(45deg, #0a0a0a 25%, transparent 25%), linear-gradient(-45deg, #0a0a0a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #0a0a0a 75%), linear-gradient(-45deg, transparent 75%, #0a0a0a 75%)',
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 via-rose-500/20 to-red-700/30 mix-blend-screen"></div>
          <div className="relative space-y-12 p-10">
            <header className="text-center space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-400/70 bg-red-500/30 px-5 py-2 text-xs font-bold uppercase tracking-[0.35em] text-red-100">
                Kingsberry Menu
              </span>
              <h2
                className="text-4xl lg:text-5xl font-black leading-tight text-red-400"
                style={{
                  fontFamily: "'Luckiest Guy', 'Bangers', 'Orbitron', 'Arial Black', cursive",
                  textShadow: '0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(248, 113, 113, 0.6)',
                }}
              >
                90&apos;s Checkered Cool
              </h2>
              <p className="max-w-2xl mx-auto text-red-100/90 text-base lg:text-lg">
                Pulled straight from the Kingsberry Waffle House playbook—bold flavors, big energy, and neon nostalgia on every plate.
              </p>
            </header>
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {menuSections.map((section) => (
              <article
                key={section.title}
                className="group relative overflow-hidden rounded-[28px] border border-red-400/40 bg-red-900/40 backdrop-blur-lg shadow-[0_20px_45px_-20px_rgba(239,68,68,0.7)] transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-rose-500/10 to-red-700/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="relative p-8 space-y-6">
                  <div className="space-y-2">
                    <span className="inline-block rounded-full bg-orange-400/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-orange-200">
                      {section.highlight}
                    </span>
                    <h3
                      className="text-2xl font-bold text-red-300"
                      style={{ fontFamily: "'Luckiest Guy', 'Bangers', 'Orbitron', 'Arial Black', cursive" }}
                    >
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-5">
                    {section.items.map((item) => (
                      <li key={item.name} className="grid gap-2">
                        <div className="flex items-baseline justify-between">
                          <span className="text-lg font-semibold tracking-wide text-red-100">{item.name}</span>
                          <span className="rounded-full bg-red-500/40 px-3 py-1 text-sm font-bold text-red-100">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-sm text-red-100/80">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <button className="inline-flex items-center gap-2 rounded-full border border-orange-300/80 bg-orange-400/30 px-5 py-2 text-sm font-bold uppercase tracking-[0.3em] text-orange-100 transition-all duration-200 hover:bg-orange-400/50">
                      Pre-Order
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section id="blog" className="relative px-6 py-10 lg:px-16 text-white">
        <div className="relative w-full overflow-hidden rounded-[18px] border border-rose-400/25 bg-white/[0.05] backdrop-blur-lg">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#2e0f1a] via-[#440f1f] to-[#2e0f1a]"></div>
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '38px 38px',
            }}
          ></div>
          <div className="relative space-y-12 p-10">
            <header className="text-center space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/70 bg-rose-500/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.35em] text-rose-100">
                Media Mix
              </span>
              <h2
                className="text-4xl lg:text-5xl font-black leading-tight text-rose-400"
                style={{
                  fontFamily: "'Luckiest Guy', 'Bangers', 'Orbitron', 'Arial Black', cursive",
                  textShadow: '0 0 18px rgba(251, 113, 133, 0.6), 0 0 32px rgba(252, 165, 165, 0.4)',
                }}
              >
                Video • Podcast • Gallery
              </h2>
              <p className="max-w-2xl mx-auto text-rose-100/85 text-base lg:text-lg">
                Tune into the Kingsberry broadcast: VHS-style visuals, syrup-smooth stories, and neon snap shots rolling on repeat.
              </p>
            </header>
          <div className="flex flex-wrap justify-center gap-4">
            {(Object.keys(mediaCategories) as MediaCategoryKey[]).map((key) => {
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveCategory(key);
                    setActivePage(0);
                  }}
                  className={`relative flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold uppercase tracking-[0.4em] transition-all duration-200 ${
                    isActive
                      ? 'border-red-300 bg-red-500/30 text-white shadow-[0_0_25px_rgba(239,68,68,0.6)]'
                      : 'border-red-200/30 bg-white/5 text-red-100 hover:bg-white/10'
                  }`}
                >
                  {mediaCategories[key].title}
                  <span className="rounded-full bg-black/40 px-2 py-0.5 text-[0.65rem] tracking-[0.3em]">
                    {mediaCategories[key].items.length}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="relative overflow-hidden rounded-[32px] border border-red-400/30 bg-black/30 backdrop-blur-xl shadow-[0_30px_70px_-30px_rgba(185,28,28,0.7)]">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 via-rose-500/10 to-red-600/10"></div>
            <div className="relative p-10">
              <div className="space-y-6 mb-10">
                <span className="inline-block rounded-full bg-red-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-red-100">
                  {selectedCategory.tagline}
                </span>
                <h3
                  className="text-3xl font-bold"
                  style={{ fontFamily: "'Luckiest Guy', 'Bangers', 'Orbitron', 'Arial Black', cursive" }}
                >
                  {selectedCategory.title} Collection
                </h3>
              </div>

              {/* Video Section - 3 Column Grid */}
              {activeCategory === 'video' && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {selectedCategory.items.map((item, index) => (
                    <div
                      key={item.title}
                      className="group relative overflow-hidden rounded-[20px] border border-red-400/30 bg-gradient-to-br from-red-900/40 to-rose-900/40 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2"
                    >
                      <div className="aspect-video bg-gradient-to-br from-red-600/50 to-rose-600/50 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
                        <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded text-xs font-bold text-white">
                          {item.meta.split('•')[0].trim()}
                        </span>
                      </div>
                      <div className="p-5 space-y-3">
                        <h4 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-red-100/80">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Podcast Section - 3 Column Grid */}
              {activeCategory === 'podcast' && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {selectedCategory.items.map((item, index) => (
                    <div
                      key={item.title}
                      className="group relative overflow-hidden rounded-[20px] border border-rose-400/30 bg-gradient-to-br from-red-900/40 to-rose-900/40 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2"
                    >
                      <div className="aspect-square bg-gradient-to-br from-red-600/50 to-rose-600/50 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
                        <div className="text-center space-y-4">
                          <svg className="w-16 h-16 text-white/80 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" />
                          </svg>
                          <span className="block bg-black/60 px-3 py-1 rounded text-xs font-bold text-white inline-block">
                            {item.meta.split('•')[0].trim()}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 space-y-3">
                        <h4 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-rose-100/80">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Gallery Section - Collage Layout */}
              {activeCategory === 'gallery' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedCategory.items.map((item, index) => {
                    const isLarge = index === 0 || index === 3;
                    return (
                      <div
                        key={item.title}
                        className={`group relative overflow-hidden rounded-[20px] border border-red-400/30 bg-gradient-to-br from-red-900/40 to-orange-900/40 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 ${
                          isLarge ? 'md:col-span-2 md:row-span-2' : ''
                        }`}
                      >
                        <div className={`${isLarge ? 'aspect-square' : 'aspect-square'} bg-gradient-to-br from-red-500/50 to-orange-500/50 relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className={`${isLarge ? 'w-20 h-20' : 'w-12 h-12'} text-white/70`} fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                            </svg>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <p className="text-white font-bold text-sm">{item.title}</p>
                            <p className="text-orange-200 text-xs">{item.meta}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="relative px-6 py-10 lg:px-16">
        <div className="relative w-full overflow-hidden rounded-[18px] border border-red-400/40 bg-gradient-to-br from-red-600 via-rose-500 to-red-700">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          <div className="relative grid gap-10 p-10 text-white lg:grid-cols-2">
            <div className="space-y-6 rounded-[20px] border-4 border-orange-300 bg-red-400 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-3 text-3xl font-black text-gray-900">
                <span className="text-5xl">😢</span>
                <span>Before Kingsberry</span>
              </div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-800 font-bold">Mood Board</p>
              <ul className="space-y-4 text-lg font-bold text-gray-900">
                <li className="flex items-start gap-3">
                  <span>❌</span>
                  <span>Another gray morning with bland diner coffee.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span>❌</span>
                  <span>Breakfast playlists stuck on static and silence.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span>❌</span>
                  <span>Waffles that tasted like nostalgia never happened.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span>❌</span>
                  <span>Zero neon. Zero glow. Zero vibe.</span>
                </li>
              </ul>
            </div>
            <div className="space-y-6 rounded-[20px] border-4 border-rose-300 bg-orange-400 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-3 text-3xl font-black text-gray-900">
                <span className="text-5xl">😄</span>
                <span>After Kingsberry</span>
              </div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-800 font-bold">Glow-Up Report</p>
              <div className="space-y-4 text-lg font-bold text-gray-900">
                <p className="flex items-start gap-3">
                  <span>✨</span>
                  <span>Neon waffle stacks that taste like a Saturday morning cartoon marathon.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span>🎵</span>
                  <span>Mixtape brunch beats mixed live while the syrup sparkles.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span>🎮</span>
                  <span>Servers who know your order and your favorite arcade cabinet.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span>🎉</span>
                  <span>Perfectly loud, wildly colorful, and the happiest breakfast mood ever.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-10 lg:px-16">
        <div className="relative w-full overflow-hidden rounded-[18px] border-4 border-red-400 bg-gradient-to-br from-red-500 via-rose-500 to-red-700 shadow-[0_0_50px_rgba(239,68,68,0.5)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_107%,rgba(253,224,71,0.2),transparent_50%),radial-gradient(circle_at_70%_10%,rgba(34,211,238,0.2),transparent_50%)]"></div>
          <div className="relative p-10 lg:p-16 text-center space-y-8">
            <div className="space-y-4">
              <h2
                className="text-4xl lg:text-6xl font-black leading-tight text-white"
                style={{
                  fontFamily: "'Luckiest Guy', 'Bangers', 'Orbitron', 'Arial Black', cursive",
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 4px 4px 0px rgba(0, 0, 0, 0.3)',
                }}
              >
                Subscribe to Kingsberry!
              </h2>
              <p className="text-xl lg:text-2xl font-bold text-yellow-200 max-w-3xl mx-auto">
                Get the freshest waffle drops, exclusive neon deals, and all the rad diner vibes straight to your inbox! 🌟
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="your.email@awesome.com"
                className="w-full sm:flex-1 px-6 py-4 rounded-full text-lg font-semibold text-gray-900 border-4 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-4 focus:ring-yellow-400"
              />
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-black text-lg uppercase tracking-wider border-4 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                Sign Me Up! 🚀
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-4xl lg:text-5xl pt-4">
              <span className="animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>🧇</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2s' }}>✨</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '2s' }}>🎵</span>
              <span className="animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '2s' }}>🌈</span>
              <span className="animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '2s' }}>💜</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Navigation - Dynamic Glass Effect Theme */}
      <nav className="fixed bottom-[18px] left-1/2 transform -translate-x-1/2 z-50">
        <div 
          className={`relative backdrop-blur-xl rounded-[32px] px-6 py-3 shadow-2xl backdrop-saturate-150 transition-all duration-500 ${
            activeSection === 'home' ? 'bg-rose-900/20 border border-rose-500/30' :
            activeSection === 'menu' ? 'bg-red-900/20 border border-red-500/30' :
            'bg-pink-900/20 border border-pink-500/30'
          }`}
        >
          <div className="flex items-center space-x-6">
            <div className="bg-gradient-to-r from-red-900/40 via-orange-600/30 to-red-900/40 backdrop-blur-sm rounded-[16px] p-3 flex items-center space-x-3 border-2 border-orange-400/30 shadow-lg shadow-red-500/20 hover:shadow-orange-500/40 hover:border-orange-400/50 transition-all duration-300">
              <span
                className="text-transparent bg-gradient-to-r from-orange-300 via-yellow-200 to-red-200 bg-clip-text font-black text-sm tracking-widest transform hover:scale-110 transition-all duration-300 retro-glow cursor-pointer"
                style={{
                  fontFamily: "var(--font-orbitron), 'Courier New', monospace",
                  letterSpacing: '0.15em',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Order Now
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => scrollToSection('home')}
                className={`px-6 py-3 font-medium text-sm rounded-[20px] transition-all duration-200 backdrop-blur-sm ${
                  activeSection === 'home' 
                    ? 'bg-red-500/40 text-white' 
                    : 'text-red-100 hover:bg-red-500/30 hover:text-white'
                }`}
              >
                HOME
              </button>
              <button 
                onClick={() => scrollToSection('menu')}
                className={`px-6 py-3 font-medium text-sm rounded-[20px] transition-all duration-200 backdrop-blur-sm ${
                  activeSection === 'menu' 
                    ? 'bg-red-500/40 text-white' 
                    : 'text-red-100 hover:bg-red-500/30 hover:text-white'
                }`}
              >
                MENU
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className={`px-6 py-3 font-medium text-sm rounded-[20px] transition-all duration-200 backdrop-blur-sm ${
                  activeSection === 'blog' 
                    ? 'bg-red-500/40 text-white' 
                    : 'text-red-100 hover:bg-red-500/30 hover:text-white'
                }`}
              >
                BLOG
              </button>
              <button 
                onClick={() => scrollToSection('home')}
                className="px-6 py-3 text-red-100 font-medium text-sm hover:bg-red-500/30 hover:text-white rounded-[20px] transition-all duration-200 backdrop-blur-sm"
              >
                CONTACT
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <a 
                href="tel:+15555551234"
                className="w-12 h-12 bg-gradient-to-br from-red-600/80 to-red-700/80 backdrop-blur-sm rounded-[16px] flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-lg border border-red-400/20"
                title="Call Us"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </a>
              <button 
                className="w-12 h-12 bg-gradient-to-br from-red-600/80 to-red-700/80 backdrop-blur-sm rounded-[16px] flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-lg border border-red-400/20"
                title="Special Offers & Coupons"
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </button>
              <button 
                className="w-12 h-12 bg-gradient-to-br from-red-600/80 to-red-700/80 backdrop-blur-sm rounded-[16px] flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-lg border border-red-400/20"
                title="Bookmarks"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </button>
            </div>
          </div>
          <div 
            className={`absolute inset-0 rounded-[32px] blur-xl -z-10 animate-pulse transition-all duration-500 ${
              activeSection === 'home' ? 'bg-gradient-to-r from-rose-500/30 to-pink-500/30' :
              activeSection === 'menu' ? 'bg-gradient-to-r from-red-500/30 to-rose-500/30' :
              'bg-gradient-to-r from-pink-500/30 to-rose-500/30'
            }`}
          ></div>
        </div>
      </nav>
    </div>
  );
}
