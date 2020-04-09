import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { withLocation } from 'with-location';
import Filter from '@material-ui/icons/FilterList';
import { StickyPopover } from '../stickyIconNavigator';

const FilterConfig = ({ renderFilter, params }) => {
  const { t } = useTranslation('labels');

  return (
    renderFilter && (
      <StickyPopover
        count={
          params
            .toString()
            .split('&')
            .filter(Boolean).length
        }
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
};

FilterConfig.defaultProps = {
  renderFilter: null,
};

export default withLocation(FilterConfig);
