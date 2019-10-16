import React from 'react';
import { storiesOf } from '@storybook/react';
import Login from '.';

const onSubmit = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      reject();
    }, 500),
  );

const onCheck = (result) => () =>
  new Promise((resolve, reject) =>
    setTimeout(
      () => (result ? resolve('foo@gmail.com') : reject()),
      500,
    ),
  );

storiesOf('Views|Login', module)
  .add('Resolve', () => (
    <Login onSubmit={onSubmit} onCheck={onCheck(true)} />
  ))
  .add('Reject', () => (
    <Login onSubmit={onSubmit} onCheck={onCheck(false)} />
  ));
