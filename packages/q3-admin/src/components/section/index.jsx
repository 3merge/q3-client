import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useHeight from '../sidebar/useHeight';
import useStyle from '../sidebar/useStyle';

const Section = ({
  renderInside,
  renderOutside,
  ...rest
}) => {
  const height = useHeight();
  const { articleBox, sectionWidth } = useStyle(rest);

  return (
    <Box id="detail-article" component="article">
      <Grid container>
        <Grid
          xs
          zeroMinWidth
          className={classnames(sectionWidth, articleBox)}
          component="section"
          item
        >
          <Box height={height}>
            <Box px={1} py={1} pb={4}>
              <Container maxWidth="xl" disableGutters>
                {renderInside}
              </Container>
            </Box>
          </Box>
        </Grid>
        {renderOutside}
      </Grid>
    </Box>
  );
};

Section.propTypes = {
  renderInside: PropTypes.node.isRequired,
  renderOutside: PropTypes.node.isRequired,
};

export default Section;
