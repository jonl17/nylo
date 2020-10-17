export type BGcolor = "Green" | "White" | null

export interface RichTextSliceType {
  content: {
    html: string
    text: string
  }
}

export interface ImageReelSliceType {
  image: {
    url: string
    alt: string
  }
}

export interface NewsItem {
  uid: string
  title: {
    text: string
  }
  date: string
  content: {
    html: string
  }
  featuredImage: {
    alt: string
    url: string
  }
}
