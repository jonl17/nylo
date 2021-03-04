import slugify from 'slugify'

export const generateURLfromWords = (strings: string[]) => {
  return strings
    .map(s => slugify(`${s}`, { lower: true }))
    .join()
    .replace(',', '/')
}

export const multipleArtistsHandler = (artist: string, text: string = '') => {
  return artist.split(/,| og /).length > 3 ? text : artist
}

export const formatDate = (
  firstDate: string,
  secondDate?: string,
  excludeYear?: boolean
) => {
  const x = new Date(firstDate)

  if (!secondDate) {
    return `${x.getDate()}.${x.getMonth() + 1}.${
      !excludeYear ? x.getFullYear() : ''
    }`
  } else {
    const y = new Date(secondDate)
    return `${x.getDate()}.${x.getMonth() + 1}${
      x.getFullYear() === y.getFullYear()
        ? ''
        : `.${!excludeYear ? x.getFullYear() : ''}`
    }—${y.getDate()}.${y.getMonth()}.${!excludeYear ? y.getFullYear() : ''}`
  }
}

export const lockScroll = (
  blur?: boolean,
  blurIntensity: string = '20px',
  unlock?: boolean
) => {
  const lock = () => {
    // document.body.style.overflow = 'hidden'
    if (blur) {
      document.getElementById('banner')!.style.filter = `blur(${blurIntensity})`
      document.getElementById(
        'main-wrapper'
      )!.style.filter = `blur(${blurIntensity})`
    }
  }
  const unLock = () => {
    // document.body.style.overflow = 'scroll'
    document.getElementById('banner')!.style.filter = `blur(0px)`
    document.getElementById('main-wrapper')!.style.filter = `blur(0px)`
  }

  if (document.querySelector('main')) {
    unlock ? unLock() : lock()
  }
}

export const exhibitionIsOpen = (
  opening: Date,
  closing: Date,
  tday = new Date()
) => tday >= opening && tday <= closing

const compareUrls = (url: string, altUrl: string | null, compare: string) =>
  url === compare || altUrl === compare

// this has to be reworked to be more ... flexible?
export const bgSetter = ({
  url,
  hasSubmenu,
  alternateLanguage,
  type,
}: {
  url: string
  hasSubmenu: string
  alternateLanguage: string | null
  type?: 'news' | 'exhibition'
}) => {
  if (compareUrls(url, alternateLanguage, '/frettir') || type === 'news') {
    return 'bg--purple'
  } else if (
    compareUrls(url, alternateLanguage, '/syningar') ||
    type === 'exhibition'
  ) {
    return 'bg--gray'
  } else if (
    compareUrls(url, alternateLanguage, '/um-nylo') ||
    hasSubmenu === 'Um Nýló' ||
    hasSubmenu === 'About'
  ) {
    return 'bg--green'
  } else if (
    compareUrls(url, alternateLanguage, '/heimsokn') ||
    hasSubmenu === 'Heimsókn'
  ) {
    return 'bg--yellow'
  } else if (
    compareUrls(url, alternateLanguage, '/safneign') ||
    hasSubmenu === 'Safneign'
  ) {
    return 'bg--pink'
  } else {
    return 'bg--white'
  }
}

export const cleanPathname = (p: string) => `${p.replace('/', '')}`
