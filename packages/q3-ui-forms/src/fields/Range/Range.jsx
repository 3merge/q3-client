import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { omit } from 'lodash';
import RangeDelimiter from '../RangeDelimiter';
import Field from '../../builders/Field';
import { makeRangeNames } from '../../helpers';

export const Range = ({ name, ...props }) => {
  const [from, to] = makeRangeNames(name);
  const shared = omit(props, [
    'onChange',
    'onArrayPush',
    'onArrayPull',
    'name',
    'label',
    'id',
  ]);

  return (
    <Grid item xs={12}>
      <RangeDelimiter
        leftRenderer={
          <Field
            {...shared}
            name={from}
            type="number"
            lg={6}
            xl={6}
          />
        }
        rightRenderer={
          <Field
            {...shared}
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
