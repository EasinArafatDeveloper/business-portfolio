import React from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "../component/PageHero";
import { FounderSection, MissionVision, AnimatedText } from "./AboutClient";
import { Handshake, Lightbulb, Rocket, ShieldCheck } from "lucide-react";

export const generateMetadata = async () => {
    const title = "About Easin Arafat | CEO & Founder of ScaleUp Web";
    const description = "Meet Easin Arafat, the 20-year-old full-stack developer, founder, and CEO of ScaleUp Web. Discover his mission to digitize Bangladesh's economy with hand-crafted, high-performance web systems.";

    return {
        title,
        description,
        keywords: ["Easin Arafat", "20-year-old CEO ScaleUp Web", "Founder of ScaleUp Web", "ScaleUp Web Bangladesh", "Web Developer Bangladesh", "Digitizing Bangladesh Businesses"],
        openGraph: {
            title,
            description,
            type: "website",
            images: ["https://i.postimg.cc/zGkWC4JB/Easin-A_rafat-3.png"],
        },
    };
};

export default function AboutUsPage() {
    const ceoData = {
        name: "Easin Arafat",
        role: "Founder & CEO, Full-Stack Developer",
        image: "https://i.postimg.cc/zGkWC4JB/Easin-A_rafat-3.png",
        bio: "At just 20 years old, Easin Arafat is a passionate full-stack developer and tech entrepreneur dedicated to digitizing Bangladesh's local economy. As the Founder and CEO of ScaleUp Web, he builds custom, lightning-fast Next.js apps and automated digital systems. He is on a mission to help offline shops, brands, and startups transition online with minimal costs and zero technical stress.",
        socials: {
            linkedin: "https://www.linkedin.com/in/easinarafatdev/",
            fiverr: "https://www.fiverr.com/easin_dev",
            facebook: "https://www.facebook.com/easin.arafat.dev",
        },
    };

    const missionVisionData = {
        vision: "To show that youth is a powerful asset in tech innovation. We envision a future where every local business, store, and brand in Bangladesh operates with high-converting, premium digital infrastructure.",
        mission: "To break down complex digital barriers for local merchants. We build highly optimized, hand-coded systems that eliminate high agency margins, keeping premium web platforms affordable, simple, and transparent."
    };

    const values = [
        { icon: <Rocket size={28} />, title: "Youthful Speed", description: "We develop fast, launch fast, and iterate instantly. No slow agency bureaucracy, just clean code and modern standards." },
        { icon: <ShieldCheck size={28} />, title: "Zero-Stress Code", description: "We hand-craft every layout. No bloated plugins or templates, meaning your site requires zero ongoing technical headaches." },
        { icon: <Handshake size={28} />, title: "Made for Bangladesh", description: "Custom local payment gateways, optimized workflows, and designs engineered specifically to build trust with local customers." },
    ];

    // Schema Markup for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ScaleUp Web",
        "url": "https://www.scaleupweb.xyz",
        "logo": "https://www.scaleupweb.xyz/logo.png",
        "founder": {
            "@type": "Person",
            "name": "Easin Arafat",
            "jobTitle": "CEO & Founder",
            "image": "https://i.postimg.cc/zGkWC4JB/Easin-A_rafat-3.png",
            "sameAs": [
                "https://www.linkedin.com/in/easinarafatdev/",
                "https://www.facebook.com/easin.arafat.dev"
            ]
        },
        "description": "ScaleUp Web is a premium digital agency in Bangladesh led by Easin Arafat, focused on digitizing local businesses with affordable and organized web systems."
    };

    return (
        <div className="w-full bg-[#050709] text-white selection:bg-blue-500/30">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <PageHero 
                breadcrumb="Meet the Founder"
                title="Young Energy,"
                highlight="Big Digital Vision"
                subtitle="At just 20 years old, Easin Arafat founded ScaleUp Web to bridge the gap between traditional Bangladeshi businesses and world-class modern tech."
                spotlightColor="hsl(210, 100%, 50%)"
            />

            <div className="w-full bg-white text-black py-2 rounded-t-[60px] -mt-16 relative z-10 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-20">
                    {/* Visionary Header */}
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                            Our Core Purpose
                        </span>
                        <h2 className="text-4xl lg:text-7xl font-black text-slate-900 leading-tight">
                            From Offline to <span className="text-blue-600 italic underline decoration-blue-200 underline-offset-8">Global Visibility.</span>
                        </h2>
                        <AnimatedText
                            text="We believe that technology should be a bridge, not a barrier. Our focus is to provide Bangladesh's local businesses with the tools they need to stay organized, gain 100% online visibility, and scale their operations at a cost that makes sense."
                            className="mt-8 text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto font-medium"
                        />
                    </div>

                    {/* CEO Spotlight */}
                    <FounderSection members={[ceoData]} />

                    {/* Vision & Mission */}
                    <MissionVision vision={missionVisionData.vision} mission={missionVisionData.mission} />

                    {/* Core Values */}
                    <div className="py-32">
                        <div className="text-center mb-20">
                            <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs">Our Foundation</span>
                            <h2 className="mt-4 text-4xl lg:text-6xl font-black text-slate-900">Why Choose ScaleUp?</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 hover:border-blue-200 transition-all duration-500 group"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                        {value.icon}
                                    </div>
                                    <h3 className="mt-8 text-2xl font-black text-slate-900">{value.title}</h3>
                                    <p className="mt-4 text-slate-500 leading-relaxed font-medium">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="pb-32">
                        <div className="relative overflow-hidden rounded-[50px] bg-slate-900 p-12 lg:p-24 text-center">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                            <div className="relative z-10">
                                <h2 className="text-4xl lg:text-6xl font-black text-white mb-8">Ready to bring your business<br />into the <span className="text-blue-500 italic">Digital Age?</span></h2>
                                <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">Join the movement of local businesses scaling their operations with professional, organized systems.</p>
                                <Link 
                                    href="/contact" 
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all duration-300 shadow-xl shadow-blue-600/20"
                                >
                                    Start Your Digital Journey
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
