1. Core Concept
The app serves as a "visual prototype" for a modern media house. It prioritizes clarity, regional authority, and a "clean" editorial aesthetic. The name "Bharat Lens" signifies its focus on looking at the world through an Indian.

3. Main Features & Pages
Dynamic Home Grid: A sophisticated multi-colum landing page that intelligently organizes hero sections, editor's picks, and regional spotlights.
Regional Desks: Specialized navigation for India, Americas, Europe, Africa, and Asia, featuring nested sub-region filtering (e.g., North America, South Asia).
Live Updates (Pulse): A real-time, time-synchronized news ticker that tracks breaking global events with a font-mono IST (India Standard Time) display.
Visual "Reels": A curated visual storytelling section that uses high-resolution imagery to showcase local perspectives from cities like Mumbai, Tokyo, and Nairobi.
Article Detail Experience: Immersive reading pages featuring estimated "read-times," interactive "Save" and "Share" functions, and stylized typography.
Adaptive Theming: A minimalist theme engine built on a sophisticated "Sand, Clay, and Ink" color palette for high-contrast legibility.

4. Tech Stack
Frontend Framework: React 19 (utilizing functional components and modern hooks).
Build Tool: Vite (for near-instant HMR and optimized production builds).
Styling: Tailwind CSS 4 (leveraging the latest @import configuration for a seamless utility-first workflow).
Animations: motion (formerly Framer Motion) for smooth layout transitions and interactive hover states.
Routing: React Router DOM (v6+) for clean, RESTful URL structures (e.g., /article/headline-slug).
Iconography: Lucide React (for a consistent, lightweight vector icon set).
Type Safety: TypeScript (ensuring a robust, self-documenting codebase).

5. Architecture Overview
The project follows a modular and scalable React structure:
src/App.tsx: The application's backbone, handling routing, theme providers, and global suspense boundaries.
src/components/: A library of reusable UI modules. Components.tsx acts as the source of truth for complex sections like the HomeGrid, LiveUpdates, and Header.
src/pages/: Page-level components (Home, Article, Desk) that orchestrate data-fetching and layout.
src/data/: A centralized content engine (articles.ts) that manages complex metadata including slugs, SEO deks, regional tags, and read-time calculations.
src/context/: State management for user preferences and visual themes.

6. Key Design Decisions
Typography-First Aesthetic: The visual identity is built around a strong typographic hierarchy, using font weights and tracking to convey authority.
Minimalist "Swiss" Influence: Uses generous whitespace and thin borders (border-ink/10) instead of heavy shadows to create structure without clutter.
India-Centric Branding: All "Staff" and generic posts were manually updated to "Bharat Lens Staff" or specific Indian contributors to reinforce the brand identity.
Mobile-First Code: While designed for a desktop "command center" feel, the grid system is fully responsive, collapsing into a readable single-column view on smaller screens.

7. Notable Components
HomeGrid: A complex layout manager that organizes different content "streams" (Live, Trending, Global) into a cohesive dashboard.
VisualReels: An innovative way to present news through image-led cards with backdrop blurs and integrated interaction logos.
Header & NavDropdown: A sophisticated multi-level navigation system that allows drilling down from major regions to specific sub-regions and countries.
ArticleCard: A polymorphic component that adapts its layout (compact vs. full) based on where it's being rendered.


Live Demo - https://global-news-prototype.vercel.app/


https://github.com/user-attachments/assets/e3d9f44f-5c07-483f-aed4-68fc440c24c8






