import React from 'react';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import FilterGroup from './FilterGroup';

export default {
  title: 'Components|FilterGroup',
};

export const withFilters = () => (
  <Form>
    <LocationProvider initialPath="?approved=true&draft!=true&currency=CAD,USD,EU&items.0">
      <FilterGroup title="Test" count={['approved']}>
        <p>Testing!</p>
      </FilterGroup>
      <FilterGroup title="Lists">
        <Field name="currency" type="text" />
      </FilterGroup>
      <FilterGroup title="Misc">
        <Field name="items~0" type="number" />
        <div>
          <div>
            <Field name="draft!" type="checkbox" strict />
          </div>
        </div>
      </FilterGroup>
      <LocationDebugger />
    </LocationProvider>
  </Form>
);
