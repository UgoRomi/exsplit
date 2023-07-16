import { BadgeDollarSign } from 'lucide-react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
    <html lang='en'>
      <body className={inter.className}>
        <header className='flex font-bold gap-4 text-4xl p-3 justify-center align-center'>
          <BadgeDollarSign size={'44'} />
          <h1 className=''>ExSplit</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
