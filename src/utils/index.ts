import slugify from 'slugify'

export const generateURLfromWords = (strings: string[]) => {
  return strings
    .map(s => slugify(`${s}`, { lower: true }))
    .join()
    .replace(',', '/')
}

export const multipleArtistsHandler = (artist: string) => {
  return artist.split(',').length > 1 ? 'Group exhibition' : artist
}

export const formatDate = (
  firstDate: string,
  secondDate?: string,
  x = new Date(firstDate)
) => {
  if (!secondDate) {
    return `${x.getDate()}.${x.getMonth() + 1}.${x.getFullYear()}`
  } else {
    const y = new Date(secondDate)
    return `${x.getDate()}.${x.getMonth() + 1}${
      x.getFullYear() === y.getFullYear() ? '' : `.${x.getFullYear()}`
    }—${y.getDate()}.${y.getMonth()}.${y.getFullYear()}`
  }
}

export const lockScroll = (
  blur?: boolean,
  blurIntensity: string = '20px',
  unlock?: boolean
) => {
  const lock = () => {
    document.body.style.overflow = 'hidden'
    if (blur) {
      document.getElementById('banner')!.style.filter = `blur(${blurIntensity})`
      document.getElementById(
        'main-wrapper'
      )!.style.filter = `blur(${blurIntensity})`
    }
  }
  const unLock = () => {
    document.body.style.overflow = 'auto'
    document.getElementById('banner')!.style.filter = `blur(0px)`
    document.getElementById('main-wrapper')!.style.filter = `blur(0px)`
  }

  if (document.querySelector('main')) {
    unlock ? unLock() : lock()
  }
}
