import React from 'react';
import { Location } from '@reach/router';
import PrettyJson from 'react-json-pretty';
import MockApi from 'q3-ui-test-utils/lib/rest';
import { Field } from 'q3-ui-forms/lib/builders';
import { FormWrapper } from './wrapper';
import State from '../state';
import Filter from '.';

const m = (a) =>
  a.onGet(/^\/search/).reply(200, {
    fields: {
      number: {
        nested: ['one', 'two', 'three'],
      },
      countries: 'CA,US,MX',
      'friend': {
        name: 'Jon,Carry',
      },
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

const LocationState = () => (
  <Location>{(l) => <PrettyJson data={l} />}</Location>
);

export const Default = () => (
  <MockApi define={m}>
    <State.Provider
      value={{
        collectionName: 'sample',
        fetching: false,
        location: {},
      }}
    >
      <Filter id="testing" debug>
        <Field name="number.nested" type="select" />
        <Field name="countries" type="select" />
        <Field name="isChecked" type="checkbox" />
      </Filter>
    </State.Provider>
    <LocationState />
  </MockApi>
);

export const WithNestedFormFields = () => (
  <MockApi define={m}>
    <State.Provider
      value={{
        collectionName: 'sample',
        fetching: false,
        location: {},
      }}
    >
      <Filter id="testing">
        <Field name="friend.name" type="select" />
      </Filter>
    </State.Provider>
  </MockApi>
);

export const WithValues = () => (
  <MockApi define={m}>
    <State.Provider
      value={{
        collectionName: 'sample',
        fetching: false,
        location: {},
      }}
    >
      <FormWrapper
        id="testing"
        debug
        pushTo={() => null}
        getAll={() => null}
        getFrom={(v) => {
          if (v === 'number.nested') return 'one';
          if (v === 'countries') return 'CA';
          return null;
        }}
        params={{
          delete: () => null,
          toString: () => null,
        }}
      >
        <Field name="number.nested" type="select" />
        <Field name="countries" type="select" />
        <Field name="unset" type="select" />
      </FormWrapper>
    </State.Provider>
    <LocationState />
  </MockApi>
);
