import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Image from 'gatsby-image';

const Side = ({
  children,
  palette,
  renderFooter,
  renderHeader,
}) => (
  <Box
    bgcolor="background.default"
    component="section"
    position="relative"
    height="100%"
    width="100%"
  >
    <Box
      bgcolor={`${palette}.main`}
      color={`${palette}.contrastText`}
      height="100%"
    >
      <Image
        aria-hidden
        fluid={{
          src: 'https://source.unsplash.com/daily?nature',
        }}
        style={{
          height: '100%',
          opacity: 0.1,
          position: 'absolute',
          width: '100%',
        }}
      />
      {renderHeader && (
        <Box
          component="header"
          height={75}
          position="relative"
          width="100%"
        >
          <Box
            bgcolor={`${palette}.dark`}
            height="100%"
            position="absolute"
            style={{ opacity: 0.65 }}
            width="100%"
          />
          {renderHeader}
        </Box>
      )}
      {<Box component="nav">{children}</Box>}
      {renderFooter && (
        <Box
          bottom={0}
          component="footer"
          p={1}
          position="absolute"
          width="100%"
        >
          {renderFooter}
        </Box>
      )}
    </Box>
  </Box>
);

Side.defaultProps = {
  palette: 'header',
  renderFooter: null,
  renderHeader: null,
};

Side.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
  palette: PropTypes.string,
  renderFooter: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]),
  renderHeader: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]),
};

export default Side;
