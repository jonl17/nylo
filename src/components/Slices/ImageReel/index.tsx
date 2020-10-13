import React from "react"
import cn from "classnames"
import styles from "./ImageReel.module.scss"

const ImageReel: React.FC<{
  items: { image: { url: string; alt: string } }[]
}> = ({ items }) => {
  return (
    <div className={cn("d-flex position-relative py-3", styles.imageWrap)}>
      {items.map((item, idx) => (
        <img
          className="col-6 pl-0"
          key={idx}
          src={item.image.url}
          alt={item.image.alt}
        />
      ))}
    </div>
  )
}

export default ImageReel
