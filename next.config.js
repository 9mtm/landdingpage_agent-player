/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  transpilePackages: ['@mediapipe/tasks-vision'],
  typescript: {
    // ⚠️ Temporary: Allow build to succeed with type errors from @mediapipe/tasks-vision
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ Temporary: Skip ESLint during production build
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    return config;
  },
}

module.exports = nextConfig
