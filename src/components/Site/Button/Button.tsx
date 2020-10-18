import React from "react"
import { Link } from "gatsby"
import styles from "./Button.module.scss"
import cn from "classnames"

interface CustomProps {
  label: string
  to?: string
}

const Button: React.FC<CustomProps> = ({ label, to, ...props }) => {
  const textClass = "hdln--3 m-0 h-100 w-100 center"
  const ButtonClass = cn(styles.button, "p-0 center")

  if (to) {
    return (
      <Link className={ButtonClass} to={to} {...props}>
        <h1 className={textClass}> {label} </h1>
      </Link>
    )
  }
  return (
    <button className={ButtonClass} {...props}>
      <h1 className={textClass}> {label} </h1>
    </button>
  )
}

export default Button
