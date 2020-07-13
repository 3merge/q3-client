import React from 'react';
import { last } from 'lodash';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ActionList from './ActionList';

const templateNames = [
  'templateOne',
  'templateTwo',
  'templateThree',
];

const genActionList = () => {
  const child = jest.fn();

  const el = global.shallow(
    <ActionList
      actions={templateNames}
      actionTitle="dividers"
    >
      {child}
    </ActionList>,
  );

  return [el, child];
};

describe('ActionList', () => {
  it('should not render without actions', () => {
    const el = global.shallow(
      <ActionList actions={[]} actionTitle="empty">
        {jest.fn()}
      </ActionList>,
    );

    expect(el.find(ListItem)).toHaveLength(0);
  });

  it('should render one fewer dividers than list items', () => {
    const [el] = genActionList();

    expect(el.find(ListItem)).toHaveLength(
      templateNames.length,
    );

    expect(el.find(Divider)).toHaveLength(
      templateNames.length - 1,
    );
  });

  it('should call children with action name', () => {
    const [, child] = genActionList();

    expect(child).toHaveBeenCalledTimes(3);
    expect(child).toHaveBeenLastCalledWith(
      last(templateNames),
    );
  });
});
