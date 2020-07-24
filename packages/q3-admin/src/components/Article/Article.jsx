import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import useGlobalStyle from '../useStyle';
import useStyle from './useStyle';

const Article = ({ asideComponent, children }) => {
  const { view, articleWrapper, section } = useStyle();
  const globalStyle = useGlobalStyle();

  return (
    <Grid
      item
      xs
      zeroMinWidth
      id="detail-article"
      component="article"
    >
      <Grid container className={articleWrapper}>
        {asideComponent}
        <Grid
          xs
          zeroMinWidth
          component="section"
          className={section}
          item
        >
          <Fade in>
            <Paper
              elevation={0}
              className={classnames(
                globalStyle.fillViewportHeight,
                view,
              )}
            >
              {children}
            </Paper>
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
  asideComponent: PropTypes.node,
};

Article.defaultProps = {
  asideComponent: null,
};

export default Article;
