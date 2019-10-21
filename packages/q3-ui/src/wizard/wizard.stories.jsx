import React from 'react';
import { storiesOf } from '@storybook/react';
import Add from '@material-ui/icons/Add';
import * as yup from 'yup';
import Wizard from '.';
import Input from '../inputs';
import Autocomplete from '../autocomplete';
import { countries } from '../_helpers/fakeData';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  countries: yup.mixed().autocomplete(),
});

storiesOf('Components|Wizard', module).add('Create', () => (
  <Wizard
    icon={Add}
    title="Wizardry"
    validationSchema={schema}
    initialValues={{
      firstName: '',
      lastName: '',
      countries: '',
    }}
    steps={[
      () => (
        <>
          <Input name="firstName" />
          <Input name="lastName" />
          <Autocomplete
            inputProps={{ name: 'countries' }}
            loadOptions={() => Promise.resolve(countries)}
          />
        </>
      ),
      () => (
        <>
          <Input name="age" type="number" />
          <Input name="height" type="number" />
          <Input name="weight" type="number" />
        </>
      ),
    ]}
  />
));
