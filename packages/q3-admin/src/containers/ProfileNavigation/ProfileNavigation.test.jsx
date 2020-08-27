import React from 'react';
import ProfileNavigation from './ProfileNavigation';
import TemplateFullWidth from '../../components/TemplateFullWidth';

const context = jest
  .spyOn(React, 'useContext')
  .mockReturnValue({
    state: { profile: { photo: 'https://image.ca' } },
    update: jest.fn(),
  });

const renderProfileNavigation = (withPhoto) =>
  global.shallow(
    <ProfileNavigation withPhoto={withPhoto} />,
  );

describe('ProfileNavigation', () => {
  it('should render FeaturedPhoto component  when withPhoto is true', () => {
    const wrapper = renderProfileNavigation(true);
    expect(
      wrapper.find(TemplateFullWidth).props()
        .asideComponent,
    ).toBeDefined();
  });

  it('should not render FeaturedPhoto component when withPhoto is false', () => {
    const wrapper = renderProfileNavigation(false);
    expect(
      wrapper.find(TemplateFullWidth).props()
        .asideComponent,
    ).toBeNull();
  });
});
