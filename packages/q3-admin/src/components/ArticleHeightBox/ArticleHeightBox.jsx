import React from 'react';
import { Box } from '@material-ui/core';
import useHeightRef from '../../hooks/useHeightRef';

// eslint-disable-next-line
const ArticleHeightBox = ({ children }) => (
  <Box ref={useHeightRef()}>{children}</Box>
);

ArticleHeightBox.propTypes = {};
ArticleHeightBox.defaultProps = {};

export default ArticleHeightBox;
