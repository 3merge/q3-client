import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { withLocation } from 'with-location';
import Filter from '@material-ui/icons/FilterList';
import { StickyPopover } from '../stickyIconNavigator';

export const removeUncontrollableFilterProps = (params) => {
  params.delete('page');
  params.delete('search');
  params.delete('limit');
  params.delete('sort');
};

export const countParams = (params) => {
  try {
    return params
      .toString()
      .split('&')
      .filter(Boolean).length;
  } catch (e) {
    return 0;
  }
};

const FilterConfig = ({ renderFilter, params }) => {
  removeUncontrollableFilterProps(params);
  const { t } = useTranslation('labels');

  return (
    renderFilter && (
      <StickyPopover
        count={countParams(params)}
        id="filter-configurator"
        label={t('filter')}
        icon={Filter}
      >
        {renderFilter()}
      </StickyPopover>
    )
  );
};

FilterConfig.propTypes = {
  renderFilter: PropTypes.func,
  params: PropTypes.shape({
    delete: PropTypes.func,
    toString: PropTypes.func,
  }).isRequired,
};

FilterConfig.defaultProps = {
  renderFilter: null,
};

export default withLocation(FilterConfig);
