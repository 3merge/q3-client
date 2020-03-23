import React from 'react';
import ListMui from '@material-ui/core/List';
import List from '.';
import Empty from '../empty';

const emptyRender = [].map(() => null);

const ChildFn = () => null;
const ChildArray = () =>
  [1, 2, 3].map((key) => <ChildFn key={key} />);

const diveIntoSubList = (el) => {
  const { subheader } = global
    .shallow(el)
    .find(ListMui)
    .first()
    .props();

  return subheader.props.children;
};

describe('List', () => {
  it('should display Empty component', () =>
    expect(
      global
        .shallow(<List>{emptyRender}</List>)
        .find(Empty),
    ).toHaveLength(1));

  it('should display children if node', () =>
    expect(
      global
        .shallow(
          <List>
            <ChildFn />
          </List>,
        )
        .find(ChildFn),
    ).toHaveLength(1));

  it('should display children if array', () =>
    expect(
      global
        .shallow(
          <List>
            <ChildArray />
          </List>,
        )
        .find(ChildArray)
        .dive()
        .find(ChildFn),
    ).toHaveLength(3));
});
