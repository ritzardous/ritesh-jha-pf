# My corner on the internet!

[![Live Portfolio](https://img.shields.io/badge/Live%20Site-about--ritesh.vercel.app-blue?style=for-the-badge&logo=vercel)](https://about-ritesh.vercel.app/)
[![GitHub Profile](https://img.shields.io/badge/GitHub-Ritzardous-181717?style=for-the-badge&logo=github)](https://github.com/ritzardous)
[![Medium](https://img.shields.io/badge/Medium-@ritzardous-black?style=for-the-badge&logo=medium)](https://ritzardous.medium.com/)

A modern, high-performance personal portfolio, research hub, and engineering showcase built with React 18, Vite, GSAP, and Lenis smooth scrolling.

---

##  Tech Stack

- **Core Framework:** React 18.3.1
- **Build System:** Vite 5.3.1
- **Routing:** React Router DOM 7.13.0
- **Animations & Physics:** GSAP 3.12.5 (ScrollTrigger), AOS 2.3.4
- **Smooth Inertia Scrolling:** Lenis 1.3.17
- **SEO & Structured Metadata:** React Helmet Async 2.0.5, Schema.org JSON-LD
- **Iconography:** React Icons 5.4.0
- **Activity Tracker:** React GitHub Calendar 5.0.5
- **Styling System:** CSS Modules with dynamic CSS custom properties & theme switching
- **Deployment & Hosting:** Vercel

---

##  Key Features

- **Interactive 3D Experience Deck:**
  - Sticky stacked cards with real-time 3D cursor tilt physics.
  - Authentic, deep engineering case studies for past tenures (SmowCode, NoxAlgo, DeepCytes Cyber Labs, The Stallion Project).
  - Dedicated upcoming role card with subtle violet glow styling and an automated countdown timer to onboarding.

- **Hero & Noir Aesthetic:**
  - Dynamic dual-phrase typewriter effect.
  - Interactive 3D coin-flip easter egg (*"hmm, van gogh!"*).
  - Noir/moody black-and-white profile avatar by default across mobile and desktop, transitioning smoothly into vibrant color on hover.
  - Seamless, hardware-accelerated animated crosshatch background.

- **Filterable Projects & Academic Research Hub (`/projects`):**
  - Instant category filtering across **Serious Projects**, **Fun Projects**, and **Research Papers**.
  - Detailed modal views with live links, tech stack badges, and architecture overviews.
  - Research papers section featuring 2x2 grid layouts, abstracts, and direct publication / Drive links.

- **Interactive UNIX Terminal (`#connect`):**
  - Functional embedded terminal emulator with custom command execution (`whoami`, `sudo`, `ls`, `:wq`, `rm -rf /`, `clear`).
  - Isolated internal scrollwheel focus and mobile-responsive layout.
  - Direct links to socials (GitHub, LinkedIn, Medium, Twitter/X, Email).

- **Engineering & Business Consulting (`/for-business`):**
  - Dedicated client-facing portal detailing freelance engineering capabilities, full-stack web architecture, and cybersecurity posture reviews.

- **Technical Writing & Blog Hub (`/blogs`):**
  - Curated engineering articles and direct integration with [Medium](https://ritzardous.medium.com/).

- **Performance & Asset Pipeline:**
  - Background image preloader (`imagePreloader.js`) utilizing `requestIdleCallback` to minimize Time-to-Interactive (TTI).
  - Zero layout shift dark/light theme persistence via React Context and CSS variables.

---

##  Project Structure

```
ritesh-jha/
├── public/                            # Static public assets & favicons
├── src/
│   ├── assets/                        # High-resolution project previews, logos & SVGs
│   │
│   ├── common/                        # Shared utility components & services
│   │   ├── ClickSparkle.jsx           # Interactive click particle effect
│   │   ├── SEO.jsx                    # Helmet-based meta & OpenGraph tags
│   │   ├── structuredData.js          # JSON-LD Schema structured data
│   │   ├── imagePreloader.js          # Idle-time asset preloading utility
│   │   ├── loadingScreen.jsx          # Initial page load screen
│   │   ├── loadingScreen.module.css
│   │   ├── internshipCard.jsx
│   │   ├── projectCard.module.css
│   │   ├── projectModal.module.css
│   │   ├── skillList.jsx
│   │   └── themeContext.jsx           # Global Dark/Light mode provider
│   │
│   ├── data/                          # Centralized content & image registries
│   │   └── projectImages.js
│   │
│   ├── pages/                         # Multi-page routes
│   │   ├── AllProjects/               # Filterable projects & research papers
│   │   │   ├── AllProjects.jsx
│   │   │   └── AllProjects.module.css
│   │   │
│   │   ├── Blogs/                     # Articles & Medium publications
│   │   │   ├── Blogs.jsx
│   │   │   └── Blogs.module.css
│   │   │
│   │   └── BusinessPage/              # Consulting & freelance services portal
│   │       ├── BusinessPage.jsx
│   │       └── BusinessPage.module.css
│   │
│   ├── sections/                      # Main landing page sections
│   │   ├── Hero/                      # Dynamic typewriter, coin flip & avatar
│   │   │   ├── hero.jsx
│   │   │   └── heroStyles.module.css
│   │   │
│   │   ├── BentoGrid/                 # Technical background & skills grid
│   │   │   ├── BentoGrid.jsx
│   │   │   └── BentoGrid.module.css
│   │   │
│   │   ├── Experience/                # 3D stacked deck & joining countdown
│   │   │   ├── ExperienceSection.jsx
│   │   │   └── experienceStyles.module.css
│   │   │
│   │   ├── Projects/                  # Featured projects teaser
│   │   │   ├── ProjectsTeaser.jsx
│   │   │   └── projectsStyles.module.css
│   │   │
│   │   ├── Connect/                   # Socials & interactive terminal emulator
│   │   │   ├── Connect.jsx
│   │   │   ├── Connect.module.css
│   │   │   ├── Terminal.jsx
│   │   │   └── Terminal.module.css
│   │   │
│   │   ├── Navbar/                    # Floating responsive navigation bar
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.module.css
│   │   │
│   │   ├── Footer/                    # Footer links & copyright
│   │   │   ├── footer.jsx
│   │   │   └── footerStyles.module.css
│   │   │
│   │   ├── Github/                    # Contribution activity graph
│   │   └── Skills/                    # Core proficiencies
│   │
│   ├── App.css
│   ├── App.jsx                        # Route hierarchy & Lenis context
│   ├── index.css
│   └── main.jsx                       # Application entry point
│
├── vercel.json                        # Vercel SPA rewrite & cache headers
├── vite.config.js                     # Vite build & plugin configuration
├── package.json
└── README.md
```

---

##  Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ritzardous/ritesh-jha-pf.git
   cd ritesh-jha
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

##  Design Philosophy

This portfolio is built with a focus on **UX, performance, and authenticity**. It eschews superficial design theatrics that degrade frame rates, prioritizing fluid 60fps animations, accessible interaction states, and genuine engineering substance.

---

##  License

This project is open source and available under the [MIT License](LICENSE).

---

##  Personal Note

This is one of those projects that gives me both adrenaline and fulfillment as a developer. I'll continue evolving it as I explore new technologies and systems.

**Built with passion by Ritesh Jha** | [Live Site](https://about-ritesh.vercel.app/) | [GitHub](https://github.com/ritzardous) | [Medium](https://ritzardous.medium.com/)
