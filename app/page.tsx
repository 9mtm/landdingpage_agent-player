'use client';

import { useState } from 'react';
import {
  Github, Star, Book, Code2, Bell, Cloud, Sparkles, ArrowRight, Check,
  MessageCircle, Phone, Mail, Search, Users, Calendar, Server, BarChart3, Shield, MessagesSquare,
  Globe, MousePointer, Brain, Monitor, HardDrive, Volume2, Mic, Video, Key, Terminal, Puzzle,
  Upload, Link, UserCircle, Zap, Layout, ChevronRight
} from 'lucide-react';
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

      {/* Immersive Hero — Live Demo Preview */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
        {/* Live demo iframe as background */}
        <iframe
          src="/demo"
          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
          title="Agent Player Live Preview"
          loading="eager"
        />

        {/* Thin top gradient for nav only */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none z-[1]" />
        {/* Subtle bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-[1]" />

        {/* Single CTA button centered */}
        <div className="absolute inset-0 z-10 flex items-end justify-center pb-20">
          <a
            href="/demo"
            className="group px-12 py-6 rounded-2xl bg-hero-gradient hover:opacity-90 transition-all flex items-center gap-3 font-bold text-2xl shadow-2xl glow-purple"
          >
            <Sparkles className="w-7 h-7" />
            Try Live Demo
            <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-40">
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </div>
        </div>
      </section>

      {/* Info Section — Title, Description, Stats, Links */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
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

          {/* Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="https://github.com/9mtm/Agent-Player"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2 font-semibold text-lg border border-slate-700"
            >
              <Star className="w-5 h-5" />
              Star on GitHub
              {stars && (
                <span className="flex items-center gap-1 text-sm text-slate-400">
                  ({stars})
                </span>
              )}
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto pt-12 border-t border-slate-800">
            <div>
              <div className="text-3xl font-bold text-brand-cyan">70+</div>
              <div className="text-sm text-slate-400 mt-1">UI Components</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-purple">13</div>
              <div className="text-sm text-slate-400 mt-1">Extensions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-indigo">26</div>
              <div className="text-sm text-slate-400 mt-1">Built-in Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-teal">27</div>
              <div className="text-sm text-slate-400 mt-1">Notification Types</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — AI Prompt System */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/20 mb-6">
              <Zap className="w-4 h-4 text-brand-purple" />
              <span className="text-sm text-brand-purple-light">Prompt-Driven System</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Just Chat. AI Does the Rest.</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              No code needed. The AI automatically knows how to generate UI components
              and send live notifications — all from a simple chat message.
            </p>
          </div>

          {/* 3-Step Flow */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Step 1 */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
              <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-brand-purple text-white text-xs font-bold">
                Step 1
              </div>
              <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center mb-5">
                <MessageCircle className="w-6 h-6 text-brand-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">You Send a Message</h3>
              <div className="rounded-lg bg-slate-950 border border-slate-700 p-4 font-mono text-sm">
                <span className="text-slate-500">You:</span>
                <span className="text-slate-300 ml-2">&quot;Show me the stock price of AAPL and send a WhatsApp alert&quot;</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center absolute left-1/3 top-1/2 -translate-y-1/2 z-10">
            </div>

            {/* Step 2 */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
              <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-brand-indigo text-white text-xs font-bold">
                Step 2
              </div>
              <div className="w-12 h-12 rounded-xl bg-brand-indigo/10 flex items-center justify-center mb-5">
                <Brain className="w-6 h-6 text-brand-indigo" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Understands & Generates</h3>
              <div className="rounded-lg bg-slate-950 border border-slate-700 p-4 font-mono text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <Layout className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span className="text-brand-cyan">spec</span>
                  <span className="text-slate-500">→ Chart + Metric cards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                  <span className="text-brand-purple">notify</span>
                  <span className="text-slate-500">→ WhatsApp notification</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-slate-400">text</span>
                  <span className="text-slate-500">→ Natural response</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
              <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-brand-cyan text-white text-xs font-bold">
                Step 3
              </div>
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6 text-brand-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-3">Everything Appears Live</h3>
              <div className="rounded-lg bg-slate-950 border border-slate-700 p-4 text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">Stock chart rendered on screen</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">WhatsApp notification on avatar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">Avatar speaks the response</span>
                </div>
              </div>
            </div>
          </div>

          {/* Two columns: UI Components + Notification Types */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: UI Generation */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/50 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center">
                  <Layout className="w-5 h-5 text-brand-cyan" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">AI-Generated UI</h3>
                  <p className="text-xs text-slate-500">54+ components via prompt</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Charts & Graphs', desc: 'Bar, Line, Pie, Area' },
                  { label: 'Data Cards', desc: 'Metrics, KPIs, Badges' },
                  { label: 'Tables & Lists', desc: 'Sortable, paginated data' },
                  { label: 'Forms & Inputs', desc: 'Text, Select, Checkbox, Slider' },
                  { label: 'Interactive', desc: 'Buttons, Toggles, Accordions' },
                  { label: 'Advanced', desc: 'JSON Viewer, Markdown, Timeline' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-brand-cyan" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <span className="text-xs text-slate-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Notification Types */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/50 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand-purple/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-brand-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Live Notifications</h3>
                  <p className="text-xs text-slate-500">27 types on avatar screen</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'WhatsApp', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                  { name: 'Telegram', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
                  { name: 'Discord', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
                  { name: 'YouTube', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
                  { name: 'Stripe', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
                  { name: 'PayPal', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
                  { name: 'Email', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
                  { name: 'GIF', color: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
                  { name: 'OTP Code', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                  { name: 'Face ID', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
                  { name: 'SMS OTP', color: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
                  { name: 'Terminal', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
                  { name: 'Twitter', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
                  { name: 'TikTok', color: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
                  { name: 'Instagram', color: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20' },
                  { name: 'Facebook', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
                  { name: 'Twitch', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
                  { name: 'Reddit', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
                  { name: 'LinkedIn', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
                  { name: 'Snapchat', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
                  { name: 'Calendar', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
                  { name: 'Stock Alert', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
                  { name: 'Apple Pay', color: 'bg-slate-500/10 text-slate-300 border-slate-500/20' },
                  { name: 'Bank', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                  { name: 'Task', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
                  { name: 'Approval', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
                  { name: 'Message', color: 'bg-slate-500/10 text-slate-300 border-slate-500/20' },
                ].map((n) => (
                  <span key={n.name} className={`px-2.5 py-1 rounded-md border text-xs font-medium ${n.color}`}>
                    {n.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              The AI learns available components through an injected system prompt —
              no configuration needed. It generates UI and notifications as part of its natural response.
            </p>
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

      {/* Avatar Sources */}
      <section className="py-20 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 mb-6">
              <UserCircle className="w-4 h-4 text-brand-indigo" />
              <span className="text-sm text-brand-indigo">Bring Your Own Avatar</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Choose Your 3D Avatar</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Paste a URL or upload a file — your avatar loads automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Ready Player Me */}
            <a href="https://readyplayer.me" target="_blank" rel="nofollow noopener noreferrer" className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-brand-purple/50 transition-all group block">
              <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                  <path d="M15 3a3 3 0 0 1 0 6" strokeOpacity="0.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Ready Player Me</h3>
              <p className="text-slate-400 mb-6">
                Create your personalized avatar with Ready Player Me&apos;s editor, then paste the .glb URL directly.
              </p>
              <div className="flex items-center gap-2 text-sm text-brand-purple-light">
                <Link className="w-4 h-4" />
                <span>readyplayer.me</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute top-4 right-4 px-2 py-1 rounded-md bg-brand-purple/10 text-[10px] uppercase tracking-wider font-semibold text-brand-purple">
                Popular
              </div>
            </a>

            {/* Mixamo */}
            <a href="https://www.mixamo.com" target="_blank" rel="nofollow noopener noreferrer" className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-brand-cyan/50 transition-all group block">
              <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-brand-cyan" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Mixamo</h3>
              <p className="text-slate-400 mb-6">
                Download rigged & animated characters from Adobe Mixamo in FBX or GLB format and upload them.
              </p>
              <div className="flex items-center gap-2 text-sm text-brand-cyan">
                <Link className="w-4 h-4" />
                <span>mixamo.com</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* Custom Upload */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-brand-teal/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-7 h-7 text-brand-teal" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Custom Upload</h3>
              <p className="text-slate-400 mb-6">
                Use any 3D character — VRoid, Blender, or any tool. Just drag & drop your .glb / .vrm file.
              </p>
              <div className="flex items-center gap-2 text-sm text-brand-teal">
                <Upload className="w-4 h-4" />
                <span>Drag & drop .glb / .vrm</span>
              </div>
            </div>
          </div>

          {/* Supported formats bar */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {['GLB', 'GLTF', 'FBX', 'VRM'].map((fmt) => (
              <span key={fmt} className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-400">
                .{fmt.toLowerCase()}
              </span>
            ))}
            <span className="text-xs text-slate-500 ml-2">Supported formats</span>
          </div>
        </div>
      </section>

      {/* Extensions & Tools */}
      <section className="py-20 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-6">
              <Puzzle className="w-4 h-4 text-brand-cyan" />
              <span className="text-sm text-brand-cyan">13 Extensions + 26 Built-in Tools</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Extensions & Tools</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Connect channels, add apps, and give your AI agent powerful capabilities out of the box.
            </p>
          </div>

          {/* All items in one unified grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              /* ── Extensions: Channels ── */
              { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>, name: 'Discord', desc: 'Bot messaging', color: 'text-indigo-400', tag: 'ext' },
              { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.124 2.521a2.528 2.528 0 0 1 2.52-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.52V8.834zm-1.271 0a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.522 2.522v6.312zm-2.522 10.124a2.528 2.528 0 0 1 2.522 2.52A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.521-2.522v-2.52h2.521zm0-1.271a2.527 2.527 0 0 1-2.521-2.521 2.528 2.528 0 0 1 2.521-2.521h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.522h-6.313z"/></svg>, name: 'Slack', desc: 'Workspace bot', color: 'text-green-400', tag: 'ext' },
              { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>, name: 'Telegram', desc: 'Bot API', color: 'text-sky-400', tag: 'ext' },
              { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M20.52 3.449A11.932 11.932 0 0 0 12.008 0C5.382 0 .003 5.375.003 11.992c0 2.114.553 4.178 1.604 5.996L0 24l6.167-1.617a11.985 11.985 0 0 0 5.73 1.46h.005c6.624 0 12.003-5.376 12.003-11.993a11.918 11.918 0 0 0-3.384-8.4z"/></svg>, name: 'WhatsApp', desc: 'Twilio Business', color: 'text-emerald-400', tag: 'ext' },
              { icon: <Phone className="w-5 h-5" />, name: 'Call Center', desc: 'AI voice calls', color: 'text-blue-400', tag: 'ext' },
              /* ── Extensions: Apps ── */
              { icon: <Mail className="w-5 h-5" />, name: 'Email Client', desc: 'Gmail, Outlook, IMAP', color: 'text-red-400', tag: 'ext' },
              { icon: <MessagesSquare className="w-5 h-5" />, name: 'Public Chat', desc: 'AI chat rooms', color: 'text-blue-400', tag: 'ext' },
              { icon: <Calendar className="w-5 h-5" />, name: 'Calendar', desc: 'Google & iCal sync', color: 'text-sky-400', tag: 'ext' },
              { icon: <Users className="w-5 h-5" />, name: 'Team', desc: 'Roles & invitations', color: 'text-purple-400', tag: 'ext' },
              { icon: <Server className="w-5 h-5" />, name: 'Server Monitor', desc: 'WHM, cPanel, AWS', color: 'text-emerald-400', tag: 'ext' },
              { icon: <BarChart3 className="w-5 h-5" />, name: 'Trading', desc: 'Stocks & crypto AI', color: 'text-green-400', tag: 'ext' },
              { icon: <Shield className="w-5 h-5" />, name: 'WAF Security', desc: 'Security scanner', color: 'text-orange-400', tag: 'ext' },
              { icon: <Search className="w-5 h-5" />, name: 'SEO Suite', desc: 'Keywords & SERP', color: 'text-yellow-400', tag: 'ext' },
              /* ── Built-in Tools ── */
              { icon: <Globe className="w-5 h-5" />, name: 'Web Fetch', desc: 'API & scraping', color: 'text-blue-400', tag: 'tool' },
              { icon: <MousePointer className="w-5 h-5" />, name: 'Browser', desc: 'Navigate & extract', color: 'text-cyan-400', tag: 'tool' },
              { icon: <Brain className="w-5 h-5" />, name: 'Memory', desc: 'Save & recall context', color: 'text-purple-400', tag: 'tool' },
              { icon: <Monitor className="w-5 h-5" />, name: 'Desktop', desc: 'Mouse & keyboard', color: 'text-green-400', tag: 'tool' },
              { icon: <HardDrive className="w-5 h-5" />, name: 'Storage', desc: 'CDN & cache files', color: 'text-slate-400', tag: 'tool' },
              { icon: <Terminal className="w-5 h-5" />, name: 'Code Exec', desc: 'Shell & scripts', color: 'text-emerald-400', tag: 'tool' },
              { icon: <Volume2 className="w-5 h-5" />, name: 'TTS', desc: '14 languages', color: 'text-pink-400', tag: 'tool' },
              { icon: <Mic className="w-5 h-5" />, name: 'STT', desc: 'Whisper speech', color: 'text-rose-400', tag: 'tool' },
              { icon: <Video className="w-5 h-5" />, name: 'Video Edit', desc: 'Trim & subtitles', color: 'text-red-400', tag: 'tool' },
              { icon: <Bell className="w-5 h-5" />, name: 'Reminders', desc: 'Scheduled alerts', color: 'text-yellow-400', tag: 'tool' },
              { icon: <Key className="w-5 h-5" />, name: 'Credentials', desc: 'AES-256 vault', color: 'text-orange-400', tag: 'tool' },
              { icon: <Code2 className="w-5 h-5" />, name: 'File I/O', desc: 'Read & write files', color: 'text-indigo-400', tag: 'tool' },
            ].map((item) => (
              <div key={item.name} className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800/50 border border-slate-800 hover:border-brand-purple/40 transition-colors group">
                <div className="flex items-center justify-between mb-2">
                  <span className={`${item.color} group-hover:scale-110 transition-transform inline-block`}>{item.icon}</span>
                  <span className={`text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded ${
                    item.tag === 'ext'
                      ? 'bg-brand-cyan/10 text-brand-cyan'
                      : 'bg-brand-purple/10 text-brand-purple-light'
                  }`}>{item.tag === 'ext' ? 'Extension' : 'Tool'}</span>
                </div>
                <div className="font-semibold text-sm">{item.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
              </div>
            ))}
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
              <div className="relative w-full aspect-video">
                <Image
                  src="/images/alpaca.png"
                  alt="Trading Dashboard"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 bg-slate-900">
                <h3 className="font-semibold text-lg mb-2">AI Trading Dashboard</h3>
                <p className="text-sm text-slate-400">Real-time stock charts and portfolio management</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-lg hover:border-brand-cyan/50 transition-colors">
              <div className="relative w-full aspect-video">
                <Image
                  src="/images/panel1.jpg"
                  alt="Avatar Gallery"
                  fill
                  className="object-cover"
                />
              </div>
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
