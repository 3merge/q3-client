import React from 'react';
import { Box, Fade } from '@material-ui/core';
import CollectionUiResolver from '../components/CollectionUiResolver';
import CollectionHeader from '../containers/CollectionHeader';
import CollectionUiSelect from '../components/CollectionUiSelect';

export default (forwardedProps) => (props) => {
  const settledProps = {
    ...forwardedProps,
    ...props,
  };

  return (
    <Fade in>
      <Box bgcolor="background.paper" height="100%">
        <CollectionHeader {...settledProps}>
          <CollectionUiSelect {...settledProps} />
        </CollectionHeader>
        <CollectionUiResolver {...settledProps} />
      </Box>
    </Fade>
  );
};
