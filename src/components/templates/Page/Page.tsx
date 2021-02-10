import React, { createContext, useContext, Fragment } from 'react'
import { graphql, navigate } from 'gatsby'
import SliceMapping from '~/components/Slices/mapping'
import '~/fragments/media'
import CloseButton from '~/components/Site/CloseButton'
import SecondaryNavbar from '~/components/Site/SecondaryNavBar'
import { Helmet } from 'react-helmet'
import '~/fragments/menu'
import cn from 'classnames'
import { useLocation } from '@reach/router'
import Frontpage from '~/components/Site/Frontpage'

import { LanguageContext } from '~/context/LanguageContext'

export const PageCtx = createContext<{ lastVisitedUrl: string }>({
  lastVisitedUrl: '/',
})

const Page = ({ data, pageContext }: { data: any; pageContext: any }) => {
  const slices = data.prismicPage.data.body

  const { data: pageData } = data.prismicPage
  console.log(pageContext)

  const Wrapper: React.FC = ({ children }) => (
    <Fragment>
      {pageData.has_submenu.document && (
        <SecondaryNavbar submenu={pageData.has_submenu.document} />
      )}
      <div
        className={cn('page', {
          'page__has-submenu': pageData.has_submenu.document,
        })}
      >
        {children}
      </div>
    </Fragment>
  )

  const { pathname } = useLocation()

  const { lang } = pageContext

  const IS_FRONTPAGE = pathname === '/' || pathname === '/en'

  return (
    <>
      <Helmet>
        <title>{`Living Art Museum—${pageData.title.text}`}</title>
      </Helmet>
      <Wrapper>
        <div className='content'>
          {!IS_FRONTPAGE ? (
            <>
              <CloseButton
                goTo={() => navigate(lang === 'en-us' ? '/en' : '/')}
                className='icon__exit'
              />
              {slices &&
                slices.map((slice: any, idx: number) => (
                  <SliceMapping key={idx} slice={slice} />
                ))}
            </>
          ) : (
            <Frontpage lang={lang} />
          )}
        </div>
      </Wrapper>
    </>
  )
}

export default Page

export const query = graphql`
  query($id: String!) {
    prismicPage(id: { eq: $id }) {
      lang
      tags
      data {
        has_submenu {
          document {
            ...fragmentPrismicMenu
          }
        }
        subpage {
          uid
        }
        title {
          text
        }
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
