import React, { useEffect, useState } from 'react'
import qs, { ParsedQs } from 'qs'
import { useLocation } from '@reach/router'
import cn from 'classnames'

const Modal = () => {
  const { pathname, search } = useLocation()
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(qs.parse(search))

  useEffect(() => {
    const result = qs.parse(search)
    if (result['?eid']) {
      setId(result)
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [search])

  return (
    <div
      className={cn('modal-window', {
        'modal-window--open': open,
      })}
    >
      <p>woop</p>
    </div>
  )
}

export default Modal
