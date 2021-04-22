import React from 'react'
import ButtonLink from '~/components/Site/ButtonLink'
import linkResolver from '~/utils/linkResolver'

const LanguageButton = ({ page }: { page: any }) => {
  const altPage = page.alternate_languages ? page.alternate_languages[0] : null

  return (
    <ButtonLink
      label={page.lang === 'is' ? 'EN' : 'IS'}
      className='btn__language btn--primary'
      to={
        altPage
          ? linkResolver(altPage.document)
          : page.lang === 'is'
          ? '/en-us'
          : '/'
      }
    ></ButtonLink>
  )
}

export default LanguageButton
