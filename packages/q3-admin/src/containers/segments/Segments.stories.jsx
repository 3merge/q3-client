import React from 'react';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import LocationProviderDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import { AuthContext } from 'q3-ui-permissions';
import Segments from './Segments';
import { Definitions } from '../state';

export default {
  title: 'Q3 Admin|Containers/Segments',
};

export const asDefault = () => {
  const search =
    '?paymentOption=Banking%2CPaypal%2CNet1%2CNet30%2CNet45%2CNet130%2CNet60%2CEmail&credit.hasBeenApproved=exists%28false%29&status=Open&sort=-seq';
  return (
    <AuthContext.Provider
      value={{
        init: true,
        state: {
          profile: {
            filters: {
              default: {
                foo: 'Second',
              },
            },
          },
        },
      }}
    >
      <LocationProvider initialPath={search}>
        <LocationProviderDebugger />
        <Definitions.Provider
          value={{
            collectionName: 'foo',
            location: { search },
            segments: {
              'First': '?status=Quote',
              'Second': '?status=Open',
              'Third':
                '?paymentOption=Banking%2CPaypal%2CNet1%2CNet30%2CNet45%2CNet130%2CNet60%2CEmail&credit.hasBeenApproved=exists%28false%29&status=Open&sort=-seq',
            },
          }}
        >
          <Segments />
        </Definitions.Provider>
      </LocationProvider>
    </AuthContext.Provider>
  );
};
