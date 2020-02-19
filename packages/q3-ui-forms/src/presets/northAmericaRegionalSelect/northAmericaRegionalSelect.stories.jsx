import React from 'react';
import { Form } from '../../builders';
import NorthAmericaRegionalSelect from '.';

export default {
  title:
    'Q3 Forms|Presets/North American regional select list',
  parameters: {
    component: NorthAmericaRegionalSelect,
    componentSubtitle:
      'Dynamic province/state-country list for NA countries',
  },
};

export const WithFormContext = () => (
  <Form
    initialValues={{ country: '', region: '' }}
    onSubmit={() => null}
  >
    <NorthAmericaRegionalSelect />
  </Form>
);

export const WithFormInitialCountryValue = () => (
  <Form
    debug
    initialValues={{ country: 'CA', region: '' }}
    onSubmit={() => null}
  >
    <NorthAmericaRegionalSelect />
  </Form>
);

export const WithFormInitialCountryAndRegionValue = () => (
  <Form
    debug
    initialValues={{ country: 'CA', region: 'ON' }}
    onSubmit={() => null}
  >
    <NorthAmericaRegionalSelect />
  </Form>
);
