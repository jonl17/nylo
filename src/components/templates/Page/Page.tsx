import React, { createContext } from 'react'
import { graphql, navigate } from 'gatsby'
import SliceMapping from '~/components/Slices/mapping'
import { BGcolor, RichTextSliceType, ImageReelSliceType } from '~/types'
import { Match, useLocation } from '@reach/router'
import '~/fragments/media'
import CloseButton from '~/components/Site/CloseButton'
import SecondaryNavbar from '~/components/Site/SecondaryNavBar'
import { Helmet } from 'react-helmet'
import { cleanPathname } from '~/utils'
import cn from 'classnames'

interface Props {
  data: {
    prismicPage: {
      tags: string[]
      data: {
        has_submenu: {
          id?: string
        }
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
  const slices = data.prismicPage.data.body

  const { pathname } = useLocation()

  const findRightMatch = () => {
    if (pathname.includes('/heimsokn')) {
      return '/heimsokn/*'
    }
    if (pathname.includes('/um-nylo')) {
      return '/um-nylo/*'
    }
    if (pathname.includes('/safneign')) {
      return '/safneign/*'
    } else return ''
  }

  const Wrapper: React.FC = ({ children }) => {
    return (
      <Match path={findRightMatch()}>
        {props => (
          <>
            {props.match ? (
              <>
                <SecondaryNavbar
                  submenu={pageContext.subpageOf || cleanPathname(pathname)}
                />
                <div className='page page__has-submenu'>{children}</div>
              </>
            ) : (
              <div className='page'>{children}</div>
            )}
          </>
        )}
      </Match>
    )
  }

  return (
    <>
      <Helmet>
        <title>{`Living Art Museum—${data.prismicPage.data.title.text}`}</title>
      </Helmet>
      <Wrapper>
        <div className='content'>
          <CloseButton goTo={() => navigate('/')} className='icon__exit' />
          {slices &&
            slices.map((slice, idx) => (
              <SliceMapping key={idx} slice={slice} />
            ))}
        </div>
      </Wrapper>
    </>
  )
}

export default Page

export const query = graphql`
  query($id: String!) {
    prismicPage(id: { eq: $id }) {
      tags
      data {
        has_submenu {
          id
        }
        subpage {
          uid
        }
        title {
          text
        }
        background_color
        body {
          ... on PrismicPageBodyProgram {
            slice_type
            primary {
              program_name
            }
            items {
              parameter_label
              parameter_value
            }
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
        }
      }
    }
  }
`
