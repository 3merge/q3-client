import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextBase from '../TextBase';

const SelectBase = ({
  disabled,
  loading,
  items,
  value,
  required,
  ...props
}) => {
  const { t } = useTranslation('labels');

  return (
    <TextBase
      {...props}
      select
      lg={12}
      md={12}
      required={required}
      disabled={disabled || loading}
      SelectProps={{
        native: true,
        IconComponent: loading
          ? () => (
              <CircularProgress
                size="12px"
                style={{
                  marginRight: '1rem',
                  fontSize: 12,
                }}
              />
            )
          : undefined,
      }}
    >
      <option
        value=""
        aria-label={t('unselected')}
        disabled={required}
      />
      {items.map((obj) => (
        <option key={obj.value} value={obj.value}>
          {t(obj.label, obj.vars)}
        </option>
      ))}
    </TextBase>
  );
};

SelectBase.defaultProps = {
  disabled: false,
  loading: false,
  items: [],
  value: '',
  required: false,
};

SelectBase.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  value: PropTypes.string,
  required: PropTypes.bool,
};

export default SelectBase;
