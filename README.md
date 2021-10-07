<p>&nbsp;&nbsp;
  <img alt="3merge" src="https://github.com/3merge/q3-client/blob/master/logo.png" width="22" />
</p>

# Q3 client

Most Q3 projects will use
[Gatsby JS](https://www.gatsbyjs.com/) for building and
serving its production files. That’s why we’ve created the
gatsby-theme-q3 project, which pre-configures lots of the
packages in this workspace so that you can begin building
your app quickly.

If you’re already up-and-running, scroll to the bottom of
this how-to for more in-depth documentation per package.

## Getting started

This guide is going to show you how to setup a Q3 admin
portal. Since this is a headless workspace, you’ll need the
API, which you must build and deploy separately. For more
information,
[visit the Q3 API repository](https://github.com/3merge/q3-api).

### Dependencies

Q3 has a lot of dependencies. The biggest ones include
Material UI, Reach Router and I18Next. Visit our example
app’s package.json file for a full
[list with recommended versions](https://github.com/3merge/q3-client/blob/master/example/package.json).

### Configurations

#### Environment variables

There's only a few environment variables that you need to
define.

| Name                      | Description                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `GATSBY_APP_BASE_URL*`    | The URL of your Q3 API. This will most definitely change between local development, hosted development and production. |
| `URL*`                    | The production URL for this app. It's referenced in the manifest file, but has very little impact on development.      |
| `CONTENTFUL_SPACE_ID`     | When used Contentful as a data source, you'll need to provide a space ID.                                              |
| `CONTENTFUL_ACCESS_TOKEN` | Contentful requires an access token to connect to a space.                                                             |

#### Folder structure

The tree below will represent the end state for this
tutorial. Note that certain decisions outlined below, such
as a folder per component, is a matter of preference. That
said, the placement of `locale`, `static` and `theme.js` is
critical for Q3's scripts to autoload certain
configurations. As well, you'll note the presence of Gatsby
component shadows, which we leverage for customize public
pages like login.

```
📦 server
📦 client
 ┣ 📂 locale
 ┃ ┣ 📂 en
 ┃ ┃ ┣ 📜 descriptions.json
 ┃ ┃ ┣ 📜 helpers.json
 ┃ ┃ ┣ 📜 labels.json
 ┃ ┃ ┗ 📜 titles.json
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 Users
 ┃ ┃ ┃ ┣ 📜 index.js
 ┃ ┃ ┃ ┣ 📜 Users.jsx
 ┃ ┃ ┃ ┣ 📜 Users.test.jsx
 ┃ ┃ ┣ 📂 UsersAdd
 ┃ ┃ ┣ 📂 UsersGeneral
 ┃ ┃ ┗ 📜 index.js
 ┃ ┣ 📂 gatsby-theme-q3
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┃ ┣ 📜 login.jsx
 ┃ ┃ ┃ ┣ 📜 password-change.jsx
 ┃ ┃ ┃ ┣ 📜 password-reset.jsx
 ┃ ┃ ┃ ┣ 📜 reverify.jsx
 ┃ ┃ ┃ ┗ 📜 verify.jsx
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 app.jsx
 ┃ ┃ ┗ 📜 index.jsx
 ┣ 📂 static
 ┃ ┣ 📜 favicon.png
 ┃ ┗ 📜 logo.png
 ┣ 📂 tests
 ┣ 📜 gatsby-browser.js
 ┣ 📜 gatsby-config.js
 ┣ 📜 gatsby-node.js
 ┣ 📜 gatsby-ssr.js
 ┣ 📜 theme.js
 ┗ 📜 gatsby-ssr.js
```

#### Gatsby files

We're not going to cover why the `gatsby-*` files exist. In
fact, the browser, node and SSR variants are sometimes not
even used and just kept blank. That said, the
`gatsby-config.js` file is very important, but it's also
minimal.

Using our setup helper, you can get the build process
wrapped up in just a few lines. Essentially, you just need
to populate some meta data

```javascript
// gatsby-config.js

const config = require('gatsby-theme-q3/helpers').setup(
  {
    appDirectory: '/app',
    author: '3merge',
    brand: '3merge',
    description: '',
    favicon: '/favicon.jpg',
    logo: '/logo.png',
    title: 'Q3 Example',
    siteUrl: 'https://3merge.ca/',
  },
  [], // any plugins you'd like to register
);

module.exports = config;
```

Some of Q3 admin's props will pick up on these settings --
namely, the title, logo and directory. **_In most cases, the
directory will remain `/app`, as that's the file under
`pages` where we'll insert the magic._**

The code below is deceivingly simple; it delegates ton of
responsible to Q3 for setting up profiles, routes,
permissions, notifications and more. It does this so that
you can focus on what matters: the individual collections
that you'd like to interact with. Since all Q3 API's come
out-of-the-box with users, we're starting there.

```javascript
// app.jsx
import React from 'react';
import { AdminRouter } from 'gatsby-theme-q3/src/components';
import { Dashboard, Users } from '../components';

export default () => (
  <AdminRouter
    AdminProps={{
      AppProps: {
        customRoutes: [<Dashboard path="/" />],
        pages: [Users].flat(),
      },
    }}
  />
);
```

## Packages

<ul>
  <li>
    <a href="./packages/q3-admin">🧰 Admin Docs</a>
  </li>
  <li>
    <a href="./packages/q3-ui-audit">🔒 Audit Docs</a>
  </li>
  <li>
    <a href="./packages/q3-ui-charts">📊 Charts Docs</a>
  </li>
  <li>
    <a href="./packages/q3-ui-comments">🙊 Comments Docs</a>
  </li>
  <li>
    <a href="./packages/q3-ui-emaileditor">✉️ Email Editor Docs</a>
  </li>
  <li>
    <a href="./packages/q3-ui-filemanager">🗃️ File Manager Docs</a>
  </li>
  <li>
    <a href="./packages/q3-ui-filemanager">⌨️ Form Docs</a>
  </li>
  <li>
    <a href="./packages/q3-ui-helpers">🆘 Helpers Docs</a>
  </li>
  <li>
    <a href="./packages/q3-ui-rte"> 📝 Rich Text</a>
  </li>
</ul>
