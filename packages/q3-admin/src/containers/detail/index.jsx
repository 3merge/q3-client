import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from 'q3-ui/lib/iconButton';
import Dialog from 'q3-ui-dialog';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { Avatar } from 'q3-ui-filemanager';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
          <Back />
          <DetailNavigation
            {...HeaderProps}
            views={views}
            picture={picture}
          />
        </SidePanel>
      }
    >
      <Container maxWidth="xl">
        <Box my={2}>
          <DetailHeader
            {...HeaderProps}
            subtitleComponent={
              <Box>
                <Typography>
                  <AccountCircleIcon /> Created by Mike
                  Ibberson{' '}
                  <Box component="span" mx={1}>
                    /
                  </Box>
                  <AccountCircleIcon /> Created by Mike
                  Ibberson
                </Typography>
              </Box>
            }
          >
            <Grid alignItems="center" container spacing={2}>
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
              <Dialog
                variant="drawer"
                renderContent={() => (
                  <DetailSidePanelContent {...rest} />
                )}
                renderTrigger={(onClick) => (
                  <Grid item>
                    <Button onClick={onClick}>
                      More actions
                    </Button>
                  </Grid>
                )}
              />
            </Grid>
          </DetailHeader>
        </Box>
        <DetailViews views={views} />
        <DetailSidePanelContent {...rest} />
      </Container>
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
