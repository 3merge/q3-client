import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Footer, { Copyright, SocialLinks } from '.';

storiesOf('Components|Footer', module).add(
  'With social links',
  () => (
    <Footer
      render={() => <p>Hey!</p>}
      renderBottom={() => (
        <Box p={1} style={{ backgroundColor: '#222' }}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Copyright text="Hey there" />
            </Grid>
            <Grid item>
              <SocialLinks
                links={[
                  'https://facebook.com',
                  'https://twitter.com',
                  'https://linkedin.com',
                  'https://github.com',
                ]}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    />
  ),
);
