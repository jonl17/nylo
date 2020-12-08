import React from 'react'
import cn from 'classnames'

const Media: React.FC<{
  items: { image: { url: string; alt: string } }[]
}> = ({ items }) => {
  return (
    <div className='image-reel d-flex position-relative py-3'>
      {items.map((item, idx) => (
        <img
          className={cn(
            items.length > 1 ? 'col-6' : 'col-12',
            idx === items.length - 1 ? 'px-0' : 'pl-0'
          )}
          key={idx}
          src={item.image.url}
          alt={item.image.alt}
        />
      ))}
    </div>
  )
}

export default Media
