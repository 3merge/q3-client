import React from 'react';
import ListItemAvatarMui from '@material-ui/core/ListItemAvatar';
import AccountBox from '@material-ui/icons/AccountBox';
import ListItemTextMui from '@material-ui/core/ListItemText';
import ListItem from '.';

jest
  .spyOn(React, 'useContext')
  .mockReturnValue({ term: 'title' });

const ChildFn = () => null;

const makeProps = (props) => ({
  title: 'Title',
  description: ['Read', 'Me'],
  id: '1',
  ...props,
});

describe('List/ListItem', () => {
  it('should render null if RegExp fails', () =>
    expect(
      global.shallow(
        <ListItem {...makeProps({ title: 'NoMatch' })} />,
      ),
    ).toEqual({}));

  it('should render children with id', () => {
    const wrapper = global.shallow(
      <ListItem {...makeProps()}>
        <ChildFn />
      </ListItem>,
    );

    expect(wrapper.find(ChildFn).props()).toHaveProperty(
      'id',
      '1',
    );

    expect(
      wrapper.find(ListItemTextMui).props(),
    ).toMatchObject({
      primary: expect.any(String),
      secondary: expect.any(String),
    });
  });

  it('should not render icon', () =>
    expect(
      global
        .shallow(<ListItem {...makeProps()} />)
        .find(ListItemAvatarMui),
    ).toHaveLength(0));

  it('should render icon', () =>
    expect(
      global
        .shallow(
          <ListItem
            {...makeProps()}
            icon={<AccountBox />}
          />,
        )
        .find(ListItemAvatarMui),
    ).toHaveLength(1));
});
