import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Docs from './README.md';
import Field, { DesktopSelect, DateSelect, Check } from '.';
import { countries } from '../../helpers/fakeData';
import { mockRequest } from '../../helpers/testUtils';
import Auto from '../autocomplete';
import Form from '../form';

const loadOptions = mockRequest((term) =>
  countries.filter(({ value, label }) =>
    String(`${value} ${label}`).includes(term),
  ),
);

const mockAPIErrorResponse = (fn) => () =>
  fn({
    countries: 'Unknown country',
    language: 'Incorrect language',
    tomorrow: 'Has to be a different date',
    name: 'Not a recognized name',
    subscribe: 'Not allowed!',
    favouriteFood: [undefined, 'Oops!'],
  });

storiesOf('Components|Inputs', module)
  .addParameters({
    jest: ['menu'],
    readme: {
      sidebar: Docs,
    },
  })
  .add('Formik integration', () => (
    <Box p={8}>
      <Form
        title="Demonstration"
        description="Showcases the input components and their dynamic states"
        initialValues={{
          language: 'en',
          friends: [{ value: 'joe', label: 'Joe' }, 'jane'],
        }}
      >
        {({ setErrors }) => (
          <>
            <Auto
              inputProps={{
                name: 'countries',
                required: true,
              }}
              loadOptions={loadOptions}
            />
            <Field name="name" type="text" required />
            <Field name="age" type="number" readOnly />
            <DateSelect name="tomorrow" />
            <DesktopSelect
              name="language"
              options={[
                {
                  value: 'en',
                  label: 'en-CA',
                },
                {
                  value: 'fr',
                  label: 'fr-CA',
                },
              ]}
            />
            <DesktopSelect
              name="friends"
              multiple
              options={
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve([
                      {
                        value: 'joe',
                        label: 'Joe',
                      },
                      {
                        value: 'jane',
                        label: 'Jane',
                      },
                      {
                        value: 'frank',
                        label: 'Frank',
                      },
                      {
                        value: 'percy',
                        label: 'Percy',
                      },
                    ]);
                  }, 2500);
                })
              }
            />
            <Check name="subscribe" />
            <Button
              onClick={mockAPIErrorResponse(setErrors)}
            >
              Set errors
            </Button>
          </>
        )}
      </Form>
    </Box>
  ));
