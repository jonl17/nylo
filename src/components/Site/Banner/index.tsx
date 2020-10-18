import React from "react"
import { useGetAnnouncementBanner } from "~/hooks"
import cn from "classnames"
import styles from "./Banner.module.scss"

const Banner = () => {
  const { announcement } = useGetAnnouncementBanner()
  return (
    <div className={cn(styles.bannerWrap)}>
      <div
        dangerouslySetInnerHTML={{ __html: announcement }}
        className={cn("hdln--1 center", styles.marquee)}
      />
    </div>
  )
}

export default Banner
