import React from 'react';
import ListMui from '@material-ui/core/List';
import List from '.';
import Empty from '../empty';
import Searchbar from '../searchBar';

const emptyRender = [].map(() => null);

const ChildFn = () => null;
const ChildArray = () =>
  [1, 2, 3].map((key) => <ChildFn key={key} />);

const diveIntoSearchbar = (el) =>
  global
    .shallow(el)
    .find(Searchbar)
    .dive();

const diveIntoSubList = (el) => {
  const { subheader } = diveIntoSearchbar(el)
    .find(ListMui)
    .first()
    .props();

  return subheader.props.children;
};

describe('List', () => {
  it('should display Empty component', () =>
    expect(
      diveIntoSearchbar(<List>{emptyRender}</List>).find(
        Empty,
      ),
    ).toHaveLength(1));

  it('should display children if node', () =>
    expect(
      diveIntoSearchbar(
        <List>
          <ChildFn />
        </List>,
      ).find(ChildFn),
    ).toHaveLength(1));

  it('should display children if array', () =>
    expect(
      diveIntoSearchbar(
        <List>
          <ChildArray />
        </List>,
      )
        .find(ChildArray)
        .dive()
        .find(ChildFn),
    ).toHaveLength(3));

  it('should render searchbar in ListSubHeader', () =>
    expect(
      diveIntoSubList(
        <List>
          <ChildArray />
        </List>,
      ),
    ).not.toBeNull());

  it('should not render searchbar in ListSubHeader', () =>
    expect(
      diveIntoSubList(<List>{emptyRender}</List>),
    ).toBeNull());

  it('should not render searchbar in ListSubHeader if disabled', () =>
    expect(
      diveIntoSubList(
        <List enableSearch={false}>
          <ChildFn />
        </List>,
      ),
    ).toBeNull());
});
