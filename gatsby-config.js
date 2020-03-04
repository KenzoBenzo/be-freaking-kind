require(`dotenv`).config();

module.exports = {
  siteMetadata: {
    title: `Be Freaking Kind store`,
    description: `A t-shirt store encouraging people to be kind.`,
    siteUrl: `https://befreakingkind.com`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-react-svg',
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
  ],
};
