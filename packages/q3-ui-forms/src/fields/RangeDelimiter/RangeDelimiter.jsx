import React from 'react';
import PropTypes from 'prop-types';
import { DateRangeDelimiter } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { makeStyles } from '@material-ui/core/styles';

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

const RangeDelimiter = ({
  leftRenderer,
  rightRenderer,
}) => {
  const cls = useStyle();

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      spacing={3}
      style={{ position: 'relative' }}
    >
      {leftRenderer}
      <Grid className={cls.delimiter}>
        <DateRangeDelimiter>
          <TrendingFlatIcon aria-label="Range delimiter" />
        </DateRangeDelimiter>
      </Grid>

      {rightRenderer}
    </Grid>
  );
};

RangeDelimiter.propTypes = {
  leftRenderer: PropTypes.node.isRequired,
  rightRenderer: PropTypes.node.isRequired,
};

export default RangeDelimiter;
