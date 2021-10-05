import React from 'react'
import Img, { FluidObject } from 'gatsby-image'

const FeaturedImage = ({
  image,
}: {
  image: { alt: string; url: string; fluid: FluidObject }
}) => {
  return (
    <div className='featured-image'>
      <Img fluid={image.fluid} alt={image.alt} />
    </div>
  )
}

export default FeaturedImage
