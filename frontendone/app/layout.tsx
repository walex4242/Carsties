import { Metadata } from 'next';
import './globals.css'
import Navbar from './nav/Navbar';
import ToasterProvider from './providers/ToasterProvider'

export const metadata: Metadata = {
  title: "Olawale Car App",
  description: "Generated by Olawale Olafisoye",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <ToasterProvider />
        <Navbar />
        <main className='container mx-auto px-4 sm:px-6 md:px-10 pt-2'>
          {children}
        </main>
      </body>
    </html>
  );
}
