import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import Repeater from '../../src';
import AuthContextProvider from '../fixtures/AuthContextProvider';
import { genRepeaterProps } from '../helpers';

jest.unmock('useful-state');

describe('Configuration', () => {
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
