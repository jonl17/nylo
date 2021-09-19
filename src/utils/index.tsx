import slugify from 'slugify'
import { ExhibitionInterface } from './resolvers'
import { useLayoutEffect } from 'react'

export const generateURLfromWords = (strings: string[]) => {
  return strings
    .map(s => slugify(`${s}`, { lower: true }))
    .join()
    .replace(',', '/')
}

export const multipleArtistsHandler = (
  artist: string = '',
  text: string = ''
) => {
  if (!artist) return artist
  return artist.split(/,| og /).length > 3 ? text : artist
}

export const formatDate = (
  firstDate: string,
  secondDate?: string,
  excludeYear?: boolean
) => {
  const firstD = new Date(firstDate)

  const locale = 'en-GB'

  const firstFormattedDateFull = Intl.DateTimeFormat(locale)
    .format(firstD)
    .replace(/\//g, '.')
  const firstFormattedDateShort = firstFormattedDateFull.replace(
    `.${firstD.getFullYear()}`,
    ''
  )

  if (excludeYear) {
    return firstFormattedDateShort
  }

  if (!secondDate) {
    return firstFormattedDateFull
  } else {
    const secondD = new Date(secondDate)
    const secondFormattedDateFull = Intl.DateTimeFormat(locale)
      .format(secondD)
      .replace(/\//g, '.')

    if (secondD.getFullYear() === firstD.getFullYear()) {
      return firstFormattedDateShort + '—' + secondFormattedDateFull
    } else {
      return firstFormattedDateFull + '—' + secondFormattedDateFull
    }
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

export interface ExhibitionGroup {
  status: string
  exhibitions: ExhibitionInterface[]
}

export const groupExhibitionsByDate = (exhibitions: ExhibitionInterface[]) => {
  // Liðnar / Past yfirstandandi / Current og Framundan / upcoming

  let open: ExhibitionGroup = { status: 'Current', exhibitions: [] }
  let upcoming: ExhibitionGroup = { status: 'Upcoming', exhibitions: [] }
  let past: ExhibitionGroup = { status: 'Past', exhibitions: [] }

  exhibitions.map(node => {
    // if it's open
    if (exhibitionIsOpen(new Date(node.opening), new Date(node.closing))) {
      open.exhibitions.push(node)
    } else if (new Date(node.opening) > new Date()) {
      upcoming.exhibitions.push(node)
    } else {
      past.exhibitions.push(node)
    }
  })

  return { upcoming, open, past }
}

const daysoftheweek = ['Sun', 'Mán', 'Þrið', 'Mið', 'Fimt', 'Föst', 'Laug']

export const openNow = (
  day: { from: string; to: string },
  time: { from: number; to: number }
): boolean => {
  const d = new Date()
  const weekdayIdx = d.getDay()
  const hour = d.getHours()

  const firstDayIdx = daysoftheweek.indexOf(day.from)
  const lastdayIdx = daysoftheweek.indexOf(day.to)

  let openDays = []
  if (firstDayIdx > lastdayIdx) {
    for (let i = firstDayIdx; i < daysoftheweek.length; i++) {
      openDays.push(daysoftheweek[i])
    }
    for (let i = lastdayIdx; i >= 0; i--) {
      openDays.push(daysoftheweek[i])
    }
  } else if (lastdayIdx > firstDayIdx) {
    for (let i = firstDayIdx; i < lastdayIdx; i++) {
      openDays.push(daysoftheweek[i])
    }
    for (let i = lastdayIdx; i > firstDayIdx; i--) {
      openDays.push(daysoftheweek[i])
    }
  } else {
    openDays.push(daysoftheweek[firstDayIdx])
  }
  if (
    openDays.includes(daysoftheweek[weekdayIdx]) &&
    hour >= time.from &&
    hour < time.to
  )
    return true
  else return false
}

export const onlyUnique = (value: number, index: number, self: number[]) => {
  return self.indexOf(value) === index
}

export const useLockBody = (condition: boolean) => {
  useLayoutEffect(() => {
    if (condition) {
      // Prevent scrolling on mount
      document.body.style.overflow = 'hidden'
      // Re-enable scrolling when component unmounts
      return () => {
        document.body.style.overflow = 'visible'
      }
    }
  }, [condition]) // Empty array ensures effect is only run on mount and unmount
}
