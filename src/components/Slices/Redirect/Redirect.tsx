import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

type Props = {
  redirectUrl: string
}

const Redirect = ({ redirectUrl }: Props) => {
  useEffect(() => {
    if (typeof window !== undefined) {
      navigate(redirectUrl)
    }
  }, [])

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  )
}

export default Redirect
