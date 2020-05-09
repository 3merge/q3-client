import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  MobileDateRangePicker,
  DateRangeDelimiter,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import useDecorator from '../helpers/useDecorator';
import TextBase from './TextBase';

const toISO = (v) =>
  v !== undefined ? moment(v).format('YYYY-MM-DD') : v;

export const handleDateChange = (fn, name) => (value) =>
  fn({
    target: {
      name,
      value: toISO(value),
    },
  });

const DateSelect = ({ from, to, ...rest }) => {
  const {
    onChange: onChangeFrom,
    label: startText,
    value: fromValue,
    ...fromDecorators
  } = useDecorator({ ...rest, name: from });

  const {
    value: toValue,
    label: endText,
    onChange: onChangeTo,
    ...toDecorators
  } = useDecorator({
    ...rest,
    name: to,
  });

  return (
    <Grid item xs={12}>
      <MobileDateRangePicker
        startText={startText}
        endText={endText}
        value={[fromValue, toValue]}
        onChange={([newFromValue, newToValue]) => {
          handleDateChange(onChangeTo, to)(newToValue);
          handleDateChange(
            onChangeFrom,
            from,
          )(newFromValue);
        }}
        renderInput={(startProps, endProps) => {
          delete startProps.inputProps;
          delete endProps.inputProps;

          return (
            <Grid
              container
              alignItems="center"
              justify="space-between"
            >
              <TextBase
                {...startProps}
                {...fromDecorators}
                lg={5}
                md={5}
                onChange={onChangeFrom}
                onFocus={startProps.onFocus}
                onBlur={startProps.onBlur}
                label={startText}
                value={toValue}
                type="date"
              />
              <Grid
                item
                xs={1}
                style={{ textAlign: 'center' }}
              >
                <DateRangeDelimiter>
                  <TrendingFlatIcon aria-label="Date range delimiter" />
                </DateRangeDelimiter>
              </Grid>

              <TextBase
                {...endProps}
                {...toDecorators}
                lg={5}
                md={5}
                onChange={onChangeFrom}
                onFocus={endProps.onFocus}
                onBlur={endProps.onBlur}
                label={endText}
                value={toValue}
                type="date"
              />
            </Grid>
          );
        }}
      />
    </Grid>
  );
};

DateSelect.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default DateSelect;
