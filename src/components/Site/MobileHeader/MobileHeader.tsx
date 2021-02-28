import { Link } from 'gatsby'
import React, { useState } from 'react'
import Burger from '~/components/Site/Burger'
import { useLanguage } from '~/context/LanguageContext'
import { Language } from '~/lang'
import cn from 'classnames'

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
  const [expand, setExpand] = useState(false)
  return (
    <div
      className={cn('mobile-header d-flex d-lg-none', bg, {
        'mobile-header--expanded': expand,
      })}
    >
      <Burger onClick={() => setExpand(!expand)} expand={expand} />
      <Title lang={lang} />
    </div>
  )
}

export default MobileHeader
