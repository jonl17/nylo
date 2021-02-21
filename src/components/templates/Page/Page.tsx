import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import SliceMapping from '~/components/Slices/mapping'
import '~/fragments/media'
import CloseButton from '~/components/Site/CloseButton'
import SecondaryNavbar from '~/components/Site/SecondaryNavBar'
import { Helmet } from 'react-helmet'
import '~/fragments/menu'
import cn from 'classnames'
import Frontpage from '~/components/Site/Frontpage'
import Layout from '~/layouts'

const Page = ({ data, pageContext }: { data: any; pageContext: any }) => {
  const slices = data.prismicPage.data.body

  const IS_FRONTPAGE = data.prismicPage.tags.includes('FRONTPAGE')

  const Wrapper: React.FC = ({ children }) => (
    <Fragment>
      {data.prismicPage.data.has_submenu.document && (
        <SecondaryNavbar submenu={data.prismicPage.data.has_submenu.document} />
      )}
      <div
        className={cn('page', {
          'page__has-submenu': data.prismicPage.data.has_submenu.document,
        })}
      >
        {children}
      </div>
    </Fragment>
  )

  return (
    <Layout pageContext={data.prismicPage} mainMenu={data.prismicMenu}>
      <Wrapper>
        <div className='content'>
          {!IS_FRONTPAGE ? (
            <>
              <CloseButton className='icon__exit' />
              {slices &&
                slices.map((slice: any, idx: number) => (
                  <SliceMapping key={idx} slice={slice} />
                ))}
            </>
          ) : (
            <Frontpage currentExhibition={null} />
          )}
        </div>
      </Wrapper>
    </Layout>
  )
}

export default Page

export const query = graphql`
  query($id: String, $lang: String) {
    prismicPage(id: { eq: $id }, lang: { eq: $lang }) {
      lang
      tags
      uid
      alternate_languages {
        id
        type
        lang
        uid
        url
      }
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
    prismicMenu(lang: { eq: $lang }, tags: { in: "MAIN_MENU" }) {
      ...fragmentPrismicMenu
    }
  }
`
