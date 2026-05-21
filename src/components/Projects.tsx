import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Music, Users, Database, Upload, Shuffle, Monitor } from 'lucide-react';

const projects = [
  {
    title: 'Raate Rangin',
    subtitle: 'Aesthetic Full-Stack Music Player',
    description: 'A modern full-stack aesthetic music player built using HTML, CSS, JavaScript, Node.js, Express, and MySQL.',
    image: null, // Set to null to use gradient fallback
    link: 'https://raate-rangin.onrender.com/login.html',
    features: [
      { icon: Users, text: 'User Authentication' },
      { icon: Music, text: 'Playlist Management' },
      { icon: Database, text: 'Persistent Local Storage' },
      { icon: Upload, text: 'Drag & Drop Uploads' },
      { icon: Shuffle, text: 'Shuffle & Repeat Controls' },
      { icon: Monitor, text: 'Audio Visualization' },
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MySQL'],
    gradient: 'from-violet-600 via-purple-600 to-indigo-600',
    accent: 'violet',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(139,92,246,0.08),transparent)]" />
      
      <div ref={sectionRef} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">A showcase of my work and technical skills</p>
          <div className="mt-6 mx-auto w-20 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full" />
        </div>

        <div className="grid gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group glass rounded-3xl overflow-hidden hover:border-violet-500/30 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left - Visual */}
                <div className={`relative overflow-hidden bg-gradient-to-br ${project.gradient} p-8 md:p-12 flex flex-col justify-center min-h-[320px]`}>
                  {/* Decorative elements */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
                    <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/50 rounded-full" />
                  </div>

                  {/* Music note decorations */}
                  <div className="absolute top-6 right-6 text-white/20">
                    <Music className="w-16 h-16" />
                  </div>
                  <div className="absolute bottom-6 left-6 text-white/10">
                    <Music className="w-8 h-8" />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-lg mb-6">{project.subtitle}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/20 text-white hover:bg-white/30 transition-all duration-300 group/link"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">View Live Project</span>
                    </a>
                  </div>
                </div>

                {/* Right - Details */}
                <div className="p-8 md:p-10">
                  <p className="text-gray-400 leading-relaxed mb-8">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.features.map((feature) => (
                        <div key={feature.text} className="flex items-center gap-3 text-gray-400 text-sm">
                          <feature.icon className="w-4 h-4 text-violet-400 shrink-0" />
                          <span>{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20 hover:bg-violet-500/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
