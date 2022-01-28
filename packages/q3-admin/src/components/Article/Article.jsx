import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import useGlobalStyle from '../useStyle';
import useStyle from './useStyle';

const Article = ({ children }) => {
  const globalStyle = useGlobalStyle();
  const { view, articleWrapper, section } = useStyle({});

  return (
    <Grid
      item
      xs
      zeroMinWidth
      id="detail-article"
      component="article"
    >
      <Grid container className={articleWrapper}>
        <Grid
          xs
          zeroMinWidth
          component="section"
          className={section}
          item
        >
          <Fade in>
            <Box
              className={classnames(
                globalStyle.fillViewportHeight,
                view,
              )}
            >
              {children}
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </Grid>
  );
};

Article.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
};

Article.defaultProps = {};

export default Article;
