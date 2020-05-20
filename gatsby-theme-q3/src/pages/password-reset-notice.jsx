import React from 'react';
import Graphic from 'q3-ui-assets';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Wrapper from 'q3-ui/lib/wrapper';
import { Link } from 'gatsby';

const PasswordResetNotice = () => (
  <Wrapper backgroundColor="transparent">
    <Graphic
      h1
      title="passwordResetNotice"
      icon="Done"
      renderBottom={() => (
        <Box mt={1}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="secondary"
            size="large"
          >
            Login
          </Button>
        </Box>
      )}
    />
  </Wrapper>
);

export default PasswordResetNotice;
