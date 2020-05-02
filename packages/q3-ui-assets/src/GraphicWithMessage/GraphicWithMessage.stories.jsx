import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, select } from '@storybook/addon-knobs';
import Box from '@material-ui/core/Box';
import GraphicWithMessage, {
  ICON_NAMES,
} from './GraphicWithMessage';

export default {
  title: 'Assets|GraphicWithMessage',
  decorators: [withA11y, withKnobs],
};

export const withIcons = () => {
  const icon = select(
    'SvgIcon name',
    Object.keys(ICON_NAMES),
    'Add',
  );
  return (
    <Box p={4}>
      <GraphicWithMessage title="empty" icon={icon} />
    </Box>
  );
};

export const asTransparent = () => (
  <Box p={4}>
    <GraphicWithMessage
      transparent
      icon="Missing"
      title="missing"
    />
  </Box>
);

export const withRenderers = () => (
  <Box p={4}>
    <GraphicWithMessage
      title="error"
      renderBottom={() => <p>Bottom!</p>}
      renderTop={() => <p>Top!</p>}
    >
      <p>Custom graphic!</p>
    </GraphicWithMessage>
  </Box>
);
