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
      title: string
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
