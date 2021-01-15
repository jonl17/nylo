import React, { useEffect, useMemo, useState } from 'react'

const Slideshow = ({ images }: { images: { url: string; alt: string }[] }) => {
  const [index, setIndex] = useState(0)
  const [positions, setPositions] = useState([0])

  useEffect(() => {
    setTimeout(() => {
      document
        .querySelectorAll('.slideshow-image')
        .forEach(node => console.log(node.clientWidth))
      const nodes = Array.from(
        document.querySelectorAll('.slideshow-image')
      ).map(node => {
        return node.clientWidth
      })

      setPositions(prev => [
        ...prev,
        ...nodes.map((node, i) =>
          nodes.slice(0, i + 1).reduce((a, b) => a + b)
        ),
      ])

      console.log(nodes)
    }, 1500)
  }, [])

  return (
    <div className='position-relative'>
      <div
        style={{
          transform: `translateX(-${positions[index]}px)`,
        }}
        className='my-3 d-flex slideshow'
      >
        {images.map((image, idx) => (
          <img
            id={`image-${idx}`}
            className='slideshow-image'
            key={image.url}
            src={image.url}
            alt={image.alt}
          />
        ))}
      </div>
      {index > 0 && (
        <button
          onClick={() => setIndex(prev => prev - 1)}
          className='slideshow__clickzone slideshow__clickzone--left removeGenericButtonStyles'
        />
      )}
      {index < images.length - 1 && (
        <button
          onClick={() => setIndex(prev => prev + 1)}
          className='slideshow__clickzone slideshow__clickzone--right removeGenericButtonStyles'
        />
      )}
    </div>
  )
}

export default Slideshow
