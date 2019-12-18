import React from 'react';
import FormBuilder from 'q3-ui-forms/lib/builders/submit';
import Repeater from 'q3-ui-forms/lib/builders/repeater';
import * as utils from '../utils';

const spy = jest.spyOn(React, 'createElement');
const stub = { onSubmit: jest.fn() };

jest.mock('q3-ui-forms/lib/builders/submit', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

jest.mock('q3-ui-forms/lib/builders/repeater', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

describe('getPath', () => {
  it('should return empty on 0', () =>
    expect(utils.getPath(0, 'slug')).toMatch(''));

  it('should prefix with forward slash', () =>
    expect(utils.getPath('!', 'slug')).toMatch('/slug'));
});

describe('getBuilderByType', () => {
  const callReactAs = (name, component, builder) => {
    utils.getBuilderByType(name, component, stub)();
    expect(spy).toHaveBeenCalledWith(builder, stub);
  };

  it('should throw an error on unknown form type', () =>
    expect(() =>
      utils.getBuilderByType('foo'),
    ).toThrowError());

  it('should call React.createElement with FormBuilder', () =>
    callReactAs('submit', null, FormBuilder));

  it('should call React.createElement with Repeater', () =>
    callReactAs('repeater', null, Repeater));

  it('should call React.createElement with custom', () => {
    const mock = () => null;
    callReactAs('custom', mock, mock);
  });
});

describe('ellipsis', () => {
  it('should truncate text', () => {
    expect(
      utils.ellipsis(
        'THIS_IS_MORE_THAN_N_NUMBER_OF_CHARACTERS_SO_LETS_SHORTEN_IT',
      ),
    ).toMatch('...');
  });
});
