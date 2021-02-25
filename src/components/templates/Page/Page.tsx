import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import '~/fragments/menu'
import '~/fragments/page'

import SliceMapping from '~/components/Slices/mapping'
import CloseButton from '~/components/Site/CloseButton'
import SecondaryNavbar from '~/components/Site/SecondaryNavBar'
import Frontpage from '~/components/Site/Frontpage'
import Layout from '~/layouts'
import { pageResolver, menuResolver } from '~/utils/resolvers'
import cn from 'classnames'

import { defaultFrontpageTag } from '../../../../prismic.config'

const Page = ({ data }: { data: any }) => {
  const page = pageResolver(data.prismicPage)

  const slices = page.body

  const IS_FRONTPAGE = page.tags.includes(defaultFrontpageTag)

  console.log(menuResolver(data.prismicMenu))

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
  )
}

export default Page

export const query = graphql`
  query($id: String, $lang: String) {
    prismicPage(id: { eq: $id }, lang: { eq: $lang }) {
      ...fragmentPrismicPage
    }
    prismicMenu(lang: { eq: $lang }, tags: { in: "MAIN_MENU" }) {
      ...fragmentPrismicMenu
    }
  }
`
