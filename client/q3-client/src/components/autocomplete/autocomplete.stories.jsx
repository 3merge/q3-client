import { storiesOf } from '@storybook/react';
import docs from './README.md';
import Auto from '.';
import { countries } from '../../helpers/fakeData';
import {
  mockRequest,
  withFormik,
} from '../../helpers/testUtils';

const name = 'country';

const loadOptions = mockRequest((term) =>
  countries.filter(({ value, label }) =>
    String(`${value} ${label}`).includes(term),
  ),
);

storiesOf('Components|AutoComplete', module)
  .addParameters({
    jest: ['autocomplete'],
    readme: {
      sidebar: docs,
    },
  })
  .add('With options', () =>
    withFormik(Auto, {
      loadOptions,
      inputProps: {
        label: 'Countries',
        helperText: 'Search by name',
        name,
      },
    }),
  )
  .add('With formik value', () =>
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
          country: countries[0],
        },
      },
    ),
  );
