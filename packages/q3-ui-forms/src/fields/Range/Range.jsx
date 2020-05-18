import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useDecorator from '../../helpers/useDecorator';
import TextBase from '../TextBase';
import RangeDelimiter from '../RangeDelimiter';

export const Range = (props) => {
  const { name, encode, ...rest } = props;
  const from = encode ? `${name}%3E` : `${name}>`;
  const to = encode ? `${name}%3C` : `${name}<`;

  const fromDeco = useDecorator({
    name: from,
    ...rest,
  });

  const toDeco = useDecorator({
    name: to,
    ...rest,
  });

  return (
    <Grid item xs={12}>
      <RangeDelimiter
        leftRenderer={
          <TextBase
            {...fromDeco}
            lg={6}
            xl={6}
            type="number"
          />
        }
        rightRenderer={
          <TextBase
            {...toDeco}
            lg={6}
            xl={6}
            type="number"
          />
        }
      />
    </Grid>
  );
};

Range.propTypes = {
  encode: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

Range.defaultProps = {
  encode: false,
};

export default Range;
