import React from 'react'
import cn from 'classnames'
import { Link } from 'gatsby'

const FrontpageObject: React.FC<{
  image: { alt: string; url: string }
  className?: string
  to: string
  imageClass?: string
}> = ({ children, image, className, imageClass, to }) => (
  <Link to={to} className={cn(className)}>
    <div className='mb-3 frontpage-object__children'>{children}</div>
    <img
      className={cn('frontpage-object__img d-inline-block mr-3', imageClass)}
      src={image.url}
    />
  </Link>
)

export default FrontpageObject
