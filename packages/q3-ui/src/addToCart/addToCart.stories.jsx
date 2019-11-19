import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AddToCart from '.';

const mock = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });

storiesOf('Components|AddToCart', module).add(
  'Default',
  () => (
    <Container>
      <Box my={4}>
        <AddToCart service={mock} />
      </Box>
    </Container>
  ),
);
