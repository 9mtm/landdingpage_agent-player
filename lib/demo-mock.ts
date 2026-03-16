/**
 * Mock API responses for demo mode (no backend needed)
 */

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

// Mock avatar settings
export const mockAvatarSettings = {
  settings: {
    bgColor: '#09090b',
    bgScene: 'none',
    wallText: 'Welcome to Agent Player Demo!',
    wallLogoUrl: '',
    wallVideoUrl: '',
    wallSpotifyUrl: '',
    wallLayout: {},
  },
};

// Mock chat response (simulated AI)
export const mockChatResponse = async (message: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    role: 'assistant',
    content: `This is a demo mode. The full AI features require the backend server.

You said: "${message}"

In the full version, I would:
- Process your request with Claude AI
- Generate dynamic UI components
- Show live notifications
- Control the 3D avatar animations

Try the features in the left panel to see the demo capabilities!`,
  };
};

// Mock TTS response
export const mockTTS = async (text: string) => {
  console.log('[Demo] TTS request:', text);
  // In demo mode, TTS is disabled
  return null;
};

// Mock STT response
export const mockSTT = async (audio: Blob) => {
  console.log('[Demo] STT request');
  // In demo mode, return placeholder
  return { text: 'Voice input is disabled in demo mode' };
};

// Mock save settings
export const mockSaveSettings = async (settings: any) => {
  console.log('[Demo] Save settings:', settings);
  // Store in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('demo_avatar_settings', JSON.stringify(settings));
  }
  return { success: true };
};

// Intercept fetch calls in demo mode
export const demoFetch = async (url: string, options?: RequestInit) => {
  if (!DEMO_MODE) {
    return fetch(url, options);
  }

  console.log('[Demo] Intercepted fetch:', url);

  // Mock avatar settings
  if (url.includes('/api/avatar/settings') && (!options || options.method === 'GET')) {
    return new Response(JSON.stringify(mockAvatarSettings), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Mock save settings
  if (url.includes('/api/avatar/settings') && options?.method === 'POST') {
    const settings = options.body ? JSON.parse(options.body as string) : {};
    await mockSaveSettings(settings);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Mock chat
  if (url.includes('/api/agentic-chat')) {
    const body = options?.body ? JSON.parse(options.body as string) : {};
    const lastMessage = body.messages?.[body.messages.length - 1]?.content || '';
    const response = await mockChatResponse(lastMessage);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Mock TTS
  if (url.includes('/api/audio/tts')) {
    return new Response(JSON.stringify({ audio: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Mock STT
  if (url.includes('/api/audio/transcribe')) {
    return new Response(JSON.stringify({ text: 'Voice input disabled in demo' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // For any other API call, return empty success
  return new Response(JSON.stringify({ demo: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
