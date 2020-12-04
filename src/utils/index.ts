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

export const formatExhibitionPeriod = (
  opening: string,
  closing: string,
  o = new Date(opening),
  c = new Date(closing)
) => {
  return `${o.getDate()}.${o.getMonth() + 1}${
    o.getFullYear() === c.getFullYear() ? '' : `.${o.getFullYear()}`
  }—${c.getDate()}.${c.getMonth()}.${c.getFullYear()}`
}
