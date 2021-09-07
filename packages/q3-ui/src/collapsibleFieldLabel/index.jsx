import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Collapse from '@material-ui/core/Collapse';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import KeyboardDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardUp from '@material-ui/icons/KeyboardArrowUp';

const makeId = (v) =>
  `${
    typeof v === 'string'
      ? v.toLowerCase().replace(/\s/g, '-')
      : ''
  }-checkset-options`;

export const renderKeyboardIcon = (
  shouldCollapse,
  show,
) => {
  if (!shouldCollapse) return null;
  return show ? <KeyboardUp /> : <KeyboardDown />;
};

export const CollapsibleFieldLabel = ({
  label,
  error,
  helperText,
  children,
  collapse,
  required,
}) => {
  const [show, setShow] = React.useState(true);
  const toggle = () => setShow(!show);
  const id = makeId(label);

  const buttonStyle = {
    justifyContent: 'left',
    marginBottom: '0.5rem',
  };

  if (!collapse)
    Object.assign(buttonStyle, {
      marginBottom: 0,
      padding: 0,
      textTransform: 'none',
    });

  return (
    <FormControl
      style={{ display: 'block' }}
      component="fieldset"
    >
      {label && (
        <Button
          aria-controls={id}
          aria-expanded={show}
          role="button"
          onClick={toggle}
          disabled={!collapse}
          style={buttonStyle}
        >
          {renderKeyboardIcon(collapse, show)}
          <Typography component="legend">
            {label} {required && '*'}
          </Typography>
        </Button>
      )}
      <Collapse id={id} in={show}>
        <Box mb={1}>{children}</Box>
      </Collapse>
      {helperText && (
        <FormHelperText error={error}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

CollapsibleFieldLabel.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  collapse: PropTypes.bool,
  required: PropTypes.bool,
};

CollapsibleFieldLabel.defaultProps = {
  collapse: true,
  error: false,
  helperText: null,
  required: false,
};

export default CollapsibleFieldLabel;
