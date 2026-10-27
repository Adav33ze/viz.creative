import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import ScrollMotion from './components/ScrollMotion'
import siteData from '../data/site.json'
import contact from '../data/contact.json'
import { siteUrl } from '../lib/seo'
import StructuredData from './components/StructuredData'
import Analytics from './components/Analytics'

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
  metadataBase: new URL(siteUrl),
  title: siteData.seo.title,
  description: siteData.seo.description,
  verification: process.env.GOOGLE_SITE_VERIFICATION ? {google:process.env.GOOGLE_SITE_VERIFICATION} : undefined,
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
        <StructuredData data={{'@context':'https://schema.org','@graph':[
          {'@type':'Organization','@id':`${siteUrl}/#studio`,name:'Viz Creative',url:siteUrl,email:contact.email,telephone:contact.phoneDisplay,address:{'@type':'PostalAddress',streetAddress:contact.address,addressLocality:'Abuja',addressCountry:'NG'}},
          {'@type':'WebSite','@id':`${siteUrl}/#website`,name:'Viz Creative',url:siteUrl,publisher:{'@id':`${siteUrl}/#studio`},inLanguage:'en'},
        ]}} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
