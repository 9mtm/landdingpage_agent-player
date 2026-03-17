import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://agent-player.com"),
  title: {
    default: "Agent Player - AI Agent Framework with 3D Avatars & Dynamic UI",
    template: "%s | Agent Player",
  },
  description: "Build intelligent AI agents with interactive 3D avatars, 54+ dynamic UI components, 27 live notification types, and real-time animations. Free, open-source & self-hosted. Next.js, Three.js, TypeScript.",
  keywords: [
    "AI agent framework", "3D avatar AI", "open source AI agent", "dynamic UI generation",
    "AI notifications", "Ready Player Me", "Three.js avatar", "Next.js AI framework",
    "self-hosted AI", "AI chatbot 3D", "interactive AI agent", "real-time AI UI",
    "prompt-driven UI", "AI avatar framework", "open source chatbot",
  ],
  authors: [{ name: "Agent Player Team", url: "https://github.com/9mtm" }],
  creator: "Agent Player Team",
  publisher: "Agent Player",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://agent-player.com",
  },
  openGraph: {
    title: "Agent Player - AI Agent Framework with 3D Avatars",
    description: "Build AI agents with interactive 3D avatars, 54+ dynamic UI components, 27 notification types & real-time animations. Free & open-source.",
    url: "https://agent-player.com",
    siteName: "Agent Player",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Agent Player - AI Agent Framework with 3D Avatars",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent Player - AI Agent Framework with 3D Avatars & Dynamic UI",
    description: "Build AI agents with 3D avatars, 54+ UI components, 27 notification types. Free, open-source & self-hosted.",
    images: [{ url: "/og-image.png", alt: "Agent Player" }],
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Agent Player",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  description: "Open-source AI agent framework with interactive 3D avatars, dynamic UI generation, and live notifications.",
  url: "https://agent-player.com",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Agent Player Team",
    url: "https://github.com/9mtm",
  },
  license: "https://opensource.org/licenses/MIT",
  programmingLanguage: ["TypeScript", "JavaScript"],
  runtimePlatform: "Node.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
