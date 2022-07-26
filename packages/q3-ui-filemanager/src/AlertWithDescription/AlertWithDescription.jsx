import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'q3-ui-locale';

const AlertWithDescription = ({ severity, text }) => {
  const { t } = useTranslation('descriptions');
  return <Alert severity={severity}>{t(text)}</Alert>;
};

AlertWithDescription.propTypes = {
  text: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
};

export default AlertWithDescription;
