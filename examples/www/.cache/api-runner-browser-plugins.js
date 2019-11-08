module.exports = [{
      plugin: require('../../../node_modules/gatsby-plugin-canonical-urls/gatsby-browser.js'),
      options: {"plugins":[],"stripQueryString":true,"siteUrl":"https://3merge.ca"},
    },{
      plugin: require('../../../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"short_name":"3merge inc.","start_url":"/","background_color":"#FFF","theme_color":"purple","display":"standalone","name":"3merge inc.","icon":"./src/images/fav.png"},
    },{
      plugin: require('../../../node_modules/gatsby-plugin-material-ui/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../../../packages/gatsby-theme-q3/gatsby-browser.js'),
      options: {"plugins":[],"generateAccountPages":true,"contentfulSpaceID":"nrb6h720sp8g","contentfulAccessToken":"f9e409e0affbc30524edcd752ad308d54558a60205ab2b1f75f603d85608e0d8","brandingColor":"purple","icon":"./src/images/fav.png","title":"3merge inc.","siteUrl":"https://3merge.ca","checkout":true,"guestCheckout":true,"shipping":{"flat":false,"strategy":"Purolator"},"payment":{"strategy":"Bambora"}},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
