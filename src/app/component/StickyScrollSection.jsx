"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const colorPalettes = [
  { bgColor: "bg-blue-50", accentColor: "text-blue-600", textColor: "text-slate-900" },
  { bgColor: "bg-rose-50", accentColor: "text-rose-600", textColor: "text-slate-900" },
  { bgColor: "bg-amber-50", accentColor: "text-amber-600", textColor: "text-slate-900" },
  { bgColor: "bg-cyan-50", accentColor: "text-cyan-600", textColor: "text-slate-900" },
];

const ProjectCard = ({ project, index }) => {
  return (
    <div
      className={`project-card w-full min-h-[60vh] md:h-[70vh] flex items-center justify-center p-6 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[3.5rem] shadow-xl border border-white/50 sticky top-[15vh] mb-[10vh] overflow-hidden ${project.bgColor} ${project.textColor}`}
      style={{ zIndex: index + 1 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Text Content */}
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-3 mb-6">
            <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white shadow-sm ${project.accentColor}`}>
              {project.category}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] mb-4">
            {project.title.replace(/Coustom/i, "Custom")}
          </h2>
          <p className="text-lg md:text-xl opacity-75 leading-relaxed max-w-xl font-medium">
            {project.description}
          </p>
          <a 
            href={project.link || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`inline-flex items-center justify-center mt-8 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 bg-white shadow-md border border-slate-100 ${project.accentColor}`}
          >
            View Case Study
          </a>
        </div>

        {/* Image Display */}
        <div className="order-1 lg:order-2 w-full">
          <div className="relative group overflow-hidden rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] bg-slate-900 border border-slate-200/80 w-full aspect-[4/3] flex flex-col transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)]">
            {/* macOS Browser Header Window Controls */}
            <div className="h-9 bg-slate-100 border-b border-slate-200/80 flex items-center px-5 gap-1.5 flex-shrink-0">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <div className="mx-auto bg-slate-200/60 rounded-full text-[10px] px-8 py-1 text-slate-500 font-bold tracking-wide truncate max-w-[250px] text-center select-none font-mono">
                {project.link && project.link !== "#" ? project.link.replace("https://", "").replace("http://", "").replace("www.", "") : "scaleupweb.xyz"}
              </div>
            </div>
            {/* Browser Content / Screenshot */}
            <div className="relative flex-1 w-full overflow-hidden bg-slate-50">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top transform group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StickyScrollSection({ initialProjects = [] }) {
  const containerRef = useRef(null);
  
  // Map colors to projects
  const projects = initialProjects.map((p, index) => ({
    ...p,
    bgColor: colorPalettes[index % colorPalettes.length].bgColor,
    accentColor: colorPalettes[index % colorPalettes.length].accentColor,
    textColor: colorPalettes[index % colorPalettes.length].textColor,
  }));

  useLayoutEffect(() => {
    if (typeof window === "undefined" || projects.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card");

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            filter: "blur(2px)",
            scrollTrigger: {
              trigger: card,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div ref={containerRef} className="bg-[#fcfcfc] min-h-screen font-sans">
      {/* Header Section */}
      <header className="relative w-full py-20 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tighter mb-6 border border-emerald-100">
            Case Studies
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-2">
            Proven Success In
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-blue-600 leading-[1.1] relative inline-block mt-2">
            Every Industry
            <svg className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-blue-600/80" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
          </h2>
          <p className="mt-8 text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Exploring our portfolio of high-impact digital solutions across diverse sectors.
          </p>
        </div>
      </header>

      {/* Sticky Cards Section */}
      <section className="px-4 md:px-8 pb-32">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}