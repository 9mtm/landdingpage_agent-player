'use client';

import { useState } from 'react';
import { Sliders, Palette, Sparkles, RotateCcw } from 'lucide-react';
import { SLIDER_GROUPS, COLOR_CONFIGS, FACE_PRESETS } from '@/lib/avatar-customizer/presets';
import type { SliderGroup } from '@/lib/avatar-customizer/types';

type Tab = 'face' | 'colors' | 'presets';

interface CustomizerControlsProps {
  morphValues: Record<string, number>;
  onMorphChange: (morphs: Record<string, number>) => void;
  colors: { skin?: string; hair?: string; eyes?: string };
  onColorChange: (colors: { skin?: string; hair?: string; eyes?: string }) => void;
  onReset: () => void;
  onExport: () => void;
}

export function CustomizerControls({
  morphValues,
  onMorphChange,
  colors,
  onColorChange,
  onReset,
  onExport,
}: CustomizerControlsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('face');
  const [expandedGroup, setExpandedGroup] = useState<string>(SLIDER_GROUPS[0].label);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'face', label: 'Face', icon: <Sliders className="w-4 h-4" /> },
    { id: 'colors', label: 'Colors', icon: <Palette className="w-4 h-4" /> },
    { id: 'presets', label: 'Presets', icon: <Sparkles className="w-4 h-4" /> },
  ];

  function handleSliderChange(group: SliderGroup, sliderIdx: number, value: number) {
    const slider = group.sliders[sliderIdx];
    const newMorphs = { ...morphValues, [slider.morph]: value };
    if (slider.morphRight) {
      newMorphs[slider.morphRight] = value;
    }
    onMorphChange(newMorphs);
  }

  function handlePresetClick(morphs: Record<string, number>) {
    // Reset all current morphs to 0, then apply preset
    const reset: Record<string, number> = {};
    for (const key of Object.keys(morphValues)) reset[key] = 0;
    onMorphChange({ ...reset, ...morphs });
  }

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex border-b border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-brand-purple border-b-2 border-brand-purple bg-brand-purple/5'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Face sliders */}
        {activeTab === 'face' && (
          <>
            {SLIDER_GROUPS.map((group) => (
              <div key={group.label} className="rounded-lg border border-slate-700/50 overflow-hidden">
                <button
                  onClick={() => setExpandedGroup(expandedGroup === group.label ? '' : group.label)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 bg-slate-800/50 hover:bg-slate-800 transition-colors text-left"
                >
                  <span className="text-base">{group.icon}</span>
                  <span className="text-sm font-medium text-slate-200">{group.label}</span>
                  <span className="ml-auto text-xs text-slate-500">{group.sliders.length}</span>
                </button>
                {expandedGroup === group.label && (
                  <div className="p-3 space-y-3 bg-slate-900/30">
                    {group.sliders.map((slider, i) => {
                      const val = morphValues[slider.morph] ?? slider.defaultValue;
                      return (
                        <div key={slider.name}>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs text-slate-400">{slider.name}</label>
                            <span className="text-xs text-slate-500 font-mono w-10 text-right">
                              {val.toFixed(2)}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={slider.min}
                            max={slider.max}
                            step={slider.step}
                            value={val}
                            onChange={(e) => handleSliderChange(group, i, parseFloat(e.target.value))}
                            className="w-full h-1.5 rounded-full appearance-none bg-slate-700 accent-brand-purple cursor-pointer
                              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-purple [&::-webkit-slider-thumb]:shadow-lg
                              [&::-webkit-slider-thumb]:cursor-pointer"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Colors */}
        {activeTab === 'colors' && (
          <>
            {COLOR_CONFIGS.map((config) => (
              <div key={config.key} className="space-y-2">
                <label className="text-sm font-medium text-slate-300">{config.label}</label>
                <div className="flex flex-wrap gap-2">
                  {config.presets.map((color) => (
                    <button
                      key={color}
                      onClick={() => onColorChange({ ...colors, [config.key]: color })}
                      className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                        colors[config.key] === color
                          ? 'border-brand-purple ring-2 ring-brand-purple/30 scale-110'
                          : 'border-slate-600'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                  {/* Custom color picker */}
                  <label className="relative w-8 h-8 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center cursor-pointer hover:border-slate-400 transition-colors overflow-hidden"
                    title="Custom color"
                  >
                    <span className="text-xs text-slate-500">+</span>
                    <input
                      type="color"
                      value={colors[config.key] || '#ffffff'}
                      onChange={(e) => onColorChange({ ...colors, [config.key]: e.target.value })}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                </div>
                {colors[config.key] && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors[config.key] }} />
                    <span className="text-xs text-slate-500 font-mono">{colors[config.key]}</span>
                    <button
                      onClick={() => {
                        const c = { ...colors };
                        delete c[config.key];
                        onColorChange(c);
                      }}
                      className="text-xs text-slate-500 hover:text-red-400 transition-colors ml-auto"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Presets */}
        {activeTab === 'presets' && (
          <div className="grid grid-cols-2 gap-2">
            {FACE_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handlePresetClick(preset.morphs)}
                className="flex items-center gap-2 p-3 rounded-lg border border-slate-700/50 bg-slate-800/30
                  hover:bg-slate-800 hover:border-brand-purple/30 transition-all text-left group"
              >
                <span className="text-2xl">{preset.emoji}</span>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="p-4 border-t border-slate-700 flex gap-2">
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition-colors text-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
        <button
          onClick={onExport}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-brand-purple hover:bg-brand-purple/80 text-white transition-colors text-sm font-medium"
        >
          Export JSON
        </button>
      </div>
    </div>
  );
}
