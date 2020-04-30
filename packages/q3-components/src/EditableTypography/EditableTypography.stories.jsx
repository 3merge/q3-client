import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { actions } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  select,
} from '@storybook/addon-knobs';
import EditableTypography from './EditableTypography';

export default {
  title: 'Form Presets/EditableTypography',
  decorators: [withA11y, withKnobs],
};

const getSampleFieldValue = (type) => {
  switch (type) {
    case 'number':
      return 12;
    case 'date':
      return new Date().toISOString();
    case 'checkbox':
      return true;
    default:
      return 'Edit this text';
  }
};

const makeStoryProps = () => {
  const type = select(
    'Underlying field type',
    ['text', 'number', 'date', 'checkbox'],
    'text',
  );

  const initialValue = getSampleFieldValue(type);

  return {
    ...actions({
      onSubmit: 'submitResponse',
    }),
    isEditable: boolean('Editting', false),
    initialValues: {
      sample: initialValue,
    },
    fieldProps: {
      name: 'sample',
      type,
    },
  };
};

export const WithEditability = () => {
  const props = makeStoryProps();
  const {
    initialValues: { sample },
  } = props;

  return (
    <EditableTypography {...props}>
      {sample}
    </EditableTypography>
  );
};

export const WithCustomRenderer = () => {
  const props = makeStoryProps();
  const {
    initialValues: { sample },
  } = props;

  return (
    <EditableTypography
      {...props}
      renderer={() => <p>Custom renderere engaged!</p>}
    >
      {sample}
    </EditableTypography>
  );
};
