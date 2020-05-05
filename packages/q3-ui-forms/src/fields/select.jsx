import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Collapse from '@material-ui/core/Collapse';
import CircularProgress from '@material-ui/core/CircularProgress';
import useOptions from '../helpers/useOptions';
import withGrid from './withGrid';

export const SelectWrapper = ({
  name,
  label,
  children,
  helperText,
  ...rest
}) => {
  return (
    <FormControl
      variant="outlined"
      size="small"
      fullWidth
      {...rest}
    >
      {label && (
        <InputLabel htmlFor={name}>{label}</InputLabel>
      )}
      {children}
      <Collapse in={Boolean(helperText)}>
        <FormHelperText>{helperText}</FormHelperText>
      </Collapse>
    </FormControl>
  );
};

SelectWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  children: PropTypes.node.isRequired,
};

SelectWrapper.defaultProps = {
  helperText: null,
};

const NativeSelect = (props) => {
  const { t } = useTranslation();

  const {
    label,
    helperText,
    disabled,
    readOnly,
    onChange,
    name,
    value,
    error,
    required,
    ...rest
  } = props;

  const { loading, items } = useOptions({
    minimumCharacterCount: 0,
    loadOptionsPlainly: true,
    ...props,
  });

  return (
    <SelectWrapper
      label={label}
      helperText={helperText}
      error={Boolean(error)}
      required={required}
    >
      <Select
        {...rest}
        native
        name={name}
        labelId="label"
        value={items.length ? value : ''}
        disabled={disabled}
        readOnly={readOnly}
        IconComponent={
          loading
            ? () => (
                <Box mr={1}>
                  <CircularProgress size="12px" />
                </Box>
              )
            : undefined
        }
        onChange={onChange}
        inputProps={{
          name: 'age',
          id: name,
        }}
      >
        <option
          value=""
          aria-label={t('labels:unselected')}
        />
        {items.map((obj) => (
          <option key={obj.value} value={obj.value}>
            {t(`labels:${obj.label}`, obj.vars)}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  );
};

export default withGrid(NativeSelect);
