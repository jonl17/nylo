import React from 'react'
import cn from 'classnames'
import { Link } from 'gatsby'

const FrontpageObject: React.FC<{
  image: { alt: string; url: string }
  className?: string
  to?: string
}> = ({ children, image, className, to }) => (
  <div className={cn('pl-3 mt-3 mb-5', className)}>
    <div className='mb-3 frontpage-object__children'>{children}</div>
    <img className='frontpage-object__img' src={image.url} />
  </div>
)

export default FrontpageObject
