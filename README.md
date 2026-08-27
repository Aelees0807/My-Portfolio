# Aelees Bhuva — Developer Portfolio

A premium, highly interactive portfolio built for a Data Science & Machine Learning Engineer. The project is designed with an "Apple-inspired" light glassmorphism aesthetic, featuring sophisticated entrance animations, hardware-accelerated background meshes, and a physical-feeling UI.

## 🌟 Key Features

### Premium Glassmorphism Design System
- **Responsive Blur Profiles:** Adjusts `backdrop-filter` blur intensities based on device capabilities to protect mobile GPU performance.
- **Dynamic Edge Lighting:** Project cards feature dynamically calculated inset shadows on hover, simulating a physical light source interacting with the glass surfaces from different angles.
- **Ambient Gradient Mesh:** A hardware-accelerated (`will-change: transform`), slowly drifting background mesh composed of large, ultra-soft CSS radial gradients that subtly tint the glass elements above them.

### Highly Interactive Components
- **Magnetic Buttons:** Custom Framer Motion wrappers (`MagneticButton.jsx`) that track mouse positioning and calculate spring physics to pull social icons and CTAs gently toward the cursor on hover.
- **Grad-CAM CSS Visualization:** The flagship Medical Image Classification project features a pure CSS, synthetic X-ray background that smoothly reveals a color-mapped "Grad-CAM" thermal heatmap on hover (`mix-blend-screen`).
- **Animation Variety:** Every single section on the page features a distinct entrance choreography (e.g., bi-directional slide-ins, staggered scale-ins, blur reveals) powered by Framer Motion.

### Advanced Scroll Interactions (GSAP)
- **Experience Timeline:** The internship section utilizes a GSAP `ScrollTrigger` scrub timeline. As the user scrolls, a progress line fills horizontally, sequentially triggering task nodes to scale and fade in precisely as the line reaches them.
- **Scroll Indicators:** Dynamic elements that react directly to scroll progress rather than simple one-shot intersection observers.

## 🛠️ Technology Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 + Vanilla CSS (CSS Variables)
- **Animations:** Framer Motion (Layout, Springs, Transforms) + GSAP (ScrollTrigger, Timelines)
- **Icons:** Lucide-React
- **Architecture:** Component-based, with all text/content fully decoupled into a single source of truth (`src/data/content.js`).

## 📁 Project Structure

```text
/src
├── components/       # Reusable UI building blocks (MagneticButton, ProjectCard, Section wrapper)
├── sections/         # Main page sections (Hero, About, Skills, Experience, Projects, Contact)
├── data/             # Single source of truth for all copy (content.js)
├── styles/           # Global CSS and Design Tokens (index.css)
└── App.jsx           # Root layout composition
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🎨 Customizing Content

To update the copy, projects, or links across the portfolio, you do not need to hunt through components. Simply edit the `src/data/content.js` file. The UI will automatically map and render your new data.

---
*Designed and engineered with a focus on motion physics, performance, and modern UI/UX aesthetics.*
