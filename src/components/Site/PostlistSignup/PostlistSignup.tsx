import React from 'react'
import Button from '~/components/Site/Button'

const PostlistSignup = () => {
  return (
    <div className='input input--small'>
      <input placeholder='Email address' className='px-2 mb-2' />
      <Button type='primary' label='Subscribe' />
    </div>
  )
}

export default PostlistSignup
