import React, { createContext, useState, useContext } from 'react'

const MobileMenuContext = createContext<{
  open: boolean
  triggerMobileMenu: (b: boolean) => void
}>({
  open: false,
  triggerMobileMenu: () => {},
})

const MobileMenuContextProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false)

  const triggerMobileMenu = (b: boolean) => setOpen(b)

  return (
    <MobileMenuContext.Provider value={{ open, triggerMobileMenu }}>
      {children}
    </MobileMenuContext.Provider>
  )
}

const useMobileMenu = () => useContext(MobileMenuContext)

export { MobileMenuContextProvider, MobileMenuContext, useMobileMenu }
