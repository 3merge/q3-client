import React from 'react';
import Form from '../../builders/form';
import Field from '../../builders/field';
import OptionsThreshold from '.';
import { options } from '../__fixtures__/options';

export default {
  title: 'Q3 Forms|Fields/Options Threshold',
  parameters: {
    component: OptionsThreshold,
    componentSubtitle:
      'Show more/less options in a set of fields',
  },
};

export const WithLimitedVisible = () => (
  <Form debug initialValues={{ demo: [] }}>
    <Field
      name="demo"
      type="checkset"
      options={options}
      maxVisible={3}
    />
  </Form>
);
