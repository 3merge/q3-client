import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  createShallow,
  createMount,
} from '@material-ui/core/test-utils';
import { Formik, Form } from 'formik';
import Box from '@material-ui/core/Box';

configure({ adapter: new Adapter() });

const shallow = createShallow();
const mount = createMount();

export const materialShallow = (Comp, props = {}) =>
  shallow(<Comp {...props} />);

export const materialMount = (Comp, props = {}) =>
  mount(<Comp {...props} />);

export const withFormik = (Comp, props, form = {}) => (
  <Formik
    {...form}
    onSubmit={(_, actions) => {
      actions.setSubmitting(false);
    }}
    render={() => (
      <Form>
        <Box p={4}>
          <Comp {...props} />
        </Box>
      </Form>
    )}
  />
);

export const mockRequest = (resolver) => (term) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(resolver(term)), 500),
  );
