import React from 'react';
import Notes from '../../../containers/notes';
import Article from '../../../components/Article';
import Upload from '../../../containers/upload';
import DetailSidePanel from '../../../containers/DetailSidePanel';
import DetailSidePanelContent from '../../../containers/DetailSidePanelContent';
import DetailViews from '../../../containers/DetailViews';
import DetailRelatedLinks from '../../../containers/DetailRelatedLinks';
import DetailNavigation from '../../../containers/DetailNavigation';
import { withDynamicViews } from '../../../containers/detail';

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
        <DetailNavigation
          {...HeaderProps}
          views={views}
          picture={picture}
        />
        <DetailRelatedLinks links={links}>
          <DetailViews views={views} />
        </DetailRelatedLinks>
      </Article>
    );
  },
);
