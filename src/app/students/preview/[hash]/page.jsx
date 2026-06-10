"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Briefcase, 
  Award,
  Send,
  Loader2,
  GraduationCap
} from "lucide-react";

export default function StudentPortfolioPreviewPage() {
  const { hash } = useParams();
  const searchParams = useSearchParams();
  const isIframePreview = searchParams.get("preview") === "true";

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`/api/promo/students/${hash}`);
        const data = await res.json();
        if (res.ok) {
          setPortfolio(data);
        } else {
          setError(data.error || "Portfolio not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Error loading portfolio.");
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [hash]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#050709] text-white flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={30} />
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen w-full bg-[#050709] text-white flex items-center justify-center">
        <p className="text-red-500 font-bold text-lg">Error: {error}</p>
      </div>
    );
  }

  const color = portfolio.accentColor || "#3b82f6";

  return (
    <div className="min-h-screen w-full bg-[#050709] text-white font-sans selection:bg-white/10 relative overflow-hidden">
      
      {/* Decorative Glow Elements */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ backgroundColor: color }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ backgroundColor: color }}
      />

      {/* Floating Navbar */}
      <nav className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between border-b border-white/5 relative z-10">
        <div className="flex items-center gap-2">
          <div 
            className="h-8 w-8 rounded-lg flex items-center justify-center font-black text-sm border"
            style={{ 
              borderColor: `${color}40`,
              background: `${color}15`,
              color: color 
            }}
          >
            {portfolio.fullName.charAt(0)}
          </div>
          <span className="font-extrabold text-sm tracking-tight">{portfolio.fullName}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href={`mailto:${portfolio.email}`}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all border border-white/10 bg-white/5 hover:bg-white/10"
          >
            Hire Me <Mail size={12} />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center relative z-10">
        <span 
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider border mb-6"
          style={{ 
            color: color, 
            borderColor: `${color}30`, 
            background: `${color}10` 
          }}
        >
          <GraduationCap size={13} /> {portfolio.university}
        </span>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-white">
          Hi, I am <span style={{ color: color }}>{portfolio.fullName}</span>
        </h1>
        
        <h2 className="mt-4 text-xl md:text-2xl font-bold text-neutral-400">
          {portfolio.designation}
        </h2>
        
        <p className="mt-6 text-base md:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-medium">
          {portfolio.bio}
        </p>

        {/* Contact Links */}
        <div className="mt-8 flex justify-center items-center gap-4">
          <a 
            href={`https://wa.me/${portfolio.phone.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all"
            style={{ 
              backgroundColor: color, 
              color: "#ffffff",
              boxShadow: `0 10px 20px -10px ${color}`
            }}
          >
            Contact on WhatsApp <Phone size={16} />
          </a>
          
          {portfolio.socialLink && (
            <a 
              href={portfolio.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-sm font-bold text-neutral-300 transition-all"
            >
              Social Profile <ExternalLink size={14} />
            </a>
          )}
        </div>
      </section>

      {/* Skills Tags */}
      <section className="mx-auto max-w-4xl px-6 py-12 relative z-10 border-t border-white/5">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-neutral-500 mb-6 text-center">My Skills</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {portfolio.skills.map((skill, idx) => (
            <span 
              key={idx}
              className="px-4 py-2 rounded-xl border border-white/5 bg-white/5 text-xs font-bold text-neutral-300"
            >
              {skill}
            </span>
          ))}
          {portfolio.skills.length === 0 && (
            <p className="text-neutral-500 text-xs italic">No skills listed.</p>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-4xl px-6 py-16 relative z-10 border-t border-white/5">
        <h3 className="text-2xl font-black text-white flex items-center gap-2 mb-10">
          <Briefcase size={20} style={{ color: color }} /> Project Works
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolio.projects.map((proj, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl border border-white/5 bg-[#0f1015]/60 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <h4 className="text-lg font-black text-white">{proj.title}</h4>
                <p className="mt-3 text-sm text-neutral-400 leading-relaxed font-semibold">
                  {proj.description}
                </p>
              </div>
              
              {proj.link && (
                <div className="mt-6">
                  <a 
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider hover:underline"
                    style={{ color: color }}
                  >
                    View Project <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          ))}

          {portfolio.projects.length === 0 && (
            <p className="text-neutral-500 text-xs italic py-6 md:col-span-2 text-center">
              No projects added yet.
            </p>
          )}
        </div>
      </section>

      {/* Promotional Footer Tag */}
      <footer className="mx-auto max-w-4xl px-6 py-16 text-center border-t border-white/5 relative z-10">
        <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">
          Created Free via the University Accelerator Offer
        </p>
        <p className="mt-2 text-sm text-neutral-400 font-semibold">
          Want your own fast, responsive portfolio? Get it built with{" "}
          <a 
            href={isIframePreview ? "#" : "/"}
            className="hover:underline font-bold"
            style={{ color: color }}
            target={isIframePreview ? "_self" : "_blank"}
          >
            ScaleUp Web
          </a>.
        </p>
      </footer>

    </div>
  );
}
