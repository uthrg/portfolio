"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ProjectProps {
  title: string;
  category: string;
  imgSrc: string;
  index: number;
}

export default function ProjectCard({ title, category, imgSrc, index }: ProjectProps) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 圖片視差效果：圖片在容器內移動比捲動慢
      gsap.to(imageRef.current, {
        yPercent: 20, // 往下偏移 20%
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // 當容器頂部進入視窗底部時開始
          end: "bottom top",   // 當容器底部離開視窗頂部時結束
          scrub: true,         // 動畫隨捲動條連動
        }
      });

      // 2. 容器進場效果
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`project-card group mb-32 md:mb-64 ${index % 2 !== 0 ? 'md:pt-32' : ''}`}>
      {/* 圖片容器 - 設定 overflow-hidden 是視差的關鍵 */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
        <div ref={imageRef} className="relative w-full h-[120%] -top-[10%]"> 
          {/* h-[120%] 讓圖片比容器大，才有空間移動而不露白邊 */}
          {/* <Image 
            src={imgSrc} 
            alt={title} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          /> */}
        </div>
      </div>
      
      {/* 文字資訊 */}
      <div className="mt-6 flex justify-between items-start">
        <div>
          <span className="text-xs uppercase tracking-widest text-gray-400">{category}</span>
          <h3 className="text-3xl font-light tracking-tight mt-1">{title}</h3>
        </div>
        <div className="h-px w-12 bg-gray-300 mt-5"></div>
      </div>
    </div>
  );
}
