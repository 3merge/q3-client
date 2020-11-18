import React from 'react';
import Image from 'gatsby-image';
import { Link } from '@reach/router';
import { Box } from '@material-ui/core';

const Icon = ({ root = '/', src }) => {
  return (
    <Box
      component={Link}
      display="block"
      height={75}
      to={root}
      style={{ margin: '0 auto' }}
      width={75}
    >
      <Image
        fluid={{ src }}
        alt="Logo"
        imgStyle={{ objectFit: 'contain' }}
        style={{ height: '100%', width: '100%' }}
      />
    </Box>
  );
};

export default Icon;
