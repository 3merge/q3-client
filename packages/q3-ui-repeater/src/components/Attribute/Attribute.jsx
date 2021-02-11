import React from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import useStyle from '../useStyle';

const Attributes = ({
  component: Component,
  attributes,
  isIn,
}) => {
  const { tableCell, tableCellLabel } = useStyle();
  const { t } = useTranslation('labels');

  if (!Array.isArray(attributes)) return null;

  return attributes.map((attribute) => (
    <TableCell className={tableCell} key={attribute}>
      <Grid alignItems="center" container justify="center">
        <Grid item md={12}>
          <div className={tableCellLabel}>
            {t(attribute)}
          </div>
        </Grid>
        <Grid item data-repeater-editable={attribute}>
          <Component
            editable={isIn(attribute)}
            name={attribute}
          />
        </Grid>
      </Grid>
    </TableCell>
  ));
};

export default Attributes;
