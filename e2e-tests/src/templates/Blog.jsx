import React from 'react';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import BlogArchiveTemplate from 'gatsby-theme-q3/src/components/BlogArchiveTemplate';
import Pagination from '@material-ui/lab/Pagination';

const BlogArchive = ({ data, pageContext }) => (
  <BlogArchiveTemplate
    blogs={data.allContentfulBlog.nodes}
    dir="blog"
    {...pageContext}
  />
);

BlogArchive.propTypes = {
  data: PropTypes.shape({
    allContentfulBlog: PropTypes.shape({
      nodes: BlogArchiveTemplate.propTypes,
    }),
  }).isRequired,
};

export default BlogArchive;

export const query = graphql`
  query getBlogByPage($limit: Int, $skip: Int) {
    allContentfulBlog(limit: $limit, skip: $skip) {
      nodes {
        title
        description {
          description
        }
        to
        image {
          title
          fixed(width: 450, height: 400) {
            src
          }
        }
      }
    }
  }
`;
