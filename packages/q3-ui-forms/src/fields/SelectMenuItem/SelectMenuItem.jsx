import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const SelectMenuItem = ({ loading, items, required }) => {
  const { t } = useTranslation('labels');

  return (
    <>
      <option
        value=""
        aria-label={t('unselected')}
        disabled={required}
      >
        {loading ? 'Loading ...' : 'Choose option(s)'}
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
};

export default SelectMenuItem;
