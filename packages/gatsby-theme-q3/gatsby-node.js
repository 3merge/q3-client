const generateTemplatesAsPages = [
  {
    templatePath: './src/templates/contact.jsx',
    path: '/contact',
  },
  {
    templatePath: './src/templates/login.jsx',
    path: '/login',
  },
  {
    templatePath: './src/templates/password-reset.jsx',
    path: '/password-reset',
  },
  {
    templatePath: './src/templates/verify.jsx',
    path: '/verify',
  },
  {
    templatePath: './src/templates/reverify.jsx',
    path: '/reverify',
  },
];

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  generateTemplatesAsPages.map(({ templatePath, path }) =>
    createPage({
      component: require.resolve(templatePath),
      path,
    }),
  );
};
