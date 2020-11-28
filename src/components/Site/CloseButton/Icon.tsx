import React from "react"
import { Exit } from "./SVG"
import cn from "classnames"

interface Props {
  className?: string
  [propName: string]: unknown
}

const CloseButton = ({ className = "", ...rest }: Props) => {
  return <Exit className={cn("icon", className)} {...rest} />
}

export default CloseButton
