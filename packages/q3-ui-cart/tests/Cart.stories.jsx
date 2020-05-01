import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import useFixtures from './useFixtures';

import Provider, {
  AddToCart,
  LineItem,
  Launcher,
  Drawer,
} from '../src';

export default {
  title: 'Cart|Demo',
};

export const withFixtures = () => {
  const fixtures = useFixtures();

  return (
    <Provider {...fixtures}>
      <Box>
        <AppBar color="inherit">
          <Box>
            <Launcher>
              {(close, isOpen) => (
                <Drawer
                  titleKey="title"
                  close={close}
                  isOpen={isOpen}
                >
                  <LineItem />
                </Drawer>
              )}
            </Launcher>
          </Box>
        </AppBar>
        <Box my={8}>
          <Container>
            <Card style={{ width: 350 }}>
              <CardContent>
                <AddToCart
                  product="abc"
                  variant="spread"
                  size="small"
                />
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
    </Provider>
  );
};
