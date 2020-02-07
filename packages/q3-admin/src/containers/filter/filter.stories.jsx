import React from 'react';
import Location from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import MockApi from 'q3-ui-test-utils/lib/rest';
import {
  In,
  Equals,
  Exists,
} from 'q3-ui-filters/lib/components';
import State from '../state';
import Filter, { FormWrapper } from '.';

const m = (a) =>
  a.onGet(/^\/search/).reply(200, {
    fields: {
      number: {
        nested: ['one', 'two', 'three'],
      },
      countries: 'CA,US,MX',
      'friend': {
        name: 'Jon,Carry',
      },
    },
  });

export default {
  title: 'Q3 Admin/Containers/Filter',
  parameters: {
    component: FormWrapper,
    componentSubtitle:
      'Container that integrates state with useFilter hook',
  },
};

export const Default = () => (
  <Location>
    <MockApi define={m}>
      <State.Provider
        value={{
          collectionName: 'sample',
          fetching: false,
          location: {},
        }}
      >
        <Filter id="testing">
          <Equals
            name="number.nested"
            label="Nested number"
            type="select"
          />
          <In
            name="countries"
            type="checkboxGroup"
            label="Countries"
          />
          <Exists name="isChecked" label="Is checked" />
        </Filter>
      </State.Provider>
      <LocationDebugger />
    </MockApi>
  </Location>
);
