export type Page = {
  page: {
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
}

export interface Menu {
  prismicMenu: {
    data: {
      pages: Page[]
    }
    uid: string
  }
}
