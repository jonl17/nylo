import React, { Fragment, useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import '~/fragments/menu'
import '~/fragments/page'

import SliceMapping from '~/components/Slices/mapping'
import CloseButton from '~/components/Site/CloseButton'
import SecondaryNavbar from '~/components/Site/SecondaryNavBar'
import { pageResolver } from '~/utils/resolvers'
import cn from 'classnames'

import { defaultFrontpageTag } from '../../../../prismic.config'
import useGetPage from '~/hooks/useGetPage'
import { useSecondaryNavbar } from '~/context/secNavContext'
import { useBackground } from '~/context/backgroundContext'
import { BGcolor } from '~/types'

const Page = ({ data }: { data: any }) => {
  const page = pageResolver(data.prismicPage)

  const slices = page.body

  const IS_FRONTPAGE = page.tags.includes(defaultFrontpageTag)

  const { modify, menu } = useSecondaryNavbar()

  const parentPage = page.isSubpageOf ? useGetPage(page.isSubpageOf.uid) : null

  useEffect(() => {
    if (parentPage && parentPage.hasSubmenu) {
      modify(parentPage.hasSubmenu)
    }
  }, [])

  const Wrapper: React.FC = ({ children }) => (
    <Fragment>
      <SecondaryNavbar />
      <div
        className={cn('page', {
          'page__has-submenu': menu,
        })}
      >
        {children}
      </div>
    </Fragment>
  )

  return (
    <Wrapper>
      <div className='content'>
        {!IS_FRONTPAGE && <CloseButton className='icon__exit' />}
        {slices &&
          slices.map((slice: any, idx: number) => (
            <SliceMapping key={idx} slice={slice} lang={page.lang} />
          ))}
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
