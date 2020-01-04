import React from 'react';
import { graphql } from 'gatsby';
import { renderJSON } from 'gatsby-theme-q3';

const Content = ({ data: { contentfulAttribute } }) => (
  <div>{renderJSON(contentfulAttribute.body.json)}</div>
);

export default Content;

export const query = graphql`
  {
    contentfulAttribute(
      contentful_id: { eq: "onkg0m6R2RIqMzIcXuLBv" }
    ) {
      body {
        json
      }
    }
  }
`;
