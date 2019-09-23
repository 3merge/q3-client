import React from 'react';
import { storiesOf } from '@storybook/react';
import Add from '@material-ui/icons/Add';
import Wizard from '.';
import Input from '../inputs';

storiesOf('Components|Wizard', module).add('Create', () => (
  <Wizard
    icon={Add}
    title="Wizardry"
    steps={[
      () => (
        <>
          <Input name="firstName" />
          <Input name="lastName" />
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
