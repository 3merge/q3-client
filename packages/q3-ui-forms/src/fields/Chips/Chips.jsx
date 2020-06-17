import React from 'react';
import PropTypes from 'prop-types';
import { get, pick } from 'lodash';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { chosenTextFieldDisplayAttributes } from '../TextBase/TextBase';
import { useOptions } from '../../hooks';
import { getLabelWithFallback } from '../helpers';
import withGrid from '../withGrid';
import withState from '../withState';
import {
  getCustomInput,
  filterOptions,
} from '../Autocomplete/Autocomplete';

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
  } = props;

  const getTags = (values = []) => {
    if (!Array.isArray(values)) return [];

    return values
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
  };

  return (
    <Autocomplete
      {...chosenTextFieldDisplayAttributes}
      {...pick(props, [
        'disabled',
        'label',
        'name',
        'onChange',
        'readOnly',
        'required',
      ])}
      defaultValue={Array.isArray(value) ? value : [value]}
      multiple
      options={items}
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

export default withGrid(withState(Chips), {
  lg: 12,
  xl: 12,
});
