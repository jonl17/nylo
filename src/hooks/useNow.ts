import { useEffect, useState } from 'react'

// Set at build time in gatsby-node.js (same value for the server HTML and the
// browser bundle).
declare const __BUILD_TIME__: number

export const BUILD_TIME =
  typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : Date.now()

// "Now" for time-dependent UI (open now, current exhibitions, upcoming
// events). The first render uses the build time, so it matches the static
// HTML and hydration doesn't fail; after mount it switches to the real time.
const useNow = () => {
  const [now, setNow] = useState(() => new Date(BUILD_TIME))
  useEffect(() => {
    setNow(new Date())
  }, [])
  return now
}

export default useNow
