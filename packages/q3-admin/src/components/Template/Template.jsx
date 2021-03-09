import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import useStyle from '../useStyle';

const Template = ({ children }) => {
  const cls = useStyle();

  return (
    <Container
      maxWidth="xl"
      className={cls.fillViewportHeight}
    >
      {children}
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
