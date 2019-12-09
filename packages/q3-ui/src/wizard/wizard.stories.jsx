import React from 'react';
import { storiesOf } from '@storybook/react';
import Add from '@material-ui/icons/Add';
import * as yup from 'yup';
import {
  DialogWizard,
  HorizontalWizard,
  VerticalWizard,
} from '.';
import Input from '../inputs';
import Autocomplete from '../autocomplete';
import { countries } from '../_helpers/fakeData';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  countries: yup.mixed().autocomplete(),
});

const schema2 = yup.object().shape({
  age: yup.number().required(),
  height: yup.number().required(),
  weight: yup.number().autocomplete(),
});

const Details = () => (
  <>
    <Input name="firstName" />
    <Input name="lastName" />
    <Autocomplete
      inputProps={{ name: 'countries' }}
      loadOptions={() => Promise.resolve(countries)}
    />
  </>
);

const Health = () => (
  <>
    <Input name="age" type="number" />
    <Input name="height" type="number" />
    <Input name="weight" type="number" />
  </>
);

storiesOf('Components|Wizard', module)
  .add('Dialog', () => (
    <DialogWizard
      isOpen
      close={() => null}
      onSubmit={() => null}
      variant="dialog"
    >
      <Details
        validationSchema={schema}
        initialValues={{
          firstName: 'Mike',
          lastName: '',
          countries: '',
        }}
      />
      <Health validationSchema={schema2} />
    </DialogWizard>
  ))
  .add('Horizontal', () => (
    <HorizontalWizard onSubmit={() => null}>
      <Details
        validationSchema={schema}
        initialValues={{
          firstName: 'Mike',
          lastName: '',
          countries: '',
        }}
      />
      <Health validationSchema={schema2} />
    </HorizontalWizard>
  ))
  .add('Vertical', () => (
    <VerticalWizard onSubmit={() => null}>
      <Details
        validationSchema={schema}
        initialValues={{
          firstName: 'Mike',
          lastName: '',
          countries: '',
        }}
      />
      <Health validationSchema={schema2} />
    </VerticalWizard>
  ));
