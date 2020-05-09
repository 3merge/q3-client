import React from 'react';
import { actions } from '@storybook/addon-actions';
import { Field } from 'q3-ui-forms/lib/builders';
import FiltersForm from './FiltersForm';

export default {
  title: 'Q3 Admin|Filters/Form',
};

const props = actions({
  handleSave: 'onSave',
});

export const WithTitle = () => (
  <FiltersForm
    name="example"
    query="?sample=Sample"
    {...props}
  >
    <Field name="sample" type="text" />
  </FiltersForm>
);

export const WithoutTitle = () => (
  <FiltersForm>
    <Field name="sample" type="text" {...props} />
  </FiltersForm>
);
