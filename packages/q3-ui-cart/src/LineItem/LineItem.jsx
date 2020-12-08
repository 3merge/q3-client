/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import { string } from 'q3-ui-helpers';
import { CartContext } from '../context';
import { DRAWER_LINE_ITEM_CLASS } from '../constants';
import LineItemRemove from '../LineItemRemove';
import LineItemToggle from '../LineItemToggle';

const LineItem = ({ children }) => {
  const { items = [] } = React.useContext(CartContext);
  const { t } = useTranslation('labels');

  const rows = React.useMemo(
    () =>
      items.map((item) => {
        const {
          id,
          product,
          price,
          name,
          img,
          subtotal,
          quantity,
          description,
          disabled,
        } = item;

        const renderer = children ? children(item) : null;

        return (
          <React.Fragment key={id}>
            <TableRow className={DRAWER_LINE_ITEM_CLASS}>
              <TableCell>
                <Grid
                  container
                  spacing={2}
                  style={{ padding: '1rem 0' }}
                >
                  <Grid
                    aria-hidden
                    item
                    style={{
                      width: 'auto',
                    }}
                  >
                    <Avatar variant="rounded">
                      <img src={img} alt={product} />
                    </Avatar>
                  </Grid>
                  <Grid item md xs={12}>
                    <strong>{name}</strong>
                    <br /> {description}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>{string.toPrice(price)}</TableCell>
              <TableCell>
                <LineItemToggle
                  id={id}
                  product={product}
                  quantity={quantity}
                  price={price}
                  disabled={disabled}
                  helperText={`Subtotal ${string.toPrice(
                    subtotal,
                  )}`}
                />
              </TableCell>
              <TableCell>
                <LineItemRemove id={id} product={product} />
              </TableCell>
            </TableRow>
            {renderer && (
              <TableRow>
                <TableCell colspan={5}>
                  {renderer}
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        );
      }),
    [JSON.stringify(items)],
  );

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell component="th">
            {t('product')}
          </TableCell>
          <TableCell component="th">{t('price')}</TableCell>
          <TableCell component="th">{t('qty')}</TableCell>
          <TableCell
            component="th"
            aria-label={t('actions')}
          />
        </TableRow>
      </TableHead>
      <TableBody>{rows}</TableBody>
    </Table>
  );
};

LineItem.defaultProps = {
  children: null,
};

LineItem.propTypes = {
  children: PropTypes.func,
};

export default LineItem;
