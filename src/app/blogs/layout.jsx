export const metadata = {
  title: "Blog — Web Development, Custom Systems & Mobile Apps",
  description:
    "Stay ahead with the ScaleUp Web blog — expert insights on high-performance web development, custom system software, e-commerce, mobile app development, and scaling your business.",
  keywords: [
    "web development blog",
    "custom system software tips",
    "SEO tips",
    "e-commerce design",
    "mobile app development tips",
    "business growth",
    "ScaleUp Web blog",
  ],
  alternates: {
    canonical: "https://www.scaleupweb.xyz/blogs",
  },
  openGraph: {
    title: "Blog — ScaleUp Web Digital Insights",
    description:
      "Expert tips on web dev, custom systems, e-commerce, and mobile app development to scale your business.",
    url: "https://www.scaleupweb.xyz/blogs",
    siteName: "ScaleUp Web",
    type: "website",
  },
};

export default function BlogsLayout({ children }) {
  return <>{children}</>;
}
