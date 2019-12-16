import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '@material-ui/core/Box';
import img from '../../images/ready.png';
import Selectable from '.';

import Form from '../form';

storiesOf('Components|Selectable List', module).add(
  'Formik integration',
  () => (
    <Box p={8}>
      <Form
        title="Demonstration"
        description="Showcases the input components and their dynamic states"
        initialValues={{
          language: 'en',
          friends: ['jane'],
        }}
      >
        {({ setErrors, values }) => (
          <Selectable
            name="friends"
            options={[
              {
                value: 'joe',
                label: 'Joe',
                img,
              },
              {
                value: 'jane',
                label: 'Jane',
                img,
              },
              {
                value: 'frank',
                label: 'Frank',
                img,
              },
              {
                value: 'percy',
                label: 'Percy',
                img,
              },
            ]}
          />
        )}
      </Form>
    </Box>
  ),
);
