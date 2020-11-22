import React from 'react';
import { Container, Divider } from '@material-ui/core';
import AssistantIcon from '@material-ui/icons/Assistant';
import Article from '../../../components/Article';
import DetailViews from '../../../containers/DetailViews';
import { withDynamicViews } from '../../../containers/detail';
import * as Header from '../../../components/Header';
import * as IconTabs from '../../../components/IconTabs';
import * as Toolbar from '../../../components/Toolbar';
import * as Tabs from '../../../components/Tabs';
import * as Summary from '../../../components/Summary';

export default withDynamicViews(
  ({ attributes, icontabs, views }) => (
    <Article>
      <Container maxWidth="xl">
        <Toolbar.Horizontal />
        <Divider aria-hidden />
        <Header.Simple />
        <Summary.List attributes={attributes} />
        <Tabs.Horizontal views={views} />
        <Divider aria-hidden />
        <IconTabs.Vertical
          items={[
            {
              label: 'main',
              icon: AssistantIcon,
              renderer: () => <DetailViews views={views} />,
            },
            ...icontabs,
          ]}
        />
      </Container>
    </Article>
  ),
  {
    includeInIcontabs: ['notes', 'files'],
  },
);
