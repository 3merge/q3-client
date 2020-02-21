import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Collapse from '@material-ui/core/Collapse';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import KeyboardDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardUp from '@material-ui/icons/KeyboardArrowUp';

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
}) => {
  const [show, setShow] = React.useState(true);
  const toggle = () => setShow(!show);

  return (
    <FormControl
      style={{ display: 'block' }}
      component="fieldset"
    >
      <Button
        component={FormLabel}
        onClick={toggle}
        disabled={!collapse}
        style={{
          justifyContent: 'left',
          marginBottom: '0.5rem',
        }}
      >
        {renderKeyboardIcon(collapse, show)}
        <Typography component="legend">{label}</Typography>
      </Button>
      <Collapse in={show}>
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
};

CollapsibleFieldLabel.defaultProps = {
  collapse: true,
  error: false,
  helperText: null,
};

export default CollapsibleFieldLabel;
