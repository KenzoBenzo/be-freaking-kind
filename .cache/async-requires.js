// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-templates-product-page-js": () => import("../src/templates/ProductPage.js" /* webpackChunkName: "component---src-templates-product-page-js" */),
  "component---cache-dev-404-page-js": () => import("dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-checkout-jsx": () => import("../src/pages/checkout.jsx" /* webpackChunkName: "component---src-pages-checkout-jsx" */),
  "component---src-pages-index-jsx": () => import("../src/pages/index.jsx" /* webpackChunkName: "component---src-pages-index-jsx" */),
  "component---src-pages-success-jsx": () => import("../src/pages/success.jsx" /* webpackChunkName: "component---src-pages-success-jsx" */)
}

