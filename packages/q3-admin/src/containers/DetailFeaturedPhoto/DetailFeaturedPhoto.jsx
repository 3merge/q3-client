import React from 'react';
import { Avatar } from 'q3-ui-filemanager';
import { Box } from '@material-ui/core';
import { useAuth } from 'q3-ui-permissions';
import { useAppContext } from '../../hooks';
import { Definitions, Dispatcher, Store } from '../state';
import FeaturedPhoto from '../FeaturedPhoto';

export const DetailFeaturedPhoto = () => {
  const { data } = React.useContext(Store);
  const { patch } = React.useContext(Dispatcher);
  const { collectionName } = React.useContext(Definitions);
  const { canSeeSub } = useAuth(collectionName);

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

  return canSeeSub('photo') && can('picture');
};

export default DetailFeaturedPhoto;
