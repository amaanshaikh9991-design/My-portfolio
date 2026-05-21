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
      
      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="About Me" subtitle="Get to know me better" />

        {/* EDITABLE ABOUT SECTION - Add your content below */}
        <div className={`max-w-4xl mx-auto glass rounded-3xl p-8 md:p-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="prose prose-invert prose-lg max-w-none">
            {/* 
              ============================================
              EDIT YOUR ABOUT CONTENT BELOW THIS LINE
              ============================================
              You can add paragraphs, lists, images, etc.
              Example:
              <p className="text-gray-300 leading-relaxed">
                Write about yourself here...
              </p>
              ============================================
            */}
            
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg italic">
                ✨ About section is ready for you to add your personal information ✨
              </p>
              <p className="text-gray-600 text-sm mt-4">
                Edit src/components/About.tsx to add your content
              </p>
            </div>
            
            {/* 
              ============================================
              END OF EDITABLE SECTION
              ============================================
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
