import React from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import Close from '@material-ui/icons/Close';
import { withLocation } from 'with-location';
import AccessibleIconButton from '../iconButton';
import { SearchTrigger } from './triggers';

export const hasLength = (v) =>
  typeof v === 'string' && v.length > 0;

export const Adornment = withLocation(
  ({ children, term, clearByName, focus }) => (
    <InputAdornment position="end">
      <Fade in={hasLength(term)}>
        <div>
          <AccessibleIconButton
            name="search"
            label="clear"
            icon={Close}
            buttonProps={{
              onClick: clearByName(focus),
              name: 'search',
            }}
          />
        </div>
      </Fade>
      {children}
    </InputAdornment>
  ),
);

const ExpandedSearchField = ({
  onClick,
  onFocus,
  value,
  innerRef,
  ...rest
}) => (
  <Hidden smDown>
    <TextField
      {...rest}
      value={value}
      inputRef={innerRef}
      id="header-searchbar"
      variant="outlined"
      InputProps={{
        endAdornment: (
          <Adornment term={value} focus={onFocus}>
            <SearchTrigger onClick={onClick} />
          </Adornment>
        ),
      }}
    />
  </Hidden>
);

ExpandedSearchField.propTypes = {
  /**
   * Handler for input adornment icon.
   */
  onClick: PropTypes.func.isRequired,

  /**
   * Handler for input focus event.
   */
  onFocus: PropTypes.func.isRequired,

  /**
   * React ref to pass to internal <TextField /> component.
   */
  innerRef: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,

  /**
   * Establishes local search state value.
   */
  value: PropTypes.string,
};

ExpandedSearchField.defaultProps = {
  value: '',
};

export default ExpandedSearchField;
