import React from 'react'
import cn from 'classnames'

const FrontpageObject: React.FC<{
  image: { alt: string; url: string }
  className?: string
  imageClass?: string
}> = ({ children, image, imageClass, className }) => {
  return (
    <div className={cn('frontpage-object', className)}>
      <div className='mb-3 frontpage-object__children'>{children}</div>
    </div>
  )
}

export default FrontpageObject
