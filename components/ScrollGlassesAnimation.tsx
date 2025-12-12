
import React, { useEffect, useRef, useState } from 'react';

const ScrollGlassesAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 100; // Görsel sayısı (g_1.png ... g_100.png)

  // 1. Görselleri Önyükle (Preload)
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Görsellerin public/images klasöründe olduğunu varsayıyoruz
      img.src = `/images/g_${i}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          // Hepsi yüklendiğinde state'i güncelle (sıralama garanti olsun diye index ile atama yapılabilir ama basitlik için push mantığı simüle edildi, burada sıralı array oluşturuyoruz)
        }
      };
      loadedImages.push(img);
    }
    // Set images immediately to reference them, even if loading continues
    setImages(loadedImages);
  }, []);

  // 2. Scroll ve Çizim Mantığı
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const container = containerRef.current;

    if (!canvas || !context || !container || images.length === 0) return;

    // Canvas boyutlandırma
    canvas.width = 1920;
    canvas.height = 1080;

    // İlk kareyi çiz (Görsel yüklendiyse)
    const drawImage = (index: number) => {
      if (images[index] && images[index].complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Resmi ortalayarak ve oranını koruyarak çiz (object-fit: contain mantığı)
        const hRatio = canvas.width / images[index].width;
        const vRatio = canvas.height / images[index].height;
        const ratio = Math.min(hRatio, vRatio);
        
        const centerShift_x = (canvas.width - images[index].width * ratio) / 2;
        const centerShift_y = (canvas.height - images[index].height * ratio) / 2;
        
        context.drawImage(
          images[index], 
          0, 0, images[index].width, images[index].height,
          centerShift_x, centerShift_y, images[index].width * ratio, images[index].height * ratio
        );
      }
    };

    // İlk yüklemede 1. kareyi çiz
    images[0].onload = () => drawImage(0);
    if(images[0].complete) drawImage(0);

    const handleScroll = () => {
      if (!container) return;

      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Konteyner ekranda göründüğü andan itibaren hesaplama yap
      // Sticky olduğu için, sticky container'ın başlangıcı ile bitişi arasındaki mesafe scroll alanımızdır.
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [images]);

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
          className="w-full h-full object-contain max-w-custom"
        />
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 animate-bounce text-white/50 text-xs tracking-widest">
          AŞAĞI KAYDIRIN
        </div>
      </div>
    </div>
  );
};

export default ScrollGlassesAnimation;
