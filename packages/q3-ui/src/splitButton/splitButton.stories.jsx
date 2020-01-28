import React from 'react';
import Box from '@material-ui/core/Box';
import SplitButton from '.';

const makeHandler = (i) => ({
  label: `Option label ${i}`,
  description:
    'This is a short description of what this action should do',
  // eslint-disable-next-line
  handler: () => alert(i),
});

const opts = [makeHandler(1), makeHandler(2)];

export default {
  title: 'Components/SplitButton',
  parameters: {
    component: SplitButton,
    componentSubtitle: 'Multi-action dropdown-style button',
  },
};

export const WithOptions = () => (
  <Box p={1}>
    <SplitButton options={opts} />
  </Box>
);

export const AsDisabled = () => (
  <Box p={1}>
    <SplitButton options={opts} disabled />
  </Box>
);

export const AsLoading = () => (
  <Box p={1}>
    <SplitButton options={opts} loading />
  </Box>
);
