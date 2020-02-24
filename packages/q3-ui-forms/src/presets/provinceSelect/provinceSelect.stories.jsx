import React from 'react';
import { Form } from '../../builders';
import Province from '.';

export default {
  title: 'Q3 Forms|Presets/Province select',
  parameters: {
    component: Province,
    componentSubtitle: 'Canadian province dropdown',
  },
};

export const WithCustomName = () => (
  <Form initialValues={{ province: '' }}>
    <Province name="province" />
  </Form>
);
