import React from 'react';
import Location from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
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
  title: 'Q3 Filters/Form',
  parameters: {
    component: Filter,
    componentSubtitle:
      'Location-aware filter forms and form field presets',
  },
};

const opts = [
  { label: 'Australia', value: 'AU' },
  { label: 'Canada', value: 'CA' },
  { label: 'United States', value: 'US' },
];

export const Example = () => {
  const [URL, setURL] = React.useState();
  return (
    <Filter next={setURL}>
      <code>ACTIVE QUERY: {URL}</code>
      <DoesNotEqual
        label="Does not equal this value"
        name="doesNotEqualText"
        type="select"
        options={opts}
      />
      <Equals label="Equals to this value" name="equals" />
      <Exists label="Does exist" name="exists" />
      <DoesNotExist
        label="Does not exist"
        name="doesNotExist"
      />
      <GreaterThanOrEqualTo
        label="Greater than or equal to this value"
        name="GreaterThanOrEqualTo"
        type="date"
      />
      <In
        label="In this list"
        name="in"
        type="checkboxGroup"
        options={opts}
      />
      <LessThanOrEqualTo
        label="Less than or equal to this value"
        name="LessThanOrEqualTo"
      />
      <NotIn
        label="Not in this list"
        name="notIn"
        type="chips"
        options={opts}
      />
    </Filter>
  );
};
