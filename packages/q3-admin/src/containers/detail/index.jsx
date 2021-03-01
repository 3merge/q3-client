import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from 'q3-ui/lib/iconButton';
import Dialog from 'q3-ui-dialog';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Container from '@material-ui/core/Container';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { Avatar } from 'q3-ui-filemanager';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Notes from '../notes';
import Article from '../../components/Article';
import ViewNotAllowed from '../../components/ViewNotAllowed';
import Upload from '../upload';
import { mapToNestedRoute } from './helpers';
import ActivityLog from '../activityLog';
import Trash from '../trash';
import DetailSidePanelContent from '../DetailSidePanelContent';
import DetailViews from '../DetailViews';
import SidePanel from '../../components/SidePanel';
import DetailNavigation from '../DetailNavigation';
import { useAppContext } from '../../hooks';
import { Store } from '../state';
import useStyle from './useStyle';
import FeaturedPhoto from '../FeaturedPhoto';
import DetailHeader from '../DetailHeader';
import Back from '../back';

const Detail = ({
  HeaderProps,
  history,
  children,
  notes,
  picture,
  files,
  documentation,
  links,
  views,
  ...rest
}) => {
  const cls = useStyle();
  return (
    <Article
      asideComponent={
        <SidePanel>
          <Box my={2}>
            <FeaturedPhoto
              component={(p) =>
                React.createElement(Avatar, {
                  ...p,
                  style: {
                    height: 125,
                    width: 125,
                  },
                })
              }
            />
          </Box>
          <DetailHeader {...HeaderProps} />
          <DetailSidePanelContent {...rest} />
        </SidePanel>
      }
    >
      <Box mt={2}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item>
              <Back />
            </Grid>
            <Dialog
              variant="drawer"
              renderContent={Notes}
              renderTrigger={(onClick) => (
                <Grid item>
                  <IconButton
                    icon={ForumIcon}
                    label="notes"
                    buttonProps={{
                      onClick,
                    }}
                  />
                </Grid>
              )}
            />
            <Dialog
              variant="drawer"
              renderContent={Upload}
              renderTrigger={(onClick) => (
                <Grid item>
                  <Badge badgeContent={2}>
                    <IconButton
                      icon={AttachFileIcon}
                      label="notes"
                      buttonProps={{
                        onClick,
                      }}
                    />
                  </Badge>
                </Grid>
              )}
            />
            <Dialog
              variant="drawer"
              renderContent={() => (
                <Box className={cls.docs}>
                  {documentation}
                </Box>
              )}
              renderTrigger={(onClick) => (
                <Grid item>
                  <IconButton
                    icon={ContactSupportIcon}
                    label="notes"
                    buttonProps={{
                      disabled: !documentation,
                      onClick,
                    }}
                  />
                </Grid>
              )}
            />
          </Grid>
          <Box mt={0.5} mb={2}>
            <DetailNavigation
              {...HeaderProps}
              views={views}
              picture={picture}
            />
          </Box>
          <DetailViews views={views} />
        </Container>
      </Box>
    </Article>
  );
};

Detail.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),

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
  children: null,
};

const withDynamicViews = (Component) => ({
  children,
  ...props
}) => {
  const { check } = useAppContext();
  const { data } = React.useContext(Store);

  const makeView = React.useCallback(
    (label, el) => ({
      to: `/${label}`,
      component: () =>
        React.createElement(el, {
          name: label,
        }),
      label,
    }),
    [],
  );

  const views = mapToNestedRoute(children)
    .concat([
      makeView('trash', Trash),
      makeView('logs', ActivityLog),
    ])
    .filter((el) => {
      return check(el.label, el, data);
    });

  return React.useMemo(
    () =>
      views.findIndex((view) => view.to === '/') === -1 ? (
        <ViewNotAllowed />
      ) : (
        <Component views={views} {...props} />
      ),
    [JSON.stringify(views)],
  );
};

export default withDynamicViews(Detail);
