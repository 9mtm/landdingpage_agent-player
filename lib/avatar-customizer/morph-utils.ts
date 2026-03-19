import * as THREE from 'three';

// ─── ARKit blendshapes (shared between AvatarViewer & Customizer) ────────────
export const MORPH = {
  // mouth / jaw
  jawOpen:          'jawOpen',
  jawForward:       'jawForward',
  jawLeft:          'jawLeft',
  jawRight:         'jawRight',
  mouthSmileLeft:   'mouthSmileLeft',
  mouthSmileRight:  'mouthSmileRight',
  mouthFrownLeft:   'mouthFrownLeft',
  mouthFrownRight:  'mouthFrownRight',
  mouthPucker:      'mouthPucker',
  mouthShrugUpper:  'mouthShrugUpper',
  mouthShrugLower:  'mouthShrugLower',
  mouthLeft:        'mouthLeft',
  mouthRight:       'mouthRight',
  mouthClose:       'mouthClose',
  mouthFunnel:      'mouthFunnel',
  mouthDimpleLeft:  'mouthDimpleLeft',
  mouthDimpleRight: 'mouthDimpleRight',
  mouthStretchLeft: 'mouthStretchLeft',
  mouthStretchRight:'mouthStretchRight',
  mouthRollLower:   'mouthRollLower',
  mouthRollUpper:   'mouthRollUpper',
  mouthPressLeft:   'mouthPressLeft',
  mouthPressRight:  'mouthPressRight',
  mouthLowerDownLeft:  'mouthLowerDownLeft',
  mouthLowerDownRight: 'mouthLowerDownRight',
  mouthUpperUpLeft:    'mouthUpperUpLeft',
  mouthUpperUpRight:   'mouthUpperUpRight',
  // eyes
  eyeBlinkLeft:     'eyeBlinkLeft',
  eyeBlinkRight:    'eyeBlinkRight',
  eyeSquintLeft:    'eyeSquintLeft',
  eyeSquintRight:   'eyeSquintRight',
  eyeWideLeft:      'eyeWideLeft',
  eyeWideRight:     'eyeWideRight',
  eyeLookUpLeft:    'eyeLookUpLeft',
  eyeLookUpRight:   'eyeLookUpRight',
  eyeLookDownLeft:  'eyeLookDownLeft',
  eyeLookDownRight: 'eyeLookDownRight',
  eyeLookInLeft:    'eyeLookInLeft',
  eyeLookInRight:   'eyeLookInRight',
  eyeLookOutLeft:   'eyeLookOutLeft',
  eyeLookOutRight:  'eyeLookOutRight',
  // brows
  browInnerUp:      'browInnerUp',
  browDownLeft:     'browDownLeft',
  browDownRight:    'browDownRight',
  browOuterUpLeft:  'browOuterUpLeft',
  browOuterUpRight: 'browOuterUpRight',
  // cheeks / nose
  cheekPuff:        'cheekPuff',
  cheekSquintLeft:  'cheekSquintLeft',
  cheekSquintRight: 'cheekSquintRight',
  noseSneerLeft:    'noseSneerLeft',
  noseSneerRight:   'noseSneerRight',
  // tongue
  tongueOut:        'tongueOut',
} as const;

export type MorphName = keyof typeof MORPH;

export function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export function collectMorphMeshes(scene: THREE.Object3D): THREE.Mesh[] {
  const out: THREE.Mesh[] = [];
  scene.traverse((c) => {
    const m = c as THREE.Mesh;
    if (m.isMesh && m.morphTargetInfluences?.length) out.push(m);
  });
  return out;
}

export function setMorph(meshes: THREE.Mesh[], name: string, value: number) {
  for (const m of meshes) {
    const idx = m.morphTargetDictionary?.[name];
    if (idx !== undefined && m.morphTargetInfluences)
      m.morphTargetInfluences[idx] = clamp(value, 0, 1);
  }
}

/** Get all available morph target names from the model */
export function getAvailableMorphs(meshes: THREE.Mesh[]): string[] {
  const names = new Set<string>();
  for (const m of meshes) {
    if (m.morphTargetDictionary) {
      for (const name of Object.keys(m.morphTargetDictionary)) {
        names.add(name);
      }
    }
  }
  return Array.from(names).sort();
}

/** Apply a full set of morph overrides to meshes */
export function applyMorphOverrides(meshes: THREE.Mesh[], overrides: Record<string, number>) {
  for (const [name, value] of Object.entries(overrides)) {
    setMorph(meshes, name, value);
  }
}

/** Apply material color overrides by matching mesh/material names */
export function applyMaterialColors(
  scene: THREE.Object3D,
  colors: { skin?: string; hair?: string; eyes?: string }
) {
  scene.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;

    const matName = (mesh.material as THREE.MeshStandardMaterial)?.name?.toLowerCase() || '';
    const meshName = mesh.name.toLowerCase();

    const mat = mesh.material as THREE.MeshStandardMaterial;
    if (!mat?.color) return;

    if (colors.skin && (matName.includes('skin') || meshName.includes('skin') || meshName.includes('wolf3d_skin'))) {
      mat.color.set(colors.skin);
    }
    if (colors.hair && (matName.includes('hair') || meshName.includes('hair') || meshName.includes('wolf3d_hair'))) {
      mat.color.set(colors.hair);
    }
    if (colors.eyes && (matName.includes('eye') || meshName.includes('eye'))) {
      // Only color the iris, not the sclera
      if (meshName.includes('wolf3d_eye') || matName.includes('iris') || matName.includes('eye')) {
        mat.color.set(colors.eyes);
      }
    }
  });
}
