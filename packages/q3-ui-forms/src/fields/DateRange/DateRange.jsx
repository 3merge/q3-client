/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { MobileDateRangePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { useTranslation } from 'react-i18next';
import { Field } from '../../builders';
import RangeDelimiter, {
  generateSharedProps,
} from '../RangeDelimiter';
import {
  BuilderState,
  DispatcherState,
} from '../../FormsContext';
import {
  makeRangeNames,
  convertToNullish,
} from '../../helpers';
import { formatDate } from '../Date/Date';

const DateRange = ({ name, ...rest }) => {
  const [from, to] = makeRangeNames(name);
  const { setValues, setErrors } = React.useContext(
    DispatcherState,
  );

  const { values, errors } = React.useContext(BuilderState);

  const { t } = useTranslation('labels');
  const shared = generateSharedProps(rest);

  return (
    <Grid item xs={12}>
      <MobileDateRangePicker
        clearable
        disableMaskedInput
        startText="From"
        endText="To"
        value={[
          convertToNullish(get(values, from, '')),
          convertToNullish(get(values, to, '')),
        ]}
        onChange={([newFromValue, newToValue]) => {
          setValues((prev) => {
            return {
              ...prev,
              [from]: formatDate(newFromValue),
              [to]: formatDate(newToValue),
            };
          });
          setErrors((prev) => {
            const next = { ...prev };
            delete next[from];
            delete next[to];
            return next;
          });
        }}
        renderInput={(startProps, endProps) => {
          [startProps, endProps].forEach((p) => {
            p.inputProps.type = 'date';
            delete p.helperText;
            delete p.error;
            delete p.onChange;
            delete p.onBlur;
            delete p.value;
            delete p.ref;
          });

          return (
            <RangeDelimiter
              icon={DateRangeIcon}
              leftRenderer={
                <Field
                  {...shared}
                  {...startProps}
                  error={get(errors, from)}
                  helperText={get(errors, from) || t(name)}
                  type="date"
                  name={from}
                  lg={6}
                  xl={6}
                />
              }
              rightRenderer={
                <Field
                  {...shared}
                  {...endProps}
                  error={get(errors, to)}
                  helperText={get(errors, to) || t(name)}
                  icon={DateRangeIcon}
                  type="date"
                  name={to}
                  lg={6}
                  xl={6}
                />
              }
            />
          );
        }}
      />
    </Grid>
  );
};

DateRange.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DateRange;
