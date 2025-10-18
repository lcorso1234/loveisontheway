'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { BottomNavigation } from './components/BottomNavigation';

const ORDER_URL = 'https://order.online/store/22933558?pickup=true&hideModal=true&redirected=true';
const PHONE_NUMBER = '+17025550123';
const MAPS_URL = 'https://maps.google.com/?q=Kingsberry+Diner';
const MENU_PDF_URL = 'https://kingsberrywafflehouse.com/wp-content/uploads/2022/02/Kingsberry-Full-Menu-No-Prices.pdf';

const breakfastImages = [
  {
    url: '/images/breakfast-1.jpg',
    alt: 'Golden waffle',
  },
  {
    url: '/images/breakfast-2.jpg',
    alt: 'Pancakes with berries',
  },
  {
    url: '/images/breakfast-3.jpg',
    alt: 'French toast',
  },
  {
    url: '/images/breakfast-4.jpg',
    alt: 'Breakfast platter',
  },
];

const menuSections = [
  {
    title: 'Waffle Icons',
    highlight: 'Stacked & Loaded',
    items: [
      {
        name: 'Eskimo Waffle',
        price: '$15',
        description: 'A classic waffle buried under ice cream, strawberries, whipped cream, and a chocolate drizzle.',
      },
      {
        name: 'Twins Delight',
        price: '$13',
        description: 'Two mini waffles layered with sausage patties, scrambled eggs, melted cheese, and a side of hash browns.',
      },
      {
        name: 'Four Kings',
        price: '$16',
        description: 'Four petite waffles crowned with different fruit toppings, finished with whipped cream and powdered sugar.',
      },
    ],
  },
  {
    title: 'Skillet Legends',
    highlight: 'Sizzled in Cast Iron',
    items: [
      {
        name: '3-Meat Skillet',
        price: '$17',
        description: 'Ham, bacon, sausage, peppers, onions, cheddar, and two eggs any style over golden potatoes.',
      },
      {
        name: 'Mediterranean Skillet',
        price: '$18',
        description: 'Gyros, feta, tomatoes, onions, and potatoes topped with two eggs any style.',
      },
      {
        name: 'Back of the Yard Skillet',
        price: '$20',
        description: 'Sirloin steak with potatoes, peppers, onions, mushrooms, mozzarella, and two eggs any style.',
      },
    ],
  },
  {
    title: 'Breakfast Heavy Hitters',
    highlight: 'Plates for the Bold',
    items: [
      {
        name: 'Country Breakfast',
        price: '$16',
        description: 'Two eggs, bacon strips, sausage patties, hash browns, and an English muffin stacked for champions.',
      },
      {
        name: 'Huevos Rancheros',
        price: '$14',
        description: 'Three sunnyside eggs over tortillas with avocado, jalapeños, hash browns, and cheddar.',
      },
      {
        name: 'The Big Kahuna',
        price: '$22',
        description: 'Ham off the bone, pancakes, eggs, bacon, sausage links, hash browns, and a crown of French toast.',
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
    title: 'Chef Cam: 90\'s Remix Specials',
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
  const selectedCategory = mediaCategories[activeCategory];
  const [supportsWebShare, setSupportsWebShare] = useState(false);
  const [showInstallTips, setShowInstallTips] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setSupportsWebShare(true);
    }
  }, []);

  const handleShare = async () => {
    if (typeof window === 'undefined') {
      return;
    }

    const shareUrl = window.location.href;
    const shareData = {
      title: 'Kingsberry Diner',
      text: 'Slide into the Kingsberry vibe—neon brunch beats and midnight waffles.',
      url: shareUrl,
    };

    try {
      if (supportsWebShare && navigator.share) {
        await navigator.share(shareData);
        setShareFeedback('Shared! You just spread the Kingsberry glow.');
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareFeedback('Link copied! Drop it in the group chat.');
      } else {
        setShareFeedback(`Copy & share this link: ${shareUrl}`);
      }
    } catch {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(shareUrl);
          setShareFeedback('Link copied! Drop it in the group chat.');
        } else {
          setShareFeedback(`Copy & share this link: ${shareUrl}`);
        }
      } catch {
        setShareFeedback(`Copy & share this link: ${shareUrl}`);
      }
    } finally {
      setShowInstallTips(false);
      window.setTimeout(() => setShareFeedback(null), 4000);
    }
  };

  const handleCopyLink = async () => {
    if (typeof window === 'undefined') {
      return;
    }

    const shareUrl = window.location.href;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareFeedback('Link copied! Time to tag your crew.');
      } else {
        setShareFeedback(`Copy & share this link: ${shareUrl}`);
      }
    } catch {
      setShareFeedback(`Copy & share this link: ${shareUrl}`);
    } finally {
      window.setTimeout(() => setShareFeedback(null), 4000);
    }
  };

  const toggleInstallTips = () => setShowInstallTips((prev) => !prev);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#12050a] text-white">
        <main id="home" className="w-full grid grid-cols-1 gap-12 lg:grid-cols-2 min-h-screen px-6 py-16 lg:px-20">
          {/* Left Side - Text Content */}
          <section className="flex flex-col justify-center space-y-6 rounded-[28px] border border-white/5 bg-[#1b0710]/70 p-10 lg:p-14 backdrop-blur-md">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
              Celebrating John Mantas
            </span>
            <h1
              className="text-4xl lg:text-6xl text-white leading-tight mb-4 animate-gradient-x"
              style={{
                fontFamily: "'Luckiest Guy', 'Bangers', 'Orbitron', 'Arial Black', cursive",
                fontWeight: 900,
                letterSpacing: '0.08em',
                textShadow:
                  '0 0 18px rgba(255, 107, 138, 0.65), 0 0 32px rgba(255, 143, 163, 0.45), 3px 3px 0px #FF8FA3',
              }}
            >
              Welcome to John&apos;s House
            </h1>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-rose-200/80">Where the morning never ends</p>
            <div className="space-y-4 text-white/90 text-base lg:text-lg leading-relaxed">
              <p>John Mantas built Kingsberry as a love letter to every neighbor craving a sunrise encore.</p>
              <p>Pull up a booth, soak in the vinyl glow—this is home, and we&apos;re serving you.</p>
              <p>Every plate is a standing ovation.</p>
            </div>
            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-rose-300/60 bg-gradient-to-r from-rose-500/60 via-pink-500/50 to-orange-400/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.35em] text-white transition-all duration-200 hover:shadow-[0_20px_65px_-35px_rgba(255,120,150,0.95)] focus:outline-none focus:ring-2 focus:ring-rose-300/70 focus:ring-offset-2 focus:ring-offset-black"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 4h-2l-1 2v2h2l3.6 7.59L9 18c-.55 0-1 .45-1 1s.45 1 1 1h10v-2H10.42c.03-.08.05-.17.08-.25l.9-1.75H18c.38 0 .72-.21.89-.55L22 8H6.21L7 6h11V4H7z" />
                </svg>
                Order Now
              </a>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.35em] text-white transition-all duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1C10.29 21 3 13.71 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.25 1.01l-2.2 2.21z" />
                </svg>
                Call Ahead
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-purple-300/40 bg-gradient-to-r from-purple-500/40 via-indigo-500/30 to-blue-500/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.35em] text-white transition-all duration-200 hover:shadow-[0_20px_65px_-35px_rgba(129,140,248,0.9)] focus:outline-none focus:ring-2 focus:ring-purple-300/60 focus:ring-offset-2 focus:ring-offset-black"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Visit Us
              </a>
            </div>
          </section>

          {/* Right Side - Image Slider */}
          <section className="flex flex-col items-center justify-center space-y-6">
            <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-black/30 shadow-[0_30px_60px_-20px_rgba(255,107,138,0.4)]">
              <Image
                key={breakfastImages[currentSlide].url}
                src={breakfastImages[currentSlide].url}
                alt={breakfastImages[currentSlide].alt}
                fill
                priority
                sizes="(min-width: 1024px) 420px, 85vw"
                className="object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                  {breakfastImages[currentSlide].alt}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {breakfastImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 w-8 rounded-full transition-colors duration-300 ${
                    index === currentSlide ? 'bg-rose-400' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </section>
        </main>
      </div>

      <section id="menu" className="relative px-6 py-16 lg:px-20 text-white">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 via-orange-400 to-pink-500 opacity-80"></div>
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-rose-500/30 blur-3xl"></div>
        <div className="absolute -bottom-40 right-0 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl"></div>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-[#04070a]/90 shadow-[0_45px_120px_-50px_rgba(255,96,140,0.8)] backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,99,132,0.18),transparent_60%)]"></div>
          <div className="absolute inset-0 opacity-30 mix-blend-soft-light bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_12px)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px] opacity-40"></div>
          <div className="relative z-10 px-8 py-12 lg:px-16 lg:py-16 space-y-12">
            <header className="flex flex-col items-center text-center space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2 text-[0.65rem] font-bold uppercase tracking-[0.45em] text-rose-100">
                Kingsberry Menu
              </span>
              <h2
                className="text-4xl lg:text-6xl font-black leading-tight text-transparent bg-gradient-to-r from-rose-200 via-pink-100 to-orange-200 bg-clip-text"
                style={{
                  fontFamily: "'Luckiest Guy', 'Bangers', 'Orbitron', 'Arial Black', cursive",
                  textShadow: '0 12px 30px rgba(244, 114, 182, 0.35)',
                }}
              >
                Badass &amp; Elegant
              </h2>
              <p className="max-w-2xl text-sm lg:text-base text-rose-100/80">
                Neon heat meets midnight velvet. Curated plates, gilded finishes, and a menu that
                flexes as hard as your favorite track on repeat.
              </p>
              <a
                href={MENU_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-rose-500/40 via-pink-500/30 to-orange-400/30 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white transition-all duration-200 hover:shadow-[0_18px_55px_-30px_rgba(255,120,150,0.85)] focus:outline-none focus:ring-2 focus:ring-rose-300/60 focus:ring-offset-2 focus:ring-offset-black"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM13 3.5L18.5 9H13zM8 13h8v2H8zm0 4h8v2H8z" />
                </svg>
                View Full Menu PDF
              </a>
            </header>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {menuSections.map((section, sectionIndex) => (
                <article
                  key={section.title}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_35px_90px_-40px_rgba(255,105,180,0.9)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-fuchsia-500/15 to-orange-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="absolute -top-8 right-6 h-24 w-24 rounded-full bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="relative flex h-full flex-col gap-8 p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-rose-300/40 bg-rose-500/20 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-rose-100">
                          {section.highlight}
                        </span>
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xs font-bold uppercase tracking-[0.35em] text-rose-100/80">
                          {sectionIndex + 1}
                        </span>
                      </div>
                      <div>
                        <h3
                          className="text-2xl font-extrabold text-rose-100"
                          style={{ fontFamily: "'Luckiest Guy', 'Bangers', 'Orbitron', 'Arial Black', cursive" }}
                        >
                          {section.title}
                        </h3>
                        <div className="mt-3 h-[1px] w-full bg-gradient-to-r from-transparent via-rose-400/50 to-transparent"></div>
                      </div>
                    </div>
                    <ul className="space-y-6">
                      {section.items.map((item) => (
                        <li key={item.name} className="group/item relative pl-6">
                          <span className="absolute left-0 top-3 h-2 w-2 rounded-full bg-gradient-to-br from-rose-500 via-orange-400 to-amber-300 shadow-[0_0_12px_rgba(255,105,180,0.9)]"></span>
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="text-base font-semibold tracking-wide text-white group-hover/item:text-rose-200 transition-colors">
                              {item.name}
                            </span>
                            <span className="rounded-full border border-rose-300/40 bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-rose-100">
                              {item.price}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-rose-100/70">{item.description}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-2">
                      <a
                        href={`tel:${PHONE_NUMBER}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-rose-500/40 via-pink-500/30 to-orange-400/40 px-6 py-2 text-xs font-bold uppercase tracking-[0.35em] text-white transition-all duration-200 hover:shadow-[0_15px_45px_-25px_rgba(255,120,150,0.9)] focus:outline-none focus:ring-2 focus:ring-rose-300/60 focus:ring-offset-2 focus:ring-offset-black"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1C10.29 21 3 13.71 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.25 1.01l-2.2 2.21z" />
                        </svg>
                        Reserve a Booth
                      </a>
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
                    onClick={() => setActiveCategory(key)}
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

                {activeCategory === 'video' && (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {selectedCategory.items.map((item) => (
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

                {activeCategory === 'podcast' && (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {selectedCategory.items.map((item) => (
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
                            <span className="block bg-black/60 px-3 py-1 rounded text-xs font-bold text-white">
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
                          <div
                            className={`${isLarge ? 'aspect-square' : 'aspect-square'} bg-gradient-to-br from-red-500/50 to-orange-500/50 flex items-center justify-center relative overflow-hidden`}
                          >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0%,rgba(255,107,138,0.12)_60%,rgba(255,143,163,0.08)_100%)]"></div>
                            <div className="text-center space-y-4">
                              <svg className="w-16 h-16 text-white/80 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" />
                              </svg>
                              <span className="block bg-black/60 px-3 py-1 rounded text-xs font-bold text-white">
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
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="share" className="relative px-6 py-16 lg:px-20 text-white">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-rose-500 via-purple-400 to-orange-400 opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,105,180,0.25),transparent_60%)]"></div>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-white/10 bg-[#06080d]/90 backdrop-blur-xl shadow-[0_35px_120px_-60px_rgba(255,99,132,0.9)]">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(6,8,13,0.8))] opacity-60"></div>
          <div className="relative z-10 p-10 lg:p-16 space-y-10">
            <header className="text-center space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-rose-100">
                Spread the Glow
              </span>
              <h2
                className="text-4xl font-black text-transparent bg-gradient-to-r from-rose-200 via-pink-100 to-orange-100 bg-clip-text"
                style={{
                  fontFamily: "'Luckiest Guy', 'Bangers', 'Orbitron', 'Arial Black', cursive",
                  textShadow: '0 18px 35px rgba(244, 114, 182, 0.35)',
                }}
              >
                Share &amp; Save Kingsberry
              </h2>
              <p className="mx-auto max-w-3xl text-sm lg:text-base text-rose-100/75">
                Lock our late-night waffles onto your home screen and beam this neon vibe to the squad. One tap and they are in the booth with you.
              </p>
            </header>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-full border border-rose-300/50 bg-gradient-to-r from-rose-500/50 via-pink-500/40 to-orange-400/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.35em] text-white transition-all duration-200 hover:shadow-[0_18px_55px_-30px_rgba(255,120,150,0.9)]"
                type="button"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13 5.08V3l5 4-5 4V8.9C9 8.9 6 10 4 13c1-4 4-6.9 9-7.92zM5 18h2v2H5zm6 0h2v2h-2zm6 0h2v2h-2z" />
                </svg>
                {supportsWebShare ? 'Share from Device' : 'Share Kingsberry'}
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-[0.35em] text-white transition-all duration-200 hover:bg-white/10"
                type="button"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12zm3 4H8a2 2 0 0 0-2 2v12h12a2 2 0 0 0 2-2zM8 19V7h11l.002 12z" />
                </svg>
                Copy Link
              </button>
              <button
                onClick={toggleInstallTips}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-gradient-to-r from-purple-500/40 via-indigo-500/30 to-blue-400/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.35em] text-white transition-all duration-200 hover:shadow-[0_18px_55px_-30px_rgba(99,102,241,0.85)]"
                type="button"
                aria-expanded={showInstallTips}
                aria-controls="install-tips"
              >
                <svg className={`h-4 w-4 transition-transform duration-200 ${showInstallTips ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 16l-6-6h12z" />
                </svg>
                {showInstallTips ? 'Hide Save Tips' : 'Save to Phone'}
              </button>
            </div>

            {shareFeedback && (
              <p role="status" className="text-center text-sm font-semibold text-rose-100/90">
                {shareFeedback}
              </p>
            )}

            <div
              id="install-tips"
              className={`overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] px-8 py-6 transition-all duration-300 ${
                showInstallTips ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/80">
                    iPhone / iPad
                  </div>
                  <ul className="space-y-2 text-xs text-rose-100/75">
                    <li>1. Tap the share icon in Safari.</li>
                    <li>
                      2. Choose <span className="font-semibold text-white">Add to Home Screen</span>.
                    </li>
                    <li>3. Rename if you like &amp; tap Add.</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/80">
                    Android / Chrome
                  </div>
                  <ul className="space-y-2 text-xs text-rose-100/75">
                    <li>1. Tap the ⋮ menu in Chrome.</li>
                    <li>
                      2. Hit <span className="font-semibold text-white">Add to Home screen</span>.
                    </li>
                    <li>3. Confirm &amp; launch from your app grid.</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/80">
                    Desktop Browsers
                  </div>
                  <ul className="space-y-2 text-xs text-rose-100/75">
                    <li>
                      1. Hit <span className="font-semibold text-white">Ctrl/Cmd + D</span> to bookmark.
                    </li>
                    <li>2. Drag the URL into your bookmarks bar.</li>
                    <li>3. Pin the tab for late-night cravings.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomNavigation />
    </>
  );
}
