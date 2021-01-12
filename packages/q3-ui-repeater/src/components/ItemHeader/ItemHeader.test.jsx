import React from 'react';
import { SelectOne } from 'q3-ui-exports';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ItemHeader from './ItemHeader';

jest.mock('../useStyle', () =>
  jest.fn().mockReturnValue({}),
);

const getItemHeader = (props) =>
  global.shallow(
    <ItemHeader
      item={{ id: '1' }}
      isIn={jest.fn()}
      save={jest.fn()}
      title="Foo"
      {...props}
    />,
  );

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({
    multiselect: {
      isChecked: jest.fn(),
    },
  });
});

describe('ItemHeader', () => {
  it('should render SelectOne', () =>
    expect(
      getItemHeader({ showMultiselect: true }).find(
        SelectOne,
      ),
    ).toHaveLength(1));

  it('should not render SelectOne', () =>
    expect(
      getItemHeader({ showMultiselect: false }).find(
        SelectOne,
      ),
    ).toHaveLength(0));

  it('should render photo', () =>
    expect(
      getItemHeader({
        photo: 'https://google.ca',
      }).find(Avatar),
    ).toHaveLength(1));

  it('should not render photo', () =>
    expect(getItemHeader().find(Avatar)).toHaveLength(0));

  it('should render description', () =>
    expect(
      getItemHeader({ description: 'Foo' }).find(
        Typography,
      ),
    ).toHaveLength(1));

  it('should not render description', () =>
    expect(getItemHeader().find(Typography)).toHaveLength(
      0,
    ));
});
