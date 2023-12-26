import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './_components/header';
import Footer from './_components/footer';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tarea Playground',
  description: '..a place to house all your work',
  icons: {
    icon: [
      {
        media: "",
        url: "/tareaLightSiteLogo.svg",
        href: "/tareaLightSiteLogo.svg",
      }
    ]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-mono w-screen h-screen text-rose bg-black">
          <div className='top-0 fixed w-full'>
            <Header />
          </div>

          <div className='h-48'></div>

          <div>
            {children}
          </div>

          <div className='bottom-0 fixed w-full border-t'>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
