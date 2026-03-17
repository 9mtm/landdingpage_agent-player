'use client';

import {
  Phone,
  TrendingUp,
  Shield,
  Search,
  Users,
  MessageSquare,
  Bot,
  Heart,
  Cloud,
  Sparkles,
  Home,
} from 'lucide-react';
import Link from 'next/link';

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header with Back Button */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <a
            href="/demo"
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-90 transition-opacity font-semibold"
          >
            Try Demo
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-6">
            <Sparkles className="w-4 h-4 text-brand-cyan" />
            <span className="text-sm text-brand-cyan-light">Real-World Applications</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            What Can You Build?
          </h1>

          <p className="text-xl text-slate-400 max-w-4xl mx-auto mb-8 leading-relaxed">
            From AI call centers and social media management to CRM systems and content writing —
            Agent Player is a complete framework with <span className="text-brand-cyan font-semibold">22+ real-world use cases</span> ready to deploy.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
              💼 Business
            </div>
            <div className="px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
              👨‍💻 Developers
            </div>
            <div className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
              🏢 Platform
            </div>
            <div className="px-4 py-2 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400">
              ❤️ Personal
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-12 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Business: AI Call Center */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 via-slate-900 to-slate-900 border border-blue-500/20 hover:border-blue-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Business
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-300">AI Call Center</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                AI agents make automated calls to customers with natural conversations. Perfect for customer support, surveys, and reminders.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">Automation</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">24/7</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">Voice AI</span>
              </div>
            </div>

            {/* Business: Trading Platform */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-green-500/10 via-slate-900 to-slate-900 border border-green-500/20 hover:border-green-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  Business
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-300">Automated Trading</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Built-in Alpaca API integration for stock trading. AI analyzes market trends, executes trades, and manages portfolio automatically.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-400">Stock Trading</span>
                <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-400">Portfolio</span>
              </div>
            </div>

            {/* Business: Security Scanner */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-red-500/10 via-slate-900 to-slate-900 border border-red-500/20 hover:border-red-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-red-400" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  Business
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-red-300">WAF Security Scanner</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Test websites for vulnerabilities, detect WAF protections, identify security gaps. Professional penetration testing automation.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-red-500/10 text-red-400">Security</span>
                <span className="text-xs px-2 py-0.5 rounded bg-red-500/10 text-red-400">Pentesting</span>
              </div>
            </div>

            {/* Developer: Desktop Automation */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 via-slate-900 to-slate-900 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Developer
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-purple-300">Desktop Control</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                AI controls your computer: clicks, types, moves mouse, takes screenshots. Complete OS-level automation for any GUI app.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-400">Automation</span>
                <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-400">Multi-Monitor</span>
              </div>
            </div>

            {/* Developer: No-Code UI */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-900 border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Developer
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-cyan-300">JSON-to-UI Magic</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Revolutionary system: AI sends JSON, it renders as beautiful UI instantly. 70+ components including dashboards, charts, tables, forms.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">No-Code UI</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">70+ Components</span>
              </div>
            </div>

            {/* Developer: Multi-Agent Teams */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 via-slate-900 to-slate-900 border border-orange-500/20 hover:border-orange-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-400" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  Developer
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-orange-300">Multi-Agent Coordination</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Create teams of specialized agents that work together. Task assignment, dependencies, pipeline data flow, and scheduled execution.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-orange-500/10 text-orange-400">Task Pipeline</span>
                <span className="text-xs px-2 py-0.5 rounded bg-orange-500/10 text-orange-400">Kanban Board</span>
              </div>
            </div>

            {/* Platform: E-Commerce Assistant */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 via-slate-900 to-slate-900 border border-pink-500/20 hover:border-pink-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  Platform
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-pink-300">E-Commerce Platform</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Build complete online stores with AI assistants. Product recommendations, customer support, order tracking, and personalized shopping.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-pink-500/10 text-pink-400">Shopping</span>
                <span className="text-xs px-2 py-0.5 rounded bg-pink-500/10 text-pink-400">Support Bot</span>
              </div>
            </div>

            {/* Platform: Education Platform */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-slate-900 to-slate-900 border border-indigo-500/20 hover:border-indigo-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Platform
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-indigo-300">Learning Platform</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Create educational platforms with AI tutors. Interactive lessons, personalized learning paths, homework grading, and progress tracking.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">AI Tutor</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">Auto-Grade</span>
              </div>
            </div>

            {/* Personal: AI Companion */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 via-slate-900 to-slate-900 border border-violet-500/20 hover:border-violet-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-violet-400" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  Personal
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-violet-300">AI Companion</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Personal assistant with 3D avatar, voice chat, and memory. Remembers your preferences, learns your habits, helps with daily tasks.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-violet-500/10 text-violet-400">Cross-Platform</span>
                <span className="text-xs px-2 py-0.5 rounded bg-violet-500/10 text-violet-400">Personality</span>
              </div>
            </div>

            {/* Personal: SEO Optimization */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 via-slate-900 to-slate-900 border border-yellow-500/20 hover:border-yellow-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <Search className="w-6 h-6 text-yellow-400" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                  Business
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-yellow-300">SEO Optimization</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Built-in SEO tools analyze and improve website rankings. Keywords, meta tags, SERP tracking, automated optimization suggestions.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400">Keywords</span>
                <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400">SERP Tracking</span>
              </div>
            </div>

            {/* Business: HR Management */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 via-slate-900 to-slate-900 border border-sky-500/20 hover:border-sky-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-sky-400" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Business
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-sky-300">HR Management System</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Automate HR tasks: screen resumes, schedule interviews, answer employee questions, track attendance, manage leave requests, onboarding automation.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-400">Resume Screening</span>
                <span className="text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-400">Onboarding</span>
                <span className="text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-400">Employee Support</span>
              </div>
            </div>

            {/* Business: Technical Support */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-red-600/10 via-slate-900 to-slate-900 border border-red-600/20 hover:border-red-600/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-600/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-red-400" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-600/10 text-red-400 border border-red-600/20">
                  Business
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-red-300">Website Technical Support</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                24/7 AI support agents handle customer queries, troubleshoot issues, escalate complex cases, track tickets. Multi-language support with chat history.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-red-600/10 text-red-400">24/7 Support</span>
                <span className="text-xs px-2 py-0.5 rounded bg-red-600/10 text-red-400">Ticket System</span>
                <span className="text-xs px-2 py-0.5 rounded bg-red-600/10 text-red-400">Multi-Language</span>
              </div>
            </div>

            {/* Business: Social Media Manager */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-fuchsia-500/10 via-slate-900 to-slate-900 border border-fuchsia-500/20 hover:border-fuchsia-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                  Business
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-fuchsia-300">Social Media Manager</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Auto-post to multiple platforms, schedule content, track engagement, respond to comments. Supports Discord, Telegram, WhatsApp, Slack integrations.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-400">Multi-Platform</span>
                <span className="text-xs px-2 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-400">Scheduling</span>
                <span className="text-xs px-2 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-400">Analytics</span>
              </div>
            </div>

            {/* Business: AI Content Writer */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-rose-500/10 via-slate-900 to-slate-900 border border-rose-500/20 hover:border-rose-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Business
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-rose-300">AI Content Writer</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Generate blog posts, marketing copy, product descriptions, email campaigns, and SEO-optimized articles. Multiple LLM support for varied content styles.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-rose-500/10 text-rose-400">Blog Posts</span>
                <span className="text-xs px-2 py-0.5 rounded bg-rose-500/10 text-rose-400">Marketing</span>
                <span className="text-xs px-2 py-0.5 rounded bg-rose-500/10 text-rose-400">SEO</span>
              </div>
            </div>

            {/* Business: Lead Generation */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-lime-500/10 via-slate-900 to-slate-900 border border-lime-500/20 hover:border-lime-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-lime-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-lime-500/10 text-lime-400 border border-lime-500/20">
                  Business
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-lime-300">Lead Generation System</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Capture leads through chat, qualify automatically, nurture with email sequences, and hand off to sales team. Integrated CRM with memory system.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-lime-500/10 text-lime-400">Capture</span>
                <span className="text-xs px-2 py-0.5 rounded bg-lime-500/10 text-lime-400">Qualify</span>
                <span className="text-xs px-2 py-0.5 rounded bg-lime-500/10 text-lime-400">Nurture</span>
              </div>
            </div>

            {/* Platform: CRM System */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-500/10 via-slate-900 to-slate-800 border border-slate-500/20 hover:border-slate-400/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20">
                  Platform
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-300">CRM System</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Complete customer relationship management. Contact database, interaction history, sales pipeline, email integration, and AI-powered insights.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-slate-500/10 text-slate-400">Contacts</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-500/10 text-slate-400">Pipeline</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-500/10 text-slate-400">AI Insights</span>
              </div>
            </div>

            {/* Platform: SaaS Product */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-900 border border-emerald-500/20 hover:border-emerald-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Platform
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-emerald-300">SaaS Product Foundation</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                White-label platform ready for rebranding. Multi-tenant support, API-first architecture, extension system for customization.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">White-Label</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">API-First</span>
              </div>
            </div>

            {/* Developer: WordPress Manager */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 via-slate-900 to-slate-900 border border-blue-600/20 hover:border-blue-600/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-600/10 text-blue-400 border border-blue-600/20">
                  Developer
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-300">WordPress Manager</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Automate WordPress sites: post content, update plugins, manage users, moderate comments, optimize SEO, backup databases. Full REST API integration.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-blue-600/10 text-blue-400">Auto-Post</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-600/10 text-blue-400">Plugin Updates</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-600/10 text-blue-400">REST API</span>
              </div>
            </div>

            {/* Platform: Shopify Store Manager */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-teal-500/10 via-slate-900 to-slate-900 border border-teal-500/20 hover:border-teal-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  Platform
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-teal-300">Shopify Store Manager</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Manage e-commerce stores: update inventory, process orders, respond to customers, generate product descriptions, analyze sales, automate marketing campaigns.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-teal-500/10 text-teal-400">Inventory</span>
                <span className="text-xs px-2 py-0.5 rounded bg-teal-500/10 text-teal-400">Orders</span>
                <span className="text-xs px-2 py-0.5 rounded bg-teal-500/10 text-teal-400">Marketing</span>
              </div>
            </div>

            {/* Developer: Code Writing Assistant */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-indigo-600/10 via-slate-900 to-slate-900 border border-indigo-600/20 hover:border-indigo-600/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-600/10 text-indigo-400 border border-indigo-600/20">
                  Developer
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-indigo-300">Code Writing Assistant</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Generate code snippets, debug errors, refactor existing code, write documentation, create unit tests. Multi-language support with context awareness.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-600/10 text-indigo-400">Multi-Language</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-600/10 text-indigo-400">Debug</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-600/10 text-indigo-400">Testing</span>
              </div>
            </div>

            {/* Platform: Moodle/LMS Manager */}
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 hover:border-amber-500/50 transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Platform
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-amber-300">Moodle/LMS Manager</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Automate learning platforms: grade assignments, respond to students, generate course content, track progress, create quizzes, send reminders and notifications.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">Auto-Grade</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">Content Gen</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">Student Support</span>
              </div>
            </div>
          </div>

          {/* Special Card: Build Anything You Imagine - Full Width */}
          <div className="mt-12 group relative p-8 rounded-3xl bg-gradient-to-br from-brand-purple/20 via-brand-indigo/10 to-brand-cyan/10 border-2 border-brand-purple/30 hover:border-brand-cyan/50 transition-all hover:scale-[1.02]">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-brand-purple/20 to-brand-cyan/20 border border-brand-cyan/30">
                <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-bold gradient-text">Unlimited Possibilities</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Build Anything You Imagine</h3>

              <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-6 leading-relaxed">
                These <span className="text-brand-cyan font-semibold">22 use cases</span> are just examples. Agent Player is a <span className="text-brand-purple font-semibold">complete framework</span> — you can create <span className="font-bold">unlimited custom agents</span> for any business need you can think of.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-green-400 font-bold">100% FREE Forever</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span className="text-blue-400 font-bold">Open Source (MIT)</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-purple-400 font-bold">Unlimited Agents</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="text-cyan-400 font-bold">Any LLM (Claude, GPT, Local)</span>
                </div>
              </div>

              <p className="text-sm text-slate-400 mb-8 max-w-2xl mx-auto">
                Want agents for restaurant orders? Hotel bookings? Appointment scheduling? Real estate? Healthcare? Education?
                <span className="text-brand-cyan font-semibold"> Agent Player makes it possible.</span>
              </p>

              <a
                href="/demo"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-90 transition-all hover:scale-105 font-bold text-lg shadow-lg shadow-brand-purple/20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Building Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400 mb-2">
            Agent Player is not just a tool — it's a <span className="text-brand-cyan font-semibold">complete framework</span>
          </p>
          <p className="text-sm text-slate-500 mb-8">
            100% FREE • Open Source • Works with any LLM • Run locally or in cloud
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-90 transition-opacity font-semibold text-lg"
            >
              Try Live Demo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href="https://github.com/yourusername/agent-player"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors font-semibold text-lg border border-slate-700"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
