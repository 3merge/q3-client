import React from 'react';
import { get } from 'lodash';
import { object, string } from 'q3-ui-helpers';
import Typography from '@material-ui/core/Typography';
import { EditableTypography } from 'q3-components';
import { useTranslation } from 'react-i18next';
import useRepeaterDecorator from '../../useRepeaterDecorator';

export default ({ data, ...sharedProps }) => ({
  name,
  editable,
  ...rest
}) => {
  const { t } = useTranslation();
  const repeater = useRepeaterDecorator(name, editable);

  if (!repeater) return '--';

  if (object.isFn(name))
    return React.createElement(
      Typography,
      rest,
      name(data),
    );

  const { edit, isEditable, prefix } = repeater;

  return React.createElement(
    EditableTypography,
    {
      ...editable,
      isEditable,
      renderer: editable.renderer,
      initialValues: data,
      fieldProps: {
        name: prefix,
        style: {},
        ...editable,
      },
      onSubmit: (...params) => edit(data.id)(...params),
      ...sharedProps,
      ...rest,
    },
    get(data, name),
  );
};
