import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import fixture from './__fixtures__';
import BannerWithOffset from '.';

export default {
  title: 'Q3 UI|Components/BannerWithOffset',
};

export const Sample = () => (
  <BannerWithOffset {...fixture}>
    <Box>
      <Typography>
        Offset panel rendered as Child
      </Typography>
    </Box>
  </BannerWithOffset>
);

export const CustomFilterColor = () => (
  <BannerWithOffset {...fixture} filter="rgb(220, 0, 78)" />
);
