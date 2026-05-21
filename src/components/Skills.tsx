import { useState, useEffect, useRef } from 'react';

const skills = [
  { name: 'HTML', level: 90, status: 'completed', color: 'from-orange-500 to-red-500' },
  { name: 'CSS', level: 85, status: 'completed', color: 'from-blue-500 to-cyan-500' },
  { name: 'C Language', level: 75, status: 'completed', color: 'from-gray-400 to-gray-600' },
  { name: 'Python', level: 80, status: 'completed', color: 'from-yellow-500 to-green-500' },
  { name: 'JavaScript', level: 45, status: 'learning', color: 'from-yellow-400 to-orange-500' },
  { name: 'Data Science', level: 30, status: 'learning', color: 'from-pink-500 to-violet-500' },
  { name: 'Japanese', level: 25, status: 'learning', color: 'from-rose-400 to-pink-500' },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimated(true), 300);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const completedSkills = skills.filter(s => s.status === 'completed');
  const learningSkills = skills.filter(s => s.status === 'learning');

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(6,182,212,0.05),transparent)]" />
      
      <div ref={sectionRef} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">Technologies I work with and currently learning</p>
          <div className="mt-6 mx-auto w-20 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full" />
        </div>

        {/* Completed Skills */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <h3 className="text-xl font-semibold text-white">Completed</h3>
          </div>
          <div className="grid gap-6">
            {completedSkills.map((skill, index) => (
              <div key={skill.name} className="group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{skill.name}</span>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Done</span>
                  </div>
                  <span className="text-sm text-gray-500 font-mono">{skill.level}%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color} skill-bar-fill relative`}
                    style={{ width: animated ? `${skill.level}%` : '0%', transitionDelay: `${index * 0.15}s` }}
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-full" />
                    <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/30 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Skills */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
            <h3 className="text-xl font-semibold text-white">Currently Learning</h3>
          </div>
          <div className="grid gap-6">
            {learningSkills.map((skill, index) => (
              <div key={skill.name} className="group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{skill.name}</span>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 animate-pulse">In Progress</span>
                  </div>
                  <span className="text-sm text-gray-500 font-mono">{skill.level}%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color} skill-bar-fill relative`}
                    style={{ width: animated ? `${skill.level}%` : '0%', transitionDelay: `${(index + completedSkills.length) * 0.15}s` }}
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-full" />
                    <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/30 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
