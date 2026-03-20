'use client';

import { useEffect, useState } from 'react';
import { Download, CheckCircle2, Github, Monitor, Smartphone, Apple, AlertCircle, Shield, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Asset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface Release {
  tag_name: string;
  name: string;
  published_at: string;
  assets: Asset[];
  body: string;
}

export default function DownloadsPage() {
  const [release, setRelease] = useState<Release | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [platform, setPlatform] = useState<'windows' | 'linux' | 'macos' | 'unknown'>('unknown');

  useEffect(() => {
    // Detect user's platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('win')) setPlatform('windows');
    else if (userAgent.includes('mac')) setPlatform('macos');
    else if (userAgent.includes('linux')) setPlatform('linux');

    // Fetch latest release from GitHub
    fetch('https://api.github.com/repos/9mtm/Agent-Player/releases/latest')
      .then(res => res.json())
      .then(data => {
        setRelease(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch latest release');
        setLoading(false);
      });
  }, []);

  const getPlatformIcon = (os: string) => {
    switch (os) {
      case 'windows': return <Monitor className="w-8 h-8" />;
      case 'linux': return <Smartphone className="w-8 h-8" />;
      case 'macos': return <Apple className="w-8 h-8" />;
      default: return <Download className="w-8 h-8" />;
    }
  };

  const getDownloadLink = (type: 'windows' | 'linux' | 'macos') => {
    if (!release) return null;

    const patterns = {
      windows: /win-x64\.msi$/,
      linux: /linux-x86_64\.AppImage$/,
      macos: /macos-x64\.dmg$/,
    };

    return release.assets.find(asset => patterns[type].test(asset.name));
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading latest release...</div>
      </div>
    );
  }

  if (error || !release) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-red-400 text-xl flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          {error || 'No release found'}
        </div>
      </div>
    );
  }

  const windowsAsset = getDownloadLink('windows');
  const linuxAsset = getDownloadLink('linux');
  const macosAsset = getDownloadLink('macos');
  const checksumAsset = release.assets.find(a => a.name === 'checksums.txt');

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Agent Player" width={32} height={32} className="rounded" />
            <span className="text-xl font-bold gradient-text">Agent Player</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:inline"
            >
              Home
            </Link>
            <a
              href="https://github.com/9mtm/Agent-Player"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/20 mb-8">
            <Download className="w-4 h-4 text-brand-purple" />
            <span className="text-sm text-brand-purple-light">Latest Release • {release.tag_name}</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Download <span className="gradient-text">Agent Player</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-slate-400 mb-4 max-w-2xl mx-auto">
            One-click installer for Windows, Linux, and macOS
          </p>
          <p className="text-sm text-slate-500">
            Released on {formatDate(release.published_at)}
          </p>
        </div>
      </section>

      {/* Platform Detection Notice */}
      {platform !== 'unknown' && (
        <section className="px-6 pb-8">
          <div className="max-w-2xl mx-auto p-4 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-cyan" />
              <span className="text-brand-cyan text-sm">
                We detected you're on <strong className="capitalize">{platform}</strong>.
                The recommended download is highlighted below.
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Download Cards */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Windows */}
          {windowsAsset && (
            <div className={`relative p-8 rounded-2xl transition-all ${
              platform === 'windows'
                ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-brand-purple glow-purple'
                : 'bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-brand-purple/50'
            }`}>
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-7 h-7 text-brand-purple" />
                </div>
                <h3 className="text-2xl font-bold mb-1">Windows</h3>
                <p className="text-sm text-slate-400">MSI Installer</p>
              </div>
              <a
                href={windowsAsset.browser_download_url}
                className="block w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold text-center transition-all mb-3"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Download
              </a>
              <p className="text-xs text-slate-500 text-center">
                {formatFileSize(windowsAsset.size)}
              </p>
            </div>
          )}

          {/* Linux */}
          {linuxAsset && (
            <div className={`relative p-8 rounded-2xl transition-all ${
              platform === 'linux'
                ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-brand-purple glow-purple'
                : 'bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-brand-purple/50'
            }`}>
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-7 h-7 text-brand-cyan" />
                </div>
                <h3 className="text-2xl font-bold mb-1">Linux</h3>
                <p className="text-sm text-slate-400">AppImage</p>
              </div>
              <a
                href={linuxAsset.browser_download_url}
                className="block w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold text-center transition-all mb-3"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Download
              </a>
              <p className="text-xs text-slate-500 text-center">
                {formatFileSize(linuxAsset.size)}
              </p>
            </div>
          )}

          {/* macOS */}
          {macosAsset && (
            <div className={`relative p-8 rounded-2xl transition-all ${
              platform === 'macos'
                ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-brand-purple glow-purple'
                : 'bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-brand-purple/50'
            }`}>
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-indigo/10 flex items-center justify-center mx-auto mb-4">
                  <Apple className="w-7 h-7 text-brand-indigo" />
                </div>
                <h3 className="text-2xl font-bold mb-1">macOS</h3>
                <p className="text-sm text-slate-400">DMG Installer</p>
              </div>
              <a
                href={macosAsset.browser_download_url}
                className="block w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold text-center transition-all mb-3"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Download
              </a>
              <p className="text-xs text-slate-500 text-center">
                {formatFileSize(macosAsset.size)}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Installation Instructions */}
      <section className="px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-brand-purple" />
              Installation Instructions
            </h3>
            <div className="space-y-6 text-sm text-slate-300">
              <div>
                <strong className="text-white text-base flex items-center gap-2 mb-2">
                  <Monitor className="w-4 h-4" /> Windows
                </strong>
                <ol className="list-decimal list-inside space-y-1 ml-6">
                  <li>Download the .msi file</li>
                  <li>Run the installer</li>
                  <li>If Windows SmartScreen appears, click "More info" → "Run anyway"</li>
                </ol>
                <p className="text-yellow-400 text-xs mt-2 ml-6">
                  Note: SmartScreen warning is normal for unsigned apps. The installer is safe.
                </p>
              </div>
              <div>
                <strong className="text-white text-base flex items-center gap-2 mb-2">
                  <Smartphone className="w-4 h-4" /> Linux
                </strong>
                <ol className="list-decimal list-inside space-y-1 ml-6">
                  <li>Download the .AppImage file</li>
                  <li>Make it executable: <code className="text-brand-cyan">chmod +x agent-player-installer-*.AppImage</code></li>
                  <li>Run the AppImage</li>
                </ol>
              </div>
              <div>
                <strong className="text-white text-base flex items-center gap-2 mb-2">
                  <Apple className="w-4 h-4" /> macOS
                </strong>
                <ol className="list-decimal list-inside space-y-1 ml-6">
                  <li>Download the .dmg file</li>
                  <li>Open the DMG and drag Agent Player to Applications</li>
                  <li>Note: Unsigned installer - you may need to allow it in Security preferences</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checksums */}
      {checksumAsset && (
        <section className="px-6 pb-20">
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Verify Download (SHA256)
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Always verify your download integrity using the checksums file.
            </p>
            <a
              href={checksumAsset.browser_download_url}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm transition-all"
            >
              <Download className="w-4 h-4" />
              Download checksums.txt
            </a>
          </div>
        </section>
      )}

      {/* View on GitHub */}
      <section className="px-6 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <a
            href="https://github.com/9mtm/Agent-Player/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all font-semibold"
          >
            <Github className="w-5 h-5" />
            View All Releases on GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
