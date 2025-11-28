import React from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

const FeaturedImage = ({
  image,
}: {
  image: { alt: string; url: string; gatsbyImageData: IGatsbyImageData }
}) => {
  return (
    <div className='featured-image'>
      <GatsbyImage image={image.gatsbyImageData} alt={image.alt} />
    </div>
  )
}

export default FeaturedImage
