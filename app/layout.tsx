import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import ScrollMotion from './components/ScrollMotion'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Viz Creative — Interior Design & 3D Visualization',
  description:
    'Viz Creative is an interior design and architectural visualization studio based in Abuja, Nigeria, working across residential, commercial, and hospitality projects.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} antialiased bg-brand-500 text-white overflow-x-hidden`}>
        <ScrollMotion />
        {children}
      </body>
    </html>
  )
}