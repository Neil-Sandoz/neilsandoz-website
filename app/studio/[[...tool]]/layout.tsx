export const metadata = {
  title: "Neil Sandoz — Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="sanity"
      style={{ height: "100vh", maxHeight: "100dvh", overscrollBehavior: "none" }}
    >
      {children}
    </div>
  );
}
