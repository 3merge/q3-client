import React from 'react';
import { Box, Fade } from '@material-ui/core';
import useHeightRef from '../../hooks/useHeightRef';

// eslint-disable-next-line
const ArticleHeightBox = ({ children }) => (
  <Fade in timeout={250}>
    <Box ref={useHeightRef()}>{children}</Box>
  </Fade>
);

ArticleHeightBox.propTypes = {};
ArticleHeightBox.defaultProps = {};

export default ArticleHeightBox;
