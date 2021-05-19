import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Notes from '../notes';
import Article from '../../components/Article';
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
import { Store } from '../state';

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
  const actions = {
    files: <Upload />,
    logs: <ActivityLog />,
    notes: <Notes />,
    trash: <Trash />,
  };

  const { can } = useAppContext(actions);

  return (
    <Article
      asideComponent={
        <DetailSidePanel>
          <DetailSidePanelContent {...rest} />
        </DetailSidePanel>
      }
    >
      <DetailNavigation
        {...HeaderProps}
        views={views}
        picture={picture}
      >
        <Hidden lgUp>
          <Dialog
            renderContent={() => (
              <DetailSidePanelContent {...rest} />
            )}
            renderTrigger={(onClick) => (
              <IconButton onClick={onClick}>
                <InfoIcon />
              </IconButton>
            )}
          />
        </Hidden>
      </DetailNavigation>
      <DetailRelatedLinks links={links}>
        <DetailViews views={views} />
        {Object.keys(actions).map(can)}
      </DetailRelatedLinks>
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

  const views = mapToNestedRoute(children).filter((el) =>
    check(el.label, el, data),
  );

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
