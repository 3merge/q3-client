import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import {
  Grid,
  MenuItem,
  Tooltip,
  IconButton,
  Menu,
} from '@material-ui/core';
import { get, map, size } from 'lodash';
import { useOpen } from 'useful-state';

const SortForm = ({
  options,
  label,
  value,
  handleChange,
  icon,
}) => {
  const { t } = useTranslation('labels');
  const { open, anchorEl, close, isOpen } = useOpen();

  return (
    <Grid item style={{ width: 'auto' }}>
      <Tooltip
        title={t(get(options, `${value}.label`, label))}
      >
        <span>
          <IconButton
            disabled={!size(options)}
            onClick={open}
          >
            {icon}
          </IconButton>
        </span>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        dense
        onClose={close}
        open={isOpen}
      >
        {map(options, ({ label: key }, i) => (
          <MenuItem
            key={key}
            onClick={() => {
              handleChange({
                target: {
                  value: i,
                },
              });
              close();
            }}
            style={{
              margin: 0,
            }}
          >
            {t(key)}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
};

SortForm.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      fn: PropTypes.func,
    }),
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.element.isRequired,
};

export default SortForm;
