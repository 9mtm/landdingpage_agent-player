/**
 * MediaPipe Face Landmarker — browser-native face capture
 * Extracts 52 ARKit-compatible blendshape scores from photo or webcam.
 * Runs 100% client-side via WebAssembly, no server needed.
 */

let FaceLandmarker: any = null;
let landmarkerInstance: any = null;
let loadingPromise: Promise<void> | null = null;

/** Dynamically import MediaPipe tasks-vision */
async function ensureLoaded() {
  if (landmarkerInstance) return;
  if (loadingPromise) { await loadingPromise; return; }

  loadingPromise = (async () => {
    const vision = await import('@mediapipe/tasks-vision');
    FaceLandmarker = vision.FaceLandmarker;
    const filesetResolver = await vision.FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );
    landmarkerInstance = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
        delegate: 'GPU',
      },
      runningMode: 'IMAGE',
      outputFaceBlendshapes: true,
      outputFacialTransformationMatrixes: false,
      numFaces: 1,
    });
  })();

  await loadingPromise;
}

export interface FaceCaptureResult {
  blendshapes: Record<string, number>;
  success: boolean;
  error?: string;
}

/** Extract blendshapes from an image element (photo upload) */
export async function captureFromImage(imageElement: HTMLImageElement): Promise<FaceCaptureResult> {
  try {
    await ensureLoaded();
    const result = landmarkerInstance.detect(imageElement);
    return processResult(result);
  } catch (e: any) {
    return { blendshapes: {}, success: false, error: e.message || 'Failed to process image' };
  }
}

/** Extract blendshapes from a video frame (webcam) */
export async function captureFromVideo(videoElement: HTMLVideoElement): Promise<FaceCaptureResult> {
  try {
    await ensureLoaded();
    // Switch to VIDEO mode for webcam frames
    if (landmarkerInstance.setOptions) {
      await landmarkerInstance.setOptions({ runningMode: 'VIDEO' });
    }
    const result = landmarkerInstance.detectForVideo(videoElement, performance.now());
    return processResult(result);
  } catch (e: any) {
    return { blendshapes: {}, success: false, error: e.message || 'Failed to process video' };
  }
}

/** Switch back to IMAGE mode after webcam use */
export async function resetToImageMode() {
  if (landmarkerInstance?.setOptions) {
    await landmarkerInstance.setOptions({ runningMode: 'IMAGE' });
  }
}

function processResult(result: any): FaceCaptureResult {
  if (!result?.faceBlendshapes?.length) {
    return { blendshapes: {}, success: false, error: 'No face detected' };
  }

  const blendshapes: Record<string, number> = {};
  const categories = result.faceBlendshapes[0].categories;

  for (const cat of categories) {
    // MediaPipe uses the same ARKit naming convention
    // e.g. "browInnerUp", "eyeBlinkLeft", "jawOpen", etc.
    // Skip "_neutral" as it's not useful for morph targets
    if (cat.categoryName === '_neutral') continue;
    blendshapes[cat.categoryName] = cat.score;
  }

  return { blendshapes, success: true };
}

/** Check if MediaPipe is supported in this browser */
export function isSupported(): boolean {
  return typeof window !== 'undefined' && !!window.WebAssembly;
}
