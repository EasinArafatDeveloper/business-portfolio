"use client";
import React, { useState } from "react";
import { ChevronLeft, Save, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAlert } from "@/app/component/AlertProvider";

export default function NewAgreement() {
  const router = useRouter();
  const { toast } = useAlert();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    price: "",
    timeline: "",
    services: [],
    templateType: "normal",
    advancePayment: "",
    includeDomainHosting: false,
    domainName: "",
    hostingPackage: "",
    domainHostingCost: "",
  });
  
  const [newService, setNewService] = useState("");

  const addService = () => {
    if (newService.trim()) {
      setFormData({ ...formData, services: [...formData.services, newService.trim()] });
      setNewService("");
    }
  };

  const removeService = (index) => {
    const updated = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        advancePayment: formData.advancePayment ? Number(formData.advancePayment) : 0,
        domainHostingCost: formData.domainHostingCost ? Number(formData.domainHostingCost) : 0,
      };

      const res = await fetch("/api/agreements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast({ type: "success", title: "Agreement drafted", message: "The signing link is ready." });
        router.push("/admin/agreements");
      } else {
        const errorData = await res.json();
        toast({ type: "error", title: "Save failed", message: errorData.error || "Could not save agreement" });
      }
    } catch (err) {
      console.error(err);
      toast({ type: "error", title: "Save failed", message: "A network error occurred while saving the agreement." });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/agreements"
          className="flex items-center gap-2 text-slate-400 hover:text-purple-600 font-bold transition-colors text-sm"
        >
          <ChevronLeft size={18} />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-2">
          {[1, 2].map(i => (
            <div key={i} className={`w-12 h-1.5 rounded-full transition-all duration-500 ${step >= i ? "bg-purple-600" : "bg-gray-100"}`} />
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[48px] shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-serif italic text-xl">01</span>
                Project Scope
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({...formData, projectTitle: e.target.value})}
                    className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium"
                    placeholder="e.g. Corporate Rebranding & Web Design"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Project Overview</label>
                  <textarea
                    required
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                    className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium min-h-[120px]"
                    placeholder="Describe the overall objectives of the project..."
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Key Deliverables (Services)</label>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                      className="flex-1 bg-slate-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium"
                      placeholder="e.g. Responsive React Application"
                    />
                    <button type="button" onClick={addService} className="bg-purple-600 text-white px-6 rounded-2xl font-bold">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.services.map((s, i) => (
                      <span key={i} className="bg-purple-50 text-purple-700 px-4 py-2 rounded-xl text-xs font-bold border border-purple-100 flex items-center gap-2">
                        {s}
                        <button onClick={() => removeService(i)} className="text-purple-400 hover:text-purple-600">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button type="button" onClick={nextStep} className="mt-12 w-full bg-slate-900 text-white flex items-center justify-center gap-2 py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-purple-600 transition-all shadow-xl shadow-slate-100">
                Investment & Timeline <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-serif italic text-xl">02</span>
                Investment & Time
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Agreement Template Type</label>
                  <select
                    value={formData.templateType}
                    onChange={(e) => setFormData({...formData, templateType: e.target.value})}
                    className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium"
                  >
                    <option value="normal">Normal Design (Clean & Classic)</option>
                    <option value="premium">Premium Design (Elegant Dark Accents)</option>
                    <option value="discount">Special Discount Design (Red/Purple Special)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Total Project Fee (৳)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium"
                    placeholder="Enter full contract amount in Taka"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Advance Payment (৳) (Optional)</label>
                  <input
                    type="number"
                    value={formData.advancePayment}
                    onChange={(e) => setFormData({...formData, advancePayment: e.target.value})}
                    className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium"
                    placeholder="Enter advance amount if any, otherwise leave empty"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Estimated Timeline</label>
                  <input
                    type="text"
                    required
                    value={formData.timeline}
                    onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                    className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium"
                    placeholder="e.g. 4 Weeks from Date of Signature"
                  />
                </div>
                {/* Domain & Hosting Toggle */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.includeDomainHosting}
                      onChange={(e) => setFormData({...formData, includeDomainHosting: e.target.checked})}
                      className="w-5 h-5 rounded-lg border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2"
                    />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-600">Include Domain & Hosting details?</span>
                  </label>

                  {formData.includeDomainHosting && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4 pt-4 border-t border-gray-200/50"
                    >
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Domain Name</label>
                        <input
                          type="text"
                          value={formData.domainName}
                          onChange={(e) => setFormData({...formData, domainName: e.target.value})}
                          className="w-full bg-white border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium text-sm"
                          placeholder="e.g. example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Hosting Package details</label>
                        <input
                          type="text"
                          value={formData.hostingPackage}
                          onChange={(e) => setFormData({...formData, hostingPackage: e.target.value})}
                          className="w-full bg-white border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium text-sm"
                          placeholder="e.g. 2GB SSD, LiteSpeed, 1 Year"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Domain & Hosting Cost (৳) (Optional)</label>
                        <input
                          type="number"
                          value={formData.domainHostingCost}
                          onChange={(e) => setFormData({...formData, domainHostingCost: e.target.value})}
                          className="w-full bg-white border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium text-sm"
                          placeholder="Enter domain/hosting fee if separate"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
              <div className="flex gap-4 mt-12">
                <button type="button" onClick={prevStep} className="flex-1 bg-slate-50 text-slate-600 py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-slate-100 transition-all">Back</button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-[2] bg-purple-600 text-white flex items-center justify-center gap-2 py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-purple-700 transition-all shadow-xl shadow-purple-100 disabled:opacity-70"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Draft & Generate Link
                </button>
              </div>
            </motion.div>
          )}

        </form>
      </div>
    </div>
  );
}
