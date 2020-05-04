import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ResourceCard from '.';

const getProps = (args) => ({
  title: 'Foo',
  description: 'Bar',
  fluid: { src: 'https://google.ca' },
  to: '/',
  buttonText: 'Click me!',
  ...args,
});

describe('ResourceCard', () => {
  it('should render single link', () =>
    expect(
      global
        .shallow(<ResourceCard {...getProps()} />)
        .find(Button),
    ).toHaveLength(1));

  it('should render image container as a link', () => {
    const getBoxProps = (el) =>
      global.shallow(el).find(Box).props();

    const withLink = getBoxProps(
      <ResourceCard {...getProps()} />,
    );

    const withoutLink = getBoxProps(
      <ResourceCard {...getProps({ secondaryTo: '/' })} />,
    );

    expect(withLink).toHaveProperty('to');
    expect(withoutLink).not.toHaveProperty('to');
  });

  it('should render a secondary link', () =>
    expect(
      global
        .shallow(
          <ResourceCard
            {...getProps({
              secondaryTo: '/',
              secondaryButtonText: 'See me',
            })}
          />,
        )
        .find(Button),
    ).toHaveLength(2));
});
