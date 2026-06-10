import React from "react";
import PageHero from "../component/PageHero";
import StudentsSignupClient from "./StudentsSignupClient";

export const generateMetadata = async () => {
  const title = "Free Portfolio Builder for University Students | ScaleUp Web";
  const description = "Claim your 100% free, hand-coded one-page portfolio website. Exclusively for university students in Bangladesh to kickstart their professional careers.";
  
  return {
    title,
    description,
    keywords: [
      "Free portfolio website",
      "Student portfolio builder",
      "ScaleUp Web student promo",
      "University student portfolio Bangladesh",
      "Web development Bangladesh student offer",
      "Free hosting Vercel Netlify student"
    ],
    openGraph: {
      title,
      description,
      type: "website",
      images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&h=630&q=80"]
    }
  };
};

export default function StudentsSignupPage() {
  return (
    <div className="min-h-screen w-full bg-[#050709] text-white selection:bg-blue-500/30">
      <PageHero
        breadcrumb="Student Accelerator"
        title="Claim Your Free"
        highlight="One-Page Portfolio"
        subtitle="Exclusively for university students in Bangladesh. Build your online presence, showcase your projects, and impress recruiters with a hand-coded website."
        spotlightColor="hsl(220, 100%, 50%)"
      />
      <StudentsSignupClient />
    </div>
  );
}
