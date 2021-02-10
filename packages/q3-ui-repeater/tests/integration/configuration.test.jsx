import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import Repeater from '../../src';
import AuthContextProvider from '../fixtures/AuthContextProvider';
import { genRepeaterProps } from '../helpers';

jest.unmock('useful-state');

describe('Configuration', () => {
  it('should display exports on select', (done) => {
    const { container } = render(
      <AuthContextProvider read="*" update="*">
        <Repeater
          {...genRepeaterProps()}
          bulkEditorComponent={<div id="bulk" />}
          showMultiselect
        >
          <div />
        </Repeater>
      </AuthContextProvider>,
    );

    const get = (selector) =>
      container.querySelector(selector);

    fireEvent.click(get('input[type="checkbox"]'));

    waitFor(() => {
      expect(
        get('[aria-label="bulkUpdate"]'),
      ).toBeInTheDocument();

      done();
    });
  });

  it('should hide on authorization', () => {
    const { container } = render(
      <AuthContextProvider read="!*">
        <Repeater {...genRepeaterProps()}>
          <div />
        </Repeater>
      </AuthContextProvider>,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
