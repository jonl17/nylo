import { FluidObject } from 'gatsby-image'

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
  return {
    url: node.url,
    lang: node.lang,
    uid: node.uid,
    tags: node.tags,
  }
}

export const pageResolver = (node: any): PageInterface => {
  return {
    url: node.url,
    prismicId: node.prismicId,
    uid: node.uid,
    lang: node.lang,
    title: node.data.title,
    tags: node.tags,
    alternateLanguages: node.alternate_languages.map((p: any) =>
      p.document ? altLanguageResolver(p.document) : []
    ),
    body: node.data.body,
    isSubpageOf: node.data.is_subpage_of.document
      ? {
          url: node.data.is_subpage_of.document.url,
          uid: node.data.is_subpage_of.document.uid,
        }
      : node.data.is_subpage_of.document,
    hasSubmenu: node.data.has_submenu.document
      ? submenuResolver(node.data.has_submenu.document)
      : undefined,
    metatitle:
      node.data.title.text !== 'Frontpage'
        ? node.lang === 'is'
          ? 'Nýlistasafnið' + '—' + node.data.title.text
          : 'Living Art Musem' + '—' + node.data.title.text
        : node.lang === 'is'
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
  return {
    id: node.id,
    prismicId: node.prismicId,
    lang: node.lang,
    tags: node.tags,
    name: node.data.name,
    items: node.data.items.map((x: any) => {
      return {
        page: x.page.document ? pageResolver(x.page.document) : null,
        submenu: null,
      }
    }),
  }
}

export const menuResolver = (node: any): MenuInterface => {
  if (!node) return node
  return {
    id: node.id,
    prismicId: node.prismicId,
    lang: node.lang,
    tags: node.tags,
    name: node.data.name,
    items: node.data.items.map((x: any) => {
      return {
        page: x.page.document ? pageResolver(x.page.document) : null,
        submenu: x.submenu.document
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
  }
  body: any[]
}

export const newsResolver = (node: any): NewsInterface => {
  return {
    url: node.url,
    prismicId: node.prismicId,
    uid: node.uid,
    lang: node.lang,
    type: node.type,
    tags: node.tags,
    date: node.data.date,
    title: node.data.title,
    featuredImage: node.data.featured_image,
    body: node.data.body,
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
}

export const exhibitionResolver = (node: any): ExhibitionInterface => {
  return {
    url: node.url,
    prismicId: node.prismicId,
    uid: node.uid,
    lang: node.lang,
    type: node.type,
    tags: node.tags,
    additionalLinks: node.data.additional_links.map((x: any) => {
      return {
        text: x.text,
        url: x.link.url,
      }
    }),
    artist: node.data.artist,
    artistBiography: node.data.artist_biography,
    closing: node.data.closing,
    opening: node.data.opening,
    curator: node.data.curator,
    detailedText: node.data.detailed_text,
    excerpt: node.data.excerpt,
    exhibitionView: node.data.exhibition_view.map((y: any) => {
      return {
        ...y.image,
      }
    }),
    featuredImage: node.data.featured_image,
    title: node.data.title,
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
    fluid: FluidObject
  }
  text: {
    html: string
  }
  date: string
  time: string
}

export const eventResolver = (node: any): EventInterface => {
  return {
    uid: node.uid,
    prismicId: node.uid,
    url: node.url,
    type: node.type,
    lang: node.lang,
    tags: node.tags,
    name: node.data.name,
    image: node.data.image,
    text: node.data.text,
    date: node.data.date,
    time: `${node.data.from}—${node.data.to}`,
  }
}
