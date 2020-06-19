import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import { omit } from 'lodash';
import Radio from '@material-ui/core/Radio';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { grey, red } from '@material-ui/core/colors';
import withState from '../withState';

const useStyles = makeStyles(() => ({
  control: ({ error }) => ({
    color: error ? red[900] : grey[900],
    display: 'block',
    fontSize: '0.911rem',
    lineHeight: 1.2,
    margin: '0 !important',
  }),

  subtext: {
    color: grey[700],
    fontWeight: 200,
    fontSize: '0.911rem',
  },
}));

export const getBoolVariant = (name) => {
  if (name === 'switch') return Switch;
  if (name === 'radio') return Radio;
  return Checkbox;
};

export const getSize = (name) =>
  name === 'switch' ? 'normal' : 'small';

export const ExpandedBoolLabel = ({
  error,
  helperText,
  label,
}) => {
  const { control, subtext } = useStyles({ error });

  return helperText ? (
    <>
      <Typography
        component="strong"
        className={control}
        style={{ fontWeight: 800, fontSize: '1rem' }}
      >
        {label}
      </Typography>
      <Typography component="small" className={subtext}>
        {helperText}
      </Typography>
    </>
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
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

ExpandedBoolLabel.defaultProps = {
  error: false,
  helperText: null,
};

const Bool = ({
  label,
  vars,
  onChange,
  isChecked,
  variant,
  my,
  ...rest
}) => {
  const ControlVariant = getBoolVariant(variant);
  const { t } = useTranslation('labels');

  const cleaned = omit(
    Object.assign(rest, {
      size: getSize(variant),
    }),
    [
      'strict',
      'onArrayPull',
      'onArrayPush',
      'error',
      'helperText',
    ],
  );

  return (
    <Box my={0.5}>
      <FormControlLabel
        style={{ userSelect: 'none' }}
        control={
          <ControlVariant
            checked={isChecked}
            {...cleaned}
          />
        }
        label={
          <ExpandedBoolLabel
            label={t(label, vars)}
            {...rest}
          />
        }
        onChange={onChange}
        {...cleaned}
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

  name: PropTypes.string,

  /**
   * Whichever variables you'd like to pass into the useTranslation label.
   */
  vars: PropTypes.shape({}),

  /**
   * The onChange func handler.
   */
  onChange: PropTypes.func,

  /**
   * The type of control to display.
   */
  variant: PropTypes.oneOf(['switch', 'radio', 'checkbox']),

  /**
   * Is the checkbox on/off.
   */
  isChecked: PropTypes.bool,

  /**
   * Vertical margin value.
   */
  my: PropTypes.number,
};

Bool.defaultProps = {
  vars: {},
  variant: 'checkbox',
  name: null,
  isChecked: false,
  onChange: undefined,
  my: 0,
};

export default withState(Bool);
