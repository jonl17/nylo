import React, { createContext } from 'react'
import { graphql, navigate } from 'gatsby'
import SliceMapping from '~/components/Slices/mapping'
import cn from 'classnames'
import { BGcolor, RichTextSliceType, ImageReelSliceType } from '~/types'
import { Match, useLocation } from '@reach/router'
import '~/fragments/media'
import CloseButton from '~/components/Site/CloseButton'
import SecondaryNavbar from '~/components/Site/SecondaryNavBar'
import { Helmet } from 'react-helmet'

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
  const { background_color } = data.prismicPage.data

  const findColor = (color: BGcolor) => {
    if (color) {
      return `bg--${color.toLowerCase()}`
    } else {
      return `bg--white`
    }
  }

  const slices = data.prismicPage.data.body

  const { pathname } = useLocation()

  const findSubmenu = (p: string) => {
    return `${p.replace('/', '')}`
  }

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

  const Wrapper: React.FC = ({ children }) => (
    <Match path={findRightMatch()}>
      {props => (
        <div>
          {props.match ? (
            <>
              <SecondaryNavbar
                submenu={pageContext.subpageOf || findSubmenu(pathname)}
              />
              <div
                className={cn(
                  findColor(background_color),
                  'page page__has-submenu'
                )}
              >
                {children}
              </div>
            </>
          ) : (
            <div className={cn(findColor(background_color), 'page')}>
              {children}
            </div>
          )}
        </div>
      )}
    </Match>
  )

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
