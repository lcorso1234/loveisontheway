import { BottomNavigation } from "../components/BottomNavigation";

export default function PodcastPage() {
  const episodes = [
    {
      id: 1,
      title: "The Spirit of the Eagle",
      description: "Discovering the wild heart that beats within every true American. Stories of freedom, courage, and the untamed spirit of our ancestors.",
      duration: "45:32",
      date: "October 10, 2025"
    },
    {
      id: 2,
      title: "Sacred Ground, Sacred Stories",
      description: "Learning from the original stewards of this land. Native wisdom that shaped the American character.",
      duration: "52:18",
      date: "October 3, 2025"
    },
    {
      id: 3,
      title: "Roots of Freedom",
      description: "Tracing the deeper understanding of American heritage beyond what history books tell us.",
      duration: "38:45",
      date: "September 26, 2025"
    },
    {
      id: 4,
      title: "Love Will Find a Way",
      description: "Hope, resilience, and the unbreakable spirit that defines the American soul.",
      duration: "41:22",
      date: "September 19, 2025"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-950 relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-950/50 via-transparent to-red-900/30"></div>
      
      <main className="relative z-10 px-6 py-12 max-w-6xl mx-auto pb-32">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-block p-8 rounded-[45px] bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-400/30 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mr-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a3 3 0 0 0-3 3c0 1.642 1.358 3 3 3s3-1.358 3-3a3 3 0 0 0-3-3zm7 9h-1.046A4.494 4.494 0 0 0 16.5 9.5a4.494 4.494 0 0 0-1.454 1.5H5c-.552 0-1 .448-1 1s.448 1 1 1h10.046c.064.343.157.677.273 1H5c-.552 0-1 .448-1 1s.448 1 1 1h10.319c.116.323.209.657.273 1H5c-.552 0-1 .448-1 1s.448 1 1 1h10.592c.026.167.058.333.097.5H5c-.552 0-1 .448-1 1s.448 1 1 1h14c.552 0 1-.448 1-1V12c0-.552-.448-1-1-1z"/>
                </svg>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '0.05em' }}>
                PODCAST
              </h1>
            </div>
          </div>
          <p className="text-xl text-emerald-200 mb-4">
            Voices of Freedom • Stories of Heritage • Wisdom of the Wild
          </p>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Listen to conversations that awaken the patriot within. Each episode explores the deeper truths 
            of our American spirit and the wild freedom that flows through our veins.
          </p>
        </header>

        {/* Featured Episode */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '0.05em' }}>Latest Episode</h2>
          <div className="rounded-[45px] bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-emerald-400/30 p-8 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-48 h-48 rounded-[30px] bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>{episodes[0].title}</h3>
                <p className="text-slate-300 text-lg mb-6">{episodes[0].description}</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-emerald-300 font-semibold">{episodes[0].duration}</span>
                  <span className="text-slate-400">{episodes[0].date}</span>
                </div>
                <button className="w-full lg:w-auto px-8 py-4 rounded-[45px] bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold hover:from-emerald-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25">
                  ▶ Play Episode
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Episode List */}
        <div>
          <h2 className="text-3xl font-bold text-emerald-300 mb-8 text-center" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '0.05em' }}>All Episodes</h2>
          <div className="space-y-6">
            {episodes.map((episode) => (
              <div key={episode.id} className="rounded-[45px] bg-gradient-to-r from-slate-800/40 to-slate-900/60 border border-slate-600/30 p-6 backdrop-blur-sm hover:border-emerald-400/30 transition-all duration-300 group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-600/20 flex items-center justify-center group-hover:from-emerald-500/40 group-hover:to-green-600/40 transition-all duration-300">
                    <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>{episode.title}</h3>
                    <p className="text-slate-300 mb-3">{episode.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-300 font-semibold">{episode.duration}</span>
                      <span className="text-slate-400 text-sm">{episode.date}</span>
                    </div>
                  </div>
                  <button className="px-6 py-3 rounded-[30px] bg-gradient-to-r from-emerald-600/80 to-green-600/80 text-white font-semibold hover:from-emerald-500 hover:to-green-500 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    Play
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-[45px] bg-gradient-to-br from-red-900/30 via-blue-900/20 to-red-800/30 border border-white/20 backdrop-blur-sm">
            <p className="text-2xl text-white font-light italic mb-4">
              &quot;The eagle soars highest when riding the winds of freedom&quot;
            </p>
            <p className="text-emerald-300 text-lg">
              Subscribe to never miss an episode of truth and freedom
            </p>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
