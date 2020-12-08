import React from 'react'
interface Props {
  label: string
  to?: string
}

const Button: React.FC<Props> = ({ label, ...props }) => {
  return (
    <button className='btn px-2' {...props}>
      <h3 className='m-0'> {label} </h3>
    </button>
  )
}

export default Button
