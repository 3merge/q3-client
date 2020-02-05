import React from 'react';
import { Location } from '@reach/router';
import PrettyJson from 'react-json-pretty';

const LocationDebugger = () => (
  <Location>{(l) => <PrettyJson data={l} />}</Location>
);

export default LocationDebugger;
