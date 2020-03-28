import React from 'react';
import PropTypes from 'prop-types';
import Filter from '@material-ui/icons/FilterList';
import { StickyPopover } from '../stickyIconNavigator';

const FilterConfig = ({ renderFilter }) =>
  renderFilter && (
    <StickyPopover
      id="filter-configurator"
      label="filter"
      icon={Filter}
    >
      {renderFilter()}
    </StickyPopover>
  );

FilterConfig.propTypes = {
  renderFilter: PropTypes.func,
};

FilterConfig.defaultProps = {
  renderFilter: null,
};

export default FilterConfig;
