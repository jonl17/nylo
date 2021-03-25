import React from 'react'
import { Language } from '~/lang'

interface Props {
  primary: { text: { html: string } }
  lang: Language
}

const ArtistBio = ({ primary, lang }: Props) => {
  console.log('language: ', lang)
  return (
    <div className='rich-text--large'>
      <p className='m-0'>{lang === 'is' ? 'Ágrip' : 'Biography'}</p>
      <div dangerouslySetInnerHTML={{ __html: primary.text.html }} />
    </div>
  )
}

export default ArtistBio
