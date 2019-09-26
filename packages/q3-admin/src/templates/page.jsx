import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { Components } from 'q3-ui';

const { Header } = Components;

const Page = ({ title, children }) => {
  return (
    <>
      <Header name={title} breadcrumbs />
      <Container>{children}</Container>
    </>
  );
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Page;
