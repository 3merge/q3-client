import React from 'react';
import {
  Box,
  Container,
  Divider,
  Grid,
} from '@material-ui/core';
import Article from '../../../components/Article';
import DetailViews from '../../../containers/DetailViews';
import { withDynamicViews } from '../../../containers/detail';
import * as Header from '../../../components/Header';
import * as Back from '../../../components/Back';
import * as Tabs from '../../../components/Tabs';

export default withDynamicViews(({ views }) => (
  <Article>
    <Grid container>
      <Grid item style={{ height: '100%', width: 470 }}>
        <Box
          bgcolor="background.default"
          height="100%"
          py={4}
        >
          <Container style={{ marginBottom: '-1rem' }}>
            <Back.Button />
          </Container>
          <Header.Simple />
          <Tabs.Vertical views={views} />
        </Box>
      </Grid>
      <Grid item style={{ flex: 1 }}>
        <Container maxWidth="lg">
          <DetailViews views={views} />
        </Container>
      </Grid>
    </Grid>
  </Article>
));
