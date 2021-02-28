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
    <div className='d-none d-lg-flex'>
      <Link to={parentLink.url}>
        <p>{parentLink.text}</p>
      </Link>
      <span className='breadcrumbs__separator' />
      <div className='navbar__anchor--active breadcrumbs__p--special'>
        <p>{childLink.text}</p>
      </div>
    </div>
  )
}

export default Breadcrumbs
