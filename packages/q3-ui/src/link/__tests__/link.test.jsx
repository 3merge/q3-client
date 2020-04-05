import React from 'react';
import { AddressLink } from '..';

describe('AddressLink', () => {
  it('should format Google query string', () => {
    const text = global
      .shallow(
        <AddressLink>
          This is <br />
          <div>a nested address</div>
          <br />
          listing
        </AddressLink>,
      )
      .first()
      .props().href;

    expect(text).toMatch(
      'This is a nested address listing',
    );
  });
});
