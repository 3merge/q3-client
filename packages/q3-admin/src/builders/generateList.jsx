import React from 'react';
import { Box, Container, Fade } from '@material-ui/core';
import Exports from 'q3-ui-exports';
import { TableActions } from '../containers';
import CollectionName from '../components/CollectionName';
import CollectionUiResolver from '../components/CollectionUiResolver';

export default (forwardedProps) => (props) => {
  const settledProps = {
    ...forwardedProps,
    ...props,
  };

  return (
    <Fade in>
      <Box bgcolor="background.paper" height="100%">
        <Exports>
          <Container
            id="collection-header"
            component="header"
            maxWidth="xl"
          >
            <Box
              alignItems="center"
              display="flex"
              width="100%"
            >
              <CollectionName />
              <TableActions {...settledProps} />
            </Box>
          </Container>
          <CollectionUiResolver {...settledProps} />
        </Exports>
      </Box>
    </Fade>
  );
};
