import React from 'react';
import { materialMount } from '../../helpers/testUtils';
import { NewsCard } from '.';

describe('NewsCard', () => {
  it('should render all parts', () => {
    const props = {
      title: 'Card title',
      imgSrc: 'https://google.ca',
      description: 'My first card',
      label: 'testing',
      to: '/app',
    };
    const mount = materialMount(() => (
      <NewsCard {...props} />
    ));
    expect(mount.find('a').props()).toHaveProperty(
      'href',
      props.to,
    );
    expect(mount.find('img')).toHaveLength(1);
    expect(mount.find('h3').text()).toBe(props.title);
    expect(mount.find('span').text()).toBe(props.label);
  });
});
