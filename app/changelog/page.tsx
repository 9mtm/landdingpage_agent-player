'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  GitCommit, Calendar, ArrowLeft, Loader2, RefreshCw,
  Tag, Code2, Zap, Shield, Brain, Bell, Phone, Monitor, Package
} from 'lucide-react';

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

// Categorize commits by keywords in the message
function categorize(msg: string): { icon: React.ReactNode; color: string; label: string } {
  const m = msg.toLowerCase();
  if (m.includes('fix') || m.includes('bug') || m.includes('error') || m.includes('patch'))
    return { icon: <Shield className="w-4 h-4" />, color: 'text-orange-400 bg-orange-400/10 border-orange-400/20', label: 'Fix' };
  if (m.includes('security') || m.includes('waf') || m.includes('vulnerabilit'))
    return { icon: <Shield className="w-4 h-4" />, color: 'text-red-400 bg-red-400/10 border-red-400/20', label: 'Security' };
  if (m.includes('memory') || m.includes('brain') || m.includes('evolution'))
    return { icon: <Brain className="w-4 h-4" />, color: 'text-purple-400 bg-purple-400/10 border-purple-400/20', label: 'AI' };
  if (m.includes('notification') || m.includes('alert'))
    return { icon: <Bell className="w-4 h-4" />, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', label: 'Notification' };
  if (m.includes('call center') || m.includes('call'))
    return { icon: <Phone className="w-4 h-4" />, color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', label: 'Extension' };
  if (m.includes('extension') || m.includes('marketplace') || m.includes('trading'))
    return { icon: <Package className="w-4 h-4" />, color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20', label: 'Extension' };
  if (m.includes('installer') || m.includes('tauri') || m.includes('desktop') || m.includes('build') || m.includes('ci/cd') || m.includes('github actions'))
    return { icon: <Monitor className="w-4 h-4" />, color: 'text-green-400 bg-green-400/10 border-green-400/20', label: 'Build' };
  if (m.includes('database') || m.includes('schema') || m.includes('migration'))
    return { icon: <Code2 className="w-4 h-4" />, color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20', label: 'Database' };
  if (m.includes('setup') || m.includes('wizard') || m.includes('config'))
    return { icon: <Zap className="w-4 h-4" />, color: 'text-teal-400 bg-teal-400/10 border-teal-400/20', label: 'Setup' };
  return { icon: <GitCommit className="w-4 h-4" />, color: 'text-slate-400 bg-slate-400/10 border-slate-400/20', label: 'Update' };
}

// Group commits by date
function groupByDate(commits: Commit[]): Record<string, Commit[]> {
  const groups: Record<string, Commit[]> = {};
  for (const c of commits) {
    const date = c.commit.author.date.split('T')[0];
    if (!groups[date]) groups[date] = [];
    groups[date].push(c);
  }
  return groups;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ChangelogPage() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCommits = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch from both main and Mastar branches to get full history (2025+)
      const branches = ['main', 'Mastar'];
      const seen = new Set<string>();
      const allData: Commit[] = [];

      for (const branch of branches) {
        for (let page = 1; page <= 5; page++) {
          const res = await fetch(
            `https://api.github.com/repos/9mtm/Agent-Player/commits?sha=${branch}&per_page=100&page=${page}`
          );
          if (!res.ok) break;
          const data = await res.json();
          if (!Array.isArray(data) || data.length === 0) break;
          for (const c of data) {
            if (!seen.has(c.sha)) {
              seen.add(c.sha);
              allData.push(c);
            }
          }
          if (data.length < 100) break;
        }
      }

      // Sort by date newest first
      allData.sort((a, b) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime());
      setCommits(allData);
    } catch {
      setError('Failed to load changelog from GitHub');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCommits(); }, []);

  const grouped = groupByDate(commits);
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Agent Player" width={32} height={32} className="rounded" />
            <span className="text-xl font-bold gradient-text">Agent Player</span>
          </a>
          <a
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/20 mb-6">
              <GitCommit className="w-4 h-4 text-brand-purple" />
              <span className="text-sm text-brand-purple-light">Live from GitHub</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Changelog</h1>
            <p className="text-xl text-slate-400 mb-6">
              All updates and improvements pulled directly from our GitHub repository.
            </p>
            <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
              <span>{commits.length} commits</span>
              <span className="text-slate-700">|</span>
              <span>{sortedDates.length} days of development</span>
              <span className="text-slate-700">|</span>
              <button
                onClick={fetchCommits}
                className="inline-flex items-center gap-1 text-brand-purple hover:text-brand-purple-light transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center gap-4 py-20">
              <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
              <p className="text-slate-400">Loading changelog from GitHub...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={fetchCommits}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Timeline */}
          {!loading && !error && (
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-px bg-slate-800" />

              {sortedDates.map((date) => (
                <div key={date} className="mb-12">
                  {/* Date header */}
                  <div className="flex items-center gap-3 mb-6 relative">
                    <div className="w-10 h-10 rounded-full bg-brand-purple/20 border-2 border-brand-purple flex items-center justify-center z-10">
                      <Calendar className="w-4 h-4 text-brand-purple" />
                    </div>
                    <h2 className="text-lg font-bold">{formatDate(date)}</h2>
                    <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                      {grouped[date].length} commit{grouped[date].length > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Commits for this date */}
                  <div className="ml-[19px] pl-8 space-y-3">
                    {grouped[date].map((commit) => {
                      const firstLine = commit.commit.message.split('\n')[0];
                      const cat = categorize(firstLine);
                      return (
                        <a
                          key={commit.sha}
                          href={commit.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all group"
                        >
                          <div className="flex items-start gap-3">
                            {/* Category badge */}
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border shrink-0 ${cat.color}`}>
                              {cat.icon}
                              {cat.label}
                            </span>
                            {/* Message */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-slate-200 group-hover:text-white transition-colors leading-relaxed">
                                {firstLine}
                              </p>
                              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                                <span className="font-mono">{commit.sha.slice(0, 7)}</span>
                                <span>{commit.commit.author.name}</span>
                              </div>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
