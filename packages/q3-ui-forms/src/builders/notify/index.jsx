import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { orange } from '@material-ui/core/colors';
import AlertIcon from '@material-ui/icons/Warning';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: ({ shade }) =>
    shade
      ? {
          backgroundColor: shade[50],
          border: `1px solid ${shade[200]}`,
          color: shade[900],
          padding: theme.spacing(1),
        }
      : null,
  small: {
    margin: 0,
    fontSize: '0.933rem',
  },
}));

const FlexContainer = ({ children, shade }) => {
  const { root } = useStyle({ shade });

  return (
    <Box
      p={0.5}
      px={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      className={root}
    >
      {children}
    </Box>
  );
};

FlexContainer.propTypes = {
  /**
   * Controls the colour of the component.
   * Expects a color export from Material UI.
   */
  shade: PropTypes.shape({
    50: PropTypes.string,
    900: PropTypes.string,
  }).isRequired,

  /**
   * Content to place inside <div />.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const UppercaseSpan = ({ children }) => {
  const { small } = useStyle();

  return (
    <Box
      component="span"
      display="flex"
      alignItems="center"
      className={small}
    >
      {children}
    </Box>
  );
};

UppercaseSpan.propTypes = {
  /**
   * Text to place inside <span />.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const Notify = ({ show, title, children, shade }) => (
  <Collapse in={show}>
    <Box>
      <FlexContainer shade={shade}>
        <UppercaseSpan>
          <Box display="flex" alignItems="center" mr={0.5}>
            <AlertIcon />
          </Box>
          {title}
        </UppercaseSpan>
        {children}
      </FlexContainer>
    </Box>
  </Collapse>
);

Notify.propTypes = {
  /**
   * Toggles the visibility of this item without un-mounting it.
   */
  show: PropTypes.bool,

  /**
   * The text for this component.
   */
  title: PropTypes.string.isRequired,

  /**
   * Controls the colour of the component.
   * Expects a color export from Material UI.
   */
  shade: PropTypes.shape({
    50: PropTypes.string,
    900: PropTypes.string,
  }),

  /**
   * The notification component uses FlexBox with "space-between" justification.
   * This means that all children will render to the right of the text.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]),
};

Notify.defaultProps = {
  show: true,
  children: null,
  shade: orange,
};

export default Notify;
