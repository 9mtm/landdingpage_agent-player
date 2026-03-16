# Agent Player Landing Page

Official landing page for [Agent Player](https://github.com/9mtm/Agent-Player) - the AI agent framework with 3D avatars.

## ✨ Features

### 🏠 **Home Page** (`/`)
- Clean, professional landing page
- Feature showcase
- GitHub stats integration
- Screenshot gallery
- SEO optimized

### 🎮 **Live Demo** (`/demo`)
- **Full AvatarViewer** - Complete copy from main project
- **Demo Mode** - Works standalone, no backend needed
- **6 Interactive Tabs**:
  - Animations (50+ animations)
  - Scene (background colors, walls)
  - Camera (presets, positioning)
  - FX (12 visual effects)
  - Notifications (27 types)
  - UI Components (54 components)
- **10 Weather Presets** (rain, snow, aurora, cyber, etc.)
- **Clone System** (up to 3 avatars)

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Visit:
# Home: http://localhost:3001
# Demo: http://localhost:3001/demo

# Build for production
pnpm build
```

## 🎯 Demo Mode

The `/demo` page works **completely standalone** - no backend required!

- All features are interactive
- Animations and effects work fully
- Settings are stored in localStorage
- Perfect for showcasing on Vercel/Netlify

## 🔧 Environment Variables

Create `.env.local`:

```bash
# Demo mode (recommended for landing page)
NEXT_PUBLIC_DEMO_MODE=true

# Backend URL (only if connecting to full Agent Player)
NEXT_PUBLIC_BACKEND_URL=
```

## 📦 Tech Stack

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **THREE.js** - 3D rendering
- **@react-three/fiber** - React Three.js
- **@react-three/drei** - THREE.js helpers
- **Radix UI** - UI components
- **Recharts** - Charts
- **Zod** - Validation

## 📂 Structure

```
├── app/
│   ├── page.tsx          # Landing page
│   └── demo/
│       ├── page.tsx      # Full AvatarViewer (copied from main project)
│       └── layout.tsx    # Demo banner
├── components/
│   ├── avatar/           # AvatarViewer component
│   └── DemoBanner.tsx    # Demo mode indicator
├── lib/
│   ├── ui-web4/          # Generative UI system
│   ├── json-render/      # 54 UI components
│   ├── config.ts         # Configuration
│   └── demo-mock.ts      # Mock API for demo mode
├── public/
│   ├── animations/       # 29MB of avatar animations
│   └── images/           # Screenshots
└── contexts/             # React contexts
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/agent-player-landing)

**Important:** Set `NEXT_PUBLIC_DEMO_MODE=true` in Vercel environment variables.

## 📝 License

MIT License - Same as [Agent Player](https://github.com/9mtm/Agent-Player)
