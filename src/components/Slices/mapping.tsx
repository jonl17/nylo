import React from 'react'
import {
  Media,
  RichText,
  ArtistBio,
  Program,
  CurrentExhibition,
  UpcomingExhibition,
  TwoColumnText,
  OverrideSeo,
} from '.'

// todo, convert to typescript
const SliceMapping = ({ slice, lang }: { slice: any; lang: string }) => {
  const slices: { [key: string]: React.ElementType } = {
    richtext: RichText,
    media: Media,
    artist_bio: ArtistBio,
    program: Program,
    current_exhibition: CurrentExhibition,
    upcoming_exhibition: UpcomingExhibition,
    two_column_text: TwoColumnText,
    seo: OverrideSeo,
  }

  const Cmp = slices[slice.slice_type]

  if (!Cmp) {
    return <> `Error loading slice named ${slice.slice_type}` </>
  }

  let props = {}

  if (slice.slice_type === 'two_column_text') {
    props = {
      firstColumn: slice.primary.first_column,
      secondColumn: slice.primary.second_column,
    }
  } else if (slice.slice_type === 'seo') {
    props = slice.primary
  }

  return <Cmp lang={lang} {...slice} {...props} />
}

export default SliceMapping
