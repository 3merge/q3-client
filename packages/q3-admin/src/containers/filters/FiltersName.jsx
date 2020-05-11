import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { chosenTextFieldDisplayAttributes } from 'q3-ui-forms/lib/fields/TextBase/TextBase';
import { useValue } from 'useful-state';

const FiltersForm = ({ children, name }) => {
  const { t } = useTranslation();
  const { value, onChange } = useValue(name);

  return children(value, () => (
    <Box mt={2}>
      <TextField
        name="Filter name"
        label={t('labels:filterName')}
        value={value}
        helperText={t('helpers:filterName')}
        onChange={onChange}
        {...chosenTextFieldDisplayAttributes}
      />
    </Box>
  ));
};

FiltersForm.propTypes = {
  children: PropTypes.func.isRequired,
  name: PropTypes.string,
};

FiltersForm.defaultProps = {
  name: '',
};

export default FiltersForm;
