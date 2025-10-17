import { BottomNavigation } from "../components/BottomNavigation";

export default function VideosPage() {
  const videos = [
    {
      id: 1,
      title: "The Sacred Path of the American Spirit",
  description: "A journey through the native wisdom that shaped our nation\'s soul. Discover the connection between indigenous teachings and American values.",
      duration: "28:45",
      category: "Heritage",
      thumbnail: "🏛️"
    },
    {
      id: 2,
  title: "Eagle&apos;s Eye: Seeing America&apos;s True History",
  description: "Soar above the textbook narratives to discover the deeper truths of our nation\'s founding and the wild spirit of freedom.",
      duration: "35:22",
      category: "History",
      thumbnail: "🦅"
    },
    {
      id: 3,
      title: "Green Star Energy: Connecting to Mother Earth",
      description: "Learn to harness the natural energy that flows through all Americans. Ancient practices for modern patriots.",
      duration: "42:18",
      category: "Energy",
      thumbnail: "⭐"
    },
    {
      id: 4,
      title: "The Native Code: Warrior Principles for Modern Times",
      description: "Honor, courage, and integrity - the warrior's path that every American can walk. Traditional teachings for contemporary challenges.",
      duration: "31:50",
      category: "Warrior Spirit",
      thumbnail: "🏹"
    },
    {
      id: 5,
      title: "Freedom's Fire: Igniting the Patriot Within",
      description: "Awaken the flame of liberty that burns in every American heart. Stories of courage that inspire and guide.",
      duration: "39:12",
      category: "Inspiration",
      thumbnail: "🔥"
    },
    {
      id: 6,
      title: "Wild Hearts, Wise Minds: American Philosophy",
      description: "The philosophical foundations that make America unique. Bridging ancient wisdom with modern understanding.",
      duration: "46:33",
      category: "Philosophy",
      thumbnail: "🧠"
    }
  ];

  const categories = ["All", "Heritage", "History", "Energy", "Warrior Spirit", "Inspiration", "Philosophy"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-800/30"></div>
      
      <main className="relative z-10 px-6 py-12 max-w-7xl mx-auto pb-32">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-block p-8 rounded-[45px] bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-400/30 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mr-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '0.05em' }}>
                TRAINING VIDEOS
              </h1>
            </div>
          </div>
          <p className="text-xl text-emerald-200 mb-4">
            Educational Content • Ancient Wisdom • Modern Application
          </p>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Dive deep into the knowledge that connects you to your roots. Each video is a step on the path 
            to understanding your true American heritage and unleashing your wild, free spirit.
          </p>
        </header>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-[25px] bg-gradient-to-r from-slate-800/60 to-slate-700/60 border border-emerald-400/20 text-emerald-300 hover:border-emerald-400/40 hover:from-emerald-500/20 hover:to-green-500/20 transition-all duration-300 backdrop-blur-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Video */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '0.05em' }}>Featured Training</h2>
          <div className="rounded-[45px] bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-emerald-400/30 p-8 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-80 h-48 rounded-[30px] bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="text-6xl">{videos[0].thumbnail}</div>
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-[15px] text-sm font-semibold">
                  {videos[0].duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="inline-block px-4 py-2 rounded-[20px] bg-emerald-500/20 text-emerald-300 text-sm font-semibold mb-4">
                  {videos[0].category}
                </div>
                <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>{videos[0].title}</h3>
                <p className="text-slate-300 text-lg mb-6">{videos[0].description}</p>
                <button className="w-full lg:w-auto px-8 py-4 rounded-[45px] bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold hover:from-emerald-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25">
                  ▶ Start Training
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div>
          <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '0.05em' }}>All Training Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="rounded-[30px] bg-gradient-to-br from-slate-800/40 to-slate-900/60 border border-slate-600/30 overflow-hidden backdrop-blur-sm hover:border-emerald-400/30 transition-all duration-300 hover:scale-105">
                  {/* Video Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-emerald-500/20 to-green-600/20 flex items-center justify-center">
                    <div className="text-5xl">{video.thumbnail}</div>
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-[15px] text-sm font-semibold">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 rounded-[15px] bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3">
                      {video.category}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                      {video.title}
                    </h3>
                    <p className="text-slate-300 text-sm line-clamp-3">
                      {video.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-[45px] bg-gradient-to-br from-red-900/30 via-blue-900/20 to-red-800/30 border border-white/20 backdrop-blur-sm">
            <p className="text-2xl text-white font-light italic mb-4">
              &quot;Knowledge is the eagle&apos;s wing that lifts the spirit to new heights&quot;
            </p>
            <p className="text-emerald-300 text-lg">
              Begin your journey to deeper understanding today
            </p>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
