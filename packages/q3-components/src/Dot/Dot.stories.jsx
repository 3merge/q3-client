import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, select } from '@storybook/addon-knobs';
import AccountBox from '@material-ui/icons/AccountBox';
import Dot from './Dot';

export default {
  title: 'Components/Dot',
  decorators: [withA11y, withKnobs],
};

export const WithLabel = () => {
  const color = select(
    'Status color',
    ['success', 'danger', 'warning'],
    'success',
  );

  return <Dot label="Hey" color={color} />;
};

export const WithIcon = () => {
  return (
    <Dot label="Hey" color="primary" icon={AccountBox} />
  );
};
