import { MenuInterface, PageInterface } from '~/utils/resolvers'

export const hasSubmenu = (menu: MenuInterface, currentPath: string) => {
  if (!menu) return null
  return menu.items.find(node => node.page.url === currentPath)
}

export const isCustomType = (uid: string, type: string) => {
  if ((uid === 'news' || uid === 'frettir') && type === 'news') {
    return true
  } else if (
    (uid === 'exhibitions' || uid === 'syningar') &&
    type === 'exhibition'
  ) {
    return true
  }
}
