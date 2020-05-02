import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Loader } from 'q3-admin/lib/components';
import { useStaticQuery, graphql } from 'gatsby';
import SearchEngine from './SearchEngine';

const AdminLoader = ({ children }) => {
  const data = useStaticQuery(graphql`
    query appTitleState {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <SearchEngine
        title={get(
          data,
          'site.siteMetadata.title',
          'Gatsby Q3',
        )}
      />
      <Loader />
      {children}
    </>
  );
};

AdminLoader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLoader;
