module.exports = (defaultLang, defaultFrontpageTag) => page => {
  if (!page.lang && !page.uid) {
    return
  }

  const lang = page.lang.substring(0, 2)
  const isFront = page.tags && page.tags.indexOf(defaultFrontpageTag) !== -1
  const prefix = lang === defaultLang ? '' : `/${lang}`

  const slug = isFront ? '/' : `/${page.uid}`

  return `${prefix}${slug}`
}
