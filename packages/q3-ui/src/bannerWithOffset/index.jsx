import React from 'react';
import Image from 'gatsby-image';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Wrapper from '../wrapper';

const useStyle = makeStyles(() => ({
  bg: {
    position: 'absolute !important',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contrast: {
    color: '#FFF',
  },
  filter: ({ filter }) => ({
    backgroundColor: filter,
    opacity: 0.7,
  }),
}));

const Offset = ({ children }) => (
  <Box position="relative" mt="-15vh" component="section">
    <Wrapper backgroundColor="transparent">
      <Box px={1}>
        <Paper elevation={1}>{children}</Paper>
      </Box>
    </Wrapper>
  </Box>
);

Offset.propTypes = {
  children: PropTypes.node.isRequired,
};

const BannerWithOffset = ({
  fluid,
  children,
  title,
  subtitle,
  filter,
  bottom,
  top,
}) => {
  const cls = useStyle({
    filter,
  });

  return (
    <Box component="header" position="relative">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        minHeight="57.5vh"
        width="100%"
      >
        <Image
          fluid={fluid}
          className={cls.bg}
          alt={title}
        />
        <Box
          className={cls.filter}
          position="absolute"
          top={0}
          bottom={0}
          right={0}
          left={0}
        />
        <Box
          height="100%"
          py={4}
          position="relative"
          align="center"
          className={cls.contrast}
        >
          {top}
          <Typography
            variant="h1"
            color="inherit"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="body2" color="inherit">
            {subtitle}
          </Typography>
          {bottom}
        </Box>
      </Box>
      {children && <Offset>{children}</Offset>}
    </Box>
  );
};

BannerWithOffset.propTypes = {
  fluid: PropTypes.shape({
    src: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  filter: PropTypes.string,
  top: PropTypes.node,
  bottom: PropTypes.node,
};

BannerWithOffset.defaultProps = {
  filter: 'rgb(2,2,2)',
  top: null,
  bottom: null,
};

export default BannerWithOffset;
