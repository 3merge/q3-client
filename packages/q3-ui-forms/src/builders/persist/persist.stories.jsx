import React from 'react';
import Tile from 'q3-ui/lib/tile';
import { Router, Link } from '@reach/router';
import MockLocation from 'q3-ui-test-utils/lib/location';
import Field from '../field';
import Form from '../form';
import PersistWatcher from '../persistWatcher';
import { options } from '../../fields/__fixtures__/options';
import Persist from '.';

export default {
  title: 'Q3 Forms|Builders/Persist',
  parameters: {
    component: Persist,
    componentSubtitle:
      'Handles sessionStorage Formik persistence',
  },
};

const OffPage = () => (
  <p>Go back to see if the form remember!</p>
);

const PersistantForm = (props) => {
  return (
    <Tile title="persist">
      <Form debug isNew id="foo" name="bar" {...props}>
        <Field name="name" type="text" required />
        <Field name="number" type="number" required />
        {props.children}
      </Form>
    </Tile>
  );
};

export const DefaultForm = () => {
  const [initialValues, setInitialValues] = React.useState({
    name: '',
    number: 0,
  });

  const handleSubmit = (v) =>
    new Promise((resolve) => {
      setInitialValues(v);
      resolve();
    });

  return (
    <MockLocation initialPath="/">
      <PersistWatcher />
      <Link to="/">The form</Link>
      <br />
      <Link to="/off">Leave form</Link>
      <Router>
        <PersistantForm
          path="/"
          onSubmit={handleSubmit}
          initialValues={initialValues}
        />
        <OffPage path="off" />
      </Router>
    </MockLocation>
  );
};

export const PostSaveStateChange = () => {
  const [
    hasBeenSubmitted,
    setHasBeenSubmitted,
  ] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState({
    countries: 'One',
    name: '',
    number: 0,
  });

  const handleSubmit = (v) =>
    new Promise((resolve) => {
      setInitialValues({
        newValue: true,
        ...v,
      });

      setHasBeenSubmitted(true);
      resolve();
    });

  return (
    <MockLocation initialPath="/">
      <PersistWatcher />
      <PersistantForm
        path="/"
        onSubmit={handleSubmit}
        initialValues={initialValues}
        marshal={{
          'countries.ref': 'countries',
          name: 'name',
          number: 'number',
        }}
      >
        <Field
          type="autocomplete"
          name="countries"
          loadOptions={() =>
            new Promise((res) => {
              setTimeout(() => {
                res(
                  options.map((v) => ({
                    ...v,
                    mutate: hasBeenSubmitted,
                  })),
                );
              }, 500);
            })
          }
        />
      </PersistantForm>
    </MockLocation>
  );
};
