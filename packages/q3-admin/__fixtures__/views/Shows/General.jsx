import React from 'react';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Dialog from 'q3-ui-dialog';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import { connect } from '../../../src/containers';

const BlockEditor = (props) => (
  <Dialog
    renderContent={() => (
      <Form {...props}>
        <Field name="name" type="text" />
      </Form>
    )}
    renderTrigger={(open) => (
      <Grid item style={{ minWidth: 410, width: 410 }}>
        <Card elevation={0} variant="outlined">
          <CardContent>
            <Typography variant="h3">
              Block Header
            </Typography>
            <Box component="ul">
              <Box component="li">
                <strong>Attribute one:</strong>{' '}
                {props.initialValues.name}
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Button onClick={open}>Edit</Button>
          </CardActions>
        </Card>
      </Grid>
    )}
  />
);

export default connect(({ data, ...rest }) => {
  return (
    <Form {...rest} initialValues={data}>
      <Field name="name" type="text" />
    </Form>
  );
});
