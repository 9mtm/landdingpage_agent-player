'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowLeft, Camera, Download, Users, RefreshCw } from 'lucide-react';
import { CustomizerControls } from '@/components/avatar-customizer/CustomizerControls';
import { PhotoCapture } from '@/components/avatar-customizer/PhotoCapture';

// Lazy-load AvatarViewer (heavy Three.js dep, no SSR)
const AvatarViewer = dynamic(
  () => import('@/components/avatar/AvatarViewer').then((m) => ({ default: m.AvatarViewer })),
  { ssr: false, loading: () => <div className="w-full h-full bg-slate-900 flex items-center justify-center"><div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" /></div> }
);

const CDN_MALE_IDLE = 'https://readyplayerme-assets.s3.amazonaws.com/animations/visage/male-idle.glb';
const CDN_FEMALE_IDLE = 'https://readyplayerme-assets.s3.amazonaws.com/animations/visage/female-idle.glb';

const AVATARS = [
  { url: '/avatars/demo-avatar-female.glb', label: 'Avatar 1', thumb: '👩', idle: CDN_MALE_IDLE },
  { url: '/avatars/demo-avatar-male.glb', label: 'Avatar 2', thumb: '👨', idle: CDN_MALE_IDLE },
  { url: '/avatars/demo-avatar-3.glb', label: 'Avatar 3', thumb: '🧑', idle: CDN_MALE_IDLE },
  { url: '/avatars/demo-avatar-4.glb', label: 'Avatar 4', thumb: '🧑‍🦱', idle: CDN_MALE_IDLE },
];

type Panel = 'customize' | 'photo';

export default function CreateAvatarPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const avatarUrl = AVATARS[selectedIdx].url;
  const animationUrl = AVATARS[selectedIdx].idle;
  const [morphValues, setMorphValues] = useState<Record<string, number>>({});
  const [colors, setColors] = useState<{ skin?: string; hair?: string; eyes?: string }>({});
  const [activePanel, setActivePanel] = useState<Panel>('customize');
  // Key to force Canvas re-mount on WebGL context loss
  const [canvasKey, setCanvasKey] = useState(0);
  const [contextLost, setContextLost] = useState(false);

  // Detect GPU context loss via DOM events on the canvas
  useEffect(() => {
    const handleContextLost = () => setContextLost(true);
    const handleContextRestored = () => setContextLost(false);
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    }
  }, [canvasKey]);

  const retryCanvas = useCallback(() => {
    setContextLost(false);
    setCanvasKey((k) => k + 1);
  }, []);

  const handleReset = useCallback(() => {
    setMorphValues({});
    setColors({});
  }, []);

  const handleExport = useCallback(() => {
    const data = { avatarUrl, morphValues, colors, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'avatar-config.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [avatarUrl, morphValues, colors]);

  const handleBlendshapesDetected = useCallback((blendshapes: Record<string, number>) => {
    // Filter out very small values and map to morph values
    const filtered: Record<string, number> = {};
    for (const [name, value] of Object.entries(blendshapes)) {
      if (value > 0.01) {
        filtered[name] = value;
      }
    }
    setMorphValues(filtered);
    // Switch to customize panel so user can fine-tune
    setActivePanel('customize');
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Agent Player" width={28} height={28} className="rounded" />
            <span className="text-lg font-bold gradient-text">Agent Player</span>
          </a>
          <div className="flex items-center gap-2">
            <a
              href="/demo"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Demo
            </a>
            <a
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-16 h-screen flex flex-col">
        {/* Main content: avatar preview + controls side by side */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          {/* Left: 3D Avatar Preview */}
          <div className="flex-1 relative min-h-[300px] lg:min-h-0">
            {/* Avatar selector */}
            <div className="absolute top-3 left-3 z-10 flex gap-1.5">
              {AVATARS.map((av, i) => (
                <button
                  key={av.url}
                  onClick={() => setSelectedIdx(i)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all ${
                    selectedIdx === i
                      ? 'bg-brand-purple/30 border-2 border-brand-purple shadow-lg shadow-brand-purple/20'
                      : 'bg-slate-800/80 border border-slate-700 hover:border-slate-600'
                  }`}
                  title={av.label}
                >
                  {av.thumb}
                </button>
              ))}
            </div>

            {/* Context loss overlay with retry */}
            {contextLost && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/90">
                <p className="text-slate-400 mb-3 text-sm">GPU context lost — close other 3D tabs and retry</p>
                <button
                  onClick={retryCanvas}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-purple hover:bg-brand-purple/80 text-white text-sm font-medium transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reload 3D Viewer
                </button>
              </div>
            )}

            <div key={canvasKey} className="w-full h-full">
              <AvatarViewer
                avatarUrl={avatarUrl}
                animationUrl={animationUrl}
                className="w-full h-full"
                bgColor="#0f172a"
                initialPreset="full"
                avatarY={-1.5}
                morphOverrides={morphValues}
                materialColorOverride={Object.keys(colors).length > 0 ? colors : undefined}
              />
            </div>
          </div>

          {/* Right: Controls panel */}
          <div className="w-full lg:w-[380px] border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-950/50 flex flex-col min-h-[300px] lg:min-h-0">
            {/* Panel switcher */}
            <div className="flex border-b border-slate-800">
              <button
                onClick={() => setActivePanel('customize')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activePanel === 'customize'
                    ? 'text-white bg-slate-900/50 border-b-2 border-brand-purple'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Users className="w-4 h-4" />
                Customize
              </button>
              <button
                onClick={() => setActivePanel('photo')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activePanel === 'photo'
                    ? 'text-white bg-slate-900/50 border-b-2 border-brand-purple'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Camera className="w-4 h-4" />
                Photo to Avatar
              </button>
            </div>

            {/* Panel content */}
            <div className="flex-1 overflow-hidden">
              {activePanel === 'customize' && (
                <CustomizerControls
                  morphValues={morphValues}
                  onMorphChange={setMorphValues}
                  colors={colors}
                  onColorChange={setColors}
                  onReset={handleReset}
                  onExport={handleExport}
                />
              )}
              {activePanel === 'photo' && (
                <div className="p-4 overflow-y-auto h-full">
                  <PhotoCapture onBlendshapesDetected={handleBlendshapesDetected} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
