import React, { useEffect, useMemo, useState } from 'react'

const Slideshow = ({ images }: { images: { url: string; alt: string }[] }) => {
  const [index, setIndex] = useState(0)
  const [positions, setPositions] = useState([0])

  useEffect(() => {
    const t = setTimeout(() => {
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
    }, 1500)

    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <div className='d-block d-lg-none mt-3'>
        {images.map(image => (
          <img
            key={image.url}
            className='w-100 mb-3'
            src={image.url}
            alt={image.alt}
          />
        ))}
      </div>
      {/* desktop */}
      <div className='position-relative d-none d-lg-block'>
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
          <button // go left!
            onClick={() => setIndex(prev => prev - 1)}
            className='slideshow__clickzone slideshow__clickzone--left removeGenericButtonStyles'
          >
            <span>←</span>
          </button>
        )}
        {index < images.length - 1 && (
          <button // go right!
            onClick={() => setIndex(prev => prev + 1)}
            className='slideshow__clickzone slideshow__clickzone--right removeGenericButtonStyles'
          >
            <span>→</span>
          </button>
        )}
      </div>
    </>
  )
}

export default Slideshow
