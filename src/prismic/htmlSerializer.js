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
    return (
      '<a target="_blank" class="secondaryAnchorActive" href="' +
      element.data.url +
      '">' +
      content +
      "</a>"
    )
  }

  if (element.type == "heading1") {
    return '<h1 class="hdln--1">' + element.text + "</h1>"
  }

  // Return null to stick with the default behavior
  return null
}

module.exports.htmlSerializer = htmlSerializer
