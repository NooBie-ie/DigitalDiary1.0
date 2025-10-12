import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import DisableContextMenu from '@/components/app/disable-context-menu';
import { DiaryProvider } from '@/context/diary-context';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import ThemeChangeNotifier from '@/components/app/theme-change-notifier';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-headline antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <DiaryProvider>
            <ThemeChangeNotifier />
            <div className="fixed bottom-4 left-4 z-50">
                <ThemeToggle />
            </div>
            {children}
            <Toaster />
            <DisableContextMenu />
          </DiaryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
