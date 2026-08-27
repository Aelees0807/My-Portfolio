/**
 * content.js — Single source of truth for all portfolio content.
 *
 * Every piece of text, link, and structured data lives here.
 * Components import from this file instead of hardcoding strings.
 * Update this file to change any content across the entire site.
 */

const content = {
  /* ─────────────────────────────────────────────
     META — SEO & page-level metadata
     ───────────────────────────────────────────── */
  meta: {
    title: 'Aelees Bhuva — Portfolio',
    description: 'Designer & developer crafting thoughtful digital experiences.',
    url: 'https://yourname.dev',
    ogImage: '/og-image.png',
  },

  /* ─────────────────────────────────────────────
     NAV — Navigation links
     ───────────────────────────────────────────── */
  nav: {
    brand: 'Portfolio',
    links: [
      { label: 'Work', href: '#work' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },

  /* ─────────────────────────────────────────────
     HERO — Landing section
     ───────────────────────────────────────────── */
  hero: {
    name: 'Aelees Bhuva',
    role: 'Data Science / ML Engineer',
    education: 'B.Tech Computer Engineering, CHARUSAT',
    pitch: 'Building intelligent systems that turn data into decisions.',
    cta: {
      primary: { label: 'View Work', href: '#work' },
      secondary: { label: 'Get in Touch', href: '#contact' },
    },
    // Content for the rotating glass card stack on the right
    cardStack: [
      {
        label: 'Focus',
        title: 'Machine Learning',
        detail: 'Deep learning, NLP, computer vision',
      },
      {
        label: 'Stack',
        title: 'Python Ecosystem',
        detail: 'PyTorch, TensorFlow, scikit-learn',
      },
      {
        label: 'Approach',
        title: 'Data-First Design',
        detail: 'Clean pipelines, reproducible results',
      },
    ],
  },

  /* ─────────────────────────────────────────────
     PROJECTS — Featured work
     ───────────────────────────────────────────── */
  projects: [
    {
      id: 'med-image-class',
      title: 'Medical Image Classification',
      subtitle: 'Chest X-ray classification using EfficientNet-B0 with Grad-CAM visual interpretability.',
      description: 'A deep learning pipeline trained on the Kaggle Chest X-Ray dataset with weighted cross-entropy loss to handle class imbalance. Deployed via an interactive Streamlit interface that provides real-time Grad-CAM heatmaps, explaining the model\'s diagnostic predictions to medical professionals.',
      tags: ['PyTorch', 'EfficientNet-B0', 'Grad-CAM', 'Streamlit', 'Python'],
      image: 'gradcam', // Special flag for the flagship visual
      links: {
        live: 'https://example.com/live',
        github: 'https://github.com/yourusername/medical-imaging',
      },
      featured: true,
    },
    {
      id: 'smart-campus',
      title: 'Smart Campus / Workflow Hub',
      subtitle: 'Role-based academic workflow management platform.',
      description: 'A comprehensive academic management system featuring role-based access control, secure authentication, and complex relational data handling.',
      tags: ['React 19', 'Node.js', 'Express', 'Supabase/Postgres', 'RLS', 'Jest'],
      links: {
        github: 'https://github.com/yourusername/smart-campus',
      },
      featured: false,
    },
    {
      id: 'spend-io',
      title: 'SpendIO',
      subtitle: 'Intelligent expense tracking and financial analytics.',
      description: 'A full-stack financial dashboard that helps users categorize and visualize their spending habits over time.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      links: {
        github: 'https://github.com/yourusername/spend-io',
      },
      featured: false,
    },
    {
      id: 'apna-seher',
      title: 'Apna Seher',
      subtitle: 'Hackathon-winning city exploration and engagement platform.',
      description: 'Built during a high-pressure hackathon, this platform connects citizens with local city events and civic engagement opportunities in real-time.',
      tags: ['React', 'Firebase', 'Tailwind'],
      links: {
        live: 'https://example.com/apnaseher',
        github: 'https://github.com/yourusername/apna-seher',
      },
      featured: false,
    },
  ],

  /* ─────────────────────────────────────────────
     ABOUT — Bio section
     ───────────────────────────────────────────── */
  about: {
    eyebrow: 'About',
    headline: 'A bit about me.',
    bio: [
      'I am a Data Science and Machine Learning Engineer passionate about building intelligent systems that solve real-world problems.',
      'Currently pursuing my B.Tech in Computer Engineering with a specialization in Data Science at DEPSTAR, CHARUSAT University (3rd Year).',
    ],
    image: '/about/portrait.jpg',
    stats: [
      { label: 'CGPA', value: '7.8' },
      { label: 'University', value: 'CHARUSAT' },
      { label: 'Year', value: '3rd Year' },
    ],
  },

  /* ─────────────────────────────────────────────
     SKILLS — Technical expertise
     ───────────────────────────────────────────── */
  skills: {
    eyebrow: 'Expertise',
    headline: 'Tools & technologies.',
    categories: [
      {
        name: 'Full-stack',
        items: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL/Supabase', 'Firebase', 'Vercel'],
        color: 'var(--color-accent)',
        bgColor: 'var(--color-accent-soft)',
      },
      {
        name: 'Data Science / ML',
        items: ['Python', 'Pandas', 'Scikit-learn', 'PyTorch', 'Streamlit', 'Power BI'],
        color: 'var(--color-coral)',
        bgColor: 'var(--color-coral-soft)',
      },
    ],
  },

  /* ─────────────────────────────────────────────
     EXPERIENCE — Work timeline
     ───────────────────────────────────────────── */
  experience: {
    eyebrow: 'Experience',
    headline: 'Where I\'ve worked.',
    list: [
      {
        role: 'Data Science Intern',
        company: 'Synent Technologies',
        period: '15 May – 15 Jun 2026',
        description: 'Completed comprehensive data science projects encompassing data cleaning, exploratory data analysis, and dashboard development.',
        dashboardLink: 'https://streamlit.io', // Placeholder for live Streamlit dashboard
        tasks: [
          'Titanic data cleaning',
          'Iris dataset analysis',
          'Netflix EDA',
          'Netflix Streamlit dashboard',
          'Superstore sales analysis',
          'Mall Customer segmentation'
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────
     CONTACT — CTA section
     ───────────────────────────────────────────── */
  contact: {
    eyebrow: 'Get in Touch',
    headline: "Let's build something together.",
    description:
      "I'm currently open to freelance work and full-time opportunities. Drop me a line and let's talk.",
    email: 'aelees07@gmail.com',
    socials: [
      { platform: 'GitHub', handle: '@Aelees0807', url: 'https://github.com/Aelees0807', icon: 'Github' },
      { platform: 'LinkedIn', handle: 'aelees-bhuva', url: 'https://linkedin.com/in/aelees-bhuva', icon: 'Linkedin' },
    ],
  },

  /* ─────────────────────────────────────────────
     FOOTER
     ───────────────────────────────────────────── */
  footer: {
    copyright: `© ${new Date().getFullYear()} Your Name. All rights reserved.`,
    builtWith: 'Built with React, Tailwind CSS & Framer Motion.',
  },
};

export default content;
