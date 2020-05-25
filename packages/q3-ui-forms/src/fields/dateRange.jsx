import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  MobileDateRangePicker,
  DateRangeDelimiter,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { makeStyles } from '@material-ui/core/styles';
import useDecorator from '../helpers/useDecorator';
import TextBase from './TextBase';
import RangeDelimiter from './RangeDelimiter';

const useStyle = makeStyles((theme) => ({
  delimiter: {
    position: 'absolute',
    transform: 'translate(-50%, -50%) scale(0.8)',
    top: '50%',
    left: '50%',
    [theme.breakpoints.down('md')]: {
      transform:
        'translate(-50%, -50%) scale(0.8) rotate(90deg)',
    },
  },
}));

const toISO = (v) =>
  v !== undefined && v !== null
    ? moment(v).format('YYYY-MM-DD')
    : '';

export const handleDateChange = (fn, name) => (value) =>
  fn({
    target: {
      name,
      value: toISO(value),
    },
  });

const DateSelect = ({ from, to, ...rest }) => {
  const cls = useStyle();
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
            <RangeDelimiter
              leftRenderer={
                <TextBase
                  {...startProps}
                  {...fromDecorators}
                  lg={6}
                  xl={6}
                  onChange={onChangeFrom}
                  onFocus={startProps.onFocus}
                  onBlur={startProps.onBlur}
                  label={startText}
                  value={fromValue}
                  type="date"
                />
              }
              rightRenderer={
                <TextBase
                  {...endProps}
                  {...toDecorators}
                  lg={6}
                  xl={6}
                  onChange={onChangeFrom}
                  onFocus={endProps.onFocus}
                  onBlur={endProps.onBlur}
                  label={endText}
                  value={toValue}
                  type="date"
                />
              }
            />
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
