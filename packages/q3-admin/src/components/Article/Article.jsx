import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ArticleContainer from '../ArticleContainer';
import useStyle from './useStyle';

const Article = ({ asideComponent, children }) => {
  const { view, articleWrapper, section } = useStyle({
    hasAside: Boolean(asideComponent),
  });

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
          <ArticleContainer className={view}>
            {children}
          </ArticleContainer>
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
