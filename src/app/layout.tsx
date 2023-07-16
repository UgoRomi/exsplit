import { BadgeDollarSign } from 'lucide-react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ExSplit',
  description: 'Split your expenses with someone else, easily and fairly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='flex justify-center'>
      <body className={`${inter.className} max-w-3xl grow`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <header className='flex font-bold text-4xl p-3 align-center'>
            <div className='grow flex gap-4 justify-center align-center'>
              <BadgeDollarSign size={'44'} />
              <h1>ExSplit</h1>
            </div>
            <ModeToggle />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
