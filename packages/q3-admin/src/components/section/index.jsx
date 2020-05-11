import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyle from '../sidebar/useStyle';

const Section = ({
  renderInside,
  renderOutside,
  ...rest
}) => {
  const { articleBox, sectionWidth } = useStyle(rest);

  return (
    <Paper id="detail-article" component="article">
      <Grid container>
        {renderOutside}
        <Grid
          xs
          zeroMinWidth
          className={classnames(sectionWidth, articleBox)}
          component="section"
          item
        >
          {renderInside}
        </Grid>
      </Grid>
    </Paper>
  );
};

Section.propTypes = {
  renderInside: PropTypes.node.isRequired,
  renderOutside: PropTypes.node.isRequired,
};

export default Section;
