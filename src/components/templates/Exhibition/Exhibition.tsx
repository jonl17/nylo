import { PageProps, graphql, Link } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'
import '~/fragments/exhibition/full'
import { ExhibitionFull } from '~/types'
import CloseButton from '~/components/Site/CloseButton'
import Breadcrumbs from '~/components/Site/Breadcrumbs'
import { formatDate, multipleArtistsHandler } from '~/utils'
import SliceMapping from '~/components/Slices/mapping'

interface Props extends PageProps {
  pageContext: {
    id: string
    uid: string
    bg: string
    title: {
      text: string
    }
  }
  data: any
  exhibition: ExhibitionFull
}

const cleanExhibitionData = (
  data: any,
  id: string,
  uid: string
): ExhibitionFull => {
  const { prismicExhibition } = data
  return {
    id,
    uid,
    artist: prismicExhibition.data.artist,
    curator: prismicExhibition.data.curator,
    featuredImage: prismicExhibition.data.featured_image,
    date: {
      opening: prismicExhibition.data.opening,
      closing: prismicExhibition.data.closing,
    },
    title: prismicExhibition.data.title,
    body: prismicExhibition.data.body,
    additionalLinks: prismicExhibition.data.additional_links.map((l: any) => {
      return {
        text: l.text,
        url: l.link.url,
      }
    }),
  }
}

const Exhibition = ({
  pageContext,
  data,
  exhibition = cleanExhibitionData(data, pageContext.id, pageContext.uid),
}: Props) => {
  return (
    <>
      <Helmet>
        <title>{`Living Art Museum—Sýningar—${pageContext.title.text}`}</title>
      </Helmet>
      <div className={`page bg--${pageContext.bg}`}>
        <div className='content'>
          <CloseButton className='icon__exit' />
          <div className='d-flex align-items-center'>
            <p className='pr-3'>
              {formatDate(exhibition.date.opening, exhibition.date.closing)}
            </p>
            <Breadcrumbs
              parentLink={{ text: 'Sýningar', url: '/syningar' }}
              childLink={{
                text: exhibition.title.text,
                url: `/syningar/${exhibition.uid}`,
              }}
            />
          </div>
          <div className='pb-2'>
            <h1>{multipleArtistsHandler(exhibition.artist)}</h1>
            <h1 className='font-italic'>{exhibition.title.text}</h1>
          </div>
          {exhibition.body.map((slice, x) => (
            <SliceMapping slice={slice} key={x} />
          ))}
          <hr />
          {exhibition.curator && (
            <div className='parag--1'>
              <p className='mb-0'>Sýningarstjóri</p>
              <p>{exhibition.curator}</p>
            </div>
          )}
          <div className='parag--1 d-inline-flex flex-column'>
            {exhibition.additionalLinks.map(x => (
              <a key={x.url} target='_blank' href={x.url}>
                <p className='secondaryAnchorActive'>{x.text}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    prismicExhibition(id: { eq: $id }) {
      ...exhibitionFragmentFull
    }
  }
`

export default Exhibition
