import React, { createContext, useState } from 'react'
import { lockScroll } from '~/utils'
import cn from 'classnames'
import CloseButton from '~/components/Site/CloseButton'

const ModalContext = createContext<{
  isOpen: boolean
  trigger: (b: boolean) => void
}>({ isOpen: false, trigger() {} })

const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const trigger = (b: boolean) => setIsOpen(b)

  if (isOpen) {
    lockScroll(true, '5px')
  } else {
    lockScroll(false, '0px', true)
  }

  return (
    <ModalContext.Provider value={{ isOpen, trigger }}>
      <div
        className={cn('sneak-peak-window', {
          'sneak-peak-window--open': isOpen,
        })}
      >
        <div className='sneak-peak-window__content'>los gringos</div>
        <button
          onClick={() => trigger(false)}
          className='removeGenericButtonStyles sneak-peak-window__close-btn'
        >
          <CloseButton />
        </button>
      </div>
      {children}
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalProvider }
