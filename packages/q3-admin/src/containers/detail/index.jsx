import React from 'react';
import PropTypes from 'prop-types';
import Tabs from 'q3-ui/lib/tabs';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import SidePanelContent from '../../components/SidePanelContent';
import { Dispatcher } from '../state';
import Sidebar from '../../components/sidebar';
import Notes from '../notes';
import RelatedLinks from './RelatedLinks';
import History from '../history';
import PictureUpload from '../../components/picture';
import Article from '../../components/Article';
import SidePanel from '../../components/SidePanel';
import Upload from '../upload';
import { mapToNestedRoute } from './helpers';
import ActivityLog from '../activityLog';
import Trash from '../trash';
import DetailHeader from '../DetailHeader';

const ActivityLogPreset = {
  to: '/log',
  label: 'log',
  component: () =>
    React.createElement(ActivityLog, {
      name: 'log',
    }),
};

const TrashPreset = {
  to: '/trash',
  label: 'trash',
  component: () =>
    React.createElement(Trash, {
      name: 'trash',
    }),
};

const Overflow = ({ children }) => {
  return (
    <Box pb={4}>
      <Container disableGutters fixed>
        {children}
      </Container>
    </Box>
  );
};

const HeaderMaxWidth = (HeaderProps) => ({ children }) => (
  <DetailHeader {...HeaderProps} navComponent={children} />
);

const Detail = ({
  HeaderProps,
  history,
  filepath,
  children,
  notes,
  picture,
  files,
  tagOptions,
  tagInstructions,
  documentation,
  links,
  disableTrash,
  disableLog,
  ...rest
}) => {
  const { exclusions } = React.useContext(Dispatcher);

  const filterByExclusion = (item) =>
    item && !exclusions.includes(item.label);

  return (
    <Article
      asideComponent={
        <SidePanel>
          <Sidebar
            {...rest}
            documentation={documentation}
            commentTab={notes && <Notes />}
            historyTab={history && <History />}
            filesTab={
              files && (
                <Upload
                  tagOptions={tagOptions}
                  tagInstructions={tagInstructions}
                />
              )
            }
          >
            {picture && (
              <SidePanelContent title="Picture">
                <Box px={1}>
                  <PictureUpload />
                </Box>
              </SidePanelContent>
            )}
          </Sidebar>
        </SidePanel>
      }
    >
      <Tabs
        dense
        wrap={HeaderMaxWidth(HeaderProps)}
        // eslint-disable-next-line
        wrapBody={({ children }) => (
          <RelatedLinks links={links}>
            <Overflow>{children}</Overflow>
          </RelatedLinks>
        )}
        // root={rootPath}
        scrollButtons="on"
        views={mapToNestedRoute(children)
          .concat([
            disableTrash ? null : TrashPreset,
            disableLog ? null : ActivityLogPreset,
          ])
          .filter(filterByExclusion)}
      />
    </Article>
  );
};

Detail.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,

  /**
   * Will auto-append docmentation to sidebar.
   */
  filepath: PropTypes.shape({
    then: PropTypes.func.isRequired,
    catch: PropTypes.func.isRequired,
  }).isRequired,

  /**
   * Will auto-append comments to sidebar.
   */
  notes: PropTypes.bool,

  /**
   * Will auto-append history tab.
   */
  history: PropTypes.bool,

  /**
   * Will auto-append featured image.
   */
  picture: PropTypes.bool,
};

Detail.defaultProps = {
  notes: false,
  history: false,
  picture: false,
};

export default React.memo(Detail);
