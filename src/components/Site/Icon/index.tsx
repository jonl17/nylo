import React from "react"
import { IconType } from "../NavBar/types"
import { Exit } from "./SVG"
import cn from "classnames"

interface Props {
  type: IconType
  className?: string
  [propName: string]: unknown
}

const Icon = ({ type, className = "", ...rest }: Props) => {
  const types = {
    Exit,
  }

  const Cmp = types[type]

  if (!Cmp) return null

  return <Cmp className={cn("icon", className)} {...rest} />
}

export default Icon
