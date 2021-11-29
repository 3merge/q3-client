import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { green, red } from '@material-ui/core/colors';

export const NewPasswordHelperText = ({
  name,
  value,
  re,
}) => {
  const { t } = useTranslation('helpers');
  let passed =
    typeof re === 'function' ? re(value) : re.test(value);

  // regardless, it's not valid
  if (!value) passed = false;

  const getColor = () => (passed ? green[500] : red[500]);
  const getIcon = () => (passed ? <Check /> : <Close />);

  return (
    <ListItem dense style={{ padding: 0, margin: 0 }}>
      <ListItemIcon style={{ color: getColor() }}>
        {getIcon()}
      </ListItemIcon>
      <ListItemText
        primary={t(name)}
        style={{ margin: 0 }}
        primaryTypographyProps={{
          style: { fontSize: '0.877rem' },
        }}
      />
    </ListItem>
  );
};

NewPasswordHelperText.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  re: PropTypes.oneOfType([
    PropTypes.shape({ test: PropTypes.func }),
    PropTypes.func,
  ]).isRequired,
};

export default NewPasswordHelperText;
