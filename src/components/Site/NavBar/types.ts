export type Page = {
  uid: string
  url: string
  document: {
    __typename: string
    data: {
      title: {
        text: string
      }
    }
  }
}

export interface MenuItem {
  lang: string
  url: string
  data: {
    items: {
      page: Page
    }[]
  }
  uid: string
}

export type IconType = 'Exit'

export interface ProgramProps {
  name: string
  parameters: { label: string; value: string }[]
}

export type OverViewType = 'AllNews' | 'AllExhibitions'
