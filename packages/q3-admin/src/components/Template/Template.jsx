import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import useStyle from '../useStyle';

const Template = ({ children }) => {
  const cls = useStyle();

  return (
    <Container
      maxWidth="xl"
      className={cls.fillViewportHeight}
    >
      <Box my={2}>{children}</Box>
    </Container>
  );
};

Template.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]),
};

Template.defaultProps = {
  children: null,
};

export default Template;
