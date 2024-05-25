import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Providers from './components/Providers';
import './globals.css';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'fallback',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tabela Fipe',
  description: 'Tabela Fipe criada por Augusto Felipe Rodrigues',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
