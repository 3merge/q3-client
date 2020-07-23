import React from 'react';
import Template from './Template';

describe('Template', () => {
  const expectClassName = (props, className) =>
    expect(
      global.shallow(<Template {...props} />).props()
        .className,
    ).toMatch(className);

  it('should render with muted class', () =>
    expectClassName({ muted: true }, 'muted'));

  it('should render without muted class', () =>
    expectClassName({ muted: false }, 'light'));
});
