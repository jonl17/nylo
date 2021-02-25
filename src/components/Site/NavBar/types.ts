import { PageInterface } from '~/utils/resolvers'

export interface MenuItem {
  lang: string
  url: string
  data: {
    items: {
      page: PageInterface
    }[]
  }
  uid: string
}

export type IconType = 'Exit'

export type OverViewType = 'AllNews' | 'AllExhibitions'
