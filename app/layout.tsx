import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Islamic Inheritance Calculator',
  description: 'Calculate inheritance shares according to Islamic rules',
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