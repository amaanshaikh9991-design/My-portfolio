import { useState, useEffect, useRef } from 'react';

const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      <span className="gradient-text">{title}</span>
    </h2>
    <p className="text-gray-500 max-w-md mx-auto">{subtitle}</p>
    <div className="mt-6 mx-auto w-20 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full" />
  </div>
);

const About = () => {
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
    <section id="about" className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(139,92,246,0.05),transparent)]" />
      
      <div
        ref={sectionRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionTitle
          title="About Me"
          subtitle="Get to know me better"
        />

        <div
          className={`max-w-4xl mx-auto glass rounded-3xl p-8 md:p-12 transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                I’m{' '}
                <span className="text-violet-400 font-semibold">
                  Shaikh Amaan
                </span>
                , a first-year engineering student at
                <span className="text-cyan-400 font-semibold">
                  {' '}
                  Fr. Conceicao Rodrigues College of Engineering (Fr. CRCE)
                </span>
                .
              </p>

              <p>
                I am passionate about technology, learning new skills, and
                exploring innovation. Along with building a strong foundation in
                engineering fundamentals, I actively improve my technical skills
                through projects, workshops, and continuous learning.
              </p>

              <p>
                I’m excited to grow, explore new opportunities, and build a
                successful career in technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;