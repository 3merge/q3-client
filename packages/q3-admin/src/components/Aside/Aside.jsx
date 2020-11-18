import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Image from 'gatsby-image';

const Side = ({ children, renderFooter, renderHeader }) => (
  <Hidden mdDown>
    <Box
      bgcolor="background.default"
      component="section"
      position="relative"
      height="100%"
      width="100%"
    >
      <Box
        bgcolor="header.main"
        color="header.contrastText"
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
              bgcolor="header.dark"
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
          <Box component="footer">{renderFooter}</Box>
        )}
      </Box>
    </Box>
  </Hidden>
);

Side.defaultProps = {
  renderFooter: null,
  renderHeader: null,
};

Side.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
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
