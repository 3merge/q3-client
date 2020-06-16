import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import RangeDelimiter from '../RangeDelimiter';
import Field from '../../builders/Field';
import { makeRangeNames } from '../../helpers';

export const Range = ({ name, ...props }) => {
  const [from, to] = makeRangeNames(name);
  return (
    <Grid item xs={12}>
      <RangeDelimiter
        leftRenderer={
          <Field
            {...props}
            name={from}
            type="number"
            lg={6}
            xl={6}
          />
        }
        rightRenderer={
          <Field
            {...props}
            name={to}
            type="number"
            lg={6}
            xl={6}
          />
        }
      />
    </Grid>
  );
};

Range.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Range;
