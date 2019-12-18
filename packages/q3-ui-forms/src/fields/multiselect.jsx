import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { SelectWrapper } from './select';
import useOptions from '../helpers/useOptions';
import useDecorator from '../helpers/useDecorator';

const Multiselect = (props) => {
  const {
    id,
    name,
    label,
    helperText,
    onArrayPush,
    value = [],
    ...rest
  } = useDecorator(props);

  const { t } = useTranslation();
  const { loading, items } = useOptions(props);

  return (
    <SelectWrapper
      name={name}
      label={label}
      helperText={helperText}
      {...props}
    >
      <Select
        {...rest}
        multiple
        value={Array.isArray(value) ? value.flat() : []}
        onChange={onArrayPush}
        input={
          <FilledInput
            disableUnderline
            endAdornment={
              loading && (
                <CircularProgress
                  size={18}
                  style={{ marginRight: 15 }}
                />
              )
            }
          />
        }
        MenuProps={{
          PaperProps: {
            elevation: 3,
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          },
        }}
        renderValue={(selected) => selected.join(', ')}
      >
        {items.map((obj) => (
          <MenuItem
            dense
            key={obj.value}
            value={obj.value}
            style={{ margin: 0 }}
          >
            <Checkbox
              checked={value.indexOf(obj.value) > -1}
            />
            <ListItemText
              primary={t(`labels:${obj.label}`)}
            />
          </MenuItem>
        ))}
      </Select>
    </SelectWrapper>
  );
};

Multiselect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

Multiselect.defaultProps = {
  options: [],
};

export default Multiselect;
