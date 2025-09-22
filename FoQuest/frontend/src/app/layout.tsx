import "./globals.css";

export const metadata = {
  title: "FoQuest",
  description: "FoQuest starter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
