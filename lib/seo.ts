import type { Metadata } from 'next'
import site from '../data/site.json'

export const siteUrl = 'https://www.vizcreative.work'
export const defaultTitle = site.seo.title
export const defaultDescription = site.seo.description

export function canonicalUrl(path = '/') {
  const pathname = `/${path.replace(/^\/+|\/+$/g, '')}`
  return `${siteUrl}${pathname === '/' ? '/' : `${pathname}/`}`
}

export function pageMetadata({title, description, path, image}: {title:string;description:string;path:string;image?:string}): Metadata {
  const url = canonicalUrl(path)
  const images = [{url: new URL(image ? `/${image.replace(/^\/+/, '')}` : '/social-preview.jpg', siteUrl).href, alt:'Interior design and architectural visualization by Viz Creative', ...(!image && {width:1200,height:630})}]
  return {
    title: {absolute:title}, description, alternates: {canonical:url},
    openGraph: {title, description, url, siteName:'Viz Creative', locale:'en_NG', type:'website', images},
    twitter: {card:'summary_large_image', title, description, images},
  }
}
