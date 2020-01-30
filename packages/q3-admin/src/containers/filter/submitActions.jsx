import React from 'react';
import PropTypes from 'prop-types';
import flat from 'flat';
import { useTranslation } from 'react-i18next';
import { connect } from 'formik';
import { withLocation } from 'with-location';
import Box from '@material-ui/core/Box';
import SplitButton from 'q3-ui/lib/splitButton';
import { goTo } from './utils';

export const SubmitActions = ({
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
              Object.keys(
                flat(values, { safe: true }),
              ).forEach((v) => params.delete(v));

              return goTo(status, params);
            },
          },
        ]}
      />
    </Box>
  );
};

SubmitActions.propTypes = {
  /**
   * Injected by formik
   */
  formik: PropTypes.shape({
    status: PropTypes.string,
    submitForm: PropTypes.func,
    isSubmitting: PropTypes.bool,
    values: PropTypes.object,
  }).isRequired,

  /**
   * Injected by with-location
   */
  params: PropTypes.shape({
    delete: PropTypes.func,
  }).isRequired,
};

export default withLocation(connect(SubmitActions));
