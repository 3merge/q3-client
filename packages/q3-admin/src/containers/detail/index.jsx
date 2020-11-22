import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useViews } from 'q3-hooked';
import { NoteAdd, SpeakerNotes } from '@material-ui/icons';
import Article from '../../components/Article';
import ViewNotAllowed from '../../components/ViewNotAllowed';
import Upload from '../upload';
import ActivityLog from '../activityLog';
import DetailSidePanel from '../DetailSidePanel';
import DetailSidePanelContent from '../DetailSidePanelContent';
import DetailViews from '../DetailViews';
import DetailRelatedLinks from '../DetailRelatedLinks';
import DetailNavigation from '../DetailNavigation';
import { useAppContext } from '../../hooks';
import useStyle from './useStyle';
import * as Files from '../../components/Files';
import * as Notes from '../../components/Notes';
import * as Trash from '../../components/Trash';

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
          // notes={notes && <Notes />}
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

const makeFeature = (component, options) => {
  const out = {};
  const { IconButton, View } = component;

  if (IconButton) {
    out.actions = IconButton;
  }

  if (View) {
    out.icontabs = {
      renderer: View,
      ...options,
    };

    out.views = View;
  }

  return out;
};

export const Features = {
  files: makeFeature(Files, {
    icon: SpeakerNotes,
    label: 'files',
  }),
  notes: makeFeature(Notes, {
    icon: NoteAdd,
    label: 'notes',
  }),
  trash: {
    actions: Trash.IconButton,
    views: Trash.View,
  },
  logs: {
    views: ActivityLog,
  },

  toObject(desiredFeatureFormat, properties = []) {
    return Array.isArray(properties)
      ? Object.entries(this).reduce((acc, [key, value]) => {
          const format = value[desiredFeatureFormat];
          if (properties.includes(key) && format)
            acc[key] = format;

          return acc;
        }, {})
      : {};
  },

  toArray(desiredFeatureFormat, properties = []) {
    return Array.isArray(properties)
      ? Object.entries(this).reduce((acc, [key, value]) => {
          const format = value[desiredFeatureFormat];
          if (properties.includes(key) && format)
            acc.push(format);

          return acc;
        }, [])
      : [];
  },
};

export const withDynamicViews = (
  Component,
  options = {},
) => ({ children, ...props }) => {
  const { includeInViews = [] } = options;
  const { add, hasRoot, views } = useViews(children);

  const invokeFeatureWith = (feature) => {
    const opt = options[feature] || [];
    const propName = feature
      .replace('includeIn', '')
      .toLowerCase();

    Object.assign(props, {
      [propName]: [
        ...(props[propName] || []),
        ...Features.toArray(propName, opt),
      ],
    });
  };

  add(Features.toObject('views', includeInViews));
  invokeFeatureWith('includeInActions');
  invokeFeatureWith('includeInAttributes');
  invokeFeatureWith('includeInIcontabs');

  return React.useMemo(
    () =>
      hasRoot ? (
        <ViewNotAllowed />
      ) : (
        <Component {...props} views={views} />
      ),
    [JSON.stringify(views)],
  );
};

export default withDynamicViews(Detail);
