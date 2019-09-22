import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { Title, SearchBar } from '../../components';

const PageLayout = ({ children, title, showSearch }) => (
  <>
    {showSearch && <SearchBar />}
    <Title title={title} />
    <Container>{children}</Container>
  </>
);

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  showSearch: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

PageLayout.defaultProps = {
  showSearch: true,
};

export default PageLayout;
