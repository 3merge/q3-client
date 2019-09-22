import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import Tile from '../tile';

const FormWrapper = ({
  children,
  title,
  description,
  ...rest
}) => {
  const { t } = useTranslation();
  return (
    <Formik
      {...rest}
      enableReinitialize
      validateOnChange={false}
      render={(utils) => (
        <Form>
          <Tile
            title={t(`titles:${title}`)}
            summary={t(`descriptions:${title}`)}
            loading={utils.isSubmitting}
            renderFooter={() => (
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
              >
                {t('labels:submit')}
              </Button>
            )}
          >
            {children(utils)}
          </Tile>
        </Form>
      )}
    />
  );
};

FormWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FormWrapper;
