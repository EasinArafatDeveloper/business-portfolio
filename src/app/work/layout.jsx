export const metadata = {
  title: "Our Work — Portfolio of Custom Web & Mobile Projects",
  description:
    "Explore ScaleUp Web’s portfolio of successful projects — custom websites, e-commerce storefronts, bespoke management systems, and mobile applications that deliver real growth.",
  keywords: [
    "portfolio",
    "web development projects",
    "custom system software portfolio",
    "e-commerce storefronts portfolio",
    "mobile app portfolio",
    "ScaleUp Web projects",
  ],
  alternates: {
    canonical: "https://www.scaleupweb.xyz/work",
  },
  openGraph: {
    title: "Our Work — ScaleUp Web Portfolio",
    description:
      "Real projects, real results. Explore our portfolio of custom websites, systems, and mobile applications.",
    url: "https://www.scaleupweb.xyz/work",
    siteName: "ScaleUp Web",
    type: "website",
  },
};

export default function WorkLayout({ children }) {
  return <>{children}</>;
}
