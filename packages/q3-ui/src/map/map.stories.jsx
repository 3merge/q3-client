import React from 'react';
import Map from '.';

export default {
  title: 'Q3 UI|Components/Map',
};

export const Example = () => (
  <Map
    apiKey="AIzaSyCt7yombMtPIeU_-mWAi4_3iuOfh-Z_LY0"
    street="104 Crockford Blvd"
    city="Scarborough"
    postal="M1R 3C3"
  />
);
