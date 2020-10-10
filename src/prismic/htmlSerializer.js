var htmlSerializer = function (element, content) {
  // Don't wrap images in a <p> tag
  if (element.type == "image") {
    return (
      '<img class="image-class" src="' +
      element.url +
      '" alt="' +
      element.alt +
      '">'
    )
  }

  // Add a class to hyperlinks
  if (element.type == "hyperlink") {
    return '<a class="some-link" href="' + element.url + '">' + content + "</a>"
  }

  // Return null to stick with the default behavior
  return null
}

module.exports.htmlSerializer = htmlSerializer
