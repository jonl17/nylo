import React, { useEffect, useState, createContext } from 'react'
import { graphql, navigate, Link } from 'gatsby'
import SliceMapping from '~/components/Slices/mapping'
import cn from 'classnames'
import { BGcolor, RichTextSliceType, ImageReelSliceType } from '~/types'
import { useLocation } from '@reach/router'
import '~/fragments/media'
import CloseButton from '~/components/Site/CloseButton'

interface Props {
  data: {
    prismicPage: {
      tags: string[]
      data: {
        title: {
          text: string
        }
        subpage: {
          uid?: string
        }
        background_color: BGcolor
        body: {
          __typename: string
          primary: RichTextSliceType
          items: ImageReelSliceType[]
        }[]
      }
    }
  }
  pageContext: {
    id: string
    parentPageUid?: string
  }
}

export const PageCtx = createContext<{ lastVisitedUrl: string }>({
  lastVisitedUrl: '/',
})

const Page: React.FC<Props> = ({ data, pageContext }) => {
  const { pathname } = useLocation() // todo make this redirect better

  const { background_color } = data.prismicPage.data

  const findColor = (color: BGcolor) => {
    if (color === 'Green') return 'bg--green'
    else return 'bg--white'
  }

  const slices = data.prismicPage.data.body

  return (
    <div className={cn(findColor(background_color), 'page')}>
      <div className="content">
        {pathname.includes('/um-nylo/') && (
          <Link to="/">
            <CloseButton className="icon__exit" />
          </Link>
        )}
        {slices &&
          slices.map((slice, idx) => <SliceMapping key={idx} slice={slice} />)}
      </div>
    </div>
  )
}

export default Page

export const query = graphql`
  query($id: String!) {
    prismicPage(id: { eq: $id }) {
      tags
      data {
        subpage {
          uid
        }
        title {
          text
        }
        background_color
        body {
          ... on PrismicPageBodyAllNews {
            id
          }
          ... on PrismicPageBodyMedia {
            slice_type
            items {
              image {
                url
                alt
              }
            }
          }
          ... on PrismicPageBodyRichtext {
            slice_type
            primary {
              type
              text {
                html
              }
            }
          }
          ... on PrismicPageBodyAllNews {
            slice_type
          }
        }
      }
    }
  }
`
