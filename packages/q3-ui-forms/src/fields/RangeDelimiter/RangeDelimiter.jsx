import React from 'react';
import PropTypes from 'prop-types';
import { merge, omit } from 'lodash';
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

      '& svg': {
        marginRight: 6,

        [theme.breakpoints.down('sm')]: {
          marginRight: 0,
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
}));

export const generateSharedProps = (props) =>
  omit(JSON.parse(JSON.stringify(props)), [
    'name',
    'label',
    'id',
  ]);

const RangeDelimiter = ({
  leftRenderer,
  rightRenderer,
  icon,
}) => {
  const cls = useStyle();
  const theme = useTheme();
  const mobile = useMediaQuery(
    theme.breakpoints.down('sm'),
  );

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      spacing={mobile ? 1 : 0}
      style={{ position: 'relative' }}
      className={cls.root}
    >
      {React.cloneElement(leftRenderer, {
        override: () => ({
          icon: mobile
            ? icon
            : (props) => (
                <TrendingFlatIcon
                  {...merge(props, {
                    style: {
                      marginRight: '-1rem',
                    },
                  })}
                />
              ),
        }),
      })}
      {rightRenderer}
    </Grid>
  );
};

RangeDelimiter.propTypes = {
  leftRenderer: PropTypes.node.isRequired,
  rightRenderer: PropTypes.node.isRequired,
};

export default RangeDelimiter;
