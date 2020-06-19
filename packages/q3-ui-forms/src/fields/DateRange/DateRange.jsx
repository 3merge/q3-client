/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { MobileDateRangePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import { string } from 'q3-ui-helpers';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
  const isBiggerThanPhone = useMediaQuery(
    '(min-width:960px)',
  );

  return (
    <Grid item xs={12}>
      <MobileDateRangePicker
        clearable
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
          delete startProps.helperText;
          delete startProps.error;

          delete endProps.helperText;
          delete endProps.error;

          startProps.inputProps.type = 'date';
          endProps.inputProps.type = 'date';

          return (
            <RangeDelimiter
              leftRenderer={
                <Field
                  {...rest}
                  {...startProps}
                  override={() => ({
                    hideIcon: isBiggerThanPhone,
                  })}
                  type="date"
                  name={from}
                  lg={6}
                  xl={6}
                />
              }
              rightRenderer={
                <Field
                  {...rest}
                  {...endProps}
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
