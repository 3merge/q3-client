import React from 'react';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import FilterGroup from './FilterGroup';

export default {
  title: 'Components|FilterGroup',
};

export const withFilters = () => (
  <LocationProvider initialPath="?approved=true&draft!=true&currency=CAD,USD,EU&items.0">
    <FilterGroup title="Test" count={['approved']}>
      <p>Testing!</p>
    </FilterGroup>
    <FilterGroup title="Lists" count={['currency']}>
      <p>Testing!</p>
    </FilterGroup>
    <FilterGroup title="Misc" count={['items.0', 'draft!']}>
      <p>Testing!</p>
    </FilterGroup>
    <LocationDebugger />
  </LocationProvider>
);
