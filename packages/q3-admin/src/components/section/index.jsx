import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useHeight from '../sidebar/useHeight';
import useStyle from '../sidebar/useStyle';

export const getSectionSize = (fn) =>
  typeof fn === 'function'
    ? {
        lg: 8,
        md: 12,
        sm: 12,
        xs: 12,
      }
    : {
        xs: 12,
      };

const Section = ({ fetching, children, renderSidebar }) => {
  const height = useHeight();
  const { sectionWidth } = useStyle();

  return (
    <Box id="detail-article" component="article">
      <Grid container>
        <Grid
          style={{ flex: 1 }}
          className={sectionWidth}
          component="section"
          item
        >
          <Box
            py={3}
            height={height}
            style={{ height, overflowY: 'auto' }}
          >
            <Container maxWidth="xl">
              {fetching ? <CircularProgress /> : children}
            </Container>
          </Box>
        </Grid>
        {renderSidebar && !fetching
          ? renderSidebar()
          : null}
      </Grid>
    </Box>
  );
};

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
    PropTypes.object,
  ]),
  fetching: PropTypes.bool,
  renderSidebar: PropTypes.func,
};

Section.defaultProps = {
  fetching: false,
  renderSidebar: null,
  children: null,
};

export default Section;
