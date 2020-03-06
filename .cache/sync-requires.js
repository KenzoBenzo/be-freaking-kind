const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-product-page-js": hot(preferDefault(require("/Users/makennasmutz/Documents/GitHub/be-freaking-kind/src/templates/ProductPage.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/makennasmutz/Documents/GitHub/be-freaking-kind/.cache/dev-404-page.js"))),
  "component---src-pages-checkout-jsx": hot(preferDefault(require("/Users/makennasmutz/Documents/GitHub/be-freaking-kind/src/pages/checkout.jsx"))),
  "component---src-pages-index-jsx": hot(preferDefault(require("/Users/makennasmutz/Documents/GitHub/be-freaking-kind/src/pages/index.jsx"))),
  "component---src-pages-success-jsx": hot(preferDefault(require("/Users/makennasmutz/Documents/GitHub/be-freaking-kind/src/pages/success.jsx")))
}

