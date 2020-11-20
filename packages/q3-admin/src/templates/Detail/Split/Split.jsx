import React from 'react';
import { Box, Divider } from '@material-ui/core';
import Notes from '../../../containers/notes';
import Article from '../../../components/Article';
import Upload from '../../../containers/upload';
import DetailSidePanel from '../../../containers/DetailSidePanel';
import DetailSidePanelContent from '../../../containers/DetailSidePanelContent';
import DetailViews from '../../../containers/DetailViews';
import DetailRelatedLinks from '../../../containers/DetailRelatedLinks';
import { withDynamicViews } from '../../../containers/detail';
import * as Header from '../../../components/Header';
import * as Tabs from '../../../components/Tabs';

export default withDynamicViews(
  ({
    HeaderProps,
    history,
    filepath,
    children,
    notes,
    picture,
    files,
    documentation,
    links,
    views,
    ...rest
  }) => {
    return (
      <Article
        asideComponent={
          <DetailSidePanel
            documentation={documentation}
            notes={notes && <Notes />}
            files={files && <Upload />}
          >
            <DetailSidePanelContent {...rest} />
          </DetailSidePanel>
        }
      >
        <Box pb={1} pt={2}>
          <Header.Condensed />
        </Box>
        <Tabs.Horizontal views={views} />
        <Divider aria-hidden />

        <DetailRelatedLinks links={links}>
          <DetailViews views={views} />
        </DetailRelatedLinks>
      </Article>
    );
  },
);
