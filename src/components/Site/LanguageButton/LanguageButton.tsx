import React from 'react'
import ButtonLink from '~/components/Site/ButtonLink'
import linkResolver from '~/utils/linkResolver'

const LanguageButton = ({ page }: { page: any }) => {
  const altPage = page.alternate_languages[0]
  return (
    <ButtonLink
      label={page.lang.slice(0, 2).toUpperCase()}
      className='btn__language'
      to={linkResolver(altPage)}
    ></ButtonLink>
  )
}

export default LanguageButton
