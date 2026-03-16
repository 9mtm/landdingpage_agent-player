'use client';

import { useState } from 'react';
import { Github, Star, Book, Code2, Bell, Cloud, Sparkles, ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [stars, setStars] = useState<number | null>(null);

  // Fetch GitHub stars
  useState(() => {
    fetch('https://api.github.com/repos/9mtm/Agent-Player')
      .then(res => res.json())
      .then(data => setStars(data.stargazers_count))
      .catch(() => setStars(null));
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-brand-purple" />
            <span className="text-xl font-bold gradient-text">Agent Player</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/9mtm/Agent-Player"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
              {stars && (
                <span className="flex items-center gap-1 text-sm text-slate-400">
                  <Star className="w-3 h-3" />
                  {stars}
                </span>
              )}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/20 mb-8">
              <Sparkles className="w-4 h-4 text-brand-purple" />
              <span className="text-sm text-brand-purple-light">100% Free • Open Source • Self-Hosted</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              The AI Agent Framework
              <br />
              <span className="gradient-text">with 3D Avatars</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Build intelligent AI agents with interactive 3D avatars, dynamic UI generation,
              and live notifications. Everything you need in one powerful open-source framework.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/demo"
                className="group px-8 py-4 rounded-xl bg-hero-gradient hover:opacity-90 transition-opacity flex items-center gap-2 font-semibold text-lg shadow-lg glow-purple"
              >
                <Sparkles className="w-5 h-5" />
                Try Live Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://github.com/9mtm/Agent-Player"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2 font-semibold text-lg border border-slate-700"
              >
                <Star className="w-5 h-5" />
                Star on GitHub
              </a>
              <a
                href="https://github.com/9mtm/Agent-Player#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2 font-semibold text-lg border border-slate-700"
              >
                <Book className="w-5 h-5" />
                Documentation
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 pt-16 border-t border-slate-800">
              <div>
                <div className="text-3xl font-bold text-brand-cyan">70+</div>
                <div className="text-sm text-slate-400 mt-1">UI Components</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-purple">27</div>
                <div className="text-sm text-slate-400 mt-1">Notification Types</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-indigo">10</div>
                <div className="text-sm text-slate-400 mt-1">Weather Presets</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Hero */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl glow-cyan">
            <Image
              src="/images/avatar-viewer.png"
              alt="Agent Player Avatar Viewer"
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-400">Everything you need to build advanced AI agents</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1: AI-Generated UI */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-brand-purple/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center mb-6">
                <Code2 className="w-6 h-6 text-brand-purple" />
              </div>
              <h3 className="text-2xl font-bold mb-4">AI-Generated UI</h3>
              <p className="text-slate-400 mb-6">
                70+ pre-built components. AI creates dashboards, charts, forms, and complex UIs automatically.
                No React code needed.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-brand-purple" />
                  Charts & Graphs
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-brand-purple" />
                  Data Tables
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-brand-purple" />
                  Form Inputs
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-brand-purple" />
                  Trading Components
                </li>
              </ul>
            </div>

            {/* Feature 2: Live Notifications */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-brand-cyan/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-6">
                <Bell className="w-6 h-6 text-brand-cyan" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Live Notifications</h3>
              <p className="text-slate-400 mb-6">
                27 notification types that appear on your avatar screen in real-time.
                WhatsApp, Stripe, OTP, and more.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-brand-cyan" />
                  Social Media
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-brand-cyan" />
                  Payment Alerts
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-brand-cyan" />
                  Security (OTP, FaceID)
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-brand-cyan" />
                  Custom Messages
                </li>
              </ul>
            </div>

            {/* Feature 3: Weather & FX */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-brand-indigo/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-indigo/10 flex items-center justify-center mb-6">
                <Cloud className="w-6 h-6 text-brand-indigo" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Immersive Effects</h3>
              <p className="text-slate-400 mb-6">
                10 weather presets and 12 visual effects. Rain, snow, aurora, fire,
                and cyberpunk aesthetics.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-brand-indigo" />
                  Weather Presets
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-brand-indigo" />
                  Particle Effects
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-brand-indigo" />
                  Lightning & Aurora
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-brand-indigo" />
                  Hologram Mode
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section className="py-20 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">See It In Action</h2>
            <p className="text-xl text-slate-400">Real screenshots from Agent Player</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-lg hover:border-brand-purple/50 transition-colors">
              <Image
                src="/images/alpaca.png"
                alt="Trading Dashboard"
                width={800}
                height={600}
                className="w-full h-auto"
              />
              <div className="p-6 bg-slate-900">
                <h3 className="font-semibold text-lg mb-2">AI Trading Dashboard</h3>
                <p className="text-sm text-slate-400">Real-time stock charts and portfolio management</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-lg hover:border-brand-cyan/50 transition-colors">
              <Image
                src="/images/panel1.jpg"
                alt="Avatar Gallery"
                width={800}
                height={600}
                className="w-full h-auto"
              />
              <div className="p-6 bg-slate-900">
                <h3 className="font-semibold text-lg mb-2">Diverse Avatars</h3>
                <p className="text-sm text-slate-400">Fully customizable 3D characters</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built With Modern Tech</h2>
            <p className="text-xl text-slate-400">Production-ready stack</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Next.js 16',
              'React 19',
              'THREE.js',
              'TypeScript',
              'Tailwind CSS',
              'Fastify',
              'SQLite',
              'Claude AI'
            ].map((tech) => (
              <div
                key={tech}
                className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-center font-semibold hover:border-brand-purple/50 transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-r from-brand-purple via-brand-indigo to-brand-cyan p-1">
            <div className="rounded-xl bg-slate-950 p-12 text-center">
              <Github className="w-16 h-16 mx-auto mb-6 text-brand-purple" />
              <h2 className="text-4xl font-bold mb-4">100% Open Source</h2>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                Agent Player is completely free and open-source.
                Star us on GitHub, contribute, or deploy your own instance today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://github.com/9mtm/Agent-Player"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 rounded-xl bg-white text-slate-950 hover:bg-slate-100 transition-colors flex items-center gap-2 font-semibold text-lg"
                >
                  <Star className="w-5 h-5" />
                  Star on GitHub
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://github.com/9mtm/Agent-Player#installation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2 font-semibold text-lg"
                >
                  <Code2 className="w-5 h-5" />
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-purple" />
              <span className="font-semibold">Agent Player</span>
              <span className="text-slate-600">•</span>
              <span className="text-sm text-slate-400">Open Source AI Agent Framework</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/9mtm/Agent-Player"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://github.com/9mtm/Agent-Player#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Documentation
              </a>
              <a
                href="https://github.com/9mtm/Agent-Player/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Issues
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Agent Player. MIT License.
          </div>
        </div>
      </footer>
    </main>
  );
}
