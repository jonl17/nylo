export const linkResolver = doc => {
  if (doc.type === "page") {
    return `/${doc.id}`
  }

  return `/`
}
