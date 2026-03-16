import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Player - AI Agent Framework with 3D Avatars",
  description: "Open-source AI agent framework with 3D avatars, dynamic UI generation, and live notifications. 100% free and self-hosted.",
  keywords: ["AI", "agent", "3D avatar", "open source", "framework", "dynamic UI", "notifications"],
  authors: [{ name: "Agent Player Team" }],
  openGraph: {
    title: "Agent Player - AI Agent Framework",
    description: "Open-source AI agent framework with 3D avatars and dynamic UI",
    url: "https://agent-player.com",
    siteName: "Agent Player",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent Player - AI Agent Framework",
    description: "Open-source AI agent framework with 3D avatars and dynamic UI",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
