import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';
import IconNavigation from 'q3-Admin/lib/components/Navigation/IconNavigation';

const menus = [
  {
    icon: AccountBox,
    label: 'User',
    nestedMenuItems: [
      { label: 'Login', to: '/login', icon: AccountBox },
      {
        label: 'Regular User',
        to: '/regular',
        icon: AccountBox,
      },
    ],
  },
];

const Regular = () => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={4}>
          <IconNavigation menuItems={menus} />
        </Grid>
        <Grid item xs={8}>
          <p>Welcome Regular user page!</p>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Regular;
