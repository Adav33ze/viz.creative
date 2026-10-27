import type { MetadataRoute } from 'next'
import portfolioData from '../data/portfolio.json'
import { canonicalUrl } from '../lib/seo'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ['/', '/work', '/services', '/about'].map(path => ({url:canonicalUrl(path)}))

  const projectRoutes: MetadataRoute.Sitemap = portfolioData.projects
    .filter((p) => p.published)
    .map((p) => ({
    url: canonicalUrl(`/work/${p.slug}`),
    }))

  return [...staticRoutes, ...projectRoutes]
}
