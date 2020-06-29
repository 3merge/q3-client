/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { MobileDateRangePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { omit } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Field } from '../../builders';
import RangeDelimiter from '../RangeDelimiter';
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
  const { setValues } = React.useContext(DispatcherState);
  const { values } = React.useContext(BuilderState);

  const { t } = useTranslation('labels');
  const shared = omit(rest, [
    'onChange',
    'onArrayPush',
    'onArrayPull',
    'name',
    'label',
    'id',
  ]);

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
        onChange={([newFromValue, newToValue]) =>
          setValues((prev) => {
            return {
              ...prev,
              [from]: formatDate(newFromValue),
              [to]: formatDate(newToValue),
            };
          })
        }
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
                  type="date"
                  helperText={t(name)}
                  name={from}
                  lg={6}
                  xl={6}
                />
              }
              rightRenderer={
                <Field
                  {...shared}
                  {...endProps}
                  icon={DateRangeIcon}
                  type="date"
                  helperText={t(name)}
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
