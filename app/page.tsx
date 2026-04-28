"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScroll from './components/SmoothScroll';
// import ProjectCard from './components/ProjectCard';

gsap.registerPlugin(ScrollTrigger);
// const PROJECTS = [
//   { title: "Symmetry Lab", category: "Web Design / 2024", imgSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe" },
//   { title: "Vortex Motion", category: "Branding / 2023", imgSrc: "https://images.unsplash.com/photo-1633356122544-f134324a6cee" },
//   { title: "Ether Studio", category: "Development / 2024", imgSrc: "https://images.unsplash.com/photo-1558655146-d09347e92766" },
// ];

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Hero 文字進場動畫
    gsap.to(".reveal", {
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power4.out",
    });

    // 作品卡片捲動顯示
    gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 100 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          }
        }
      );
    });
  }, []);

  return (
    <SmoothScroll>
      <main className="bg-[#fcfcfc] text-[#1a1a1a] min-h-screen">
        
        {/* Navigation */}
        <nav className="fixed w-full flex justify-between p-8 z-50 mix-blend-difference text-white">
          <div className="font-bold tracking-tighter text-2xl">Portfolio</div>
          <div className="space-x-12 text-sm uppercase font-medium">
            <a href="#work" className="hover:opacity-50 transition">專案作品</a>
            <a href="#about" className="hover:opacity-50 transition">關於我</a>
          </div>
        </nav>

        <section className="h-screen flex flex-col justify-center px-10 md:px-32">
          <h1 className="reveal opacity-0 translate-y-10 text-[10vw] leading-[0.9] font-bold tracking-tighter">
            Welcome To<br /> <span className="text-gray-300 italic">Christa&apos;s Portfolio</span>
          </h1>
          <p className="reveal opacity-0 translate-y-10 mt-10 text-xl text-gray-500 max-w-lg">
            
          </p>
        </section>

        {/* Work Section */}
        <section id="work" className="px-10 md:px-32 py-32 space-y-40">
          <h1 className="text-[3vw] leading-[0.9] font-bold">專案作品</h1>
          <div className="project-card grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 overflow-hidden bg-gray-100">

              <div className="relative aspect-video hover:scale-105 transition-transform duration-700">
                {/* <Image 
                  src="" 
                  alt="Project 1" 
                  fill 
                  className="object-cover"
                /> */}
              </div>
            </div>
            <div className="md:col-span-5">
              <span className="text-sm text-gray-400">01 / ENCRYPT</span>
              <h2 className="text-4xl font-bold mt-2"> JSON 欄位資料加密</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                搭配制式的Json schema，針對敏感資料加密。
              </p>
            </div>
          </div>

          {/* 第二個專案（反向佈局） */}
          <div className="project-card grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
             <div className="md:col-span-5 md:order-1 order-2">
              <span className="text-sm text-gray-400">02 / AWARD</span>
              <h2 className="text-4xl font-bold mt-2">USR 計劃實踐場域</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                使用 React 開發前端應用，整合 Google Maps API 與 Google Cloud Weather API
              </p>
            </div>
            <div className="md:col-span-7 md:order-2 order-1 overflow-hidden bg-gray-100">
              <div className="relative aspect-video hover:scale-105 transition-transform duration-700">
                {/* <Image 
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1600" 
                  alt="Project 2" 
                  fill 
                  className="object-cover"
                /> */}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-black text-white px-10 md:px-20 py-20">
  {/* 上半部分：主要內容區 */}
  <div className="flex flex-col md:flex-row justify-center items-start border-b border-gray-800 pb-16">
    
    {/* 左 */}
    <div className="mb-10 md:mb-0 mx-20">
      <a href="#" className="text-3xl font-bold tracking-tighter hover:text-gray-400 transition-colors">
        WEI.
      </a>
      <p className="mt-4 text-gray-500 max-w-[200px] leading-relaxed">
        電梯向上 <br />
        要加油
      </p>
    </div>

    <div className="flex flex-col mx-20">
      <div className="relative mb-6">
        <p className="text-xl font-medium tracking-wide">導覽</p>
        <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-white"></div>
      </div>
      
      {/* 連結清單 */}
      <nav className="flex flex-col gap-3">
        <a href="#projects" className="text-gray-400 hover:text-white transition-colors text-lg">專案</a>
        <a href="#about" className="text-gray-400 hover:text-white transition-colors text-lg">關於我</a>
        <a href="mailto:contact@example.com" className="text-gray-400 hover:text-white transition-colors text-lg">聯絡我</a>
      </nav>
    </div>
  </div>

  {/* 下半部分：版權宣告 */}
  <div className="mt-10 flex justify-between items-center text-xs uppercase tracking-widest text-gray-600">
    <p>© 2025 WEI — NUTC</p>
    <div className="flex gap-6">
      <p>BACK TO TOP</p>
    </div>
  </div>
</footer>

      </main>
    </SmoothScroll>
  );
}
