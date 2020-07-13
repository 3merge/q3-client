import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const FormBoxContent = ({ title, description }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h1" gutterBottom>
        {t(`titles:${title}`)}
      </Typography>
      <Typography gutterBottom>
        {t(`descriptions:${description}`)}
      </Typography>
    </>
  );
};

FormBoxContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FormBoxContent;
