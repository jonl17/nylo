require('dotenv').config({
  path: `.env.development`,
})

const { PRISMIC_REPO_NAME, PRISMIC_ACCESS_TOKEN } = process.env

module.exports = {
  prismicRepo: PRISMIC_REPO_NAME,
  accessToken: PRISMIC_ACCESS_TOKEN,
  defaultLanguage: 'is',
  langs: ['is', 'en-us'],
  defaultFrontpageTag: 'FRONTPAGE',
}
