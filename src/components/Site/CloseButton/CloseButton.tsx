import React, { useEffect, useState } from 'react'
import { Exit, Back } from './SVG'
import cn from 'classnames'
import { Link, navigate } from 'gatsby'
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
  forceGoBack?: boolean
}

const CloseButton = ({
  className = '',
  isSubpageOf,
  lang,
  forceGoBack,
}: Props) => {
  const [backTo, setBackTo] = useState('/')

  const parentpage =
    isSubpageOf && !forceGoBack ? useGetPage(isSubpageOf.uid) : null

  useEffect(() => {
    if (parentpage) {
      setBackTo(linkResolver(parentpage))
    } else {
      setBackTo(lang === 'is' ? '/' : '/en-us')
    }
  }, [])

  if (forceGoBack) {
    return (
      <button
        className='removeGenericButtonStyles'
        onClick={() => navigate(-1)}
      >
        <Back className={cn('icon', className)} />
      </button>
    )
  }

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
