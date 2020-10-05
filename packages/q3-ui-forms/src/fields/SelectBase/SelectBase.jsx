import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextBase from '../TextBase';
import withGrid from '../withGrid';

const SelectBase = ({
  disabled,
  loading,
  items,
  required,
  children,
  SelectProps,
  ...props
}) => (
  <TextBase
    {...props}
    select
    xl={12}
    lg={12}
    md={12}
    required={required}
    disabled={disabled || loading}
    InputLabelProps={{
      shrink: true,
    }}
    SelectProps={{
      ...SelectProps,
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
    {children}
  </TextBase>
);

SelectBase.defaultProps = {
  disabled: false,
  loading: false,
  items: [],
  value: '',
  required: false,
};

SelectBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
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
  SelectProps: PropTypes.shape({
    native: PropTypes.bool,
    multiple: PropTypes.bool,
  }).isRequired,
};

export default withGrid(SelectBase);
