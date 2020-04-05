import React from 'react';
import { omit } from 'lodash';
import Address from '.';
import { Phone, Email } from '../link';
import fixture from './__fixtures__';

const getAddressElement = (props, El) =>
  global.shallow(<Address {...props} />).find(El);

describe('Address', () => {
  it('should render phone', () => {
    const el = getAddressElement(fixture, Phone);
    expect(el).toHaveLength(1);
  });

  it('should render email', () => {
    const el = getAddressElement(fixture, Email);
    expect(el).toHaveLength(1);
  });

  it('should not render phone', () => {
    const el = getAddressElement(
      omit(fixture, ['phone1']),
      Phone,
    );
    expect(el).toHaveLength(0);
  });

  it('should not render email', () => {
    const el = getAddressElement(
      omit(fixture, ['email']),
      Email,
    );
    expect(el).toHaveLength(0);
  });
});
