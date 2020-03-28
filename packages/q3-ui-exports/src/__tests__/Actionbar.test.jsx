import React from 'react';
import Fade from '@material-ui/core/Fade';
import Actionbar, {
  renderActions,
  intersects,
} from '../Actionbar';
import DataToCsv from '../DataToCsv';

let hasChecked;

const genActionProps = (label) => ({
  label,
});

jest.mock('../useStyle', () => () => ({
  Actionbar: 'actionbar-cls',
}));

beforeEach(() => {
  hasChecked = jest.fn();
  jest.spyOn(React, 'useContext').mockReturnValue({
    hasChecked,
  });
});

describe('Actionbar', () => {
  it('should render custom actions', () => {
    renderActions([
      genActionProps('Foo'),
      genActionProps('Bar'),
      genActionProps('Quuz'),
    ]).forEach((fn) => {
      expect(fn().type.displayName).toMatch(
        'BottomNavigationAction',
      );
    });
  });

  it('should do nothing', () => {
    expect(renderActions()).toEqual(null);
  });

  it('should set in to hasChecked value', () => {
    hasChecked.mockReturnValue(true);

    const el = global
      .shallow(<Actionbar actions={[]} />)
      .find(Fade)
      .props();
    expect(el).toHaveProperty('in', true);
  });

  it('should forward data to children actions', () => {
    const row = { foo: 1, bar: 1 };
    const [el] = global
      .shallow(
        <Actionbar
          actions={[]}
          columns={['foo']}
          data={[row, row]}
        />,
      )
      .find(DataToCsv)
      .props().data;

    expect(el).not.toHaveProperty('bar');
    expect(el).toMatchObject({
      id: 0,
      foo: 1,
    });
  });

  it('should only pick from selected ids', () => {
    const arr = intersects(
      [
        { id: 1, foo: 1 },
        { id: 2, foo: 2 },
      ],
      [],
      [1],
    );
    expect(arr).toHaveLength(1);
    expect(arr[0]).toHaveProperty('id', 1);
  });
});
