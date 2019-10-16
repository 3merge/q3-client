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

// eslint-disable-next-line
const withFormik = ({ name, ...rest }, form = {}) => (
  <Formik
    {...form}
    onSubmit={(_, actions) => {
      actions.setSubmitting(false);
    }}
    initialValues={{
      [name]: 'Rick Sanchez, Morty*',
    }}
    render={() => (
      <Form>
        <Box p={4}>
          <Transfer name={name} {...rest} />
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
