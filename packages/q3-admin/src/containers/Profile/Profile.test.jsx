import React from 'react';
import { Profile } from './Profile';
import ProfileNavigation from '../ProfileNavigation';

let useState;

beforeEach(() => {
  useState = jest
    .spyOn(React, 'useState')
    .mockReturnValue([0]);

  jest
    .spyOn(React, 'useCallback')
    .mockImplementation((fn) => {
      return (args) => fn(args);
    });
});

const getProfileProps = (rest) =>
  global
    .shallow(<Profile {...rest} />)
    .find(ProfileNavigation)
    .props();

describe('Profile', () => {
  it('should render withPhoto when state value is 0', () =>
    expect(getProfileProps().withPhoto).toBeTruthy());

  it('should not render withPhoto when state value is more than 0', () => {
    useState.mockReturnValue([1]);
    expect(getProfileProps().withPhoto).toBeFalsy();
  });

  it('should render navComponent with 2 or more menu items', () =>
    expect(
      getProfileProps({
        items: [{ label: 'Testing', component: jest.fn() }],
      }).navComponent,
    ).toBeDefined());

  it('should not render navComponent with there is fewer than 2 menu items', () =>
    expect(
      getProfileProps({
        items: [],
      }).navComponent,
    ).toBeUndefined());

  it('should render menu item component when matched with state', () => {
    const component = jest.fn().mockImplementation(() => {
      return <div id="test" />;
    });

    useState.mockReturnValue([1]);
    const { length } = global
      .mount(
        <Profile items={[{ label: 'test', component }]} />,
      )
      .find('#test');

    expect(length).toBe(1);
  });

  it('should render empty div when not matched with state', () => {
    useState.mockReturnValue([10]);
    expect(
      global
        .mount(<Profile />)
        .find(ProfileNavigation)
        .text(),
      // locale key should include
    ).toMatch('missingConfiguration');
  });
});
