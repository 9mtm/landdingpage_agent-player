/**
 * Centralized Configuration
 * All API routes should import from this file
 */

export const config = {
  /**
   * Demo Mode - Landing page works standalone without backend
   */
  isDemoMode: process.env.NEXT_PUBLIC_DEMO_MODE?.trim() === 'true',

  /**
   * Backend API URL - configured via NEXT_PUBLIC_BACKEND_URL in .env
   * Default: empty in demo mode
   */
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || '',

  /**
   * Frontend App URL
   */
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',

  /**
   * Ollama/Local LLM API URL - not used in demo mode
   */
  ollamaUrl: process.env.LOCAL_MODEL_API_URL?.replace('/v1', '') || process.env.OLLAMA_URL || '',

  /**
   * Workflow Visualizer URL - not used in demo mode
   */
  visualizerUrl: process.env.NEXT_PUBLIC_VISUALIZER_URL || '',
} as const;
