import React from 'react';
import { Box, Container, Divider } from '@material-ui/core';
import Article from '../../../components/Article';
import DetailViews from '../../../containers/DetailViews';
import { withDynamicViews } from '../../../containers/detail';
import * as Header from '../../../components/Header';
import * as Toolbar from '../../../components/Toolbar';
import * as Tabs from '../../../components/Tabs';

export default withDynamicViews(
  ({ actions, views }) => (
    <Article>
      <Container maxWidth="xl">
        <Toolbar.Horizontal actions={actions} />
        <Container maxWidth="md">
          <Header.CenteredWithAvatar />
          <Box mt={2}>
            <Tabs.Centered views={views} />
            <Divider aria-hidden />
            <DetailViews views={views} />
          </Box>
        </Container>
      </Container>
    </Article>
  ),
  {
    includeInActions: ['trash'],
  },
);
