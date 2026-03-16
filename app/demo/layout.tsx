import { DemoBanner } from '@/components/DemoBanner';

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
