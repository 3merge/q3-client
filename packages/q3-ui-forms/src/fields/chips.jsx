import React from 'react';
import PropTypes from 'prop-types';
import { get, merge } from 'lodash';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { chosenTextFieldDisplayAttributes } from './TextBase/TextBase';
import useOptions from '../helpers/useOptions';
import {
  simulateEventHandler,
  getLabelWithFallback,
} from './helpers';
import useDecorator from '../helpers/useDecorator';
import withGrid, { fieldProps } from './withGrid';

const Chips = (props) => {
  const { t } = useTranslation('labels');
  const {
    label,
    helperText,
    onChange,
    error,
    name,
    value,
  } = useDecorator(props);

  const { loading, items = [] } = useOptions({
    minimumCharacterCount: 0,
    ...props,
  });

  const getTags = (values = []) =>
    values
      .map((v) => {
        const match = items.find((item) => {
          const compare =
            typeof v !== 'object' ? v : v.value;

          return typeof item === 'string'
            ? item === compare
            : item.value === compare;
        });

        return get(match, 'label', match);
      })
      .filter(Boolean);

  return (
    <Autocomplete
      {...props}
      multiple
      loading={loading}
      filterSelectedOptions
      name={name}
      value={value}
      options={items}
      getOptionLabel={getLabelWithFallback(value)}
      onChange={(e, newValue) => {
        return onChange({
          target: {
            value: newValue.map((o) => get(o, 'value', o)),
            name,
          },
        });
      }}
      renderTags={(values, getTagProps) =>
        getTags(values).map((option, index) => (
          <Chip
            size="small"
            label={t(option)}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...merge(
            params,
            chosenTextFieldDisplayAttributes,
          )}
          label={label}
          helperText={helperText}
          error={error}
          value={value}
          name={name}
        />
      )}
    />
  );
};

Chips.propTypes = {
  ...fieldProps,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};

Chips.defaultProps = {
  options: [],
};

export default withGrid(Chips, {
  lg: 12,
  md: 12,
});
