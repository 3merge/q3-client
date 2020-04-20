import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import { StyledTreeView } from './nestedMenu';

describe('NestedMenu', () => {
  it('should set default selected', () => {
    const { selected } = global
      .shallow(
        <StyledTreeView
          navigate={jest.fn()}
          location={{
            pathname: '/one',
          }}
          items={[
            {
              label: 'one',
              to: '/one',
            },
          ]}
        />,
      )
      .find(TreeView)
      .props();

    expect(selected).toBe('one');
  });

  it('should set default expanded', () => {
    const { defaultExpanded } = global
      .shallow(
        <StyledTreeView
          navigate={jest.fn()}
          location={{
            pathname: '/one/two',
          }}
          items={[
            {
              label: 'one',
              to: '/one',
              items: [
                {
                  label: 'two',
                  to: '/one/two',
                },
              ],
            },
          ]}
        />,
      )
      .find(TreeView)
      .props();

    expect(defaultExpanded).toEqual(['one']);
  });
});
