import React from 'react';
import { Badge } from '@material-ui/core';
import Mail from '@material-ui/icons/Mail';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import Icon from './Icon';

describe('Icon', () => {
  it('should match with icon when seen', () => {
    const el = global.shallow(
      <Icon hasSeen messageType="document" />,
    );
    expect(el.find(Badge).props()).toHaveProperty(
      'invisible',
      true,
    );
    expect(el.find(ModeCommentIcon).exists()).toBeTruthy();
  });

  it('should match with icon when unseen', () => {
    const el = global.shallow(<Icon />);
    expect(el.find(Badge).props()).toHaveProperty(
      'invisible',
      false,
    );

    expect(el.find(Mail).exists()).toBeTruthy();
  });
});
