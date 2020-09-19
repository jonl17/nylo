import React from 'react'
import NavBar from '~/components/NavBar'

const Layout: React.FC<{ children: React.ReactChildren }> = ({ children }) => {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  )
}

export default Layout
