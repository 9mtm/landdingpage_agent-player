'use client';

import { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Loader2, X, Scan, AlertCircle } from 'lucide-react';
import { captureFromImage, captureFromVideo, resetToImageMode, isSupported } from '@/lib/avatar-customizer/face-capture';

interface PhotoCaptureProps {
  onBlendshapesDetected: (blendshapes: Record<string, number>) => void;
}

export function PhotoCapture({ onBlendshapesDetected }: PhotoCaptureProps) {
  const [mode, setMode] = useState<'idle' | 'webcam' | 'processing'>('idle');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supported = isSupported();

  const stopWebcam = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setMode('idle');
  }, []);

  const startWebcam = useCallback(async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setMode('webcam');
    } catch {
      setError('Camera access denied. Please allow camera access.');
    }
  }, []);

  const captureWebcamFrame = useCallback(async () => {
    if (!videoRef.current) return;
    setMode('processing');
    setError('');

    const result = await captureFromVideo(videoRef.current);
    await resetToImageMode();
    stopWebcam();

    if (result.success) {
      onBlendshapesDetected(result.blendshapes);
      // Create snapshot for preview
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      setPreview(canvas.toDataURL('image/jpeg'));
    } else {
      setError(result.error || 'No face detected');
    }
    setMode('idle');
  }, [onBlendshapesDetected, stopWebcam]);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setMode('processing');

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;
    setPreview(url);

    img.onload = async () => {
      const result = await captureFromImage(img);
      if (result.success) {
        onBlendshapesDetected(result.blendshapes);
      } else {
        setError(result.error || 'No face detected in this image');
      }
      setMode('idle');
    };
    img.onerror = () => {
      setError('Failed to load image');
      setMode('idle');
    };

    // Reset file input so same file can be re-selected
    e.target.value = '';
  }, [onBlendshapesDetected]);

  if (!supported) {
    return (
      <div className="p-4 rounded-lg bg-red-900/20 border border-red-800/50 text-center">
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p className="text-sm text-red-300">Your browser does not support WebAssembly, which is required for face detection.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Preview / Webcam area */}
      <div className="relative aspect-[4/3] rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
        {mode === 'webcam' && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover mirror"
            style={{ transform: 'scaleX(-1)' }}
            playsInline
            muted
          />
        )}
        {preview && mode !== 'webcam' && (
          <img src={preview} alt="Captured" className="absolute inset-0 w-full h-full object-cover" />
        )}
        {!preview && mode !== 'webcam' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
            <Scan className="w-12 h-12 mb-2 opacity-30" />
            <p className="text-sm">Upload a photo or use webcam</p>
            <p className="text-xs text-slate-600 mt-1">Face will be detected automatically</p>
          </div>
        )}
        {mode === 'processing' && (
          <div className="absolute inset-0 bg-slate-900/70 flex flex-col items-center justify-center z-10">
            <Loader2 className="w-8 h-8 animate-spin text-brand-purple mb-2" />
            <p className="text-sm text-slate-300">Detecting face...</p>
          </div>
        )}
        {mode === 'webcam' && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center z-10">
            <button
              onClick={captureWebcamFrame}
              className="px-4 py-2 rounded-full bg-brand-purple hover:bg-brand-purple/80 text-white text-sm font-medium shadow-lg flex items-center gap-2 transition-colors"
            >
              <Scan className="w-4 h-4" />
              Capture & Detect
            </button>
          </div>
        )}
        {/* Close webcam */}
        {mode === 'webcam' && (
          <button
            onClick={stopWebcam}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-slate-400 hover:text-white transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="px-3 py-2 rounded-lg bg-red-900/20 border border-red-800/30 text-sm text-red-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {/* Action buttons */}
      {mode !== 'webcam' && (
        <div className="flex gap-2">
          <button
            onClick={startWebcam}
            disabled={mode === 'processing'}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-brand-purple/50 hover:bg-brand-purple/5 transition-all text-sm disabled:opacity-50"
          >
            <Camera className="w-4 h-4" />
            Webcam
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={mode === 'processing'}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-brand-purple/50 hover:bg-brand-purple/5 transition-all text-sm disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            Upload Photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Info text */}
      <p className="text-xs text-slate-500 text-center">
        Face detection runs 100% in your browser — no data is uploaded to any server.
      </p>
    </div>
  );
}
