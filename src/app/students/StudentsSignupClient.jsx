"use client";

import React, { useState } from "react";
import { Sparkles, Code, Globe, Cpu, GraduationCap, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export default function StudentsSignupClient() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    socialLink: "",
    university: "",
    department: "",
    universityId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [redirectHash, setRedirectHash] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/promo/students/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setRedirectHash(data.hash);
        // Instantly redirect to the portal
        setTimeout(() => {
          window.location.href = `/students/portal/${data.hash}`;
        }, 1500);
      } else if (res.status === 409) {
        // Already exists, redirect to their portal
        setError(data.error);
        setRedirectHash(data.hash);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const featureHighlights = [
    {
      icon: <Code size={24} className="text-blue-600" />,
      title: "Hand-Coded Next.js",
      desc: "No slow WordPress or page builders. Every page is hand-crafted with React/Next.js and styled for maximum speed.",
    },
    {
      icon: <Globe size={24} className="text-blue-600" />,
      title: "Deploy in 1-Click",
      desc: "We host your portfolio on premium clouds (Vercel or Netlify) with a custom subdomain for 100% free lifetime hosting.",
    },
    {
      icon: <Cpu size={24} className="text-blue-600" />,
      title: "Fully Dynamic Sections",
      desc: "Complete template equipped with an About block, customized skill tags, project grid showcase, and a functional contact section.",
    },
  ];

  return (
    <div className="w-full bg-white text-black py-2 rounded-t-[60px] -mt-16 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-20">
        
        {/* Features List Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Sparkles size={12} /> Student Accelerator Pack
            </span>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
              Why We are Doing This.
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium mb-8">
              At ScaleUp Web, we believe students shouldn't have to pay thousands of Taka just to host their projects and resume. We want to support Bangladesh's next-generation developers, designers, and creatives by building premium portfolio systems to kickstart your careers.
            </p>
            <div className="space-y-6">
              {featureHighlights.map((feat, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900">{feat.title}</h4>
                    <p className="text-sm text-slate-500 font-semibold mt-1">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Box */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-100 rounded-[40px] p-8 lg:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.04)] relative">
              
              {success ? (
                <div className="py-16 text-center">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4">Registration Successful!</h3>
                  <p className="text-slate-500 text-lg font-medium max-w-md mx-auto">
                    We have created your profile. Redirecting you to your personal customization dashboard...
                  </p>
                  <div className="mt-8 flex justify-center">
                    <div className="h-2 w-24 bg-blue-100 rounded-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 h-full bg-blue-600 rounded-full w-1/2 animate-[loading_1.5s_infinite]" style={{
                        animation: "progress 1.5s infinite ease-in-out"
                      }} />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-8 flex items-center gap-3">
                    <GraduationCap className="text-blue-600" size={32} />
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">Claim Your Free Site</h3>
                      <p className="text-sm text-slate-500 font-semibold mt-1">Fill out your details to generate your builder dashboard.</p>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-8 p-6 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl flex gap-3 items-start">
                      <AlertTriangle className="shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="font-bold text-sm leading-relaxed">{error}</p>
                        {redirectHash && (
                          <button 
                            type="button"
                            onClick={() => window.location.href = `/students/portal/${redirectHash}`}
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-black uppercase text-blue-600 hover:underline"
                          >
                            Go to my Dashboard <ArrowRight size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g., Easin Arafat"
                          className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-semibold text-sm text-slate-800 placeholder:text-slate-400"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Student Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g., student@university.edu"
                          className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-semibold text-sm text-slate-800 placeholder:text-slate-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">WhatsApp Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g., 01645650504"
                          className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-semibold text-sm text-slate-800 placeholder:text-slate-400"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">LinkedIn/Facebook Profile</label>
                        <input
                          type="url"
                          name="socialLink"
                          value={formData.socialLink}
                          onChange={handleChange}
                          placeholder="e.g., https://linkedin.com/in/username"
                          className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-semibold text-sm text-slate-800 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">University Name</label>
                        <input
                          type="text"
                          name="university"
                          value={formData.university}
                          onChange={handleChange}
                          placeholder="e.g., Dhaka University"
                          className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-semibold text-sm text-slate-800 placeholder:text-slate-400"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Department / Major</label>
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          placeholder="e.g., Computer Science & Eng"
                          className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-semibold text-sm text-slate-800 placeholder:text-slate-400"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Student ID / Roll / Batch details</label>
                      <input
                        type="text"
                        name="universityId"
                        value={formData.universityId}
                        onChange={handleChange}
                        placeholder="e.g., Roll: CSE-2025-103 or ID Card Details"
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-semibold text-sm text-slate-800 placeholder:text-slate-400"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all duration-300 shadow-xl shadow-blue-600/20 disabled:bg-slate-300 disabled:shadow-none"
                    >
                      {loading ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <>Claim My Free Portfolio <ArrowRight size={18} /></>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-24 border-t border-slate-100">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs">Clear Answers</span>
            <h2 className="mt-4 text-4xl lg:text-6xl font-black text-slate-900">Frequently Asked</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-black text-slate-900">Is it really 100% free?</h3>
              <p className="mt-3 text-slate-500 leading-relaxed font-semibold">
                Yes, completely free of charge. No setup costs, no design fees. We recommend hosting on Vercel or Netlify, which are also 100% free for personal portfolios, so you pay zero Taka for hosting.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">How long will it take?</h3>
              <p className="mt-3 text-slate-500 leading-relaxed font-semibold">
                Once you fill out your custom profile details in the next dashboard and submit your portfolio, our team takes 3 to 5 business days to double-check the styling and deploy it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">What fields can I customize?</h3>
              <p className="mt-3 text-slate-500 leading-relaxed font-semibold">
                You can customize your name, job title (e.g. UX Designer, App Developer), bio copy, list of professional skills, project details (titles, descriptions, links), and color scheme accents!
              </p>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Why are you offering this?</h3>
              <p className="mt-3 text-slate-500 leading-relaxed font-semibold">
                It's part of our university outreach leaflet campaign. We want to support local students in their job search, and help digitize our university groups.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
