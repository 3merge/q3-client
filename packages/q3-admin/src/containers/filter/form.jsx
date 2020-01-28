import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Form as Q3Form } from 'q3-ui-forms/lib/builders';
import SubmitActions from './submitActions';

const Form = ({ children, ...rest }) => {
  const { t } = useTranslation();
  return (
    <Box position="sticky" top="0">
      <Q3Form {...rest}>
        <Typography variant="h5" component="h3">
          {t('titles:narrowSearch')}
        </Typography>
        {children}
        <SubmitActions />
      </Q3Form>
    </Box>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
  ]).isRequired,
};

export default Form;
