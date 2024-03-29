import React from 'react'
import { Helmet } from 'react-helmet'

type Props = {
  override_title: string
  override_description: string
  override_keywords: string
  override_image: {
    url: string
  }
}

const OverrideSeo = ({
  override_title: title,
  override_description: description,
  override_image: image,
  override_keywords: keywords,
}: Props) => {
  return (
    <Helmet>
      {title && <title>{`${title} | Nýlistasafnið`}</title>}
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta property='og:title' content={title} />
      <meta property='og:image' content={image.url} />
      <meta property='og:description' content={description} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image.url} />
      <meta name='twitter:card' content='summary_large_image' />
    </Helmet>
  )
}

export default OverrideSeo
