import React from 'react';
import { map, size } from 'lodash';
import { Box, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ActionsContext } from '../ActionBar';

const ActionBarDesktop = () => {
  const { t } = useTranslation('labels');
  const items = React.useContext(ActionsContext);

  const renderIcon = (xs) =>
    xs.icon
      ? React.createElement(xs.icon, {
          style: {
            marginRight: '.5rem',
          },
        })
      : null;

  return (
    <Box
      display="flex"
      flexWrap="nowrap"
      style={{ whiteSpace: 'nowrap' }}
    >
      {map(items, (item) => (
        <Box key={item.label} mr={0.25}>
          <Button
            {...item}
            variant="contained"
            type="button"
          >
            {renderIcon(item)}
            {t(item.label)}
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default ActionBarDesktop;
