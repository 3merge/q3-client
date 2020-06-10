import React from 'react';
import PropTypes from 'prop-types';
import { DateRangeDelimiter } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import {
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyle = makeStyles((theme) => ({
  delimiter: {
    position: 'absolute',
    transform: 'translate(-50%, -50%) scale(0.8)',
    top: '50%',
    left: '50%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const RangeDelimiter = ({
  leftRenderer,
  rightRenderer,
}) => {
  const cls = useStyle();
  const theme = useTheme();
  const matches = useMediaQuery(
    theme.breakpoints.down('sm'),
  );

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      spacing={matches ? 1 : 3}
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
