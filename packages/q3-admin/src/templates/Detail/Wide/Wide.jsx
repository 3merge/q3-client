import React from 'react';
import { Container, Divider } from '@material-ui/core';
import Article from '../../../components/Article';
import DetailViews from '../../../containers/DetailViews';
import { withDynamicViews } from '../../../containers/detail';
import * as Header from '../../../components/Header';
import * as Toolbar from '../../../components/Toolbar';
import * as Tabs from '../../../components/Tabs';
import * as Summary from '../../../components/Summary';

export default withDynamicViews(({ views }) => (
  <Article>
    <Container maxWidth="xl">
      <Toolbar.Horizontal />
      <Divider aria-hidden />
      <Header.Simple />
      <Summary.List />
      <Tabs.Horizontal views={views} />
      <Divider aria-hidden />
      <DetailViews views={views} />
    </Container>
  </Article>
));
