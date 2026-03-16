'use client';

import { Info, ExternalLink } from 'lucide-react';

export function DemoBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-center text-sm shadow-lg">
      <div className="flex items-center justify-center gap-2">
        <Info className="w-4 h-4" />
        <span className="font-medium">Demo Mode</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">
          This is a preview. Full features require the{' '}
          <a
            href="https://github.com/9mtm/Agent-Player"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline inline-flex items-center gap-1"
          >
            complete installation
            <ExternalLink className="w-3 h-3" />
          </a>
        </span>
      </div>
    </div>
  );
}
