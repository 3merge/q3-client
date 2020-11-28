import React from 'react';
import { Box, Divider } from '@material-ui/core';
import { Fingerprint } from '@material-ui/icons';
import SidePanel from '../../../components/SidePanel';
import Article from '../../../components/Article';
import DetailViews from '../../../containers/DetailViews';
import { withDynamicViews } from '../../../containers/detail';
import * as IconTabs from '../../../components/IconTabs';
import * as Header from '../../../components/Header';
import * as Summary from '../../../components/Summary';
import * as Panel from '../../../components/Panel';
import * as Tabs from '../../../components/Tabs';
import useStyle from '../useStyle';

export default withDynamicViews(
  ({ icontabs, views }) => {
    const cls = useStyle();

    const panels = [
      {
        title: 'first',
        description: 'hey',
        content: () => 'HERE',
      },
    ];

    return (
      <Article
        className={cls.border}
        asideComponent={
          <SidePanel>
            <IconTabs.Horizontal
              items={[
                {
                  icon: Fingerprint,
                  label: 'General',
                  renderer: () => [
                    <Summary.Block />,
                    <Panel.First data={panels} />,
                  ],
                },
                ...icontabs,
              ]}
            />
          </SidePanel>
        }
      >
        <Box pb={1} pt={2}>
          <Header.Condensed />
        </Box>
        <Tabs.Horizontal views={views} />
        <Divider aria-hidden />
        <DetailViews views={views} />
      </Article>
    );
  },
  {
    includeInIcontabs: ['summary', 'notes', 'files'],
  },
);
