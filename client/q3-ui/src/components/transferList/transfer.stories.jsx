import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '@material-ui/core/Box';
import { Formik, Form } from 'formik';
import Transfer from '.';

const getRM = (page) =>
  fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`,
  );

const serializePages = () => {
  const output = [];
  for (let i = 0; i < 20; i = 1 + i) {
    output.push(getRM(i));
  }
  return output;
};

const mockRequest = () =>
  Promise.all(serializePages())
    .then((resp) => Promise.all(resp.map((o) => o.json())))
    .then((data) => {
      return data
        .flatMap((j) => j.results)
        .flatMap((j) => j.name);
    });

const withFormik = (props, form = {}) => (
  <Formik
    {...form}
    onSubmit={(_, actions) => {
      actions.setSubmitting(false);
    }}
    render={() => (
      <Form>
        <Box p={4}>
          <Transfer {...props} />
        </Box>
      </Form>
    )}
  />
);

storiesOf('Components|Transfer', module).add(
  'Without initial value',
  () =>
    withFormik({
      name: 'transfer',
      loadOptions: mockRequest,
    }),
);
