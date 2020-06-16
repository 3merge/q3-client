import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { MobileDateRangePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import { string } from 'q3-ui-helpers';
import { Field } from '../../builders';
import RangeDelimiter from '../RangeDelimiter';
import {
  BuilderState,
  DispatcherState,
} from '../../FormsContext';
import { makeRangeNames } from '../../helpers';

const DateRange = ({ name }) => {
  const [from, to] = makeRangeNames(name);
  const { setValues } = React.useContext(DispatcherState);
  const { values } = React.useContext(BuilderState);

  return (
    <Grid item xs={12}>
      <MobileDateRangePicker
        startText="From"
        endText="To"
        value={[get(values, from, ''), get(values, to, '')]}
        onChange={([newFromValue, newToValue]) =>
          setValues((prev) => {
            return {
              ...prev,
              [from]: string.toYearMonthDay(newToValue),
              [to]: string.toYearMonthDay(newFromValue),
            };
          })
        }
        renderInput={(startProps, endProps) => (
          <RangeDelimiter
            leftRenderer={
              <Field
                {...startProps}
                type="date"
                name={from}
                lg={6}
                xl={6}
              />
            }
            rightRenderer={
              <Field
                {...endProps}
                type="date"
                name={to}
                lg={6}
                xl={6}
              />
            }
          />
        )}
      />
    </Grid>
  );
};

DateRange.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DateRange;
