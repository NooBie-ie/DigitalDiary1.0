import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import DisableContextMenu from '@/components/app/disable-context-menu';
import { DiaryProvider } from '@/context/diary-context';

export const metadata: Metadata = {
  title: 'Digitalis',
  description: 'Your personal digital diary.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-headline antialiased">
        <DiaryProvider>
          {children}
          <Toaster />
          <DisableContextMenu />
        </DiaryProvider>
      </body>
    </html>
  );
}
