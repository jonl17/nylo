import React, { createContext, useContext, useState } from 'react'

export type BGcolor = 'green' | 'white' | 'gray' | 'yellow' | 'pink' | 'purple'

type Props = {
  backgroundClassName: string
  updateBgClass: (c: string) => void
}

const initialState = {
  backgroundClassName: 'bg--white',
  updateBgClass() {},
}

const BackgroundContext = createContext<Props>({ ...initialState })

const BackgroundContextProvider: React.FC = ({ children }) => {
  const [backgroundClassName, setBackgroundClassName] = useState('bg--white')

  const updateBgClass = (color: string) =>
    setBackgroundClassName(`bg--${color}`)

  return (
    <BackgroundContext.Provider value={{ backgroundClassName, updateBgClass }}>
      {children}
    </BackgroundContext.Provider>
  )
}

const useBackground = () => useContext(BackgroundContext)

export { BackgroundContextProvider, BackgroundContext, useBackground }
