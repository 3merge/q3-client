import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, select } from '@storybook/addon-knobs';
import AccountBox from '@material-ui/icons/AccountBox';
import Status from './Status';

export default {
  title: 'Components/Status',
  decorators: [withA11y, withKnobs],
};

export const WithLabel = () => {
  const color = select(
    'Status color',
    ['success', 'danger', 'warning'],
    'success',
  );

  return <Status label="Hey" color={color} />;
};

export const WithIcon = () => {
  return (
    <Status label="Hey" color="primary" icon={AccountBox} />
  );
};
