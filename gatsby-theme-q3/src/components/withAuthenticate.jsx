import React from 'react';
import { get } from 'lodash';
import { useStaticQuery, graphql } from 'gatsby';
import { authenticate } from './utils';

export default (Component) => (props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          appDirectory
        }
      }
    }
  `);

  return (
    <Component
      {...props}
      authenticate={(formValues) =>
        authenticate(
          formValues,
          get(data, 'site.siteMetadata.appDirectory', '/'),
        )
      }
    />
  );
};
