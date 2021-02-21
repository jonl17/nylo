const { defaultLanguage, defaultFrontpageTag } = require('../../prismic.config')

/* The Link Resolver
* This function will be used to generate links to Prismic documents
As your project grows, you should update this function according to your routes */

const linkResolver = doc => {
  const properties = doc._meta || doc

  const isFrontpage = doc.tags && doc.tags.indexOf(defaultFrontpageTag) !== -1

  if (isFrontpage) {
    return properties.lang === defaultLanguage ? '/' : `/${properties.lang}`
  } else {
    return properties.lang === defaultLanguage
      ? `/${properties.uid}`
      : `/${properties.lang}/${properties.uid}`
  }
}

module.exports = linkResolver
