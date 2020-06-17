import React from 'react';
import PropTypes from 'prop-types';
import Tabs from 'q3-ui/lib/tabs';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Panel } from 'q3-components';
import { Dispatcher } from '../state';
import Sidebar from '../../components/sidebar';
import Section from '../../components/section';
import Notes from '../notes';
import RelatedLinks from './RelatedLinks';
import History from '../history';
import PictureUpload from '../../components/picture';
import Header from '../header';
import Upload from '../upload';
import { mapToNestedRoute } from './helpers';

import ActivityLog from '../activityLog';
import Trash from '../trash';

const useStyle = makeStyles((theme) => ({
  tabs: {
    maxWidth: 750,
    [theme.breakpoints.down('lg')]: {
      maxWidth: 550,
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: 350,
    },

    [theme.breakpoints.down('sm')]: {
      maxWidth: '95vw',
    },
  },
}));

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

const HeaderMaxWidth = (props) => ({ children }) => {
  const { tabs } = useStyle();

  return (
    <Header {...props}>
      <Box className={tabs}>{children}</Box>
    </Header>
  );
};

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
    <Section
      renderOutside={
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
            <Panel title="Picture">
              <PictureUpload />
            </Panel>
          )}
        </Sidebar>
      }
      renderInside={
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
      }
    />
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
