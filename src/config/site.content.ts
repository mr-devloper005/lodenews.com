import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Local deals & classified ads',
  },
  footer: {
    tagline: 'Trusted local marketplace from Lode News',
  },
  hero: {
    badge: 'Classifieds updated daily',
    title: ['Find what you need,', 'sell what you don’t.'],
    description:
      'Browse curated local listings with full photos and seller contact info. Post in minutes—whether you are clearing gear, renting space, or hiring talent.',
    primaryCta: {
      label: 'Browse classifieds',
      href: '/classifieds',
    },
    secondaryCta: {
      label: 'How it works',
      href: '/help',
    },
    searchPlaceholder: 'Search Lode News classifieds by keyword or category',
    focusLabel: 'Categories',
    featureCardBadge: 'Editor’s picks',
    featureCardTitle: 'Spotlight listings from sellers across the Front Range.',
    featureCardDescription:
      'Featured ads rotate based on freshness, completeness, and community engagement—without changing how search or posting works.',
  },
  home: {
    metadata: {
      title: 'Lode News Classifieds — local marketplace',
      description:
        'Buy, sell, and trade on Lode News: vehicles, housing, jobs, electronics, and services. Clear listings, real contact paths, built for Colorado and beyond.',
      openGraphTitle: 'Lode News Classifieds',
      openGraphDescription:
        'Premium local classifieds from Lode News. Find deals, post ads, and connect with buyers and sellers.',
      keywords: [
        'Lode News',
        'classified ads',
        'local marketplace',
        'Denver classifieds',
        'Colorado buy sell',
        'used cars',
        'rentals',
        'local jobs',
      ],
    },
    introBadge: 'About Lode News Classifieds',
    introTitle: 'Newsroom credibility meets a marketplace built for real transactions.',
    introParagraphs: [
      'Lode News Classifieds is the dedicated buying-and-selling layer of Lode News—designed so readers can move from a story to a purchase without tab-hopping or sketchy threads.',
      'Every category is tuned for what local sellers actually post: gear, autos, apartments, gigs, and services, with room for photos, price, and straight contact paths.',
      'Whether you are decluttering, hiring, or hunting a deal, the same navigation and trust cues carry across the site.',
    ],
    sideBadge: 'Why sellers use it',
    sidePoints: [
      'Large-format photos and structured fields so buyers see what matters first.',
      'Search and filters tuned for scanning, not endless scrolling.',
      'Posting flow built for individuals and small businesses—not enterprise forms.',
      'Support and policies aligned with a news brand people already know.',
    ],
    primaryLink: {
      label: 'Open classifieds',
      href: '/classifieds',
    },
    secondaryLink: {
      label: 'Contact the team',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Ready to list?',
    title: 'Post your ad and reach readers who already trust Lode News.',
    description:
      'Create an account, upload photos, set your price, and publish. Buyers can reach you through the contact paths you provide—no middleman clutter.',
    primaryCta: {
      label: 'Create free account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Talk to support',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'New and updated posts from this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and reporting',
    description: 'News features, explainers, and columns from the Lode News desk.',
  },
  listing: {
    title: 'Business directory',
    description: 'Verified businesses and service providers in our region.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Local ads for sale items, housing, jobs, services, and community listings on Lode News.',
  },
  image: {
    title: 'Photo galleries',
    description: 'Visual stories and image-led posts from Lode News contributors.',
  },
  profile: {
    title: 'Profiles',
    description: 'People and organizations behind the stories and listings.',
  },
  sbm: {
    title: 'Saved links & resources',
    description: 'Curated bookmarks and reference lists maintained by the newsroom and members.',
  },
  pdf: {
    title: 'Documents & downloads',
    description: 'Reports, guides, and PDF resources published by Lode News.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Business listings',
    paragraphs: [
      'Explore verified businesses and service providers—hours, locations, and contact options in one place.',
      'Listings connect with the rest of Lode News when a story references a local shop, nonprofit, or agency.',
      'Use categories to compare options, then reach out directly from the listing.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Help', href: '/help' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  article: {
    title: 'Articles & reporting',
    paragraphs: [
      'Long-form reporting, explainers, and columns from Lode News journalists and contributors.',
      'Stories often link to related classifieds, events, and resources so readers can act on what they read.',
      'Browse by topic or search the archive for past coverage.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  classified: {
    title: 'Lode News Classifieds',
    paragraphs: [
      'The marketplace for readers: sell a car, rent a room, post a gig, or list services with photos and clear pricing.',
      'Ads are organized for fast scanning—category, location, and price show up before you click.',
      'Sellers respond through email or phone as they choose; Lode News does not insert itself into your deal.',
    ],
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Posting tips', href: '/help' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
  image: {
    title: 'Visual stories',
    paragraphs: [
      'Photo essays and galleries from assignments, readers, and partners.',
      'Use visuals as a starting point, then follow related articles or classifieds when we tie them together.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'About', href: '/about' },
    ],
  },
  profile: {
    title: 'Profiles',
    paragraphs: [
      'Reporter bylines, columnists, and community voices behind Lode News content.',
      'Profiles help readers understand who is covering what—and how to connect for tips or collaborations.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  sbm: {
    title: 'Bookmarks & resources',
    paragraphs: [
      'Reference lists and saved links the newsroom and members use for ongoing coverage.',
      'Handy when you want primary sources, datasets, or tools without losing them in a browser tab farm.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Help', href: '/help' },
    ],
  },
  pdf: {
    title: 'Downloads',
    paragraphs: [
      'Official documents, special reports, and printable guides published by Lode News.',
      'Pair downloads with related articles for full context.',
    ],
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'About', href: '/about' },
    ],
  },
  social: {
    title: 'Community updates',
    paragraphs: [
      'Short updates tied to coverage areas—events, corrections, and calls for tips.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  comment: {
    title: 'Comments',
    paragraphs: [
      'Responses on stories where comments are open—moderated according to our community standards.',
    ],
    links: [
      { label: 'Help', href: '/help' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  org: {
    title: 'Organizations',
    paragraphs: [
      'Partner organizations, sponsors, and institutions that work with Lode News.',
    ],
    links: [
      { label: 'Team', href: '/team' },
      { label: 'Contact', href: '/contact' },
    ],
  },
}
