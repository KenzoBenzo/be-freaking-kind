const createResolvers = ({
  actions: { createNode },
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const resolvers = {
    GraphCMS_Product: {
      printfulProduct: {
        type: `PrintfulProduct`,
        resolve: ({ printfulProductId }, args, context, info) => {
          return context.nodeModel.getNodeById({
            id: printfulProductId,
            type: `PrintfulProduct`,
          });
        },
      },
    },
    PrintfulVariant: {
      formattedPrice: {
        type: `String!`,
        resolve: ({ retail_price }, args, context, info) => {
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(retail_price / 100);
        },
      },
      splitName: {
        type: `String!`,
        resolve: ({ name }, args, context, info) => {
          const [, splitVariantName] = name.split(" - ");

          return splitVariantName ? splitVariantName : name;
        },
      },
    },
  };

  createResolvers(resolvers);
};

module.exports = createResolvers;
