import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

const MultiSelectMenuItem = React.forwardRef(
  ({ label, inputValue, vars, ...etc }, ref) => {
    const { t } = useTranslation('labels');

    return (
      <MenuItem
        ref={ref}
        key={label}
        style={{ margin: 0, padding: 0 }}
        {...etc}
      >
        <Checkbox
          checked={
            inputValue.indexOf(etc['data-value']) > -1
          }
        />
        <ListItemText primary={t(label, vars)} />
      </MenuItem>
    );
  },
);

MultiSelectMenuItem.defaultProps = {
  inputValue: '',
  vars: {},
};

MultiSelectMenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  inputValue: PropTypes.arrayOf(PropTypes.string),
  // eslint-disable-next-line
  vars: PropTypes.any,
};

export default MultiSelectMenuItem;
