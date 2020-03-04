const createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      cms: { products }
    }
  } = await graphql(`
    {
      cms {
        products {
          id
        }
      }
    }
  `);

  products.forEach(({ id }) => {
    createPage({
      path: `/products/${id}`,
      component: require.resolve(`../../templates/ProductPage.js`),
      context: { id }
    });
  });
};

module.exports = createPages;
