import React from 'react'

const FeaturedImage = ({ image }: { image: { url: string; alt: string } }) => {
  return (
    <div className='featured-image'>
      <img src={image.url} alt={image.alt} />
    </div>
  )
}

export default FeaturedImage
