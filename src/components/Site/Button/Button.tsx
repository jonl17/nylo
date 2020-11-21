import React from "react"
import { Link } from "gatsby"

interface CustomProps {
  label: string
  to?: string
}

const Button: React.FC<CustomProps> = ({ label, to, ...props }) => {
  const textClass = "m-0 center"
  const ButtonClass = "button p-0 center"

  if (to) {
    return (
      <Link className={ButtonClass} to={to} {...props}>
        <h3 className={textClass}> {label} </h3>
      </Link>
    )
  }
  return (
    <button className={ButtonClass} {...props}>
      <h3 className={textClass}> {label} </h3>
    </button>
  )
}

export default Button
