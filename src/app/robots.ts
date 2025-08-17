import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/constants/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL.replace(/\/$/, '')}/sitemap.xml`,
  }
}


