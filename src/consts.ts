import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'A Bit Technical',
  description:
    'astro-erudite is a opinionated, unstyled blogging template—built with Astro, Tailwind, and shadcn/ui.',
  href: 'https://abittechnical.dev',
  author: 'bitwhys',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'articles',
  },
  {
    href: '/authors',
    label: 'notes',
  },
  {
    href: '/about',
    label: 'guides',
  },
  {
    href: '/tldr',
    label: 'TLDR',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/bitwhys',
    label: 'GitHub',
  },
  {
    href: 'https://twitter.com/bitwhys',
    label: 'Twitter',
  },
  // {
  //   href: 'mailto:jason@enscribe.dev',
  //   label: 'Email',
  // },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
