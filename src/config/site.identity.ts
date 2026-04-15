export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'ln7x4v2q9m',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Lode News',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Local classifieds & marketplace',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Lode News runs a premium local classifieds marketplace: buy and sell vehicles, housing, electronics, and services with clear photos, pricing, and contact details—built for fast browsing and serious buyers.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'lodenews.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lodenews.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

