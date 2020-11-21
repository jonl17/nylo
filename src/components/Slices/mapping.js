import React from "react"
import { ImageReel as Media, RichText, AllNews } from "."

// todo, convert to typescript
const SliceMapping = ({ slice }) => {
  const slices = {
    richtext: RichText,
    media: Media,
    all_news: AllNews,
  }
  const Cmp = slices[slice.slice_type]
  if (!Cmp) {
    return null
  }
  return <Cmp {...slice} />
}

export default SliceMapping
