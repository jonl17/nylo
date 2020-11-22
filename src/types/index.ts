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
  id: string
  uid: string
  title: {
    text: string
  }
  date: string
  featuredImage: {
    alt: string
    url: string
  }
}

export type TextType =
  | "large"
  | "small"
  | "small one column right"
  | "small two columns"

export interface RichTextProps {
  primary: {
    text: {
      html: string
    }
    type: TextType
  }
}

export interface NewsQuery {
  prismicNews: {
    id: string
    uid: string
    data: {
      title: {
        text: string
      }
      date: string
      featured_image: {
        alt: string
        url: string
      }
      body: {
        slice_type: string
        primary?: {
          text: {
            html: string
          }
        }
        items?: {
          image: {
            url: string
            alt: string
          }
        }[]
      }[]
    }
  }
}
