import React from 'react'
import {
  Media,
  RichText,
  ArtistBio,
  Program,
  CurrentExhibition,
  UpcomingExhibition,
} from '.'

// todo, convert to typescript
const SliceMapping = ({ slice, lang }) => {
  const slices = {
    richtext: RichText,
    media: Media,
    artist_bio: ArtistBio,
    program: Program,
    current_exhibition: CurrentExhibition,
    upcoming_exhibition: UpcomingExhibition,
  }

  const Cmp = slices[slice.slice_type]

  if (!Cmp) {
    return `Error loading slice named ${slice.slice_type}`
  }

  return <Cmp lang={lang} {...slice} />
}

export default SliceMapping
