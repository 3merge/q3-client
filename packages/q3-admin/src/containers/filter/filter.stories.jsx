import React from 'react';
import Location from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import MockApi from 'q3-ui-test-utils/lib/rest';
import {
  In,
  Equals,
  Exists,
  DoesNotExist,
} from 'q3-ui-filters/lib/components';
import CollapsibleFieldLabel from 'q3-ui/lib/collapsibleFieldLabel';
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
  title: 'Q3 Admin|Containers/Filter',
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
          <In
            name="countries"
            type="checkboxGroup"
            label="Countries"
          />
          <CollapsibleFieldLabel label="testing">
            <Exists
              name="isChecked"
              label="Is checked"
              type="checkbox"
            />
            <DoesNotExist
              name="isNotChecked%21"
              label="Is not checked"
              type="checkbox"
              strict
            />
            <Equals
              name="number%2Enested"
              label="Nested number"
              type="select"
            />
          </CollapsibleFieldLabel>
        </Filter>
      </State.Provider>
      <LocationDebugger />
    </MockApi>
  </Location>
);
