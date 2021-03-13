import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Link as ReachLink } from '@reach/router';
import Container from '@material-ui/core/Container';
import { size } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Notes from '../notes';
import Article from '../../components/Article';
import ArticleContainer from '../../components/ArticleContainer';
import ViewNotAllowed from '../../components/ViewNotAllowed';
import Upload from '../upload';
import { mapToNestedRoute } from './helpers';
import ActivityLog from '../activityLog';
import Trash from '../trash';
import DetailSidePanel from '../DetailSidePanel';
import DetailSidePanelContent from '../DetailSidePanelContent';
import DetailViews from '../DetailViews';
import DetailRelatedLinks from '../DetailRelatedLinks';
import DetailNavigation from '../DetailNavigation';
import { useAppContext } from '../../hooks';
import { Definitions, Store } from '../state';
import useStyle from './useStyle';

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
  const { can } = useAppContext({
    aside: (
      <DetailSidePanel
        documentation={
          documentation ? (
            <Box className={cls.docs}>{documentation}</Box>
          ) : null
        }
        notes={notes && <Notes />}
        files={files && <Upload />}
      >
        <DetailSidePanelContent {...rest} />
      </DetailSidePanel>
    ),
  });

  const asideComponent = can('aside');
  const { directoryPath, resourceName } = React.useContext(
    Definitions,
  );

  return !asideComponent && size(views) < 2 ? (
    <ArticleContainer>
      <Box
        bgcolor="background.default"
        height="100%"
        width="100%"
        px={1}
        py={4}
      >
        <Container style={{ maxWidth: 1440 }}>
          <Breadcrumbs>
            <Link component={ReachLink} to="/">
              App
            </Link>
            <Link component={ReachLink} to={directoryPath}>
              {resourceName}
            </Link>
            <span>Title</span>
          </Breadcrumbs>
          <Box bgcolor="background.paper" p={2} mt={2}>
            <DetailViews views={views} />
          </Box>
        </Container>
      </Box>
    </ArticleContainer>
  ) : (
    <Article asideComponent={asideComponent}>
      <DetailNavigation
        {...HeaderProps}
        views={views}
        picture={picture}
      />
      <DetailViews views={views} />
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
