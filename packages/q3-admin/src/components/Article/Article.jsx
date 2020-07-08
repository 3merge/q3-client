import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyle from './useStyle';

const Article = ({ asideComponent, children }) => {
  const {
    view,
    articleWrapper,
    section,
    viewport,
  } = useStyle();

  return (
    <Grid
      item
      xs
      zeroMinWidth
      id="detail-article"
      component="article"
      className={viewport}
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
          <Paper className={view} elevation={0}>
            {children}
          </Paper>
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
