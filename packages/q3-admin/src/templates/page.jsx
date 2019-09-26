import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { Components } from 'q3-ui';

const { Title } = Components;

const Page = ({ title, children }) => {
  return (
    <>
      <Title title={title} />
      <Container>{children}</Container>
    </>
  );
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Page;
