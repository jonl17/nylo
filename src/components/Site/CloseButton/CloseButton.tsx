import React, { useEffect, useState } from 'react'
import { Exit, Back } from './SVG'
import cn from 'classnames'
import { Link } from 'gatsby'
import useGetPage from '~/hooks/useGetPage'
import linkResolver from '~/utils/linkResolver'
import { Language } from 'balkan-tungumal/lib/dict'

interface Props {
  className?: string
  isSubpageOf?: {
    url: string
    uid: string
  }
  lang: Language
}

const CloseButton = ({ className = '', isSubpageOf, lang }: Props) => {
  const [backTo, setBackTo] = useState('/')

  const parentpage = isSubpageOf ? useGetPage(isSubpageOf.uid) : null

  useEffect(() => {
    if (parentpage) {
      setBackTo(linkResolver(parentpage))
    } else {
      setBackTo(lang === 'is' ? '/' : '/en-us')
    }
  }, [])

  return (
    <Link to={backTo} className='icon__exit d-none d-lg-block'>
      {parentpage ? (
        <Back className={cn('icon', className)} />
      ) : (
        <Exit className={cn('icon', className)} />
      )}
    </Link>
  )
}

export default CloseButton
