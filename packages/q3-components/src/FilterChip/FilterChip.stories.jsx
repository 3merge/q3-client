import React from 'react';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import FilterChip from './FilterChip';

export default {
  title: 'Components/FilterChip',
};

export const withFilters = () => (
  <LocationProvider initialPath="?approved=true&draft!=true&currency=CAD,USD,EU&items.0">
    <FilterChip />
    <LocationDebugger />
  </LocationProvider>
);
