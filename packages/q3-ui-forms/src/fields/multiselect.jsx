import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import useOptions from '../helpers/useOptions';
import useDecorator from '../helpers/useDecorator';
import TextBase from './TextBase';

const Multiselect = (props) => {
  const {
    name,
    label,
    helperText,
    onArrayPush,
    readOnly,
    disabled,
    error,
    value = [],
    required,
    ...deco
  } = useDecorator(props);

  const v = Array.isArray(value) ? value.flat() : [];
  const { t } = useTranslation();
  const { loading, items } = useOptions({
    minimumCharacterCount: 0,
    ...props,
    ...deco,
  });

  return (
    <TextBase
      select
      name={name}
      label={label}
      error={error}
      readOnly={readOnly}
      disabled={disabled}
      helperText={helperText}
      required={required}
      value={v}
      onChange={onArrayPush}
      loading={loading}
      SelectProps={{
        multiple: true,
        renderValue: (selected) => selected.join(', '),
      }}
    >
      {items.map((obj) => (
        <MenuItem
          key={obj.value}
          value={obj.value}
          style={{ margin: 0, padding: 0 }}
        >
          <Checkbox checked={v.indexOf(obj.value) > -1} />
          <ListItemText
            primary={t(`labels:${obj.label}`, obj.vars)}
          />
        </MenuItem>
      ))}
    </TextBase>
  );
};

export default Multiselect;
