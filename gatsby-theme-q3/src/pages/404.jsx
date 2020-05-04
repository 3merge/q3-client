import React from 'react';
import Graphic from 'q3-ui-assets';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Wrapper from 'q3-ui/lib/wrapper';
import { Link } from 'gatsby';

const NotFound = () => (
  <Wrapper backgroundColor="transparent">
    <Graphic
      h1
      title="missing"
      icon="Missing"
      renderBottom={() => (
        <Box mt={1}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="secondary"
            size="large"
          >
            Go home
          </Button>
        </Box>
      )}
    />
  </Wrapper>
);

export default NotFound;
