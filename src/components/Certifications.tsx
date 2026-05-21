import { useState, useEffect, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Trash2 } from 'lucide-react';

interface Certificate {
  id: string;
  name: string;
  url: string;
}

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const newCert: Certificate = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name.replace(/\.[^/.]+$/, ''),
          url: e.target?.result as string,
        };
        setCertificates((prev) => [...prev, newCert]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeCertificate = (id: string) => {
    setCertificates((prev) => prev.filter((cert) => cert.id !== id));
  };

  const openPreview = (url: string) => {
    setPreviewUrl(url);
  };

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

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer mb-12 ${
            isDragging
              ? 'border-violet-500 bg-violet-500/5 scale-[1.02]'
              : 'border-white/10 hover:border-violet-500/30 hover:bg-white/[0.02]'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />

          <div className="flex flex-col items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isDragging ? 'bg-violet-500/20' : 'bg-white/5'
            }`}>
              <Upload className={`w-8 h-8 ${isDragging ? 'text-violet-400' : 'text-gray-500'}`} />
            </div>
            <div>
              <p className="text-gray-300 font-medium mb-1">
                Drop your certificates here or click to upload
              </p>
              <p className="text-gray-600 text-sm">
                Supports PNG, JPG, JPEG, GIF, WebP
              </p>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className={`group glass rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => openPreview(cert.url)}>
                  <img
                    src={cert.url}
                    alt={cert.name}
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
                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCertificate(cert.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-red-500/80 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {/* Name */}
                <div className="p-4">
                  <p className="text-gray-300 font-medium text-sm truncate">{cert.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-16 glass rounded-2xl transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No certificates uploaded yet</p>
            <p className="text-gray-600 text-sm">Upload your certificates using the area above</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
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
              onClick={() => setPreviewUrl(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
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
