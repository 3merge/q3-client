import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Notes from '../notes';
import PictureUpload from '../../components/picture';
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
import SidePanelContent from '../../components/SidePanelContent';
import useStyle from './useStyle';

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
  views,
  ...rest
}) => {
  const cls = useStyle();
  return (
    <Article
      asideComponent={
        <DetailSidePanel
          picture={
            picture && (
              <SidePanelContent title="featuredImage">
                <PictureUpload />
              </SidePanelContent>
            )
          }
          documentation={
            documentation ? (
              <Box className={cls.docs}>
                {documentation}
              </Box>
            ) : null
          }
          notes={notes && <Notes />}
          files={
            files && (
              <Upload
                tagOptions={tagOptions}
                tagInstructions={tagInstructions}
              />
            )
          }
        >
          <DetailSidePanelContent {...rest} />
        </DetailSidePanel>
      }
    >
      <DetailNavigation {...HeaderProps} views={views} />
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
