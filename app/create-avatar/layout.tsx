import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Avatar - Face Customizer & Photo-to-Avatar",
  description: "Create and customize your 3D AI avatar. Adjust face features with sliders, change colors, or use your webcam to generate an avatar from your photo. 100% browser-based.",
  alternates: {
    canonical: "https://agent-player.com/create-avatar",
  },
};

export default function CreateAvatarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
