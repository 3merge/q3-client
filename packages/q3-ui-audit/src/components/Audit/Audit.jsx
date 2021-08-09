import React from 'react';
import {
  Button,
  Container,
  Grid,
  Box,
} from '@material-ui/core';
import { Builders } from 'q3-ui-forms';
import Timeline from '../Timeline';

const Audit = (props) => (
  <Container>
    <Builders.Form enableSubmit={false}>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs>
            <Grid container spacing={1}>
              <Builders.Field
                name="user"
                type="date"
                helperText={
                  'Currently, querying by "System" is not possible'
                }
              />
              <Grid item xs={6} lg={6}>
                <Grid container spacing={1}>
                  <Builders.Field
                    name="date"
                    type="date"
                    helperText="Will only query logs before the requested date"
                  />
                  <Builders.Field
                    name="operations"
                    type="multiselect"
                    options={[
                      'added',
                      'deleted',
                      'updated',
                    ]}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: 'auto' }}>
            <Builders.Next submit label="apply" />
          </Grid>
        </Grid>
      </Grid>
    </Builders.Form>
    <Timeline {...props} />
    <Box align="center" my={2}>
      <Button disabled>Load more</Button>
    </Box>
  </Container>
);

export default Audit;
