import React, { useState } from 'react'
import Burger from '~/components/Site/Burger'
import { useLanguage } from '~/context/LanguageContext'

const Title = () => {
  const { lang } = useLanguage()
  return (
    <h5 className='mb-0'>
      {lang === 'en-us' ? 'The Living Art Museum' : 'Nýlistasafnið'}
    </h5>
  )
}

const MobileHeader = () => {
  const [expand, setExpand] = useState(false)
  return (
    <div className='mobile-header mx-2 d-flex align-items-center justify-content-between d-lg-none'>
      <Burger />
      <Title />
    </div>
  )
}

export default MobileHeader
