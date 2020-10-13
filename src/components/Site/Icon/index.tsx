import React from "react"
import { Exit } from "./SVG"
import cn from "classnames"
import styles from "./Icon.module.scss"

const Icon = () => {
  return <Exit className={cn("position-absolute", styles.icon)} />
}

export default Icon
