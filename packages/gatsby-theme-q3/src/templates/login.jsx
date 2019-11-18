import React from 'react';
import { Link } from 'gatsby';
import Login from 'q3-ui-commons/lib/views/login';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

export default ({ children }) => (
  <Container component="main">
    <Box my={4}>
      <Grid container spacing={1} justify="space-between">
        <Grid item md={5} xs={12}>
          <Login formProps={{ dividers: false }}>
            <Box textAlign="right">
              <Button
                component={Link}
                to="/reset-password"
                type="small"
              >
                Forgot your password?
              </Button>
            </Box>
          </Login>
        </Grid>
        {children && (
          <>
            <Grid item>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item md={5} xs={12}>
              {children}
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  </Container>
);
