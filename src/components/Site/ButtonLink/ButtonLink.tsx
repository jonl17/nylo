import React from 'react'
import { Link } from 'gatsby'

interface Props {
  to: string
  label?: string
}

const ButtonLink = ({ to, label = '', ...props }: Props) => {
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
    <LinkWrap className='btn px-2'>
      <h3 className='m-0'>{label}</h3>
    </LinkWrap>
  )
}

export default ButtonLink
