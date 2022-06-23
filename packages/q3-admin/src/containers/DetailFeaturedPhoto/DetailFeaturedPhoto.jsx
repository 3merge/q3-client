import React from 'react';
import { Avatar } from 'q3-ui-filemanager';
import { Box } from '@material-ui/core';
import { useAuth } from 'q3-ui-permissions';
import { Definitions, Dispatcher, Store } from '../state';
import FeaturedPhoto from '../FeaturedPhoto';

export const DetailFeaturedPhoto = () => {
  const { data } = React.useContext(Store);
  const { patch } = React.useContext(Dispatcher);
  const { collectionName } = React.useContext(Definitions);
  const { canSeeSub } = useAuth(collectionName);

  return (
    canSeeSub('photo') && (
      <Box mt={2} mb={1} className="featured-photo">
        <FeaturedPhoto
          component={Avatar}
          src={data.photo}
          update={patch()}
        />
      </Box>
    )
  );
};

export default DetailFeaturedPhoto;
