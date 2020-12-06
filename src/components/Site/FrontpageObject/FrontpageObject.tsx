import React from 'react'
import cn from 'classnames'

const FrontpageObject: React.FC<{
  image: { alt: string; url: string }
  className?: string
}> = ({ children, image, className }) => {
  return (
    <div className={cn('pl-3 mt-3 mb-5', className)}>
      <div className="mb-3 frontpage-object__children">{children}</div>
      <img src={image.url} />
    </div>
  )
}

export default FrontpageObject
