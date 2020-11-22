import React from 'react';
import { Box, Divider } from '@material-ui/core';
import SidePanel from '../../../components/SidePanel';
import Article from '../../../components/Article';
import DetailViews from '../../../containers/DetailViews';
import { withDynamicViews } from '../../../containers/detail';
import * as IconTabs from '../../../components/IconTabs';
import * as Header from '../../../components/Header';
import * as Tabs from '../../../components/Tabs';
import useStyle from '../useStyle';

export default withDynamicViews(
  ({ children, icontabs, views }) => {
    const cls = useStyle();

    return (
      <Article
        className={cls.border}
        asideComponent={
          <SidePanel>
            <IconTabs.Horizontal items={icontabs} />
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
