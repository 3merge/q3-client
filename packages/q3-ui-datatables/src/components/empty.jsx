/* eslint-disable no-param-reassign */
import React from 'react';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Graphic from 'q3-ui-assets';
import { withLocation } from 'with-location';
import { object } from 'q3-ui-helpers';

export default withLocation(
  ({ location, navigate, params, getAll }) => {
    const { t } = useTranslation();

    const onClear = () => {
      Object.keys(getAll()).forEach((item) => {
        params.delete(item);
      });

      navigate(get(location, 'pathname', '/'));
    };

    const getClear = () =>
      object.hasKeys(getAll()) ? (
        <Box my={2}>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={onClear}
            size="large"
          >
            {t('labels:clear')}
          </Button>
        </Box>
      ) : null;

    return (
      <Graphic
        icon="Empty"
        title="empty"
        renderBottom={getClear}
      />
    );
  },
);
