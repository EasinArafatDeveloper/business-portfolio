"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Sparkles, 
  Save, 
  Plus, 
  Trash2, 
  Globe, 
  Smartphone, 
  Laptop, 
  ArrowLeft, 
  PlusCircle, 
  Check, 
  ExternalLink,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Github,
  Linkedin,
  FileText,
  Image as ImageIcon
} from "lucide-react";


export default function StudentDashboardPage() {
  const { hash } = useParams();
  
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // New Skill Input State
  const [newSkill, setNewSkill] = useState("");
  
  // Preview Mode State for Desktop view (Laptop or Mobile aspect ratio)
  const [previewDevice, setPreviewDevice] = useState("laptop");
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`/api/promo/students/${hash}`);
        const data = await res.json();
        if (res.ok) {
          setPortfolio(data);
        } else {
          setError(data.error || "Failed to load dashboard.");
        }
      } catch (err) {
        console.error(err);
        setError("Network error while loading portal.");
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [hash]);

  const handleProfileChange = (e) => {
    setPortfolio({
      ...portfolio,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (isPublish = false) => {
    setSaving(true);
    setSaveSuccess(false);
    
    const payload = {
      ...portfolio,
      status: isPublish ? "published" : portfolio.status
    };

    try {
      const res = await fetch(`/api/promo/students/${hash}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSaveSuccess(true);
        if (isPublish) {
          setPortfolio({ ...portfolio, status: "published" });
        }
        // Force refresh the iframe preview
        setIframeKey(prev => prev + 1);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert("Failed to save changes.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  // Skill Methods
  const addSkill = () => {
    const skill = newSkill.trim();
    if (skill && !portfolio.skills.includes(skill)) {
      setPortfolio({
        ...portfolio,
        skills: [...portfolio.skills, skill]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    setPortfolio({
      ...portfolio,
      skills: portfolio.skills.filter((_, i) => i !== indexToRemove)
    });
  };

  // Project Methods
  const addProject = () => {
    setPortfolio({
      ...portfolio,
      projects: [
        ...portfolio.projects,
        {
          title: "New Project",
          description: "Description of your new project.",
          link: "https://github.com",
          image: ""
        }
      ]
    });
  };

  const updateProjectField = (index, field, value) => {
    const updatedProjects = portfolio.projects.map((proj, i) => {
      if (i === index) {
        return { ...proj, [field]: value };
      }
      return proj;
    });
    setPortfolio({
      ...portfolio,
      projects: updatedProjects
    });
  };

  const removeProject = (indexToRemove) => {
    setPortfolio({
      ...portfolio,
      projects: portfolio.projects.filter((_, i) => i !== indexToRemove)
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#050709] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-500 mx-auto mb-4" size={40} />
          <p className="text-neutral-400 font-bold">Loading Customizer Portal...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen w-full bg-[#050709] text-white flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-3xl border border-white/5 bg-[#0f1015] p-8 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-2xl font-black mb-2">Invalid Access Link</h2>
          <p className="text-neutral-500 font-semibold mb-6">
            The link you followed is incorrect or has expired. Make sure you entered it correctly.
          </p>
          <Link href="/students" className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-black uppercase text-xs hover:bg-blue-500 transition-all">
            <ArrowLeft size={16} /> Back to Sign Up
          </Link>
        </div>
      </div>
    );
  }

  const colorOptions = [
    { label: "Electric Blue", value: "#3b82f6" },
    { label: "Cyber Purple", value: "#8b5cf6" },
    { label: "Emerald Green", value: "#10b981" },
    { label: "Neon Pink", value: "#ec4899" },
    { label: "Amber Gold", value: "#f59e0b" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#050709] text-white flex flex-col">
      {/* Dashboard Top bar */}
      <header className="border-b border-white/5 bg-[#0b0c10] px-6 py-4 flex flex-wrap items-center justify-between gap-4 relative z-40">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center border border-blue-500/20 font-bold">
            SU
          </div>
          <div>
            <h1 className="text-lg font-black text-white">{portfolio.fullName}</h1>
            <p className="text-xs text-neutral-500 font-semibold mt-0.5">University Portfolio Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {portfolio.status === "published" && (
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-400">
              Status: Published
            </span>
          )}
          <a 
            href={`/students/preview/${hash}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-bold text-neutral-400 hover:text-white hover:border-white/20 transition-all"
          >
            Live Site <ExternalLink size={13} />
          </a>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 px-5 py-2.5 text-xs font-black uppercase text-white transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />} Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-black uppercase text-white transition-all disabled:opacity-50 shadow-lg shadow-blue-600/10"
          >
            {saving ? <Loader2 className="animate-spin" size={14} /> : <Check size={14} />} Publish
          </button>
        </div>
      </header>

      {/* Main split dashboard content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left customization panel */}
        <section className="w-full lg:w-1/2 overflow-y-auto p-6 lg:p-10 space-y-10 border-r border-white/5 max-h-[calc(100vh-73px)]">
          {saveSuccess && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl font-bold text-sm flex items-center gap-2 animate-fade-in">
              <CheckCircle2 size={18} /> Changes saved successfully! Click Publish to update your live link.
            </div>
          )}

          {/* Theme customizer block */}
          <div className="bg-[#0f1015] border border-white/5 rounded-3xl p-6 lg:p-8">
            <h3 className="text-xl font-black text-white flex items-center gap-2 mb-6">
              <Sparkles size={18} className="text-blue-500" /> Color Accent Theme
            </h3>
            <div className="flex flex-wrap gap-3">
              {colorOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPortfolio({ ...portfolio, accentColor: opt.value })}
                  className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-bold transition-all ${
                    portfolio.accentColor === opt.value
                      ? "bg-white/10 text-white"
                      : "border-white/5 bg-white/5 text-neutral-400 hover:bg-white/10"
                  }`}
                  style={{
                    borderColor: portfolio.accentColor === opt.value ? opt.value : "rgba(255,255,255,0.05)"
                  }}
                >
                  <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: opt.value }} />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Details Block */}
          <div className="bg-[#0f1015] border border-white/5 rounded-3xl p-6 lg:p-8 space-y-6">
            <h3 className="text-xl font-black text-white">Profile Identity</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-500 mb-2">Display Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={portfolio.fullName}
                  onChange={handleProfileChange}
                  className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black focus:outline-none focus:border-blue-500 transition-all font-semibold text-sm text-white"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-500 mb-2">Job Designation / Role</label>
                <input
                  type="text"
                  name="designation"
                  value={portfolio.designation}
                  onChange={handleProfileChange}
                  placeholder="e.g. Student & Web Developer"
                  className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black focus:outline-none focus:border-blue-500 transition-all font-semibold text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-500 mb-2">About Bio Copy</label>
              <textarea
                name="bio"
                value={portfolio.bio}
                onChange={handleProfileChange}
                rows={4}
                className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black focus:outline-none focus:border-blue-500 transition-all font-semibold text-sm text-white leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Social & Professional Links Block */}
          <div className="bg-[#0f1015] border border-white/5 rounded-3xl p-6 lg:p-8 space-y-6">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Globe size={18} className="text-blue-500" /> Links & Socials
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                  <Github size={13} className="text-neutral-400" /> GitHub Profile Link
                </label>
                <input
                  type="url"
                  name="githubLink"
                  value={portfolio.githubLink || ""}
                  onChange={handleProfileChange}
                  placeholder="https://github.com/yourusername"
                  className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black focus:outline-none focus:border-blue-500 transition-all font-semibold text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                  <Linkedin size={13} className="text-blue-400" /> LinkedIn Profile Link
                </label>
                <input
                  type="url"
                  name="linkedinLink"
                  value={portfolio.linkedinLink || ""}
                  onChange={handleProfileChange}
                  placeholder="https://linkedin.com/in/yourusername"
                  className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black focus:outline-none focus:border-blue-500 transition-all font-semibold text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                  <FileText size={13} className="text-red-400" /> Resume Link (Drive/Dropbox)
                </label>
                <input
                  type="url"
                  name="resumeLink"
                  value={portfolio.resumeLink || ""}
                  onChange={handleProfileChange}
                  placeholder="https://drive.google.com/... or dropbox"
                  className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black focus:outline-none focus:border-blue-500 transition-all font-semibold text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                  <ImageIcon size={13} className="text-emerald-400" /> Avatar Image URL
                </label>
                <input
                  type="url"
                  name="avatarUrl"
                  value={portfolio.avatarUrl || ""}
                  onChange={handleProfileChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black focus:outline-none focus:border-blue-500 transition-all font-semibold text-sm text-white"
                />
              </div>
            </div>
          </div>


          {/* Skills Details Block */}
          <div className="bg-[#0f1015] border border-white/5 rounded-3xl p-6 lg:p-8 space-y-6">
            <h3 className="text-xl font-black text-white">My Skills tags</h3>
            
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g. TailwindCSS"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                className="flex-grow px-5 py-4 rounded-xl border border-white/10 bg-black focus:outline-none focus:border-blue-500 transition-all font-semibold text-sm text-white"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-5 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {portfolio.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 pl-4 pr-2.5 py-2 text-xs font-bold text-neutral-300"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="h-5 w-5 rounded-md hover:bg-white/10 text-neutral-500 hover:text-red-400 flex items-center justify-center transition-all text-[10px] font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
              {portfolio.skills.length === 0 && (
                <p className="text-xs text-neutral-500 font-semibold italic">No skills added yet.</p>
              )}
            </div>
          </div>

          {/* Projects Details Block */}
          <div className="bg-[#0f1015] border border-white/5 rounded-3xl p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-black text-white">Project Showcase</h3>
              <button
                type="button"
                onClick={addProject}
                className="inline-flex items-center gap-1 text-xs font-black uppercase text-blue-400 hover:text-blue-300 transition-all"
              >
                <PlusCircle size={14} /> Add Project
              </button>
            </div>

            <div className="space-y-6">
              {portfolio.projects.map((proj, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-black/50 border border-white/5 rounded-2xl space-y-4 relative group"
                >
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="absolute top-4 right-4 text-neutral-600 hover:text-red-400 transition-all"
                    title="Delete Project"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="pr-8">
                    <label className="block text-[9px] font-black uppercase tracking-wider text-neutral-500 mb-1">Project Title</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProjectField(index, "title", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black focus:outline-none focus:border-blue-500 transition-all font-semibold text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-wider text-neutral-500 mb-1">Project Link (URL)</label>
                    <input
                      type="url"
                      value={proj.link}
                      onChange={(e) => updateProjectField(index, "link", e.target.value)}
                      placeholder="e.g. https://github.com/my-project"
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black focus:outline-none focus:border-blue-500 transition-all font-semibold text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-wider text-neutral-500 mb-1">Project Description</label>
                    <textarea
                      value={proj.description}
                      onChange={(e) => updateProjectField(index, "description", e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black focus:outline-none focus:border-blue-500 transition-all font-semibold text-xs text-white resize-none leading-relaxed"
                    />
                  </div>
                </div>
              ))}

              {portfolio.projects.length === 0 && (
                <p className="text-xs text-neutral-500 font-semibold italic text-center py-6">
                  No projects added. Click "Add Project" to list your works.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Right live preview panel */}
        <section className="hidden lg:flex-1 lg:flex flex-col bg-black/40 p-6 lg:p-10 max-h-[calc(100vh-73px)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
              <Globe size={14} className="text-blue-500 animate-pulse" /> Live Preview Frame
            </span>
            <div className="flex items-center gap-2 border border-white/5 bg-[#0f1015] rounded-xl p-1">
              <button
                onClick={() => setPreviewDevice("laptop")}
                className={`p-2 rounded-lg transition-all ${
                  previewDevice === "laptop" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-white"
                }`}
                title="Desktop View"
              >
                <Laptop size={15} />
              </button>
              <button
                onClick={() => setPreviewDevice("mobile")}
                className={`p-2 rounded-lg transition-all ${
                  previewDevice === "mobile" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-white"
                }`}
                title="Mobile View"
              >
                <Smartphone size={15} />
              </button>
            </div>
          </div>

          {/* Iframe Viewport Container */}
          <div className="flex-1 flex justify-center items-center overflow-hidden w-full relative">
            <div 
              className={`h-full border border-white/10 rounded-2xl bg-[#050709] transition-all duration-500 relative overflow-hidden shadow-2xl ${
                previewDevice === "mobile" ? "w-[375px] max-h-[667px]" : "w-full"
              }`}
            >
              {/* Simple browser address mockup */}
              <div className="bg-[#0f1015] border-b border-white/5 px-4 py-2 flex items-center gap-2 relative z-10">
                <div className="flex gap-1.5 shrink-0">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                </div>
                <div className="flex-grow bg-black/60 rounded-md py-1 px-3 text-[10px] text-neutral-500 font-semibold text-center select-none truncate">
                  scaleupweb.xyz/portfolio/{portfolio.fullName.toLowerCase().replace(/[^a-z]/g, "")}
                </div>
              </div>

              {/* Dynamic Iframe Frame */}
              <iframe
                key={iframeKey}
                src={`/students/preview/${hash}?preview=true`}
                className="w-full h-[calc(100%-35px)] border-none bg-[#050709]"
                title="Live Portfolio Preview"
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
