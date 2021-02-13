import React from 'react'
import { Link } from 'gatsby'
import cn from 'classnames'

interface Props {
  to: string
  label?: string
  className?: string
}

const ButtonLink = ({ to, label = '', className = '' }: Props) => {
  const internal = /^\/(?!\/)/.test(to)

  const LinkWrap: React.FC<{ className?: string }> = ({
    className,
    children,
  }) =>
    internal ? (
      <Link className={className} to={to}>
        {children}
      </Link>
    ) : (
      <a className={className} href={to} target='_blank'>
        {children}
      </a>
    )
  return (
    <LinkWrap className={cn(className, 'btn px-2')}>
      <h3 className='m-0'>{label}</h3>
    </LinkWrap>
  )
}

export default ButtonLink
