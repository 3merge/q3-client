import React from 'react';
import { Password, TEXT, PASSWORD } from './Password';

const spy = jest.spyOn(React, 'useState');
const setState = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

const getInputType = (inputType) => {
  const { type } = global
    .shallow(<Password value="" onChange={jest.fn()} />)
    .props();
  expect(type).toBe(inputType);
};

describe('Password', () => {
  it('should be password type', () => {
    spy.mockImplementation(() => [PASSWORD, setState]);
    getInputType(PASSWORD);
  });

  it('should be text type', () => {
    spy.mockImplementation(() => [TEXT, setState]);
    getInputType(TEXT);
  });
});
