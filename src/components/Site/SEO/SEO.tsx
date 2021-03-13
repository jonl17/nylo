import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Language } from '~/lang'
import { Helmet } from 'react-helmet'

const SEO = ({ lang }: { lang: Language }) => {
  const data = useStaticQuery(graphql`
    {
      allPrismicSeo {
        nodes {
          lang
          data {
            title
            description
            keywords
            favicon {
              url
            }
            image {
              url
            }
          }
        }
      }
    }
  `)

  const metadata = data.allPrismicSeo.nodes.find(
    (node: any) => node.lang === lang
  )

  if (!metadata) return null

  const { title, favicon, description, keywords, image } = metadata.data

  return (
    <Helmet>
      <title>{title}</title>
      <link rel='shortcut icon' href={favicon.url} type='image/png' />
      <html lang={lang} />
      <meta charSet='utf-8' />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta property='og:image' content={image.url} />
      <meta property='og:description' content={description} />
    </Helmet>
  )
}

export default SEO
