import React from 'react';
import { ListItem } from 'q3-ui/lib/list';
import Template from '../template';

describe('Template', () => {
  it('should filter out templates with a to property', () => {
    const { length } = global
      .shallow(
        <Template
          templates={[
            { name: 'Foo' },
            { name: 'Bar', to: '/' },
          ]}
        />,
      )
      .find(ListItem);

    expect(length).toBe(1);
  });
});
