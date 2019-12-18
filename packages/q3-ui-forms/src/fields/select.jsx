import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Collapse from '@material-ui/core/Collapse';
import useOptions from '../helpers/useOptions';
import useDecorator from '../helpers/useDecorator';

export const SelectWrapper = ({
  name,
  label,
  children,
  helperText,
  ...rest
}) => (
  <FormControl variant="filled" fullWidth {...rest}>
    <InputLabel htmlFor={name}>{label}</InputLabel>
    {children}
    <Collapse in={Boolean(helperText)}>
      <FormHelperText>{helperText}</FormHelperText>
    </Collapse>
  </FormControl>
);

SelectWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const NativeSelect = (props) => {
  const { t } = useTranslation();
  const [{ name, onChange, value }, { error }] = useField(
    props,
  );

  const { loading, items } = useOptions(props);
  const { label, helperText, ...rest } = useDecorator(
    props,
  );

  return (
    <SelectWrapper
      name={name}
      label={label}
      helperText={helperText}
      error={Boolean(error)}
    >
      <Select
        {...rest}
        native
        disableUnderline
        onChange={onChange}
        value={value}
      >
        <option>
          {loading
            ? `${t('labels:loading')}...`
            : t('labels:none')}
        </option>
        {items.map((obj) => (
          <option key={obj.value} value={obj.value}>
            {t(`labels:${obj.label}`)}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  );
};

NativeSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

NativeSelect.defaultProps = {
  options: [],
};

export default NativeSelect;
