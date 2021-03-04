import React from 'react'
import { RichTextProps } from '~/types'

const RichText = ({ primary: { text, type = 'large' } }: RichTextProps) => {
  return (
    <>
      <div
        className='rich-text d-block d-lg-none'
        dangerouslySetInnerHTML={{ __html: text.html }}
      />
      <div
        className={`d-none d-lg-block rich-text--${type}`}
        dangerouslySetInnerHTML={{
          __html: text.html,
        }}
      />
    </>
  )
}

export default RichText
