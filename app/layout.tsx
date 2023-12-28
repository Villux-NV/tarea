import type { Metadata } from 'next';
import './globals.css';
import Header from './_components/header';
import Footer from './_components/footer';
import { ClerkProvider } from '@clerk/nextjs';

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

          <div className='h-20'></div>

          <div className='h-fill'>
            {children}
          </div>

          <div className='h-20'></div>
          <div className='bottom-0 fixed w-full border-t px-2'>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
