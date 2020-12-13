import React from 'react'

const ArtistBio = ({
  primary: { text },
}: {
  primary: { text: { html: string } }
}) => {
  return (
    <div className='rich-text--large'>
      <p className='m-0'>Bio</p>
      <div dangerouslySetInnerHTML={{ __html: text.html }} />
    </div>
  )
}

export default ArtistBio
