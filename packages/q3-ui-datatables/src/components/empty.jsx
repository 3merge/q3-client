/* eslint-disable no-param-reassign */
import React from 'react';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ErrorComponent from 'q3-ui/lib/error';
import { Empty } from 'q3-ui-assets';
import { withLocation } from 'with-location';

export default withLocation(
  ({ location, navigate, params, getAll }) => {
    const { t } = useTranslation();

    const onClear = () => {
      Object.keys(getAll()).forEach((item) => {
        params.delete(item);
      });

      navigate(get(location, 'pathname', '/'));
    };

    // console.log(getAll());

    return (
      <Box
        pt={4}
        pb={2}
        style={{ backgroundColor: '#FFF' }}
      >
        <ErrorComponent title="empty" description="empty">
          <Empty />
        </ErrorComponent>
        <Box mt={-3} pb={4} align="center">
          <Button
            type="button"
            variant="contained"
            color="secondary"
            size="large"
            onClick={onClear}
          >
            {t('labels:clear')}
          </Button>
        </Box>
      </Box>
    );
  },
);
