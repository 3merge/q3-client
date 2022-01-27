import React from 'react';
import { Avatar } from 'q3-ui-filemanager';
import { Box } from '@material-ui/core';
import { useAppContext } from '../../hooks';
import { Dispatcher, Store } from '../state';
import FeaturedPhoto from '../FeaturedPhoto';

export const DetailFeaturedPhoto = () => {
  const { data } = React.useContext(Store);
  const { patch } = React.useContext(Dispatcher);

  const { can } = useAppContext({
    picture: (
      <Box mr={1}>
        <FeaturedPhoto
          component={Avatar}
          src={data.photo}
          update={patch()}
        />
      </Box>
    ),
  });

  // can?

  return can('picture');
};

export default DetailFeaturedPhoto;
