import React from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import useStyle from '../useStyle';

const Template = ({ children, muted }) => {
  const cls = useStyle();

  return (
    <Box className={muted ? cls.muted : cls.light}>
      <Hidden mdDown>
        <Box style={{ height: 65 }} />
      </Hidden>
      <Container
        maxWidth="xl"
        className={cls.fillViewportHeight}
      >
        {children}
      </Container>
    </Box>
  );
};

Template.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]),
  muted: PropTypes.bool,
};

Template.defaultProps = {
  children: null,
  muted: false,
};

export default Template;
