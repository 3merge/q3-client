import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import BlogTemplate from 'gatsby-theme-q3/src/components/BlogTemplate';

const BlogDetail = ({ data }) => <BlogTemplate {...data} />;

BlogDetail.propTypes = {
  data: PropTypes.shape(BlogTemplate.propTypes).isRequired,
};

export default BlogDetail;

export const query = graphql`
  query getBlogById(
    $contentful_id: String
    $prev: String
    $next: String
  ) {
    current: contentfulBlog(
      contentful_id: { eq: $contentful_id }
    ) {
      title
      body {
        json
      }
      image {
        title
        fixed(width: 950, height: 400) {
          width
          height
          src
          srcSet
        }
      }
    }

    prev: contentfulBlog(contentful_id: { eq: $prev }) {
      to
      contentful_id
      title
    }

    next: contentfulBlog(contentful_id: { eq: $next }) {
      to
      contentful_id
      title
    }
  }
`;
