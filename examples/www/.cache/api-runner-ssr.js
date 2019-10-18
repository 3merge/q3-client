var plugins = [{
      plugin: require('C:/Users/ibber/Documents/Q3-Client/node_modules/gatsby-plugin-canonical-urls/gatsby-ssr'),
      options: {"plugins":[],"stripQueryString":true,"siteUrl":"https://3merge.ca"},
    },{
      plugin: require('C:/Users/ibber/Documents/Q3-Client/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"short_name":"3merge inc.","start_url":"/","background_color":"#FFF","theme_color":"purple","display":"standalone","name":"3merge inc.","icon":"./src/images/fav.png"},
    },{
      plugin: require('C:/Users/ibber/Documents/Q3-Client/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/Users/ibber/Documents/Q3-Client/node_modules/gatsby-plugin-polyfill-io/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/Users/ibber/Documents/Q3-Client/node_modules/gatsby-plugin-material-ui/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/Users/ibber/Documents/Q3-Client/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/Users/ibber/Documents/Q3-Client/packages/gatsby-theme-q3/gatsby-ssr'),
      options: {"plugins":[],"generateAccountPages":true,"contentfulSpaceID":"nrb6h720sp8g","contentfulAccessToken":"f9e409e0affbc30524edcd752ad308d54558a60205ab2b1f75f603d85608e0d8","brandingColor":"purple","icon":"./src/images/fav.png","title":"3merge inc.","siteUrl":"https://3merge.ca"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
