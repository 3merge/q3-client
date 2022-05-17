import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { useTranslation } from 'q3-ui-locale';
import { string } from 'q3-ui-helpers';
import { Dot, Helper, Status } from 'q3-components';
import { green, red } from '@material-ui/core/colors';
import CellExpansion from '../CellExpansion';

const Cell = ({ id, value, className, ...props }) => {
  const { t } = useTranslation('labels');
  let formatted = value;

  if (
    value !== null &&
    typeof value === 'object' &&
    'base' in value
  ) {
    const args =
      typeof value.renderProps === 'function'
        ? value.renderProps(value)
        : value.renderProps;

    if (value.toString) formatted = String(value.base);

    if (value.toTruthy) {
      formatted = string.toTruthy(value.base, t);
    }

    if (value.toDate) formatted = string.toDate(value.base);

    if (value.toPrice)
      formatted = string.toPrice(value.base);
    if (value.trans) formatted = t(value.base);

    if (value.toCheck) {
      formatted = string.strToBool(value.base) ? (
        <CheckIcon htmlColor={green[500]} {...args} />
      ) : (
        <ClearIcon htmlColor={red[500]} {...args} />
      );
    }

    if (value.toChip)
      formatted = <Status label={formatted} {...args} />;

    if (value.toDot)
      formatted = <Dot label={formatted} {...args} />;

    if (value.helperText)
      formatted = (
        <Helper
          label={formatted}
          helperText={value.helperText}
        />
      );

    if (value.toAction)
      formatted = (
        <IconButton
          color="secondary"
          size="small"
          {...args}
        >
          {React.createElement(value.icon)}
        </IconButton>
      );

    if (!formatted) formatted = '--';
  }

  return (
    <TableCell {...props} id={id} className={className}>
      <div
        style={
          value.long
            ? {
                padding: '0.75rem',
                whiteSpace: 'break-spaces',
                minWidth: 275,
              }
            : {}
        }
      >
        {formatted}
      </div>
    </TableCell>
  );
};

export default Cell;
