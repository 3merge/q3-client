import React from 'react';
import { Builders } from 'q3-ui-forms';
import AddNewForm from '../../../src/components/AddNewForm';

const CustomAdd = (props) => (
  <AddNewForm {...props}>
    <Builders.Field name="name" required />
  </AddNewForm>
);

export default CustomAdd;
