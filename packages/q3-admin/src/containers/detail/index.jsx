import React from 'react';
import PropTypes from 'prop-types';
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
  links,
  views,
  ...rest
}) => {
  return (
    <Article
      asideComponent={
        <DetailSidePanel
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
