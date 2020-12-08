import React from 'react'
import { useLocation } from '@reach/router'
import CloseButton from '~/components/Site/CloseButton'
import { Link } from 'gatsby'

const Exhibitions = () => {
  const { search } = useLocation()
  return (
    <div className='exhibition'>
      <Link to='/'>
        <CloseButton className='icon__exit' />
      </Link>
      {search ? (
        <div className='exhibition__modal-window'>pop 'em modal</div>
      ) : null}
    </div>
  )
}

export default Exhibitions
