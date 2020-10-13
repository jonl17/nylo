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
