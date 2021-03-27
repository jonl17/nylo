import { MenuInterface, PageInterface } from '~/utils/resolvers'

export const hasSubmenu = (menu: MenuInterface, currentPath: string) => {
  if (!menu) return null
  return menu.items.find(node => node.page.url === currentPath)
}

export const isCustomType = (uid: string, type: string) => {
  switch (type) {
    case 'news':
      return uid === 'news' || uid === 'frettir'
    case 'exhibition':
      return uid === 'exhibitions' || uid === 'syningar'
    case 'event':
      return uid === 'events' || uid === 'vidburdir'
    default:
      return false
  }
}
