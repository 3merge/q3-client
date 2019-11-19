import React from 'react';
import Login from 'q3-ui-commons/lib/views/login';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CheckoutLayout from '../components/checkoutLayout';

const LoginTemplate = ({ children }) => (
  <CheckoutLayout>
    <Grid container spacing={1} justify="space-between">
      <Grid item md={5} xs={12}>
        <Login dividers={false} />
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
  </CheckoutLayout>
);

LoginTemplate.propTypes = {};
LoginTemplate.defaultProps = {};

export default LoginTemplate;
