import React, { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
interface Props {
  className?: string
  label: string
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined
}

const Button: React.FC<Props> = ({ label, className, onClick, ...props }) => {
  return (
    <button onClick={onClick} className={cn('btn px-2', className)} {...props}>
      <h3 className='m-0'> {label} </h3>
    </button>
  )
}

export default Button
