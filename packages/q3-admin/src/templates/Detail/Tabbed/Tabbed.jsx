import React from 'react';
import { useViews } from 'q3-hooked';
import { Box, Grid, Tab, Tabs } from '@material-ui/core';
import Article from '../../../components/Article';
import DetailViews from '../../../containers/DetailViews';
import DetailRelatedLinks from '../../../containers/DetailRelatedLinks';
import { withDynamicViews } from '../../../containers/detail';
import * as Header from '../../../components/Header';
import * as Summary from '../../../components/Summary';
import * as Toolbar from '../../../components/Toolbar';

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
  }) => {
    const { value, links: viewLinks } = useViews(views);

    return (
      <Article>
        <Toolbar.Horizontal />

        <Grid container>
          <Grid
            item
            style={{
              width: 475,
              borderRight: '1px solid lightgrey',
            }}
          >
            <Box>
              <Header.Simple />
              <Tabs
                orientation="vertical"
                value={value}
                variant="fullWidth"
              >
                {viewLinks.map((item) => (
                  <Tab {...item}>{item.label}</Tab>
                ))}
              </Tabs>
            </Box>
          </Grid>
          <Grid item>
            <DetailRelatedLinks links={links}>
              <DetailViews views={views} />
            </DetailRelatedLinks>
          </Grid>
        </Grid>
      </Article>
    );
  },
);

/** *
  <DetailSidePanel
            documentation={documentation}
            notes={notes && <Notes />}
            files={files && <Upload />}
          >
            <DetailSidePanelContent {...rest} />
          </DetailSidePanel>
 */
