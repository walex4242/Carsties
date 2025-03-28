import { Metadata } from 'next';
import './globals.css'
import Navbar from './nav/Navbar';
import ToasterProvider from './providers/ToasterProvider'
import SignalRProvider from './providers/SignalRProvider';
import { getCurrentUser } from './actions/authActions';

export const metadata: Metadata = {
  title: "Olawale Car App",
  description: "Generated by Olawale Olafisoye",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body
      >
        <ToasterProvider />
        <Navbar />
        <main className='container mx-auto px-4 sm:px-6 md:px-10 pt-2'>
          <SignalRProvider user={user}>
            {children}
          </SignalRProvider>
        </main>
      </body>
    </html>
  );
}
