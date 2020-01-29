import React from 'react';
import { Location } from '@reach/router';
import PrettyJson from 'react-json-pretty';

export const LocationDebugger = () => (
  <Location>{(l) => <PrettyJson data={l} />}</Location>
);
