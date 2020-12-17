import { graphql, useStaticQuery } from 'gatsby'
import '~/fragments/exhibition/full'
import { ExhibitionFull } from '~/types'

export default () => {
  const data: {
    allPrismicExhibition: {
      nodes: {
        id: string
        uid: string
        data: {
          artist: string
          curator: string
          opening: string
          closing: string
          featured_image: {
            url: string
            alt: string
          }
          title: {
            text: string
          }
          body: any[]
          additional_links: {
            text: string
            link: {
              url: string
            }
          }[]
          exhibition_view: {
            image: {
              alt: string
              url: string
            }
          }[]
          artist_biography: {
            html: string
          }
          excerpt: {
            html: string
          }
          detailed_text: {
            html: string
          }
        }
      }[]
    }
  } = useStaticQuery(graphql`
    {
      allPrismicExhibition {
        nodes {
          id
          uid
          ...exhibitionFragmentFull
        }
      }
    }
  `)
  const exhibitions: ExhibitionFull[] = data.allPrismicExhibition.nodes.map(
    node => {
      const { id, uid, data } = node
      return {
        id,
        uid,
        title: data.title,
        artist: data.artist,
        curator: data.curator,
        date: {
          opening: data.opening,
          closing: data.closing,
        },
        featuredImage: data.featured_image,
        body: data.body,
        additionalLinks: data.additional_links.map(l => {
          return {
            text: l.text,
            url: l.link.url,
          }
        }),
        excerpt: data.excerpt,
        detailedText: data.detailed_text,
        exhibitionView: data.exhibition_view,
        artistBiography: data.artist_biography,
      }
    }
  )
  return exhibitions
}
