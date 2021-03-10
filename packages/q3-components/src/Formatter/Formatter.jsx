import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { useTranslation } from 'react-i18next';
import { string } from 'q3-ui-helpers';
import { green, red } from '@material-ui/core/colors';
import { Dot, Helper, Status } from '../index';

const Formatter = ({ value }) => {
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

  return formatted || null;
};

export default Formatter;
