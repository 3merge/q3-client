import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { array } from 'q3-ui-helpers';
import { chosenTextFieldDisplayAttributes } from '../TextBase/TextBase';
import { useOptions } from '../../hooks';
import { getLabelWithFallback } from '../helpers';
import withGrid from '../withGrid';
import withState from '../withState';
import {
  controlSearchFilter,
  getCustomInput,
  filterOptions,
  pickFromProps,
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
        if (typeof v === 'string') return v;
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
      {...controlSearchFilter(props)}
      {...pickFromProps(props)}
      multiple
      options={items}
      loading={loading}
      value={array.is(value)}
      filterOptions={filterOptions(props)}
      getOptionLabel={getLabelWithFallback(value)}
      renderInput={getCustomInput({
        label,
        helperText,
        error: Boolean(error),
        variant: 'outlined',
        fullWidth: true,
      })}
      renderTags={(values, getTagProps) => {
        return getTags(values).map((option, index) => (
          <Chip
            label={t(option)}
            disabled={index === 0}
            size="small"
            {...getTagProps({ index })}
          />
        ));
      }}
      onInputChange={(event, newInputValue) => {
        handleChange(newInputValue);
      }}
    />
  );
};

AbstractedAutoComplete.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  ),

  handleChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  loading: PropTypes.bool,
};

AbstractedAutoComplete.defaultProps = {
  items: [],
  inputValue: '',
  loading: false,
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
    PropTypes.oneOfType([
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
      PropTypes.string,
    ]),
  ),
};

Chips.defaultProps = {
  options: [],
};

export default withGrid(withState(Chips), {
  lg: 12,
  xl: 12,
});
