import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const el = heroRef.current;
    el?.addEventListener('mousemove', handleMouseMove);
    return () => el?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.15),transparent)]" />
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Mouse follow effect */}
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none transition-transform duration-1000"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
            transform: 'translate(var(--mouse-x, 50%), var(--mouse-y, 50%))',
            left: '-192px',
            top: '-192px',
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-gray-300">Available for opportunities</span>
        </div>

        {/* Heading */}
        <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
          Hi, I'm{' '}
          <span className="gradient-text">Amaan Shaikh</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up text-lg sm:text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
          A passionate developer crafting beautiful digital experiences with clean code and creative design
        </p>

        {/* Social Links */}
        <div className="animate-fade-in-up flex items-center justify-center gap-4 mb-12" style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}>
          <a
            href="https://github.com/amaanshaikh9991-design"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-300"
          >
            <GithubIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-sm">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/amaan-shaikh-23b682385/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
          >
            <LinkedinIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-sm">LinkedIn</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}>
          <a href="#about" className="inline-flex flex-col items-center text-gray-500 hover:text-violet-400 transition-colors group">
            <span className="text-xs mb-2 group-hover:text-violet-400 transition-colors">Scroll to explore</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
