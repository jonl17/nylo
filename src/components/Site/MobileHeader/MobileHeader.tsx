import { Link } from 'gatsby'
import React from 'react'
import Burger from '~/components/Site/Burger'
import { Language } from '~/lang'
import cn from 'classnames'
import { useMobileMenu } from '~/context/mobileMenuContext'

const Title = ({ lang }: { lang: Language }) => {
  return (
    <Link to={lang === 'is' ? '/' : '/en-us'}>
      <h5 className='mb-0'>
        {lang === 'en-us' ? 'The Living Art Museum' : 'Nýlistasafnið'}
      </h5>
    </Link>
  )
}

const MobileHeader = ({ lang, bg }: { lang: Language; bg: string }) => {
  const { open, triggerMobileMenu } = useMobileMenu()

  return (
    <div
      className={cn(
        'mobile-header d-flex justify-content-between w-100 align-items-center d-lg-none p-2',
        bg
      )}
    >
      <Burger onClick={() => triggerMobileMenu(!open)} expand={open} />
      <Title lang={lang} />
    </div>
  )
}

export default MobileHeader
