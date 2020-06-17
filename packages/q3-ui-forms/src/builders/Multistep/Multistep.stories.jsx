import React from 'react';
import Field from '../Field';
import Multistep from './Multistep';
import Fieldset from '../Fieldset';
import Repeater from '../Repeater';

export default {
  title: 'Q3 Forms|Builders/Multiform',
  parameters: {
    component: Multistep,
  },
};

export const Default = () => (
  <Multistep
    debug
    isNew={false}
    initialValues={{
      brother: 'Chris',
      // friend: 'david@gmail.com',
    }}
    onReset={() => {
      alert('Starting over...');
    }}
    onSubmit={(v, actions) => {
      alert(JSON.stringify(v));
      return Promise.resolve(v, actions);
    }}
  >
    <Fieldset name="firstStepLabel">
      <Field name="firstName" type="text" required />
      <Field name="email" type="email" required />
      <Field name="age" type="number" min="0" />
      <Field
        name="countries"
        type="radio"
        options={[
          { label: 'One', value: 'One' },
          { label: 'Two', value: 'Two' },
        ]}
      />
    </Fieldset>
    <Fieldset name="secondStepLabel">
      <Field name="friend" type="email" required />
      <Repeater group="hobbies">
        <Field name="activity" type="text" required />
      </Repeater>
    </Fieldset>
    <Fieldset name="thirdStep">
      <Field
        name="brother"
        type="text"
        conditional={['firstName=joe']}
        override={({ values }) => ({
          required: values.firstName === 'joe',
        })}
      />
      <Field name="birthday" type="date" min="0" />
    </Fieldset>
  </Multistep>
);

export const NestedSteps = () => (
  <Multistep
    debug
    initialValues={{
      firstName: 'Jim',
      friend: 'david@gmail.com',
    }}
    onSubmit={(v, actions) => {
      alert(JSON.stringify(v));
      return Promise.resolve(v, actions);
    }}
  >
    <Fieldset name="firstStepLabel">
      <Field name="firstName" type="text" required />
    </Fieldset>
    <div>
      <Fieldset name="secondStepLabel">
        <Field name="friend" type="email" required />
      </Fieldset>
    </div>
  </Multistep>
);

export const DynamicSteps = () => {
  return (
    <Multistep
      debug
      initialValues={{
        firstName: 'Jim',
        friend: 'david@gmail.com',
      }}
      onSubmit={(v, actions) => {
        alert(JSON.stringify(v));
        return Promise.resolve(v, actions);
      }}
    >
      {(values) => (
        <>
          <Fieldset name="firstStepLabel">
            <Field name="firstName" type="text" required />
          </Fieldset>
          {values.firstName === 'Joe' && (
            <Fieldset name="secondStepLabel">
              <Field name="friend" type="email" required />
            </Fieldset>
          )}
        </>
      )}
    </Multistep>
  );
};
