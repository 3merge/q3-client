import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Divider,
  Toolbar,
} from '@material-ui/core';
import Back from '../back';
import Notes from '../notes';
import Article from '../../components/Article';
import ViewNotAllowed from '../../components/ViewNotAllowed';
import Upload from '../upload';
import { mapToNestedRoute } from './helpers';
import ActivityLog from '../activityLog';
import Trash from '../trash';
import DetailFeaturedPhoto from '../DetailFeaturedPhoto';
import DetailHeader from '../DetailHeader';
import DetailActions from '../DetailActions';
import DetailViews from '../DetailViews';
import DetailRelatedLinks from '../DetailRelatedLinks';
import ActionBar from '../../components/ActionBar';
import DetailNavigation from '../DetailNavigation';
import { useAppContext } from '../../hooks';
import { Store } from '../state';

const Detail = ({
  HeaderProps,
  history,
  children,
  picture,
  views,
  ...rest
}) => (
  <Article>
    <AppBar color="inherit" position="static">
      <Toolbar>
        <Box>
          <Back />
          Bread, Actions.
        </Box>
        <ActionBar>
          <DetailActions {...rest} />
        </ActionBar>
      </Toolbar>
      <Toolbar>
        <DetailFeaturedPhoto />
      </Toolbar>
      <DetailHeader {...HeaderProps} />
      <Divider />
      <DetailNavigation views={views} />
    </AppBar>
    <Box p={2}>
      <DetailViews views={views} />
    </Box>
  </Article>
);

Detail.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),

  /**
   * Will auto-append featured image.
   */
  picture: PropTypes.bool,
};

Detail.defaultProps = {
  picture: false,
  children: null,
};

const withDynamicViews =
  (Component) =>
  ({ children, ...props }) => {
    const { check } = useAppContext();
    const { data } = React.useContext(Store);

    const views = mapToNestedRoute(children).filter((el) =>
      check(el.label, el, data),
    );

    return React.useMemo(
      () =>
        views.findIndex((view) => view.to === '/') ===
        -1 ? (
          <ViewNotAllowed />
        ) : (
          <Component views={views} {...props} />
        ),
      [JSON.stringify(views)],
    );
  };

export default withDynamicViews(Detail);
