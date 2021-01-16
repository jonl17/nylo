import React, { MutableRefObject, RefObject, useEffect, useRef } from 'react'
import cn from 'classnames'

const Open = ({ className = '' }) => {
  return <p className={cn(className, 'open')}>OPEN</p>
}

export default Open
