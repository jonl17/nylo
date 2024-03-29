import { PageProps, graphql } from 'gatsby'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import '~/fragments/exhibition/full'
import { ExhibitionFull } from '~/types'
import CloseButton from '~/components/Site/CloseButton'
import Breadcrumbs from '~/components/Site/Breadcrumbs'
import Open from '~/components/Site/Open'
import { formatDate, exhibitionIsOpen } from '~/utils'
import Button from '~/components/Site/Button'
import Slideshow from '~/components/Site/Slideshow/Slideshow'
import { langSeek } from 'balkan-tungumal'
import { exhibitionResolver } from '~/utils/resolvers'
import useGetPage from '~/hooks/useGetPage'
import linkResolver from '~/utils/linkResolver'
import SliceZone from '~/components/Slices/mapping'

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

const Exhibition = ({ data }: Props) => {
  const [readMore, setReadMore] = useState(false)

  const exhibition = exhibitionResolver(data.prismicExhibition)

  const homepage = useGetPage(
    exhibition.lang === 'is' ? 'syningar' : 'exhibitions'
  )

  const slices = exhibition.body

  return (
    <>
      <Helmet>
        <title>{`${
          exhibition.lang === 'is' ? 'Nýlistasafnið' : 'The Living Art Museum'
        }—${exhibition.title.text}`}</title>
      </Helmet>
      <div className='page'>
        <div className='content'>
          <CloseButton
            forceGoBack
            className='icon__exit'
            lang={exhibition.lang}
            isSubpageOf={
              homepage ? { url: homepage.url, uid: homepage.uid } : undefined
            }
          />
          <div className='d-flex align-items-center mt-4 mt-lg-0'>
            {exhibitionIsOpen(
              new Date(exhibition.opening),
              new Date(exhibition.closing)
            ) && <Open className='mr-3' />}
            <p className='pr-3'>
              {formatDate(exhibition.opening, exhibition.closing)}
            </p>
            {homepage && (
              <Breadcrumbs
                parentLink={{
                  text: homepage.title.text,
                  url: linkResolver(homepage),
                }}
                childLink={{
                  text: exhibition.title.text,
                  url: '#',
                }}
              />
            )}
          </div>
          <div className='pb-2'>
            <h1>{exhibition.artist}</h1>
            <h1 className='font-italic'>{exhibition.title.text}</h1>
          </div>

          {exhibition.featuredImage.url && (
            <img
              className='mb-3 exhibition__featured_image'
              src={exhibition.featuredImage.url}
              alt={exhibition.featuredImage.alt}
            />
          )}

          {exhibition.excerpt && (
            <div
              className='parag parag--1'
              dangerouslySetInnerHTML={{ __html: exhibition.excerpt.html }}
            ></div>
          )}

          {!readMore && exhibition.detailedText.html && (
            <Button
              className='mt-2'
              label={langSeek('Read more', exhibition.lang) ?? ''}
              onClick={() => setReadMore(true)}
            ></Button>
          )}

          {readMore && exhibition.detailedText.html && (
            <div
              className='parag parag--2'
              dangerouslySetInnerHTML={{ __html: exhibition.detailedText.html }}
            />
          )}

          <Slideshow
            images={exhibition.exhibitionView.map(image => {
              return { ...image }
            })}
          />

          {exhibition.artistBiography.html && (
            <div className='parag parag--2'>
              <p className='m-0'>
                {exhibition.lang === 'is' ? 'Ágrip' : 'Biography'}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: exhibition.artistBiography.html,
                }}
              />
            </div>
          )}

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
      {slices &&
        slices.map((slice: any, idx: number) => (
          <SliceZone key={idx} slice={slice} lang={exhibition.lang} />
        ))}
    </>
  )
}

export const query = graphql`
  query($id: String, $lang: String) {
    prismicExhibition(id: { eq: $id }, lang: { eq: $lang }) {
      ...exhibitionFragmentFull
    }
  }
`

export default Exhibition
