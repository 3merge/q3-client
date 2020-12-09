import React from 'react';
import { CircularProgress } from '@material-ui/core';
import FileAvatarIcon from './FileAvatarIcon';

const checkLoading = (bool) => {
  const wrapper = global.shallow(
    <FileAvatarIcon loading={bool} ext=".pdf" />,
  );

  expect(wrapper.find(CircularProgress).exists()).toBe(
    bool,
  );
};

describe('FileAvatarIcon', () => {
  it('should render CircularProgress when loading', () => {
    checkLoading(false);
  });

  it('should not render CircularProgress when idle', () => {
    checkLoading(true);
  });
});
