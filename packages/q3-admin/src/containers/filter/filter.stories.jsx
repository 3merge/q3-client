import React from 'react';

import MockApi from 'q3-ui-test-utils/lib/rest';
import { Field } from 'q3-ui-forms/lib/builders';
import State from '../../components/state';
import Filter from '.';
import { FormWrapper } from './wrapper';

const m = (a) =>
  a.onGet(/^\/search/).reply(200, {
    fields: {
      number: ['one', 'two', 'three'],
      countries: 'CA,US,MX',
    },
  });

export default {
  title: 'Containers/Filter Container',
  parameters: {
    component: FormWrapper,
    componentSubtitle:
      'Container that integrates state with useFilter hook',
  },
};

export const Default = () => (
  <MockApi define={m}>
    <State.Provider
      value={{
        collectionName: 'sample',
        fetching: false,
        location: {},
      }}
    >
      <Filter id="testing">
        <Field name="number" type="select" />
        <Field name="countries" type="select" />
      </Filter>
    </State.Provider>
  </MockApi>
);
