import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { materialMount } from '../../helpers/testUtils';
import Card from '.';

describe('Card', () => {
  it('should render all parts', () => {
    const props = {
      title: 'Card title',
      description: 'My first card',
      to: '/app',
      Icon: 'https://google.ca',
    };
    const mount = materialMount(() => (
      <MemoryRouter>
        <Card {...props} />
      </MemoryRouter>
    ));
    expect(mount.find('img')).toHaveLength(1);
    expect(mount.find('h2').text()).toBe(props.title);
    expect(mount.find('a').props()).toHaveProperty(
      'href',
      props.to,
    );
  });
});
