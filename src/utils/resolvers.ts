import { IGatsbyImageData } from 'gatsby-plugin-image'

export interface PageInterface {
  url: string
  prismicId: string
  uid: string
  lang: 'is' | 'en-us'
  tags: string[]
  title: {
    html: string
    text: string
  }
  alternateLanguages: PageInterface[]
  body: any[]
  isSubpageOf?: {
    url: string
    uid: string
  }
  hasSubmenu?: MenuInterface
  metatitle: string
}

export const altLanguageResolver = (node: any) => {
  if (!node) return null
  return {
    url: node.url || '',
    lang: node.lang || 'is',
    uid: node.uid || '',
    tags: node.tags || [],
  }
}

export const pageResolver = (node: any): PageInterface => {
  if (!node) return null as any

  const title = node.data?.title || { html: '', text: '' }
  const lang = node.lang || 'is'

  return {
    url: node.url || '',
    prismicId: node.prismicId || '',
    uid: node.uid || '',
    lang,
    title,
    tags: node.tags || [],
    alternateLanguages: (node.alternate_languages || [])
      .map((p: any) => p?.document ? altLanguageResolver(p.document) : null)
      .filter((x: any) => x !== null),
    body: node.data?.body || [],
    isSubpageOf: node.data?.is_subpage_of?.document
      ? {
          url: node.data.is_subpage_of.document.url || '',
          uid: node.data.is_subpage_of.document.uid || '',
        }
      : undefined,
    hasSubmenu: node.data?.has_submenu?.document
      ? submenuResolver(node.data.has_submenu.document)
      : undefined,
    metatitle:
      title.text !== 'Frontpage'
        ? lang === 'is'
          ? 'Nýlistasafnið' + '—' + title.text
          : 'Living Art Musem' + '—' + title.text
        : lang === 'is'
        ? 'Nýlistasafnið'
        : 'Living Art Musem',
  }
}

export interface MenuInterface {
  id: string
  prismicId: string
  lang: 'is' | 'en-us'
  tags: string[]
  name: string
  items: {
    page: {
      uid: string
      url: string
      lang: 'is' | 'en-us'
      tags: string[]
      title: {
        text: string
        html: string
      }
    }
    submenu: MenuInterface
  }[]
}

export const submenuResolver = (node: any): MenuInterface => {
  if (!node) return null as any

  return {
    id: node.id || '',
    prismicId: node.prismicId || '',
    lang: node.lang || 'is',
    tags: node.tags || [],
    name: node.data?.name || '',
    items: (node.data?.items || []).map((x: any) => {
      return {
        page: x?.page?.document ? pageResolver(x.page.document) : null,
        submenu: null,
      }
    }),
  }
}

export const menuResolver = (node: any): MenuInterface => {
  if (!node) return null as any

  return {
    id: node.id || '',
    prismicId: node.prismicId || '',
    lang: node.lang || 'is',
    tags: node.tags || [],
    name: node.data?.name || '',
    items: (node.data?.items || []).map((x: any) => {
      return {
        page: x?.page?.document ? pageResolver(x.page.document) : null,
        submenu: x?.submenu?.document
          ? submenuResolver(x.submenu.document)
          : null,
      }
    }),
  }
}

export interface NewsInterface {
  url: string
  prismicId: string
  uid: string
  lang: 'is' | 'en-us'
  tags: string[]
  date: string
  type: string
  title: {
    html: string
    text: string
  }
  featuredImage: {
    url: string
    alt: string
    gatsbyImageData: IGatsbyImageData
  }
  body: any[]
}

export const newsResolver = (node: any): NewsInterface => {
  if (!node) return null as any

  return {
    url: node.url || '',
    prismicId: node.prismicId || '',
    uid: node.uid || '',
    lang: node.lang || 'is',
    type: node.type || 'news',
    tags: node.tags || [],
    date: node.data?.date || '',
    title: node.data?.title || { html: '', text: '' },
    featuredImage: node.data?.featured_image || { url: '', alt: '', gatsbyImageData: null },
    body: node.data?.body || [],
  }
}

export interface ExhibitionInterface {
  url: string
  prismicId: string
  uid: string
  lang: 'is' | 'en-us'
  tags: string[]
  type: string
  title: {
    html: string
    text: string
  }
  featuredImage: {
    url: string
    alt: string
  }
  artist: string
  curator: string
  opening: string
  closing: string
  excerpt: {
    html: string
  }
  detailedText: {
    html: string
  }
  artistBiography: {
    html: string
  }
  exhibitionView: {
    url: string
    alt: string
  }[]
  additionalLinks: {
    text: string
    url: string
  }[]
  year: number
  body: any[]
}

export const exhibitionResolver = (node: any): ExhibitionInterface => {
  if (!node) return null as any

  const opening = node.data?.opening || new Date().toISOString()

  return {
    url: node.url || '',
    prismicId: node.prismicId || '',
    uid: node.uid || '',
    lang: node.lang || 'is',
    type: node.type || 'exhibition',
    tags: node.tags || [],
    additionalLinks: (node.data?.additional_links || [])
      .filter((x: any) => x?.link?.url)
      .map((x: any) => ({
        text: x.text || '',
        url: x.link.url,
      })),
    artist: node.data?.artist || '',
    artistBiography: node.data?.artist_biography || { html: '' },
    closing: node.data?.closing || '',
    opening,
    curator: node.data?.curator || '',
    detailedText: node.data?.detailed_text || { html: '' },
    excerpt: node.data?.excerpt || { html: '' },
    exhibitionView: (node.data?.exhibition_view || [])
      .filter((y: any) => y?.image)
      .map((y: any) => ({
        ...y.image,
      })),
    featuredImage: node.data?.featured_image || { url: '', alt: '' },
    title: node.data?.title || { html: '', text: '' },
    year: new Date(opening).getFullYear(),
    body: node.data?.body || [],
  }
}

export interface EventInterface {
  url: string
  prismicId: string
  uid: string
  lang: 'is' | 'en-us'
  tags: string[]
  type: string
  name: {
    html: string
    text: string
  }
  image: {
    alt: string
    url: string
    gatsbyImageData: IGatsbyImageData
  }
  text: {
    html: string
  }
  date: string
  time: string
  body: any[]
}

export const eventResolver = (node: any): EventInterface => {
  if (!node) return null as any

  return {
    uid: node.uid || '',
    prismicId: node.prismicId || node.uid || '',
    url: node.url || '',
    type: node.type || 'event',
    lang: node.lang || 'is',
    tags: node.tags || [],
    name: node.data?.name || { html: '', text: '' },
    image: node.data?.image || { url: '', alt: '', gatsbyImageData: null },
    text: node.data?.text || { html: '' },
    date: node.data?.date || '',
    time:
      node.data?.from && node.data?.to ? `${node.data.from}—${node.data.to}` : '',
    body: node.data?.body || [],
  }
}

export interface OpeningHourInterface {
  day: {
    from: string
    to: string
  }
  time: {
    from: number
    to: number
  }
}

export const openingHourResolver = (node: any): OpeningHourInterface => {
  if (!node) return null as any

  const openingHoursDoc = node.data?.opening_hours?.document

  return {
    day: {
      from: openingHoursDoc?.data?.day_from || '',
      to: openingHoursDoc?.data?.day_to || '',
    },
    time: {
      from: openingHoursDoc?.data?.time_from || '',
      to: openingHoursDoc?.data?.time_to || '',
    },
  }
}
