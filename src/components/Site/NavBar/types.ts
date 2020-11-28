export type Page = {
  uid: string
  document: {
    __typename: string
    data: {
      title: {
        text: string
      }
    }
  }
}

export interface Menu {
  prismicMenu: {
    data: {
      items: {
        page: Page
      }[]
    }
    uid: string
  }
}

export type IconType = 'Exit'
