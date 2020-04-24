import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { withLocation } from 'with-location';
import Filter from '@material-ui/icons/FilterList';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { object } from 'q3-ui-helpers';
import { StickyPopover } from '../stickyIconNavigator';

const { invokeSafely, isFn } = object;

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

const buildTabs = (fns) =>
  fns.map(({ renderer, label }, i) => (
    <Tab
      key={label}
      value={i}
      label={label}
      disabled={!isFn(renderer)}
    />
  ));

export const FilterConfig = ({
  renderFilter,
  renderFilterTemplates,
  renderReports,
  params,
}) => {
  removeUncontrollableFilterProps(params);
  const { t } = useTranslation('labels');
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleOnChange = (e, num) => setTabIndex(num);
  const renderers = [
    {
      renderer: renderFilter,
      label: t('byField'),
    },
    {
      renderer: renderFilterTemplates,
      label: t('byPreset'),
    },
    {
      renderer: renderReports,
      label: t('genReport'),
    },
  ];

  return (
    renderFilter && (
      <StickyPopover
        id="filter-configurator"
        count={countParams(params)}
        label={t('filter')}
        icon={Filter}
      >
        <Tabs value={tabIndex} onChange={handleOnChange}>
          {buildTabs(renderers)}
        </Tabs>
        <Box py={1}>
          {renderers[tabIndex] &&
            invokeSafely(renderers[tabIndex].renderer)}
        </Box>
      </StickyPopover>
    )
  );
};

FilterConfig.propTypes = {
  renderFilter: PropTypes.func,
  renderFilterTemplates: PropTypes.func,
  renderReports: PropTypes.func,
  params: PropTypes.shape({
    delete: PropTypes.func,
    toString: PropTypes.func,
  }).isRequired,
};

FilterConfig.defaultProps = {
  renderFilter: null,
  renderReports: null,
  renderFilterTemplates: null,
};

export default withLocation(FilterConfig);
