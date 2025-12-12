
import React, { useEffect, useRef, useState } from 'react';

const ScrollGlassesAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const frameCount = 100; // Görsel sayısı (g_1.png ... g_100.png)

  // 1. Görselleri Önyükle (Preload)
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    let failed = false;

    // Create an array of potential images
    const imgArray = Array.from({ length: frameCount }, (_, i) => {
        const img = new Image();
        img.src = `/images/g_${i + 1}.png`; // g_1.png starts at 1
        return img;
    });

    imgArray.forEach((img) => {
        img.onload = () => {
            loadedCount++;
            if (loadedCount === frameCount) {
                setImagesLoaded(true);
            }
        };
        img.onerror = () => {
             // If images are missing, we don't crash, just won't render frames
             failed = true;
        };
    });

    setImages(imgArray);
  }, []);

  // 2. Scroll ve Çizim Mantığı
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const container = containerRef.current;

    if (!canvas || !context || !container || images.length === 0) return;

    // Canvas boyutlandırma
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Çizim fonksiyonu
    const drawImage = (index: number) => {
      if (images[index] && images[index].complete && images[index].naturalWidth !== 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Resmi ortalayarak ve oranını koruyarak çiz (object-fit: contain mantığı)
        const hRatio = canvas.width / images[index].width;
        const vRatio = canvas.height / images[index].height;
        const ratio = Math.min(hRatio, vRatio) * 0.8; // Biraz küçültelim (0.8) ki ekrana tam sığsın
        
        const centerShift_x = (canvas.width - images[index].width * ratio) / 2;
        const centerShift_y = (canvas.height - images[index].height * ratio) / 2;
        
        context.drawImage(
          images[index], 
          0, 0, images[index].width, images[index].height,
          centerShift_x, centerShift_y, images[index].width * ratio, images[index].height * ratio
        );
      }
    };

    // İlk görsel yüklendiyse çiz
    if (images[0] && images[0].complete) drawImage(0);

    const handleScroll = () => {
      if (!container) return;

      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Konteyner ekranda göründüğü andan itibaren hesaplama yap
      const start = containerTop;
      const end = containerTop + containerHeight - windowHeight;
      
      let progress = (scrollY - start) / (end - start);
      
      // 0 ile 1 arasında sınırla
      progress = Math.max(0, Math.min(1, progress));

      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(progress * frameCount)
      );

      requestAnimationFrame(() => {
        drawImage(frameIndex);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', resizeCanvas);
    };
  }, [images, imagesLoaded]);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Overlay Text */}
        <div className="absolute top-24 z-10 text-center pointer-events-none mix-blend-difference text-white opacity-80">
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-widest uppercase mb-2">
            360° TASARIM
          </h2>
          <p className="text-sm md:text-base font-light tracking-[0.2em] text-gray-300">
            KUSURSUZ İŞÇİLİK. HER AÇIDAN MÜKEMMEL.
          </p>
        </div>

        {/* Canvas */}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-contain"
        />
        
        {/* Fallback Message if images are missing */}
        {!imagesLoaded && (
             <div className="absolute inset-0 flex items-center justify-center z-0 opacity-20 pointer-events-none">
                <span className="text-white text-6xl font-serif">OLIVEWING</span>
             </div>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 animate-bounce text-white/50 text-xs tracking-widest">
          AŞAĞI KAYDIRIN
        </div>
      </div>
    </div>
  );
};

export default ScrollGlassesAnimation;
