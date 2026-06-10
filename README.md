# ScaleUp Web - Premium Digital Agency Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11+-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

ScaleUp Web is a high-performance, full-stack digital agency portfolio and business management system designed to bridge the gap between offline operations and digital growth. Built with a focus on premium aesthetics and enterprise-grade functionality, it serves as the digital home for ScaleUp Web and its mission to digitize the local economy.

## 🎯 Our Vision & Mission

### The Vision
To become the leading force in Bangladesh's digital transformation, ensuring every local business—from neighborhood shops to large-scale enterprises—achieves **100% digital visibility** and a world-class online presence.

### The Mission
To empower local businesses with **affordable, organized, and high-performance digital systems**. We are dedicated to making technology accessible, allowing entrepreneurs to manage their businesses seamlessly while scaling their reach beyond physical borders.

---

## ✨ Key Features & Functionalities

### 🚀 Premium Frontend Experience
- **Cinematic UI/UX**: Modern, glassmorphic design system tailored for maximum visual impact and smooth user engagement.
- **Advanced Animations**: Powered by **Framer Motion** and **GSAP** for fluid, physics-based interactions and scroll-triggered animations.
- **Smooth Scrolling**: Integrated **Lenis** for a silky-smooth, premium scrolling experience across all devices.
- **3D & Interactive Elements**: Utilization of **Three.js** and **React Three Fiber** for immersive 3D graphics and interactive visualizer.
- **Dynamic Components**:
  - **Sticky Scroll Sections**: Engaging presentation of featured case studies.
  - **Interactive Mega Menus**: Seamless navigation with animated service previews on hover.
  - **Video Integrations**: Custom video players with spinning text and smooth interactions.
  - **Infinite Marquee**: Continuous, hardware-accelerated text scrolling for brand messaging.

### 🛠️ Advanced Admin Ecosystem
- **Comprehensive Dashboard**: Centralized hub to track leads, manage projects, and oversee agency operations.
- **Lead & Visitor Tracking**: Real-time tracking of incoming project inquiries and website visitors with status updates.
- **Rich Text Content Engine**: Integrated **React Quill** editor allowing admins to write and format professional blogs with media support.
- **Digital Agreements System**: End-to-end management for creating, sending, digitally signing (via **react-signature-canvas**), and tracking client service agreements. Includes PDF generation (**jsPDF** & **html2canvas**).
- **Real-time Notifications**: Native browser notification system that alerts admins instantly when new leads or activities occur.

### 🤝 Secure Client Portal
- **Hash-Based Secure Access**: Clients get unique, secure URLs to access their project portal without complex logins.
- **Automated Requirement Gathering**: Intelligent system that dynamically requests specific assets (e.g., Meta Business access, logos) based on the purchased service.
- **Project Tracking**: Real-time updates on project milestones and payment statuses.

### 📧 Marketing & Automated Communication
- **Newsletter Subscription**: High-converting email capture system with automated professional welcome emails.
- **Professional Automation**: Triggered, branded email templates (via **Nodemailer**) for contact auto-replies, agreement confirmations, and client portal updates.
- **Social Integration**: Unified social media footers across all client communication channels.

### 🔒 Security & Authentication
- **NextAuth Integration**: Robust, secure authentication system for protecting the admin dashboard and sensitive API routes.
- **Data Encryption**: Secure password hashing using **bcryptjs**.

### 📈 SEO & Performance Optimization
- **Dynamic SEO Metadata**: Optimized `generateMetadata` implementation for all pages, including dynamic blog and service routes.
- **Schema Markup**: Integrated JSON-LD (Organization & Person) for enhanced search engine authority.
- **High Core Web Vitals**: Optimized for speed, accessibility, and search engine crawling with Next.js App Router best practices.

---

## 💻 Comprehensive Tech Stack

### Frontend Architecture
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4, Vanilla CSS
- **Animations**: Framer Motion, GSAP, Motion
- **Scroll Engine**: @studio-freight/lenis
- **3D Graphics**: Three.js, React Three Fiber, Drei, Three Globe
- **Icons**: Lucide React
- **Typography**: Integrated Custom Fonts

### Backend & Database
- **API**: Next.js API Routes (Serverless)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth, bcryptjs
- **Email Service**: Nodemailer (SMTP Integration)

### Utilities & Tools
- **Rich Text Editor**: React Quill New
- **Form Handling & Validation**: React Hook Form, Zod
- **PDF Generation**: jsPDF, html2canvas
- **Digital Signatures**: React Signature Canvas
- **Analytics**: Vercel Analytics
- **Date Formatting**: date-fns

---

## 👨‍💼 Founder & CEO

**Easin Arafat**
*Visionary Tech Leader & Full-Stack Developer*

Dedicated to empowering the local economy of Bangladesh through innovative technology solutions.
- **LinkedIn**: [easinarafatdev](https://www.linkedin.com/in/easinarafatdev/)
- **Fiverr**: [easin_dev](https://www.fiverr.com/easin_dev)
- **GitHub**: [EasinArafatDeveloper](https://github.com/EasinArafatDeveloper)

---

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/EasinArafatDeveloper/business-portfolio.git
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file with the following:
   ```env
   MONGODB_URI=your_mongodb_uri
   EMAIL_USER=your_gmail
   EMAIL_PASS=your_app_password
   EMAIL_TO=admin_email
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

---

## 📄 License
This project is proprietary and built for the exclusive use of **ScaleUp Web**.

---
*Built with ❤️ by Easin Arafat to Scale Up the Future.*
