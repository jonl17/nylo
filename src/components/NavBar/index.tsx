import React from 'react'
import { Link } from 'gatsby'
import useMenuQuery from './useMenuQuery'

export default () => {
  const { mainMenu } = useMenuQuery()
  return (
    <nav className='col-3 offset-10 mt-3'>
      {mainMenu.data.pages.map((item, idx) => (
        <Link key={idx} to={`/${item.page.uid}`}>
          <h2>{item.page.document.data.title.text}</h2>
        </Link>
      ))}
    </nav>
  )
}