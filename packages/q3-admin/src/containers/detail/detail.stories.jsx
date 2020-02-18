import React from 'react';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import Detail from '.';
import fixture from '../documentation/__fixtures__/markdown.md';
import State from '../state';

export default {
  title: 'Q3 Admin/Containers/Detail',
  parameters: {
    component: Detail,
  },
};

const First = () => <div />;

export const WithDefaults = () => (
  <LocationProvider>
    <State.Provider
      value={{
        resourceName: 'foos',
        resourceNameSingular: 'foo',
        collectionName: 'foos',
        id: 1,
      }}
    >
      <Detail filepath={{ content: { data: fixture } }}>
        <First name="lorem" />
      </Detail>
    </State.Provider>
  </LocationProvider>
);
