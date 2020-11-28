import React from 'react';
import { Container } from '@material-ui/core';
import Article from '../../../components/Article';
import DetailViews from '../../../containers/DetailViews';
import { withDynamicViews } from '../../../containers/detail';
import * as Header from '../../../components/Header';
import * as Files from '../../../components/Files';
import * as Summary from '../../../components/Summary';
import * as Toolbar from '../../../components/Toolbar';

export default withDynamicViews(({ views }) => (
  <Article>
    <Container maxWidth="xl">
      <Toolbar.Horizontal />
      <Header.CenteredWithBanner>
        <Summary.Inline justify="center" />
      </Header.CenteredWithBanner>
      <Container maxWidth="md">
        {/* <DetailViews views={views} /> */}
        <Files.View />
      </Container>
    </Container>
  </Article>
));
