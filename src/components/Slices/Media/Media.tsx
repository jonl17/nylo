import React from 'react'
import cn from 'classnames'

const Media: React.FC<{
  items: { image: { url: string; alt: string } }[]
}> = ({ items }) => {
  return (
    <div className='image-reel d-flex flex-column flex-lg-row position-relative py-3'>
      {items.map((item, idx) => (
        <img
          className={cn(
            items.length > 1 ? 'col-lg-6' : 'col-lg-12',
            idx === items.length - 1 ? 'px-0' : 'pl-0',
            'w-100 my-2 my-lg-0 p-0 pr-lg-2'
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
