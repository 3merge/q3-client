import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useViews } from 'q3-hooked';
import Notes from '../notes';
import Article from '../../components/Article';
import ViewNotAllowed from '../../components/ViewNotAllowed';
import Upload from '../upload';
import ActivityLog from '../activityLog';
import Trash from '../trash';
import DetailSidePanel from '../DetailSidePanel';
import DetailSidePanelContent from '../DetailSidePanelContent';
import DetailViews from '../DetailViews';
import DetailRelatedLinks from '../DetailRelatedLinks';
import DetailNavigation from '../DetailNavigation';
import { useAppContext } from '../../hooks';
import useStyle from './useStyle';

const Detail = ({
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
  const cls = useStyle();
  return (
    <Article
      asideComponent={
        <DetailSidePanel
          documentation={
            documentation ? (
              <Box className={cls.docs}>
                {documentation}
              </Box>
            ) : null
          }
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

export const Features = {
  trash: Trash,
  logs: ActivityLog,

  reduce(properties = []) {
    return Array.isArray(properties)
      ? Object.entries(this).reduce((acc, [key, value]) => {
          if (properties.includes(key)) acc[key] = value;
          return acc;
        }, {})
      : {};
  },
};

export const withDynamicViews = (
  Component,
  options = {},
) => ({ actions, attributes, children, ...props }) => {
  const {
    includeInActions = [],
    includeInAttributes = [],
    includeInViews = [],
  } = options;

  const { add, hasRoot, views } = useViews(children);
  add(Features.reduce(includeInViews));

  return React.useMemo(
    () =>
      hasRoot ? (
        <ViewNotAllowed />
      ) : (
        <Component views={views} {...props} />
      ),
    [JSON.stringify(views)],
  );
};

export default withDynamicViews(Detail);
