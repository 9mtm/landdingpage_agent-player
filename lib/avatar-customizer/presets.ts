import type { FacePreset, SliderGroup, ColorConfig } from './types';

// ─── Slider groups for the face customizer ───────────────────────────────────
export const SLIDER_GROUPS: SliderGroup[] = [
  {
    label: 'Eyes',
    icon: '👁️',
    sliders: [
      { name: 'Eye Open', morph: 'eyeWideLeft', morphRight: 'eyeWideRight', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Eye Squint', morph: 'eyeSquintLeft', morphRight: 'eyeSquintRight', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Look Up', morph: 'eyeLookUpLeft', morphRight: 'eyeLookUpRight', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Look Down', morph: 'eyeLookDownLeft', morphRight: 'eyeLookDownRight', min: 0, max: 1, step: 0.01, defaultValue: 0 },
    ],
  },
  {
    label: 'Eyebrows',
    icon: '🤨',
    sliders: [
      { name: 'Brow Up (Inner)', morph: 'browInnerUp', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Brow Up (Left)', morph: 'browOuterUpLeft', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Brow Up (Right)', morph: 'browOuterUpRight', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Brow Down', morph: 'browDownLeft', morphRight: 'browDownRight', min: 0, max: 1, step: 0.01, defaultValue: 0 },
    ],
  },
  {
    label: 'Mouth',
    icon: '👄',
    sliders: [
      { name: 'Smile', morph: 'mouthSmileLeft', morphRight: 'mouthSmileRight', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Frown', morph: 'mouthFrownLeft', morphRight: 'mouthFrownRight', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Pucker', morph: 'mouthPucker', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Funnel', morph: 'mouthFunnel', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Mouth Left', morph: 'mouthLeft', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Mouth Right', morph: 'mouthRight', min: 0, max: 1, step: 0.01, defaultValue: 0 },
    ],
  },
  {
    label: 'Jaw',
    icon: '🦷',
    sliders: [
      { name: 'Jaw Open', morph: 'jawOpen', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Jaw Forward', morph: 'jawForward', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Jaw Left', morph: 'jawLeft', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Jaw Right', morph: 'jawRight', min: 0, max: 1, step: 0.01, defaultValue: 0 },
    ],
  },
  {
    label: 'Cheeks & Nose',
    icon: '👃',
    sliders: [
      { name: 'Cheek Puff', morph: 'cheekPuff', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Cheek Squint', morph: 'cheekSquintLeft', morphRight: 'cheekSquintRight', min: 0, max: 1, step: 0.01, defaultValue: 0 },
      { name: 'Nose Sneer', morph: 'noseSneerLeft', morphRight: 'noseSneerRight', min: 0, max: 1, step: 0.01, defaultValue: 0 },
    ],
  },
  {
    label: 'Tongue',
    icon: '👅',
    sliders: [
      { name: 'Tongue Out', morph: 'tongueOut', min: 0, max: 1, step: 0.01, defaultValue: 0 },
    ],
  },
];

// ─── Color presets ────────────────────────────────────────────────────────────
export const COLOR_CONFIGS: ColorConfig[] = [
  {
    label: 'Skin Tone',
    key: 'skin',
    presets: [
      '#FFDBB4', '#EDB98A', '#D08B5B', '#AE5D29', '#694D3D',
      '#F5D6C1', '#DEB587', '#C49A6C', '#8D5524', '#4A2912',
    ],
  },
  {
    label: 'Hair Color',
    key: 'hair',
    presets: [
      '#090806', '#2C222B', '#3B3024', '#4E433F', '#6A4E42',
      '#B55239', '#D6C4C2', '#E6CEA8', '#DEBC99', '#A56B46',
      '#B89778', '#DCD0BA', '#FFF5E1', '#E7D7B5',
    ],
  },
  {
    label: 'Eye Color',
    key: 'eyes',
    presets: [
      '#634E34', '#2E536F', '#3D671D', '#1C7847', '#497665',
      '#8B7355', '#A0522D', '#191970', '#556B2F',
    ],
  },
];

// ─── Face presets ─────────────────────────────────────────────────────────────
export const FACE_PRESETS: FacePreset[] = [
  {
    name: 'Default',
    emoji: '😐',
    morphs: {},
  },
  {
    name: 'Friendly',
    emoji: '😊',
    morphs: {
      mouthSmileLeft: 0.5, mouthSmileRight: 0.5,
      cheekSquintLeft: 0.25, cheekSquintRight: 0.25,
      browInnerUp: 0.1,
      eyeSquintLeft: 0.15, eyeSquintRight: 0.15,
    },
  },
  {
    name: 'Serious',
    emoji: '😤',
    morphs: {
      browDownLeft: 0.5, browDownRight: 0.5,
      mouthFrownLeft: 0.2, mouthFrownRight: 0.2,
      eyeSquintLeft: 0.2, eyeSquintRight: 0.2,
    },
  },
  {
    name: 'Surprised',
    emoji: '😮',
    morphs: {
      browInnerUp: 0.7, browOuterUpLeft: 0.6, browOuterUpRight: 0.6,
      eyeWideLeft: 0.5, eyeWideRight: 0.5,
      jawOpen: 0.3,
    },
  },
  {
    name: 'Cute',
    emoji: '🥰',
    morphs: {
      mouthSmileLeft: 0.6, mouthSmileRight: 0.6,
      cheekPuff: 0.15,
      eyeSquintLeft: 0.3, eyeSquintRight: 0.3,
      browInnerUp: 0.2,
    },
  },
  {
    name: 'Thinking',
    emoji: '🤔',
    morphs: {
      browInnerUp: 0.35,
      eyeSquintLeft: 0.2,
      browOuterUpRight: 0.25,
      mouthPucker: 0.15,
      mouthRight: 0.15,
    },
  },
  {
    name: 'Sad',
    emoji: '😢',
    morphs: {
      browInnerUp: 0.7,
      mouthFrownLeft: 0.55, mouthFrownRight: 0.55,
      eyeSquintLeft: 0.25, eyeSquintRight: 0.25,
    },
  },
  {
    name: 'Angry',
    emoji: '😡',
    morphs: {
      browDownLeft: 0.75, browDownRight: 0.75,
      mouthFrownLeft: 0.45, mouthFrownRight: 0.45,
      noseSneerLeft: 0.3, noseSneerRight: 0.3,
      eyeSquintLeft: 0.3, eyeSquintRight: 0.3,
    },
  },
];
