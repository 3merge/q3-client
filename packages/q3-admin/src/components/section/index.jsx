import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { browser } from 'q3-ui-helpers';
import useStyle from '../sidebar/useStyle';

const Section = ({
  renderInside,
  renderOutside,
  renderTop,
  ...rest
}) => {
  const {
    view,
    articleBox,
    sectionWidth,
    articleWrapper,
  } = useStyle(rest);

  React.useEffect(() => {
    if (!browser.isBrowserReady()) return;

    function setViewportUnit() {
      document
        .querySelector(':root')
        .style.setProperty(
          '--vh',
          `${window.innerHeight / 100}px`,
        );
    }

    window.addEventListener('resize', setViewportUnit);
    setViewportUnit();
  }, []);

  return (
    <Box id="detail-article" component="article">
      <Grid container className={articleWrapper}>
        {renderOutside}
        <Grid
          xs
          zeroMinWidth
          className={classnames(sectionWidth, articleBox)}
          component="section"
          item
        >
          <Paper className={view} elevation={0}>
            <Box style={{ backgroundColor: '#FFF' }}>
              {renderInside}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

Section.propTypes = {
  renderInside: PropTypes.node.isRequired,
  renderOutside: PropTypes.node.isRequired,
};

export default Section;
