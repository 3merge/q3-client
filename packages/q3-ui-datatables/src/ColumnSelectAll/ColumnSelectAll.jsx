import React from 'react';
import PropTypes from 'prop-types';
import { SelectAll } from 'q3-ui-exports';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CellWithCheckbox from '../CellWithCheckbox';
import withSort from '../withSort';

const useStyle = makeStyles((theme) => ({
  root: {
    zIndex: '4 !important',
    position: 'sticky',
    left: '0 !important',

    [theme.breakpoints.down('sm')]: {
      left: 'auto !important',
    },
  },
}));

const Label = withSort((props) => (
  <span>{props.title}</span>
));

export const ColumnSelectAll = ({
  ids,
  children,
  ...rest
}) => {
  const { root } = useStyle();
  return (
    <CellWithCheckbox
      id="q3-datatable-select"
      component="th"
      className={root}
      renderCheckbox={
        <span style={{ marginLeft: -8 }}>
          <SelectAll ids={ids} />
        </span>
      }
      renderContent={
        <>
          <Grid item>{children}</Grid>
          <Grid item>
            <Label {...rest} />
          </Grid>
        </>
      }
      variant="head"
    />
  );
};
export default ColumnSelectAll;
