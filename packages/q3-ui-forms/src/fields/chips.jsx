import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { chosenTextFieldDisplayAttributes } from './TextBase/TextBase';
import useOptions from '../helpers/useOptions';
import { getLabelWithFallback } from './helpers';
import useDecorator from '../helpers/useDecorator';
import withGrid, { fieldProps } from './withGrid';
import {
  getCustomInput,
  filterOptions,
} from './autocomplete';

const AbstractedAutoComplete = ({
  items,
  handleChange,
  inputValue,
  loading,
  ...props
}) => {
  const { t } = useTranslation('labels');
  const {
    label,
    helperText,
    onChange,
    error,
    name,
    value,
  } = useDecorator(props);

  const getTags = (values = []) =>
    values
      .map((v) => {
        if (!items.length) return get(v, 'label', v);

        const match = items.find((item) => {
          const compare =
            typeof v !== 'object' ? v : v.value;

          return typeof item === 'string'
            ? String(item) === String(compare)
            : String(item.value) === String(compare);
        });

        return get(match, 'label', match);
      })
      .filter(Boolean);

  return (
    <Autocomplete
      {...props}
      {...chosenTextFieldDisplayAttributes}
      multiple
      name={name}
      options={items}
      defaultValue={[value].flat()}
      inputValue={inputValue}
      loading={loading}
      filterOptions={filterOptions(props)}
      getOptionLabel={getLabelWithFallback(value)}
      renderInput={getCustomInput({
        label,
        helperText,
        error: Boolean(error),
        variant: 'outlined',
        fullWidth: true,
      })}
      renderTags={(values, getTagProps) =>
        getTags(values).map((option, index) => (
          <Chip
            label={t(option)}
            disabled={index === 0}
            size="small"
            {...getTagProps({ index })}
          />
        ))
      }
      onInputChange={(event, newInputValue) => {
        handleChange(newInputValue);
      }}
      onChange={(event, newValue) =>
        onChange({
          target: {
            value: newValue
              .map((o) => get(o, 'value', o))
              .filter(Boolean),
            name,
          },
        })
      }
    />
  );
};

const Chips = (props) => {
  const {
    loading,
    items = [],
    value,
    setValue,
  } = useOptions({
    minimumCharacterCount: 1,
    ...props,
  });

  return (
    <AbstractedAutoComplete
      {...props}
      items={items}
      handleChange={setValue}
      loading={loading}
      inputValue={value}
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
  xl: 12,
});
