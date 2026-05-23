import { useEffect, useRef, useState } from 'react';
import { Award, Image as ImageIcon, X } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  imageUrl?: string;
}

// Add your certificates here after placing images in public/certificates/.
// Example image path: /certificates/html-certificate.jpg
const certificates: Certificate[] = [
   {
     id: 'Code-Craft',
     title: 'Code Craft: Hackathon Winner',
     date: '11-08-2025',
     imageUrl: '/certificates/code-craft.jpeg',
   },

   {
    id: 'Deep-Learning-Onramp',
    title: 'Deep Learning Onramp Certificate',
    date: '08-09-2025',
    imageUrl: '/certificates/DeepLearningOnramp.png',
  },

    {
    id: 'MachineLearningOnramp',
    title: 'Machine Learning Onramp Certificate',
    date: '04-09-2025',
    imageUrl: '/certificates/MachineLearningOnramp.png',
  },

   {
    id: 'MatlabOnramp',
    title: 'Matlab Onramp Certificate',
    date: '30-08-2025',
    imageUrl: '/certificates/MatlabOnramp.png',
  },

   {
    id: 'SignalProcessingOnramp',
    title: 'Signal Processing Onramp Certificate',
    date: '08-09-2025',
    imageUrl: '/certificates/SignalProcessingOnramp.png',
  },
];

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(6,182,212,0.06),transparent)]" />

      <div ref={sectionRef} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">My achievements and completed courses</p>
          <div className="mt-6 mx-auto w-20 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full" />
        </div>

        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <article
                key={cert.id}
                className={`group glass rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {cert.imageUrl ? (
                  <button
                    type="button"
                    className="relative aspect-[4/3] w-full overflow-hidden text-left"
                    onClick={() => setPreviewUrl(cert.imageUrl ?? null)}
                  >
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm">
                          <ImageIcon className="w-4 h-4" />
                          <span>View Full Size</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ) : (
                  <div className="aspect-[4/3] flex items-center justify-center bg-white/[0.03]">
                    <Award className="w-12 h-12 text-violet-400/60" />
                  </div>
                )}

                <div className="p-5">
                  <h3 className="text-white font-semibold mb-1">{cert.title}</h3>
                  {cert.issuer && <p className="text-gray-500 text-sm">{cert.issuer}</p>}
                  {cert.date && <p className="text-gray-600 text-xs mt-2">{cert.date}</p>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div
            className={`text-center py-16 glass rounded-2xl transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Award className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">Certificates will be added soon</p>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              This section is private to edit in code, so visitors cannot upload or delete certificates.
            </p>
          </div>
        )}
      </div>

      {previewUrl && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={previewUrl}
              alt="Certificate Preview"
              className="w-full h-full object-contain rounded-2xl"
            />
            <button
              type="button"
              onClick={() => setPreviewUrl(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              aria-label="Close certificate preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;