"use client";

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  const lineRef = useRef(null);

  //scroll 的特效
  useEffect(() => {
    // 建立一條線由上往下移動並淡出的循環動畫
    gsap.fromTo(lineRef.current, 
      { 
        y: -50, 
        opacity: 0 
      }, 
      { 
        y: 50, 
        opacity: 1, 
        duration: 1.5, 
        repeat: -1, // 無限循環
        ease: "power2.inOut",
        // 使用 staggers 或是在特定時間點淡出
        onUpdate: function() {
          const progress = this.progress();
          if (progress > 0.8) {
            gsap.set(lineRef.current, { opacity: 1 - (progress - 0.8) * 5 });
          }
        }
      }
    );
  }, []);

  useEffect(() => {
    // 1. 初始化 Lenis
    const lenis = new Lenis({
      duration: 0.8,
      lerp: 0.1,
      wheelMultiplier: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // 2. 讓 ScrollTrigger 監聽 Lenis 的捲動
    lenis.on('scroll', ScrollTrigger.update);

    // 3. 建立 RequestAnimationFrame 迴圈
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 4. 清理機制
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
  <>
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        {/* 文字標籤 */}
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8 font-medium">
            Learn More
        </span>
        
        {/* 遮罩容器，用來限制線段出現的範圍 */}
        <div className="relative h-20 w-[1px] bg-gray-200 overflow-hidden">
            {/* 動態線條 */}
            <div 
            ref={lineRef} 
            className="absolute top-0 w-full h-full bg-black"
            />
        </div>
    </div>
    {children}
    </>);
}