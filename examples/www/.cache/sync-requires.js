const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("C:\\Users\\ibber\\Documents\\Q3-Client\\examples\\www\\.cache\\dev-404-page.js"))),
  "component---src-pages-index-jsx": hot(preferDefault(require("C:\\Users\\ibber\\Documents\\Q3-Client\\examples\\www\\src\\pages\\index.jsx"))),
  "component---src-pages-about-jsx": hot(preferDefault(require("C:\\Users\\ibber\\Documents\\Q3-Client\\examples\\www\\src\\pages\\about.jsx"))),
  "component---src-pages-example-jsx": hot(preferDefault(require("C:\\Users\\ibber\\Documents\\Q3-Client\\examples\\www\\src\\pages\\example.jsx")))
}

