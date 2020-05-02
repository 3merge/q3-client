const {
  ArchiveBuilder,
  slugType,
} = require('gatsby-theme-q3/helpers');

const BLOG_DIRECTORY = 'blog';

exports.createSchemaCustomization = ({ actions }) => {
  slugType(BLOG_DIRECTORY, 'ContentfulBlog', actions);
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  graphql(`
    query {
      allContentfulBlog {
        nodes {
          contentful_id
          to
        }
      }
    }
  `).then(
    ArchiveBuilder({
      archiveComponentRelativePath:
        './src/templates/Blog.jsx',
      detailComponentRelativePath:
        './src/templates/BlogDetail.jsx',
      nodesKeyName: 'allContentfulBlog',
      slug: BLOG_DIRECTORY,
      createPage,
    }),
  );
};
