require("dotenv").config({
  path: `.env.development`,
})

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "~": "src",
        },
        extensions: [`ts`, `tsx`],
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        // The name of your prismic.io repository. This is required.
        // Example: 'gatsby-source-prismic-test-site' if your prismic.io address
        // is 'gatsby-source-prismic-test-site.prismic.io'.
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,

        // An API access token to your prismic.io repository. This is optional.
        // You can generate an access token in the "API & Security" section of
        // your repository settings. Setting a "Callback URL" is not necessary.
        // The token will be listed under "Permanent access tokens".
        accessToken: process.env.GATSBY_PRISMIC_ACCESS_TOKEN,

        // Set a link resolver function used to process links in your content.
        // Fields with rich text formatting or links to internal content use this
        // function to generate the correct link URL.
        // The document node, field key (i.e. API ID), and field value are
        // provided to the function, as seen below. This allows you to use
        // different link resolver logic for each field if necessary.
        // See: https://prismic.io/docs/javascript/query-the-api/link-resolving
        linkResolver: ({ node, key, value }) => doc => {
          if (doc.type === "page") {
            return `/${doc.id}`
          }
          return `/`
        },
        // Set a list of links to fetch and be made available in your link
        // resolver function.
        // See: https://prismic.io/docs/javascript/query-the-api/fetch-linked-document-fields
        fetchLinks: [
          // Your list of links
        ],

        // Set an HTML serializer function used to process formatted content.
        // Fields with rich text formatting use this function to generate the
        // correct HTML.
        // The document node, field key (i.e. API ID), and field value are
        // provided to the function, as seen below. This allows you to use
        // different HTML serializer logic for each field if necessary.
        // See: https://prismic.io/docs/nodejs/beyond-the-api/html-serializer
        htmlSerializer: ({ node, key, value }) => (
          type,
          element,
          content,
          children
        ) => {
          // Your HTML serializer
        },

        // Provide an object of Prismic custom type JSON schemas to load into
        // Gatsby. This is required.
        schemas: {
          page: require(`./src/schemas/page.json`),
          menu: require(`./src/schemas/menu.json`),
        },

        // Set a default language when fetching documents. The default value is
        // '*' which will fetch all languages.
        // See: https://prismic.io/docs/javascript/query-the-api/query-by-language
        lang: "*",

        // Add the Prismic Toolbar script to the site. Defaults to false.
        // Set to "legacy" if your repository requires the older toolbar script.
        // See: https://prismic.io/docs/rest-api/beyond-the-api/the-preview-feature
        prismicToolbar: true,

        // Set a function to determine if images are downloaded locally and made
        // available for gatsby-transformer-sharp for use with gatsby-image.
        // The document node, field key (i.e. API ID), and field value are
        // provided to the function, as seen below. This allows you to use
        // different logic for each field if necessary.
        // This defaults to always return false.
        shouldDownloadImage: ({ node, key, value }) => {
          // Return true to download the image or false to skip.
        },

        // Provide a default set of Imgix image transformations applied to
        // Imgix-backed gatsby-image fields. These options will override the
        // defaults set by Prismic.
        // See: https://docs.imgix.com/apis/url
        // imageImgixParams: {
        //   auto: "compress,format",
        //   fit: "max",
        //   q: 50,
        // },

        // // Provide a default set of Imgix image transformations applied to
        // // the placeholder images of Imgix-backed gatsby-image fields. These
        // // parameters will be applied over those provided in the above
        // // `imageImgixParams` option.
        // // See: https://docs.imgix.com/apis/url
        // imagePlaceholderImgixParams: {
        //   w: 100,
        //   blur: 15,
        //   q: 50,
        // },

        // // Set the prefix for the filename where type paths for your schemas are
        // // stored. The filename will include the MD5 hash of your schemas after
        // // the prefix.
        // // This defaults to 'prismic-typepaths---${repositoryName}'.
        // typePathsFilenamePrefix: `prismic-typepaths---${process.env.GATSBY_PRISMIC_REPO_NAME}`,
      },
    },
  ],
}
