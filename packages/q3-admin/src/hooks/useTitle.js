import React from 'react';
import { get } from 'lodash';
import { object } from 'q3-ui-helpers';
import { useAuth } from 'q3-ui-permissions';
import {
  Dispatcher,
  Store,
  Definitions,
} from '../containers/state';

const { isFn } = object;

const useTitle = ({
  editable,
  parenthesesProp,
  titleProp: name,
  titleRenderer,
}) => {
  const { collectionName } = React.useContext(Definitions);
  const { data } = React.useContext(Store);
  const { patch } = React.useContext(Dispatcher);
  const auth = useAuth(collectionName);

  const text = React.useMemo(() => {
    let title = '';

    if (name) title += get(data, name);
    if (parenthesesProp)
      title += ` (${get(data, parenthesesProp)})`;

    return isFn(titleRenderer)
      ? titleRenderer(data)
      : title;
  }, [name, parenthesesProp, titleRenderer, data]);

  const isEditable = React.useCallback(() => {
    if (!name || !auth.canEditSub(name)) return false;

    return Boolean(
      isFn(editable) ? editable(data, auth) : editable,
    );
    // turns out we need the full data object here and not just text
  }, [editable, name, data]);

  return {
    FieldProps: {
      name,
      required: true,
      type: 'text',
    },
    FormProps: {
      initialValues: {
        [name]: get(data, name),
      },
    },

    editable: isEditable(),
    text,
    update: patch(),
  };
};

export default useTitle;
