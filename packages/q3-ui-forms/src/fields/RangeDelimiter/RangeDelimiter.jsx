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
  root: {
    '& > div:first-of-type': {
      '& fieldset': {
        borderRightWidth: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,

        [theme.breakpoints.down('sm')]: {
          borderRightWidth: 1,
          borderTopRightRadius: 'inherit',
          borderBottomRightRadius: 'inherit',
        },
      },
    },

    '& > div:last-of-type': {
      '& fieldset': {
        borderLeftWidth: 0,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,

        [theme.breakpoints.down('sm')]: {
          borderLeftWidth: 1,
          borderBottomLeftRadius: 'inherit',
          borderTopLeftRadius: 'inherit',
        },
      },
    },
  },
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
      spacing={matches ? 1 : 0}
      style={{ position: 'relative' }}
      className={cls.root}
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
