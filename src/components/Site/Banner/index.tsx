import React from "react"
import { useGetAnnouncementBanner } from "~/hooks"
import cn from "classnames"
import styles from "./Banner.module.scss"

const Banner = () => {
  const { announcement } = useGetAnnouncementBanner()
  return (
    <div className={cn(styles.bannerWrap)}>
      <h1 className={cn("hdln--1 m-0", styles.marquee)}>{announcement}</h1>
    </div>
  )
}

export default Banner
