import React from 'react';
import Button from '@material-ui/core/Button';
import ResourceCard from '.';

const getProps = (args) => ({
  title: 'Foo',
  description: 'Bar',
  imgSrc: 'https://google.ca',
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
