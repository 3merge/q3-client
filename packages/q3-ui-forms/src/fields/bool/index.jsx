import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { grey, red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  control: ({ error }) => ({
    color: error ? red[900] : grey[900],
    lineHeight: 1.2,
    '& strong': {
      display: 'block',
    },
  }),
}));

export const getBoolVariant = (name) => {
  if (name === 'switch') return Switch;
  if (name === 'radio') return Radio;
  return Checkbox;
};

export const ExpandedBoolLabel = ({
  error,
  helperText,
  label,
}) => {
  const { control } = useStyles({ error });

  return helperText ? (
    <Typography variant="subtitle1" className={control}>
      <strong>{label}</strong>
      <small>{helperText}</small>
    </Typography>
  ) : (
    <Typography component="span" className={control}>
      {label}
    </Typography>
  );
};

ExpandedBoolLabel.propTypes = {
  /**
   * Label for the HTML checkbox.
   */
  label: PropTypes.string.isRequired,

  /**
   * Description text to provide context for label.
   */
  helperText: PropTypes.string,

  /**
   * Is the current value invalid?
   */
  error: PropTypes.bool,
};

ExpandedBoolLabel.defaultProps = {
  error: false,
  helperText: null,
};

const Bool = ({
  label,
  vars,
  onChange,
  variant,
  ...rest
}) => {
  const ControlVariant = getBoolVariant(variant);
  const { t } = useTranslation('labels');

  Object.assign(rest, {
    size: 'small',
  });

  return (
    <Box>
      <FormControlLabel
        control={<ControlVariant {...rest} />}
        label={
          <ExpandedBoolLabel
            label={t(label, vars)}
            {...rest}
          />
        }
        key={label}
        onChange={onChange}
        {...rest}
      />
    </Box>
  );
};

Bool.propTypes = {
  /**
   * The react-i18next label key.
   */

  label: PropTypes.string.isRequired,

  /**
   * The HTML name attr value.
   */

  name: PropTypes.string.isRequired,

  /**
   * Whichever variables you'd like to pass into the useTranslation label.
   */
  vars: PropTypes.shape({}),

  /**
   * The onChange func handler.
   */
  onChange: PropTypes.func.isRequired,

  /**
   * The type of control to display.
   */
  variant: PropTypes.oneOf(['switch', 'radio', 'checkbox']),
};

Bool.defaultProps = {
  vars: {},
  variant: 'checkbox',
};

export default Bool;
