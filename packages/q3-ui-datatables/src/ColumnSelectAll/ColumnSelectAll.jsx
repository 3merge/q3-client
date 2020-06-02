import React from 'react';
import PropTypes from 'prop-types';
import { SelectAll } from 'q3-ui-exports';
import Grid from '@material-ui/core/Grid';
import CellWithCheckbox from '../CellWithCheckbox';
import withSort from '../withSort';

const Label = withSort((props) => (
  <span>{props.title}</span>
));

export const ColumnSelectAll = ({
  ids,
  children,
  ...rest
}) => (
  <CellWithCheckbox
    id="q3-datatable-select"
    component="th"
    style={{
      zIndex: 3,
    }}
    renderCheckbox={<SelectAll ids={ids} />}
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

export default ColumnSelectAll;
