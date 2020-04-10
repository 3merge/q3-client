import React from 'react';
import PropTypes from 'prop-types';
import Search from '@material-ui/icons/Search';
import ArrowBack from '@material-ui/icons/ArrowBack';
import AccessibleIconButton from '../iconButton';

export const SearchTrigger = ({ onClick }) => (
  <AccessibleIconButton
    label="search"
    buttonProps={{ onClick }}
    icon={Search}
  />
);

SearchTrigger.propTypes = {
  /**
   * Handler for button onClick events.
   */
  onClick: PropTypes.func.isRequired,
};

export const CloseTrigger = ({ onClick }) => (
  <AccessibleIconButton
    label="close"
    buttonProps={{ onClick }}
    icon={ArrowBack}
  />
);

CloseTrigger.propTypes = {
  /**
   * Handler for button onClick events.
   */
  onClick: PropTypes.func.isRequired,
};
