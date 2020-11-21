import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';
import Article from '../../../components/Article';
import DetailViews from '../../../containers/DetailViews';
import { withDynamicViews } from '../../../containers/detail';
import * as Header from '../../../components/Header';
import * as Back from '../../../components/Back';
import * as Tabs from '../../../components/Tabs';

export default withDynamicViews(
  ({ actions, attributes, views }) => (
    <Article>
      <Grid container>
        <Grid item style={{ height: '100%', width: 210 }}>
          <Box
            bgcolor="background.default"
            height="100vh"
            py={4}
          >
            <Box px={2} mb={6}>
              <Back.IconButton />
            </Box>
            <Tabs.Vertical views={views} />
          </Box>
        </Grid>
        <Grid item style={{ flex: 1 }}>
          <Container maxWidth="md">
            <Header.Simple />
            <DetailViews views={views} />
          </Container>
        </Grid>
        <Grid item style={{ width: 375 }}>
          <Box p={2}>
            <Card variant="outlined">
              <CardContent>ACTION</CardContent>
              <CardActions>
                <Button>Here we go</Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Article>
  ),
  {
    includeInViews: ['trash'],
  },
);
