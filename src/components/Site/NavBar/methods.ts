import { MenuInterface } from '~/utils/resolvers'

export const hasSubmenu = (menu: MenuInterface, currentPath: string) => {
  if (!menu) return null
  return menu.items.find(node => node.page.url === currentPath)
}
