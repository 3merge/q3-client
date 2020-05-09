import React from 'react';
import Location from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import { Field } from 'q3-ui-forms/lib/builders';
import Filter from '.';
import {
  DoesNotEqual,
  DoesNotExist,
  Equals,
  Exists,
  GreaterThanOrEqualTo,
  In,
  LessThanOrEqualTo,
  NotIn,
} from './components';

export default {
  title: 'Q3 Filters|Form',
  parameters: {
    component: Filter,
    componentSubtitle:
      'Location-aware filter forms and form field presets',
  },
};

const opts = [
  { label: 'Mastercard', value: 'Mastercard' },
  { label: 'Visa', value: 'Visa' },
];

const FilterForm = () => (
  <Filter
    conversionMap={{
      paymentOption: '=',
      'items%2Ebucket%2EZZ_DEAL': '=',
      'items&2Ebucket%2E.sku': '=',
    }}
    initialValues={{
      paymentOption: [],
      'items%2Ebucket%2EZZ_DEAL': '',
      'items%2Ebucket%2Esku': '',
    }}
    modify={{
      paymentOption: [
        (v) => {
          if (Array.isArray(v)) return v;
          return v.split(',').map((item) => item.trim());
        },
      ],
    }}
  >
    <Field
      name="paymentOption"
      type="chips"
      options={opts}
    />
    <Field
      name="items%2Ebucket%2EZZ%5FDEAL"
      type="checkbox"
      strict
    />
    <Field
      name="items%2Ebucket%2Esku"
      type="text"
      options={opts}
    />
  </Filter>
);

export const EmptyState = () => {
  return (
    <Location>
      <LocationDebugger />
      <FilterForm />
    </Location>
  );
};

export const FullState = () => {
  const [children, setChildren] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      setChildren(<FilterForm />);
    }, 500);
  });

  return (
    <Location search="?paymentOption=Visa&items.bucket.ZZ_DEAL=true&items.bucket.sku=AA612D">
      {children}
    </Location>
  );
};
