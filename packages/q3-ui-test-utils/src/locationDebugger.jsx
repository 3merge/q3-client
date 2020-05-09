import React from 'react';
import { withLocation } from 'with-location';
import PrettyJson from 'react-json-pretty';

export const LocationDebugger = withLocation(
  ({ children, location }) => (
    <>
      <PrettyJson data={location} />
      {children}
    </>
  ),
);

export default LocationDebugger;
