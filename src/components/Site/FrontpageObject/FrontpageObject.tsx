import React from 'react'
import cn from 'classnames'

const FrontpageObject: React.FC<{
  image: { alt: string; url: string }
  className?: string
  imageClass?: string
}> = ({ children, image, imageClass }) => {
  return (
    <>
      <div className='mb-3 frontpage-object__children'>{children}</div>
      <img
        className={cn('frontpage-object__img d-inline-block mr-3', imageClass)}
        src={image.url}
      />
    </>
  )
}

export default FrontpageObject
