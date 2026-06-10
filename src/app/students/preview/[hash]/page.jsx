"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function StudentPortfolioPreviewPage() {
  const { hash } = useParams();
  const searchParams = useSearchParams();
  const isIframePreview = searchParams.get("preview") === "true";

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Theme state: dark mode active by default
  const [isDark, setIsDark] = useState(true);
  
  // Typewriter effect state for designation
  const [typedText, setTypedText] = useState("");
  
  // Modal state for project showcase details
  const [activeProject, setActiveProject] = useState(null);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Load FontAwesome and fetch portfolio data
  useEffect(() => {
    // 1. Add FontAwesome css link
    const fontAwesomeLink = document.createElement("link");
    fontAwesomeLink.rel = "stylesheet";
    fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    document.head.appendChild(fontAwesomeLink);

    // 2. Fetch portfolio data
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

    return () => {
      document.head.removeChild(fontAwesomeLink);
    };
  }, [hash]);

  // Typewriter animation hook
  useEffect(() => {
    if (!portfolio) return;
    const textToType = portfolio.designation || "Student & Full-Stack Developer";
    let index = 0;
    setTypedText("");
    
    const interval = setInterval(() => {
      setTypedText((prev) => prev + textToType.charAt(index));
      index++;
      if (index >= textToType.length) {
        clearInterval(interval);
      }
    }, 75);

    return () => clearInterval(interval);
  }, [portfolio]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setToastMessage("Message sent successfully! Thank you.");
    setShowToast(true);
    setContactForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setShowToast(false), 4000);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0f172a] text-white flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-400" size={30} />
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen w-full bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center p-8 bg-slate-800 rounded-3xl border border-white/5">
          <i className="fa-solid fa-triangle-exclamation text-red-500 text-4xl mb-4"></i>
          <p className="text-red-400 font-bold text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  // Accent color mapping configurations
  const color = portfolio.accentColor || "#3b82f6";
  const themes = {
    "#3b82f6": {
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-600 hover:bg-blue-700",
      border: "border-blue-500/20",
      focusRing: "focus:ring-blue-500",
      hoverRing: "hover:ring-blue-500",
      fillBg: "bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400",
      bullet: "text-blue-500"
    },
    "#8b5cf6": {
      text: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-600 hover:bg-violet-700",
      border: "border-violet-500/20",
      focusRing: "focus:ring-violet-500",
      hoverRing: "hover:ring-violet-500",
      fillBg: "bg-violet-100 text-violet-800 dark:bg-violet-500/10 dark:text-violet-400",
      bullet: "text-violet-500"
    },
    "#10b981": {
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-600 hover:bg-emerald-700",
      border: "border-emerald-500/20",
      focusRing: "focus:ring-emerald-500",
      hoverRing: "hover:ring-emerald-400",
      fillBg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400",
      bullet: "text-emerald-500"
    },
    "#ec4899": {
      text: "text-pink-600 dark:text-pink-400",
      bg: "bg-pink-600 hover:bg-pink-700",
      border: "border-pink-500/20",
      focusRing: "focus:ring-pink-500",
      hoverRing: "hover:ring-pink-500",
      fillBg: "bg-pink-100 text-pink-800 dark:bg-pink-500/10 dark:text-pink-400",
      bullet: "text-pink-500"
    },
    "#f59e0b": {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-600 hover:bg-amber-700",
      border: "border-amber-500/20",
      focusRing: "focus:ring-amber-500",
      hoverRing: "hover:ring-amber-500",
      fillBg: "bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400",
      bullet: "text-amber-500"
    }
  };

  const theme = themes[color] || themes["#3b82f6"];
  const logoText = portfolio.fullName.split(" ")[0].toUpperCase();

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="bg-slate-50 text-slate-800 dark:bg-[#0f172a] dark:text-slate-100 font-sans antialiased transition-colors duration-300 min-h-screen">
        
        {/* Fixed Header */}
        <header id="header" className="fixed top-0 left-0 w-full z-40 transition-all duration-300 backdrop-blur-md bg-white/70 dark:bg-[#0f172a]/70 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="#home" className={`flex items-center space-x-2 text-xl font-bold tracking-wider ${theme.text}`}>
              <i className="fa-solid fa-code text-2xl"></i>
              <span>{logoText}<span className="text-slate-800 dark:text-white">.DEV</span></span>
            </a>

            <nav className="hidden lg:flex items-center space-x-8 font-semibold text-xs tracking-wider uppercase">
              <a href="#home" className="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors">Home</a>
              <a href="#about" class="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors">About</a>
              <a href="#skills" class="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors">Skills</a>
              <a href="#portfolio" class="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors">Portfolio</a>
              <a href="#experience" class="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors">Education</a>
              <a href="#contact" class="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors">Contact</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsDark(!isDark)}
                aria-label="Toggle Dark Mode" 
                className={`p-2 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:ring-2 ${theme.hoverRing} transition-all`}
              >
                {isDark ? <i className="fa-solid fa-sun text-lg"></i> : <i className="fa-solid fa-moon text-lg"></i>}
              </button>
            </div>
          </div>
        </header>

        {/* Main Sections */}
        <main className="pt-16 overflow-hidden">
          
          {/* Hero Section */}
          <section id="home" className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative px-4 sm:px-6 lg:px-8 py-12">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full relative z-10">
              <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${theme.fillBg}`}>
                  🚀 Welcome to my portfolio
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white">
                  Hi, I am {portfolio.fullName} <br />
                  <span className={`${theme.text} typing-cursor`}>{typedText}</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                  {portfolio.bio}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <a href="#portfolio" className={`w-full sm:w-auto text-center px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs text-white transition-all shadow-lg ${theme.bg} transform hover:-translate-y-0.5`}>
                    View My Work
                  </a>
                  {portfolio.resumeLink ? (
                    <a href={portfolio.resumeLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all border border-slate-300/50 dark:border-slate-700/50">
                      <i className="fa-solid fa-arrow-down-to-line mr-2"></i>Download Resume
                    </a>
                  ) : (
                    <a href={`https://wa.me/${portfolio.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all border border-slate-300/50 dark:border-slate-700/50">
                      <i className="fa-brands fa-whatsapp mr-2 text-emerald-500"></i>Contact Me
                    </a>
                  )}
                </div>

                <div className="flex items-center justify-center lg:justify-start space-x-5 pt-4">
                  {portfolio.githubLink && (
                    <a href={portfolio.githubLink} target="_blank" rel="noopener noreferrer" className={`text-2xl text-slate-400 hover:${theme.text} transition-colors transform hover:scale-110`} aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
                  )}
                  {portfolio.linkedinLink && (
                    <a href={portfolio.linkedinLink} target="_blank" rel="noopener noreferrer" className={`text-2xl text-slate-400 hover:${theme.text} transition-colors transform hover:scale-110`} aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
                  )}
                  {portfolio.socialLink && !portfolio.linkedinLink && (
                    <a href={portfolio.socialLink} target="_blank" rel="noopener noreferrer" className={`text-2xl text-slate-400 hover:${theme.text} transition-colors transform hover:scale-110`} aria-label="Social Link"><i class="fa-solid fa-link"></i></a>
                  )}
                </div>
              </div>

              {/* Cover Photo */}
              <div className="order-1 lg:order-2 flex justify-center relative">
                <div className={`relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden bg-gradient-to-tr from-blue-500 to-indigo-600 p-1`} style={{
                  backgroundImage: `linear-gradient(to top right, ${color}, rgba(255,255,255,0.1))`
                }}>
                  <div className="w-full h-full bg-slate-50 dark:bg-[#0f172a] rounded-[22px] flex items-center justify-center overflow-hidden relative group">
                    <svg className={`absolute inset-0 opacity-10 dark:opacity-20 stroke-current ${theme.text}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                    {portfolio.avatarUrl ? (
                      <img 
                        src={portfolio.avatarUrl} 
                        alt={portfolio.fullName} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                    ) : (
                      <i className={`fa-solid fa-laptop-code text-7xl sm:text-8xl ${theme.text} z-10 drop-shadow-md`}></i>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 bg-slate-200/30 dark:bg-slate-900/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">About Me</h2>
                <div className={`h-1.5 w-16 ${color === "#3b82f6" ? "bg-blue-500" : ""} mx-auto mt-4 rounded-full`} style={{ backgroundColor: color }}></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 flex justify-center">
                  <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-800/60 relative">
                    <div className={`absolute -top-3 -left-3 ${theme.bg} text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md`}>💡</div>
                    <img 
                      src={portfolio.avatarUrl || "https://images.unsplash.com/photo-152202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400&h=400"} 
                      alt="Student Headshot" 
                      className="w-full max-w-sm rounded-xl object-cover" 
                    />
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Coding clean architectures, digitizing local workflows.</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                    I am a student at <strong>{portfolio.university}</strong> major in <strong>{portfolio.department}</strong>. Combining theoretical computer science concepts with modern full-stack development, I build responsive user interfaces, clean workflows, and custom backend systems.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 text-center shadow-sm">
                      <span className={`block text-3xl font-extrabold ${theme.text}`}>100%</span>
                      <span className="text-[10px] font-black tracking-wider uppercase text-slate-500 dark:text-slate-400">Hand-Coded Code</span>
                    </div>
                    <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 text-center shadow-sm">
                      <span className={`block text-3xl font-extrabold ${theme.text}`}>{portfolio.projects.length}</span>
                      <span className="text-[10px] font-black tracking-wider uppercase text-slate-500 dark:text-slate-400">Projects Built</span>
                    </div>
                    <div className="bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 text-center shadow-sm">
                      <span className={`block text-3xl font-extrabold ${theme.text}`}>Next.js</span>
                      <span className="text-[10px] font-black tracking-wider uppercase text-slate-500 dark:text-slate-400">Modern Engine</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Technical Arsenal</h2>
                <div className={`h-1.5 w-16 mx-auto mt-4 rounded-full`} style={{ backgroundColor: color }}></div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                {portfolio.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 font-bold hover:scale-105 transition-all shadow-sm"
                  >
                    <i className={`fa-solid fa-circle-check mr-2 ${theme.text}`}></i> {skill}
                  </span>
                ))}
                {portfolio.skills.length === 0 && (
                  <p className="text-neutral-500 text-sm italic">No skills listed yet.</p>
                )}
              </div>
            </div>
          </section>

          {/* Portfolio Grid */}
          <section id="portfolio" className="py-20 bg-slate-200/30 dark:bg-slate-900/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Featured Showcase</h2>
                <div className={`h-1.5 w-16 mx-auto mt-4 rounded-full`} style={{ backgroundColor: color }}></div>
              </div>

              <div id="portfolio-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolio.projects.map((proj, index) => {
                  const demoImage = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500&index=${index}`;
                  return (
                    <div 
                      key={index} 
                      className="portfolio-item group bg-white dark:bg-[#1e293b] rounded-2xl overflow-hidden border border-slate-200/65 dark:border-slate-800/65 shadow-lg transition-all duration-300"
                    >
                      <div className="overflow-hidden aspect-video bg-slate-200 relative">
                        <img 
                          src={proj.image || demoImage} 
                          alt={proj.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{proj.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold line-clamp-2 leading-relaxed">
                          {proj.description}
                        </p>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                          <button 
                            onClick={() => setActiveProject(proj)} 
                            className={`text-xs font-black uppercase tracking-wider ${theme.text} hover:underline`}
                          >
                            Details <i className="fa-solid fa-arrow-right ml-1"></i>
                          </button>
                          {proj.link && (
                            <a 
                              href={proj.link} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-slate-500 hover:text-slate-900 dark:hover:text-white" 
                              aria-label="External Link"
                            >
                              <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {portfolio.projects.length === 0 && (
                  <p className="text-neutral-500 text-sm italic text-center md:col-span-3 py-10">
                    No projects listed yet.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Education Timeline Section */}
          <section id="experience" class="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Education & Timeline</h2>
                <div className={`h-1.5 w-16 mx-auto mt-4 rounded-full`} style={{ backgroundColor: color }}></div>
              </div>

              <div className="relative max-w-3xl mx-auto">
                <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 top-0 h-full w-0.5 bg-slate-200 dark:bg-slate-800"></div>

                {/* Entry 1 */}
                <div className="relative flex flex-col sm:flex-row items-start sm:justify-between mb-12 group">
                  <div className={`absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${theme.bg} border-4 border-slate-50 dark:border-[#0f172a] z-10`}></div>
                  <div className="w-full sm:w-[45%] pl-10 sm:pl-0 sm:text-right">
                    <span className={`inline-block text-xs font-black tracking-wider uppercase ${theme.text} mb-1`}>2024 - PRESENT</span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Student (Undergraduate)</h3>
                    <h4 className="text-md font-semibold text-slate-500 dark:text-slate-400 mb-3">{portfolio.university}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">
                      Pursuing undergraduate program in the <strong>{portfolio.department}</strong> department, learning modern engineering paradigms and full-stack software development.
                    </p>
                  </div>
                  <div className="hidden sm:block w-[45%]"></div>
                </div>

                {/* Entry 2 */}
                <div className="relative flex flex-col sm:flex-row items-start sm:justify-between group">
                  <div className={`absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${theme.bg} border-4 border-slate-50 dark:border-[#0f172a] z-10`}></div>
                  <div className="hidden sm:block w-[45%]"></div>
                  <div className="w-full sm:w-[45%] pl-10 sm:pl-0">
                    <span className={`inline-block text-xs font-black tracking-wider uppercase ${theme.text} mb-1`}>2025 - CURRENT</span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dynamic Portfolio Creator</h3>
                    <h4 className="text-md font-semibold text-slate-500 dark:text-slate-400 mb-3">ScaleUp Student Hub</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">
                      Developed customized portfolio layouts showcasing React, Next.js, and web dev architectures dynamically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 border-t border-slate-200/50 dark:border-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Let's Connect</h2>
                <div className={`h-1.5 w-16 mx-auto mt-4 rounded-full`} style={{ backgroundColor: color }}></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5 space-y-8">
                  <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm space-y-6">
                    <h3 className="text-xl font-bold">Contact Directory</h3>
                    
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Available for collaborations</span>
                    </div>

                    <div className="space-y-4 text-sm font-semibold">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"><i className="fa-solid fa-envelope text-base"></i></div>
                        <div><span class="block text-[10px] text-slate-400 font-bold uppercase">EMAIL ME</span><a href={`mailto:${portfolio.email}`} class="hover:underline">{portfolio.email}</a></div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"><i className="fa-brands fa-whatsapp text-lg text-emerald-500"></i></div>
                        <div><span class="block text-[10px] text-slate-400 font-bold uppercase">WHATSAPP</span><a href={`https://wa.me/${portfolio.phone.replace(/[^0-9]/g, "")}`} class="hover:underline">{portfolio.phone}</a></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <form onSubmit={handleContactSubmit} className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Name</label>
                        <input 
                          type="text" 
                          required 
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Email</label>
                        <input 
                          type="email" 
                          required 
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Subject</label>
                      <input 
                        type="text" 
                        required 
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Message</label>
                      <textarea 
                        rows="4" 
                        required 
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      ></textarea>
                    </div>
                    <button type="submit" className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs text-white transition-colors shadow ${theme.bg}`}>
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 py-8 bg-white dark:bg-[#0f172a] text-sm font-semibold">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-slate-500">&copy; {new Date().getFullYear()} {portfolio.fullName}. All rights reserved.</span>
            <span className="text-slate-400 text-xs font-bold uppercase">
              Created Free via{" "}
              <a 
                href={isIframePreview ? "#" : "/"} 
                target={isIframePreview ? "_self" : "_blank"} 
                className={`hover:underline font-extrabold ${theme.text}`}
              >
                ScaleUp Web
              </a>
            </span>
          </div>
        </footer>

        {/* Modal for Project Detail */}
        {activeProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#1e293b] max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 transform transition-all scale-100 opacity-100">
              <div className="aspect-video bg-slate-100 relative">
                <img src={activeProject.image || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800`} alt={activeProject.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setActiveProject(null)} 
                  className="absolute top-4 right-4 bg-slate-900/60 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-900 transition-colors"
                >
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{activeProject.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-semibold">
                  {activeProject.description}
                </p>
                {activeProject.link && (
                  <div className="pt-2">
                    <a 
                      href={activeProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`inline-flex items-center gap-1 text-sm font-bold ${theme.text} hover:underline`}
                    >
                      View Live Website <i className="fa-solid fa-arrow-up-right-from-square text-xs ml-1"></i>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-3.5 rounded-xl shadow-xl flex items-center space-x-3 border border-slate-800 dark:border-slate-200 transition-all duration-300">
            <i className="fa-solid fa-circle-check text-emerald-500 text-lg"></i>
            <span className="text-sm font-black uppercase tracking-wider text-xs">{toastMessage}</span>
          </div>
        )}

      </div>
    </div>
  );
}
