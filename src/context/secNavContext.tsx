import React, { createContext, useContext, useState } from 'react'
import { MenuInterface } from '~/utils/resolvers'

const initialState = {
  menu: undefined,
  modify: () => {},
}

type Props = {
  menu?: MenuInterface
  modify: (m?: MenuInterface) => void
}

const SecondaryNavbarContext = createContext<Props>(initialState)

const SecondaryNavbarContextProvider: React.FC = ({ children }) => {
  const [menu, setMenu] = useState<MenuInterface>()

  const modify = (m?: MenuInterface) => {
    setMenu(m)
  }

  return (
    <SecondaryNavbarContext.Provider value={{ menu, modify }}>
      {children}
    </SecondaryNavbarContext.Provider>
  )
}

const useSecondaryNavbar = () => useContext(SecondaryNavbarContext)

export {
  SecondaryNavbarContextProvider,
  SecondaryNavbarContext,
  useSecondaryNavbar,
}
