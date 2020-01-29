import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'formik';
import { withLocation } from 'with-location';
import Box from '@material-ui/core/Box';
import SplitButton from 'q3-ui/lib/splitButton';
import { goTo } from './utils';

export default withLocation(
  connect(
    ({
      formik: { status, submitForm, isSubmitting, values },
      params,
    }) => {
      const { t } = useTranslation();

      return (
        <Box mt={1}>
          <SplitButton
            size="normal"
            color="secondary"
            loading={isSubmitting}
            options={[
              {
                label: t('labels:apply'),
                description: t('labels:applyAndSave'),
                handler: submitForm,
              },

              {
                label: t('labels:reset'),
                description: t('descriptions:reset'),
                handler: () => {
                  Object.keys(values).forEach((v) =>
                    params.delete(v),
                  );

                  return goTo(status, params);
                },
              },
            ]}
          />
        </Box>
      );
    },
  ),
);
/*
              {
                label: t('labels:applyAndSave'),
                description: t('descriptions:applyAndSave'),
                handler: submitForm,
              }, */
