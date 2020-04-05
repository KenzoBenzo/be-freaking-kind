require(`dotenv`).config();

module.exports = {
  siteMetadata: {
    title: `Be Freaking Kind store`,
    description: `A t-shirt store encouraging people to be kind.`,
    author: `Makenna Smutz <makennasmutz@gmail.com>`,
    siteUrl: `https://befreakingkind.com`,
    ogImage: ``,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `GraphCMS`,
        fieldName: `cms`,
        url: process.env.GRAPHCMS_ENDPOINT,
        headers: {
          Authorization: `Bearer ${process.env.GRAPHCMS_QUERY_TOKEN}`,
        },
      },
    },
    {
      resolve: `gatsby-source-printful`,
      options: {
        apiKey: process.env.PRINTFUL_API_KEY,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `be-freaking-kind`,
        start_url: `/`,
        theme_color: `#FF304F`,
        icon: `src/static/BFK-FAVICON.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: process.env.FACEBOOK_PIXEL_ID,
      },
    },
  ],
};
