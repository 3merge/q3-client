import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Templates, Components } from 'q3-admin';

export default () => (
  <Templates.Page title="dashboard">
    <Grid container spacing={3}>
      <Components.ProjectCard
        to="/users"
        label="Users"
        name="Access"
        buttonText="See all"
        title="Checkout our users"
        imgSrc="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
        description="Clicking here will redirect you to our users list"
      />
      <Components.ProjectCard
        to="/users"
        label="Users"
        name="Access"
        buttonText="See all"
        title="Checkout our users"
        imgSrc="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
        description="Clicking here will redirect you to our users list"
      />
    </Grid>
  </Templates.Page>
);
