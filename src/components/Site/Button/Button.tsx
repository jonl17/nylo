import React, { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
interface Props {
  className?: string
  label: string
  type?: 'primary' | 'secondary'
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined
}

const Button: React.FC<Props> = ({
  label,
  className,
  onClick,
  type = 'primary',
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={cn('btn', className, `btn--${type}`, {
        'px-2': type === 'primary',
        'px-0': type === 'secondary',
      })}
      {...props}
    >
      <h3 className='m-0'> {label} </h3>
    </button>
  )
}

export default Button
