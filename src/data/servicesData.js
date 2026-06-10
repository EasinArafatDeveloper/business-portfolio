export const servicesData = [
  {
    id: 1,
    slug: "landing-page",
    title: "Landing Page",
    shortDescription: "High-converting single-page websites designed to turn visitors into leads and customers.",
    description: "We design laser-focused landing pages built to convert. Perfect for marketing campaigns, product launches, or service promotions. Every page is optimized for extreme speed, user engagement, and clear calls-to-action.",
    image: "/images/landing-page.png",
    target: [
      "Businesses running Facebook/Meta or Google Ads campaigns.",
      "Startups looking to validate a new product idea quickly.",
      "Service providers needing a clean lead collection funnel.",
      "Brands launching a single product or limited promotion."
    ],
    technologies: [
      { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
      { name: "React", icon: "https://skillicons.dev/icons?i=react" },
      { name: "Tailwind CSS", icon: "https://skillicons.dev/icons?i=tailwind" },
      { name: "Framer Motion", icon: "https://skillicons.dev/icons?i=framer" }
    ],
    features: [
      { 
        title: "High-Converting UI/UX Layout", 
        description: "Strategically placed elements, headings, and call-to-actions (CTAs) that keep users focused on taking action.",
        bullets: [
          "Persuasive layout structure tailored to user psychology",
          "Clear, high-contrast CTA buttons",
          "Distraction-free design (no complex navigation)",
          "Beautiful custom graphics and micro-interactions"
        ]
      },
      { 
        title: "Speed & SEO Optimization", 
        description: "Optimized code structure for lightning-fast load times (< 1.5s) to reduce bounce rates and maximize ad ROI.",
        bullets: [
          "Google PageSpeed Score 95+ out of the box",
          "Image compression and lazy loading integration",
          "Proper semantic HTML structure",
          "Metadata and schema markup ready"
        ]
      }
    ],
    benefits: [
      {
        title: "Maximum Conversion Rate",
        content: "We focus purely on layout structures that guide users directly to sign up or make a purchase."
      },
      {
        title: "Lower Ad Spend Bounce",
        content: "A faster page means less wasted ad budget from users who click away before the page loads."
      },
      {
        title: "Mobile-First Design",
        content: "Over 80% of traffic comes from mobile. Our landing pages are fully optimized for small screens."
      }
    ],
    process: [
      { step: "01", title: "Strategy & Wireframe", description: "Analyzing your target customer and mapping out the copy and layout structure." },
      { step: "02", title: "Design & Copywriting", description: "Crafting beautiful mockups and writing highly engaging copy for the page." },
      { step: "03", title: "Development", description: "Building the landing page using Next.js and Tailwind CSS for max performance." },
      { step: "04", title: "Launch & Analytics", description: "Deploying the site and integrating tracking pixels (Google Analytics, Meta Pixel)." }
    ],
    faqs: [
      { question: "How long does a landing page take to build?", answer: "Usually between 5 to 7 days from strategy to launch." },
      { question: "Will my landing page be mobile friendly?", answer: "Yes, absolutely. All our pages are designed with a mobile-first approach." },
      { question: "Can you write the copy for my page?", answer: "Yes, we provide full copywriting services optimized for conversion as part of the package." }
    ]
  },
  {
    id: 2,
    slug: "e-commerce",
    title: "E-commerce",
    shortDescription: "Feature-rich, scalable online stores built with secure payment integrations and automated systems.",
    description: "We build bespoke e-commerce websites designed to scale. From inventory tracking and discount systems to secure multi-gateway checkouts, we ensure a seamless shopping experience for your buyers.",
    image: "/images/e-commerce.png",
    target: [
      "Retail brands wanting to establish their own online presence.",
      "Local businesses transitioning into online sales.",
      "High-volume stores needing robust database structures.",
      "Businesses requiring custom checkout flows and features."
    ],
    technologies: [
      { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
      { name: "React", icon: "https://skillicons.dev/icons?i=react" },
      { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
      { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
      { name: "Express", icon: "https://skillicons.dev/icons?i=express" },
      { name: "Tailwind CSS", icon: "https://skillicons.dev/icons?i=tailwind" }
    ],
    features: [
      { 
        title: "Custom Checkout & Payments", 
        description: "Secure, frictionless checkout flow supporting multi-currency and local/international payment gateways.",
        bullets: [
          "Frictionless one-page checkout flow",
          "SSLCommerz, bKash, Rocket, Nagad integrations",
          "Stripe & PayPal international support",
          "SSL security encryption and fraud protection"
        ]
      },
      { 
        title: "Inventory & Order Control", 
        description: "A complete admin panel to manage products, categories, stock levels, orders, and customer details dynamically.",
        bullets: [
          "Dynamic product catalog and category management",
          "Stock level alerts and automated reminders",
          "Order status tracking for customers (SMS/Email)",
          "Bulk product import/export tools"
        ]
      }
    ],
    benefits: [
      {
        title: "Ownership of Customer Data",
        content: "Control your customer lists and remarket to them without third-party marketplace restrictions."
      },
      {
        title: "Scalable Infrastructure",
        content: "Built on custom full-stack architecture to handle thousands of concurrent shoppers seamlessly."
      },
      {
        title: "Marketing Pixel Integration",
        content: "Track customer conversion funnels with custom tracking codes for Facebook and Google Ads."
      }
    ],
    process: [
      { step: "01", title: "System Architecture", description: "Mapping database schemas, product categories, and payment workflows." },
      { step: "02", title: "UI/UX Store Design", description: "Designing clean product pages, catalogs, carts, and checkout screens." },
      { step: "03", title: "Full-Stack Coding", description: "Developing secure backend APIs, database connections, and responsive storefronts." },
      { step: "04", title: "Testing & Handover", description: "Running checkout tests, training you on the admin panel, and launching live." }
    ],
    faqs: [
      { question: "What payment gateways do you support?", answer: "We support all local gateways like SSLCommerz (bKash/Nagad), as well as Stripe and PayPal." },
      { question: "Can I manage products myself?", answer: "Yes, we build a custom admin dashboard so you can add products, update prices, and fulfill orders without coding." },
      { question: "How secure will my store be?", answer: "We use HTTPS, token-based authentication (JWT), and secure databases to protect customer data." }
    ]
  },
  {
    id: 3,
    slug: "custom-system-software",
    title: "Custom System Software",
    shortDescription: "Bespoke ERP systems, CRM portals, and workflow automation software built for your business.",
    description: "We build custom systems designed specifically for your unique operations. Whether it's CRM, ERP, HR management, or custom database automation, we help you eliminate spreadsheet chaos and optimize workflows.",
    image: "/images/custom-system-software.png",
    target: [
      "Growing companies needing unified management software.",
      "Service businesses managing large customer/lead databases.",
      "Enterprises looking to automate manual back-office tasks.",
      "Operations teams requiring real-time visual dashboards."
    ],
    technologies: [
      { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
      { name: "React", icon: "https://skillicons.dev/icons?i=react" },
      { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
      { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
      { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgres" },
      { name: "Express", icon: "https://skillicons.dev/icons?i=express" }
    ],
    features: [
      { 
        title: "Role-Based Access Control", 
        description: "Secure user permissions ensuring employees only see and access the tools and data they need.",
        bullets: [
          "Super admin, manager, and staff permission levels",
          "Activity log tracking for security audits",
          "Two-factor authentication (2FA) support",
          "Encrypted user passwords and data sessions"
        ]
      },
      { 
        title: "Visual Interactive Dashboards", 
        description: "Real-time graphs, charts, and statistics showing key business performance metrics at a glance.",
        bullets: [
          "Interactive data charts and tables",
          "Automated PDF and Excel report generation",
          "Custom dashboard configurations",
          "Live notifications and status alerts"
        ]
      }
    ],
    benefits: [
      {
        title: "Custom Fit Workflows",
        content: "No templates or rigid SaaS blocks. We build software around your exact operations."
      },
      {
        title: "Increased Efficiency",
        content: "Automate repetitive daily tasks, notification dispatches, and reports, saving hours of work."
      },
      {
        title: "Centralized Data Hub",
        content: "Keep all client histories, project states, and financial transactions in a single, searchable portal."
      }
    ],
    process: [
      { step: "01", title: "Operational Audit", description: "Studying your current spreadsheets and workflows to design the optimal system architecture." },
      { step: "02", title: "Database & UX Design", description: "Designing database relationships and planning interactive wireframes for dashboards." },
      { step: "03", title: "Software Development", description: "Coding secure backend databases, APIs, and clean dashboard frontends." },
      { step: "04", title: "Integration & Training", description: "Migrating existing data, running security audits, and hosting employee training." }
    ],
    faqs: [
      { question: "Can this replace my existing SaaS tools?", answer: "Yes, we can design the software to replace multiple subscriptions and build customized database syncing." },
      { question: "How long does a custom ERP/CRM take to build?", answer: "Depending on the complexity, system development usually takes between 4 to 8 weeks." },
      { question: "Where will my database be hosted?", answer: "We can host it on secure clouds like AWS, DigitalOcean, or your local office servers if required." }
    ]
  },
  {
    id: 4,
    slug: "company-website",
    title: "Company Website",
    shortDescription: "Professional corporate websites designed to build brand authority and showcase services.",
    description: "We build stunning multi-page company websites that represent your brand professionally, rank on search engines, and convert visitors into clients. Ideal for corporate branding, consulting firms, agencies, and local businesses.",
    image: "/images/company-website.png",
    target: [
      "Corporate entities establishing brand authority.",
      "Service businesses (Agencies, Consultants, Clinics).",
      "Local firms needing organic search engine traffic.",
      "Brands wanting a polished, high-end digital profile."
    ],
    technologies: [
      { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
      { name: "React", icon: "https://skillicons.dev/icons?i=react" },
      { name: "Tailwind CSS", icon: "https://skillicons.dev/icons?i=tailwind" },
      { name: "Framer Motion", icon: "https://skillicons.dev/icons?i=framer" }
    ],
    features: [
      { 
        title: "Service Showcases & Team Profiles", 
        description: "Beautifully structured inner pages explaining your services, corporate profile, case studies, and team member bios.",
        bullets: [
          "Clean layout designs for each service offering",
          "Rich interactive case studies",
          "Team directory profiles",
          "Corporate PDF downloads integration"
        ]
      },
      { 
        title: "Appointment & Contact Funnels", 
        description: "Automated booking options and custom contact forms sending leads directly to your email or CRM system.",
        bullets: [
          "Custom contact forms with spam protection",
          "Calendar booking integrations (Calendly, etc.)",
          "Interactive map showing office locations",
          "Live chat widget connectivity"
        ]
      }
    ],
    benefits: [
      {
        title: "Built-In SEO Authority",
        content: "Optimized tags, fast page load speeds, and clean markup ensure search engines index your brand properly."
      },
      {
        title: "Brand Professionalism",
        content: "A premium corporate presence that instantly builds trust with potential enterprise clients."
      },
      {
        title: "Easy Information Hub",
        content: "Provide potential clients, partners, and job applicants with a unified place to learn about your company."
      }
    ],
    process: [
      { step: "01", title: "Brand Discovery", description: "Aligning on corporate guidelines, font selections, color palettes, and copywriting tone." },
      { step: "02", title: "UX Layout Design", description: "Designing layouts for homepage, about-us, services, and detail pages." },
      { step: "03", title: "Frontend Engineering", description: "Coding the multi-page website with smooth transitions and fast load times." },
      { step: "04", title: "SEO Audit & Launch", description: "Configuring schema markup, XML sitemaps, robots.txt, and deploying live." }
    ],
    faqs: [
      { question: "How many pages will my website have?", answer: "Typically, corporate websites have 5 to 10 pages including Home, About, Services, Case Studies, and Contact." },
      { question: "Do you optimize the website for SEO?", answer: "Yes, we integrate technical SEO including meta tags, fast loading speeds, clean structure, and XML sitemaps." },
      { question: "Can I manage the company blog myself?", answer: "Yes, we can integrate a clean markdown blog or a custom CMS so you can write and publish articles easily." }
    ]
  },
  {
    id: 5,
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDescription: "High-performance Android and iOS mobile applications built to deliver seamless user experiences.",
    description: "We design and develop high-performance mobile applications that are fast, intuitive, and secure. Whether it's a cross-platform React Native/Flutter app or a native solution, we build apps that keep your users engaged and grow your business.",
    image: "/images/mobile-app.png",
    target: [
      "Businesses wanting a dedicated mobile application.",
      "Startups building their MVP mobile app.",
      "E-commerce brands seeking mobile-first shopping apps.",
      "Service providers needing booking and reservation systems."
    ],
    technologies: [
      { name: "React Native", icon: "https://skillicons.dev/icons?i=react" },
      { name: "Flutter", icon: "https://skillicons.dev/icons?i=flutter" },
      { name: "Dart", icon: "https://skillicons.dev/icons?i=dart" },
      { name: "Firebase", icon: "https://skillicons.dev/icons?i=firebase" },
      { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
      { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" }
    ],
    features: [
      { 
        title: "Cross-Platform Apps (Android & iOS)", 
        description: "High-quality mobile apps built using React Native or Flutter, allowing you to reach customers on both platforms with a single codebase.",
        bullets: [
          "Single codebase for both Android & iOS, saving time and budget",
          "Native-like performance and smooth UI transitions",
          "Custom design tailormade for mobile user experience",
          "Seamless device feature integrations (Camera, GPS, Contacts)"
        ]
      },
      { 
        title: "Custom Mobile App Solutions", 
        description: "Bespoke mobile applications built to meet your specific business requirements, with robust security and automated database synchronization.",
        bullets: [
          "Push notifications for high user engagement",
          "Offline mode capability and storage handling",
          "Secure user authentication (OTP, Social logins)",
          "Real-time database sync and background services"
        ]
      }
    ],
    benefits: [
      {
        title: "High Performance",
        content: "Built with speed in mind, providing near-instant loading times and extremely smooth animations."
      },
      {
        title: "Cross-Platform Efficiency",
        content: "Save cost and development time using cross-platform frameworks without sacrificing native look and feel."
      },
      {
        title: "Full Feature Access",
        content: "Integrate camera, push notifications, storage, GPS, and biometrics to provide a complete mobile experience."
      },
      {
        title: "App Store Publishing",
        content: "We handle the entire process of getting your application reviewed and published on the Google Play Store and Apple App Store."
      }
    ],
    process: [
      { step: "01", title: "Concept & Wireframing", description: "Mapping out user journeys and designing wireframes to conceptualize your app's structure." },
      { step: "02", title: "UI/UX Design", description: "Creating stunning, modern mobile interfaces with intuitive layouts for high engagement." },
      { step: "03", title: "App Development", description: "Coding the frontend mobile app and setting up robust backend APIs and database integrations." },
      { step: "04", title: "Publishing", description: "Rigorous testing followed by deployment and submission to the App Store and Google Play Store." }
    ],
    faqs: [
      { question: "Do you develop for both Android and iOS?", answer: "Yes, we use frameworks like React Native and Flutter to build high-performance apps that run on both Android and iOS." },
      { question: "How long does it take to build a mobile app?", answer: "A simple app takes 3-4 weeks, whereas complex custom mobile systems can take 8-12 weeks." },
      { question: "Can you upload my app to the App Store & Play Store?", answer: "Yes, we manage the entire publishing process including developer accounts setup, listing optimization, and submission." },
      { question: "Do you provide post-launch maintenance?", answer: "Yes, we offer monthly maintenance packages to fix bugs, upgrade OS compatibility, and add new features." }
    ]
  }
];
