import React from 'react'
import { Link } from 'gatsby'

type LinkType = {
  url: string
  text: string
}

interface Props {
  parentLink: LinkType
  childLink: LinkType
}

const Breadcrumbs = ({ parentLink, childLink }: Props) => {
  return (
    <div className='d-flex'>
      <Link
        partiallyActive
        activeClassName='secondaryAnchorActive'
        to={parentLink.url}
      >
        <p>{parentLink.text}</p>
      </Link>
      <span className='breadcrumbs__separator' />
      <Link
        activeClassName='secondaryAnchorActive'
        className='navbar__anchor--active'
        to={childLink.url}
      >
        <p>{childLink.text}</p>
      </Link>
    </div>
  )
}

export default Breadcrumbs
