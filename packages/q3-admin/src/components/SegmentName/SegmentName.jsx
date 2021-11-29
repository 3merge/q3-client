import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { chosenTextFieldDisplayAttributes } from 'q3-ui-forms/lib/fields/TextBase/TextBase';
import { useValue } from 'useful-state';

const SegmentName = ({ children, name }) => {
  const { t } = useTranslation();
  const { value, onChange } = useValue(name);

  return children(value, () => (
    <Box mt={1}>
      <TextField
        name="Filter name"
        label={t('labels:name')}
        value={value}
        onChange={onChange}
        {...chosenTextFieldDisplayAttributes}
      />
    </Box>
  ));
};

SegmentName.propTypes = {
  children: PropTypes.func.isRequired,
  name: PropTypes.string,
};

SegmentName.defaultProps = {
  name: '',
};

export default SegmentName;
