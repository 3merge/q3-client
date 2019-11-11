import { storiesOf } from '@storybook/react';
import docs from './README.md';
import Auto from '.';
import { countries } from '../_helpers/fakeData';
import {
  mockRequest,
  withFormik,
} from '../_helpers/testUtils';

const name = 'country';

const loadOptions = mockRequest((term) =>
  countries
    .filter(({ value, label }) =>
      String(`${value} ${label}`).includes(term),
    )
    .map((o) => ({
      ...o,
      foo: 'bar',
    })),
);

storiesOf('Components|AutoComplete', module)
  .addParameters({
    jest: ['autocomplete'],
    readme: {
      sidebar: docs,
    },
  })
  .add('With options', () =>
    withFormik(
      Auto,
      {
        loadOptions,
        inputProps: {
          label: 'Countries',
          helperText: 'Search by name',
          name,
        },
      },
      {
        initialValues: {
          country: '',
        },
      },
    ),
  )
  .add('With formik value', () =>
    withFormik(
      Auto,
      {
        loadOptions,
        inputProps: {
          label: 'Countries',
          helperText: 'Search by name',
          required: true,
          name,
        },
      },
      {
        initialValues: {
          country: countries[0],
        },
      },
    ),
  )
  .add('As disabled', () =>
    withFormik(
      Auto,
      {
        loadOptions,
        inputProps: {
          label: 'Countries',
          helperText: 'Search by name',
          disabled: true,
          required: true,
          name,
        },
      },
      {
        initialValues: {
          country: countries[0],
        },
      },
    ),
  );
