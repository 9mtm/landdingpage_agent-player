import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog - All Updates & Releases",
  description: "Full development history of Agent Player. Track every update, new feature, bug fix, and improvement pulled live from GitHub.",
  alternates: {
    canonical: "https://agent-player.com/changelog",
  },
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
