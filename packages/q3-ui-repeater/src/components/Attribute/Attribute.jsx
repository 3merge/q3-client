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
  const { tableCell } = useStyle();
  const { t } = useTranslation('labels');

  if (!Array.isArray(attributes)) return null;

  return attributes.map((attribute) => (
    <TableCell className={tableCell} key={attribute}>
      <Grid alignItems="center" container justify="center">
        <Grid item md={12}>
          <div
            style={{
              fontSize: '.624rem',
              fontWeight: 'bold',
              color: '#a8a8a8',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
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
