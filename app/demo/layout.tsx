import type { Metadata } from "next";
import { DemoBanner } from '@/components/DemoBanner';

export const metadata: Metadata = {
  title: "Live Demo - Interactive 3D AI Avatar",
  description: "Try Agent Player live: interact with a 3D AI avatar, see dynamic UI generation, real-time notifications, animations, and weather effects. No signup required.",
  openGraph: {
    title: "Agent Player Live Demo - Interactive 3D AI Avatar",
    description: "Try the AI agent with 3D avatar, dynamic UI & live notifications. Free demo, no signup.",
  },
  alternates: {
    canonical: "https://agent-player.com/demo",
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DemoBanner />
      <div className="pt-10">{children}</div>
    </>
  );
}
