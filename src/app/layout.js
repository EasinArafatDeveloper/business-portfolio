import "./globals.css";
import SmoothScroll from "./component/SmoothScroll";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import MarqueeSection from "./component/MarqueeSection";
import StructuredData from "./component/StructuredData";
import { Analytics } from "@vercel/analytics/next";
import SessionWrapper from "./component/SessionWrapper";
import LoaderWrapper from "./component/loaders/LoaderWrapper";
import { AlertProvider } from "./component/AlertProvider";

export const metadata = {
  metadataBase: new URL("https://www.scaleupweb.xyz"),
  title: {
    default: "ScaleUp Web - Custom Web Development, Custom Systems & Mobile Apps",
    template: "%s | ScaleUp Web",
  },
  description:
    "ScaleUp Web is a premium digital agency specializing in custom web development, custom system software (ERP/CRM), e-commerce, mobile app development, and technical SEO.",
  keywords: [
    "ScaleUp Web",
    "digital agency",
    "website development",
    "web development",
    "custom system software",
    "ERP CRM systems",
    "mobile app development",
    "SEO optimization",
    "e-commerce development",
    "landing page design",
    "business portfolio",
    "UI UX design",
  ],
  authors: [{ name: "ScaleUp Web", url: "https://www.scaleupweb.xyz" }],
  creator: "ScaleUp Web",
  publisher: "ScaleUp Web",
  alternates: {
    canonical: "https://www.scaleupweb.xyz",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.scaleupweb.xyz",
    siteName: "ScaleUp Web",
    title: "ScaleUp Web - Custom Web Development, Custom Systems & Mobile Apps",
    description:
      "From Code to Commerce - we build your digital success with blazing-fast custom web apps, custom systems (ERP/CRM), e-commerce storefronts, and mobile apps.",
    images: [
      {
        url: "/favicon.ico",
        width: 512,
        height: 512,
        alt: "ScaleUp Web - Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@scaleupweb",
    creator: "@scaleupweb",
    title: "ScaleUp Web - Custom Web Development, Custom Systems & Mobile Apps",
    description:
      "From Code to Commerce - custom web apps, custom systems (ERP/CRM), and high-performance mobile apps.",
    images: ["/favicon.ico"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "technology",
};

import LayoutWrapper from "./component/LayoutWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-serif">
        <SessionWrapper>
          <AlertProvider>
            <LoaderWrapper>
              <StructuredData />
              <LayoutWrapper>
                <SmoothScroll>{children}</SmoothScroll>
              </LayoutWrapper>
              <Analytics />
            </LoaderWrapper>
          </AlertProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
