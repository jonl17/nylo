import React, { useState } from 'react'
import Burger from '~/components/Site/Burger'
import { useLanguage } from '~/context/LanguageContext'
import { Language } from '~/lang'

const Title = ({ lang }: { lang: Language }) => {
  return (
    <h5 className='mb-0'>
      {lang === 'en-us' ? 'The Living Art Museum' : 'Nýlistasafnið'}
    </h5>
  )
}

const MobileHeader = ({ lang }: { lang: Language }) => {
  const [expand, setExpand] = useState(false)
  return (
    <div className='mobile-header mx-2 d-flex align-items-center justify-content-between d-lg-none'>
      <Burger onClick={() => console.log('hey joe, open up em burg')} />
      <Title lang={lang} />
    </div>
  )
}

export default MobileHeader
