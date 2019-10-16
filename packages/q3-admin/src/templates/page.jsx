import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Header from 'q3-ui/header';

const Page = ({ title, children }) => {
  return (
    <>
      <Header name={title} />
      <Container>{children}</Container>
    </>
  );
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Page;
