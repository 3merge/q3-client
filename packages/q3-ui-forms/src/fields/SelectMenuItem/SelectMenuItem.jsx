import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';

const SelectMenuItem = ({
  loading,
  items,
  required,
  loadingLabel,
  chooseOptionLabel,
}) => {
  const { t } = useTranslation('labels');

  return (
    <>
      <option
        value=""
        aria-label={t('unselected')}
        disabled={required}
      >
        {t(loading ? loadingLabel : chooseOptionLabel)}
      </option>
      {items.map((obj, i) => (
        <option key={i} value={obj.value}>
          {t(obj.label, obj.vars)}
        </option>
      ))}
    </>
  );
};

SelectMenuItem.defaultProps = {
  loading: false,
  items: [],
  required: false,
  loadingLabel: 'Loading ...',
  chooseOptionLabel: 'Choose option(s)',
};

SelectMenuItem.propTypes = {
  loading: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  required: PropTypes.bool,
  loadingLabel: PropTypes.string,
  chooseOptionLabel: PropTypes.string,
};

export default SelectMenuItem;
