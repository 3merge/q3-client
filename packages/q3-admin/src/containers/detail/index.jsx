import React from 'react';
import { useViews } from 'q3-hooked';
import { NoteAdd, SpeakerNotes } from '@material-ui/icons';
import ViewNotAllowed from '../../components/ViewNotAllowed';
import ActivityLog from '../activityLog';
import * as Files from '../../components/Files';
import * as Notes from '../../components/Notes';
import * as Trash from '../../components/Trash';

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
    [JSON.stringify()],
  );
};
