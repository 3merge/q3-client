import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import useGlobalStyle from '../useStyle';

const ArticleContainer = ({ className, children }) => {
  const globalStyle = useGlobalStyle();

  return (
    <Fade in>
      <Box
        className={classnames(
          globalStyle.fillViewportHeight,
          className,
        )}
      >
        {children}
      </Box>
    </Fade>
  );
};

ArticleContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
  className: PropTypes.string,
};

ArticleContainer.defaultProps = {
  className: '',
};

export default ArticleContainer;
