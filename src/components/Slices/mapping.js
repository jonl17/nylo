import React from 'react'
import { Media, RichText, ArtistBio, Program } from '.'

// todo, convert to typescript
const SliceMapping = ({ slice }) => {
  const slices = {
    richtext: RichText,
    media: Media,
    artist_bio: ArtistBio,
    program: Program,
  }

  const Cmp = slices[slice.slice_type]

  if (!Cmp) {
    return null
  }

  return <Cmp {...slice} />
}

export default SliceMapping
