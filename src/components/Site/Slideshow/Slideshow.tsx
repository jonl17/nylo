import React, { useEffect, useMemo, useState } from 'react'

const Slideshow = ({ images }: { images: { url: string; alt: string }[] }) => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const [positions, setPositions] = useState([0])

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.slideshow-image')).map(
      node => node.clientWidth
    )

    setPositions(prev => [
      ...prev,
      ...nodes.map((node, i) => nodes.slice(0, i + 1).reduce((a, b) => a + b)),
    ])
  }, [])

  const handleClick = () => {
    setIndex(prevIndex => (direction === 'up' ? prevIndex + 1 : prevIndex - 1))
  }

  useMemo(() => {
    if (index === images.length - 1) setDirection('down')
    if (index === 0) setDirection('up')
  }, [index])

  return (
    <div
      style={{
        transform: `translateX(-${positions[index]}px)`,
        cursor: direction === 'up' ? 'e-resize' : 'w-resize',
      }}
      onClick={() => handleClick()}
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
  )
}

export default Slideshow
