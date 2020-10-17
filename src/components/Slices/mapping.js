import React from "react"
import { ImageReel, RichText, AllNews } from "."

// todo, convert to typescript
const SliceMapping = ({ slice }) => {
  const slices = {
    PrismicPageBodyRichText: RichText,
    PrismicPageBodyImageReel: ImageReel,
    PrismicPageBodyAllNews: AllNews,
  }
  const Cmp = slices[slice.__typename]
  if (!Cmp) {
    return null
  }
  return <Cmp {...slice} />
}

export default SliceMapping
