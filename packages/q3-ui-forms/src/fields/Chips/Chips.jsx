import React from 'react';
import PropTypes from 'prop-types';
import { get, uniqBy } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { array, object } from 'q3-ui-helpers';
import { chosenTextFieldDisplayAttributes } from '../TextBase/TextBase';
import { useOptions } from '../../hooks';
import { getLabelWithFallback } from '../helpers';
import withGrid from '../withGrid';
import withState from '../withState';
import {
  compareOptionValueToState,
  controlSearchFilter,
  getCustomInput,
  filterOptions,
  pickFromProps,
} from '../Autocomplete/Autocomplete';

const getFromValue = (prop) => (val) =>
  typeof val === 'object' ? val[prop] : val;

export const getValueLabel = getFromValue('label');
export const getValueEntry = getFromValue('value');

export const checkCurrentState = (currentState = []) => ({
  getSelectedOptions: (option) =>
    currentState.some((val) =>
      compareOptionValueToState(option, getValueEntry(val)),
    ),

  getTags: (options = []) => {
    if (!Array.isArray(currentState)) return [];
    if (!Array.isArray(options)) return currentState;

    const formatStateValue = (singleStateValue) => {
      const context = {
        get original() {
          return getValueLabel(singleStateValue);
        },

        get populate() {
          const match = options.find((item) =>
            compareOptionValueToState(
              item,
              getValueEntry(singleStateValue),
            ),
          );

          return get(match, 'label', match);
        },

        exec() {
          // determines if the tag requires a label
          // think of when the value is an ObjectId but has no human-friendly text
          // typically, this only works for preload
          return typeof singleStateValue === 'string' ||
            object.isIn(singleStateValue, 'label')
            ? this.original
            : this.populate;
        },
      };

      return context.exec();
    };

    return currentState
      .map(formatStateValue)
      .filter(Boolean);
  },
});

export const matchFreeSoloWithOptions =
  (items = [], next) =>
  (v, newValue) => {
    const formatted = newValue.map((val) => {
      if (typeof val === 'string')
        return (
          items.find((item) =>
            compareOptionValueToState(item, val),
          ) || {
            label: val,
            value: val,
          }
        );

      return val;
    });

    return next(v, uniqBy(formatted, 'value'));
  };

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
    required,
  } = props;

  const currentState = array.is(value);
  const check = checkCurrentState(currentState);

  return (
    <Autocomplete
      {...chosenTextFieldDisplayAttributes}
      {...controlSearchFilter(props)}
      {...pickFromProps(props)}
      onChange={matchFreeSoloWithOptions(items, onChange)}
      multiple
      options={items}
      loading={loading}
      value={currentState}
      filterOptions={filterOptions(props)}
      getOptionLabel={getLabelWithFallback(value)}
      getOptionSelected={check.getSelectedOptions}
      renderInput={getCustomInput({
        label,
        helperText,
        error: Boolean(error),
        variant: 'outlined',
        fullWidth: true,
        value: inputValue,
        required,
        // inputValue,
      })}
      renderTags={(values, getTagProps) =>
        check
          .getTags(items)
          .map((option, index) => (
            <Chip
              label={t(option)}
              disabled={index === 0}
              size="small"
              {...getTagProps({ index })}
            />
          ))
      }
      //  inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        if (event) handleChange(newInputValue);
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

export default withGrid(withState(Chips));
