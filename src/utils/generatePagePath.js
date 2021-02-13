module.exports = node => {
  const ENGLISH = node.lang === 'en-us'

  if (node.uid === 'frontpage') {
    return ENGLISH ? '/en' : '/'
  } else {
    return ENGLISH ? `/en${node.url}` : node.url
  }
}
