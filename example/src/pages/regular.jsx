import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { AccountBox, Business } from '@material-ui/icons';
import IconNavigation from 'q3-Admin/lib/components/Navigation/IconNavigation';

const menus = [
  {
    icon: AccountBox,
    label: 'User',
    nestedMenuItems: [
      { label: 'Login', to: '/login' },
      {
        label: 'Regular User',
        to: '/regular',
      },
    ],
  },
  {
    icon: Business,
    label: 'About',
    nestedMenuItems: [
      { label: 'Employees', to: '/employees' },
      {
        label: 'Career',
        nestedMenuItems: [
          {
            label: 'Frontend Developer',
            to: '/frontend-developer',
          },
          {
            label: 'Backend Developer',
            to: '/backend-developer',
          },
          {
            label: 'Fullstack Developer',
            to: '/fullstack-developer',
          },
        ],
      },
    ],
  },
];

const Regular = () => {
  return (
    <Grid container style={{ height: '100vh' }}>
      <Grid item xs="auto">
        <IconNavigation menuItems={menus} />
      </Grid>
      <Grid item xs>
        <Container>
          <p>Welcome Regular user page!</p>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Regular;
