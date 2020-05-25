import React from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import useStyle from './useStyle';

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
      <Grid container spacing={2}>
        <Hidden mdUp>
          <Grid item style={{ marginLeft: '0.5rem' }}>
            <Typography
           
              style={{
                fontWeight: 'bold',
               fontSize: '0.75rem'
              }}
            > 
              {t(attribute)}:
               
            </Typography>
          </Grid>
        </Hidden>
        <Grid item>
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
