import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Image from 'gatsby-image';
import { Avatar } from 'q3-ui-filemanager';
import { usePhoto } from 'q3-hooked';

const Hero = () => {
  const { src, ...photo } = usePhoto();

  return (
    <Box position="relative">
      <Image
        aria-hidden
        fluid={{ src }}
        style={{
          height: 375,
        }}
      />
      <Box position="absolute" top="1rem" right="1rem">
        <Avatar {...photo} />
      </Box>
    </Box>
  );
};

export default Hero;
