import React from 'react';
import Image from 'gatsby-image';
import { Link } from '@reach/router';
import { Box } from '@material-ui/core';

const Block = ({ root = '/', src }) => (
  <Box
    component={Link}
    display="block"
    height="100%"
    to={root}
    width="100%"
  >
    <Image
      fluid={{ src }}
      alt="Logo"
      imgStyle={{ objectFit: 'contain' }}
      style={{ height: '100%', width: '100%' }}
    />
  </Box>
);

export default Block;
