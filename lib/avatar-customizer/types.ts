export interface SliderConfig {
  name: string;
  /** ARKit morph target name */
  morph: string;
  /** If symmetric, will also apply to the Right variant */
  morphRight?: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export interface SliderGroup {
  label: string;
  icon: string;
  sliders: SliderConfig[];
}

export interface ColorConfig {
  label: string;
  key: 'skin' | 'hair' | 'eyes';
  presets: string[];
}

export interface FacePreset {
  name: string;
  emoji: string;
  morphs: Record<string, number>;
  colors?: { skin?: string; hair?: string; eyes?: string };
}

export interface CustomizerState {
  morphValues: Record<string, number>;
  colors: { skin?: string; hair?: string; eyes?: string };
  gender: 'male' | 'female';
}
