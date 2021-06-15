const { defaultLanguage, defaultFrontpageTag } = require('../../prismic.config')

/* The Link Resolver
* This function will be used to generate links to Prismic documents
As your project grows, you should update this function according to your routes */

const linkResolver = doc => {
  const properties = doc._meta || doc

  const isFrontpage = doc.tags && doc.tags.indexOf(defaultFrontpageTag) !== -1

  if (isFrontpage) {
    return properties.lang === defaultLanguage ? '/' : `/${properties.lang}`
  } else if (doc.type === 'exhibition') {
    return properties.lang === defaultLanguage
      ? `/syningar/${properties.uid}`
      : `/${properties.lang}/exhibitions/${properties.uid}`
  } else if (doc.type === 'event') {
    return properties.lang === defaultLanguage
      ? `/vidburdir/${properties.uid}`
      : `/${properties.lang}/events/${properties.uid}`
  } else if (doc.type === 'news') {
    return properties.lang === defaultLanguage
      ? `/frettir/${properties.uid}`
      : `/${properties.lang}/news/${properties.uid}`
  } else {
    return properties.lang === defaultLanguage
      ? `/${properties.uid}`
      : `/${properties.lang}/${properties.uid}`
  }
}

module.exports = linkResolver
