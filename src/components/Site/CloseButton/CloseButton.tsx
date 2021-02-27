import React, { useEffect, useState } from 'react'
import { Exit } from './SVG'
import cn from 'classnames'
import { Link } from 'gatsby'
import useGetPage from '~/hooks/useGetPage'
import linkResolver from '~/utils/linkResolver'

interface Props {
  className?: string
  isSubpageOf?: {
    url: string
    uid: string
  }
}

const CloseButton = ({ className = '', isSubpageOf }: Props) => {
  const [backTo, setBackTo] = useState('/')

  const frontpage = useGetPage('frontpage')
  const parentpage = isSubpageOf ? useGetPage(isSubpageOf.uid) : null

  useEffect(() => {
    if (parentpage) {
      setBackTo(linkResolver(parentpage))
    } else {
      setBackTo(linkResolver(frontpage))
    }
  }, [])

  return (
    <Link to={backTo} className='icon__exit'>
      <Exit className={cn('icon', className)} />
    </Link>
  )
}

export default CloseButton
