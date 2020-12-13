import React from 'react'
import { Media, RichText, AllNews, ArtistBio } from '.'

// todo, convert to typescript
const SliceMapping = ({ slice }) => {
  const slices = {
    richtext: RichText,
    media: Media,
    all_news: AllNews,
    artist_bio: ArtistBio,
  }
  const Cmp = slices[slice.slice_type]
  if (!Cmp) {
    return null
  }
  return <Cmp {...slice} />
}

export default SliceMapping
