import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import ConfirmForm from './ConfirmForm';

const setupContainer = () => {
  const handleSubmit = jest.fn();
  const { container, debug } = render(
    <ConfirmForm phrase="delete" onSubmit={handleSubmit} />,
  );

  return {
    handleSubmit,
    container,
    debug,
  };
};

const submit = (container) =>
  fireEvent.submit(container.querySelector('form'));

const type = (container, value) =>
  fireEvent.change(container.querySelector('input'), {
    target: {
      value,
    },
  });

describe('Configuration', () => {
  it('should submit', (done) => {
    const { container, handleSubmit } = setupContainer();
    type(container, 'delete');

    waitFor(() => {
      submit(container);
      expect(handleSubmit).toHaveBeenCalled();
      done();
    });
  });

  it('should not submit on mistype', (done) => {
    const { container, handleSubmit } = setupContainer();
    type(container, 'DEL');

    waitFor(() => {
      submit(container);
      expect(handleSubmit).not.toHaveBeenCalled();
      done();
    });
  });
});
