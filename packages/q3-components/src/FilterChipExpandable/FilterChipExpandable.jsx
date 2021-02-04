import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import CheckIcon from '@material-ui/icons/Check';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import useStyle from './useStyle';

export const checkForTruthyValue = (name, value) =>
  value === true ||
  value === 'exists(true)' ||
  value === 'has(true)';

export const checkForFalsyValue = (name, value) =>
  String(name).includes('!') ||
  value === false ||
  value === 'exists(false)' ||
  value === 'has(false)';

const FilterChipExpandable = ({
  onDelete,
  label,
  icon,
  name,
  value,
}) => {
  let Icon = icon;
  let defaultLabel = value || name;

  if (checkForTruthyValue(name, value)) {
    defaultLabel = name;
    Icon = CheckIcon;
  }

  if (checkForFalsyValue(name, value))
    Icon = NotInterestedIcon;

  const [isExpanded, setIsExpanded] = React.useState(false);
  const [width, setWidth] = React.useState();
  const cls = useStyle({
    isExpanded,
  });

  const expanded = React.useRef();
  const shortened = React.useRef();

  const toggle = () => {
    if (isExpanded) {
      setWidth(shortened?.current?.offsetWidth);
      setIsExpanded(false);
    } else {
      setWidth(expanded?.current?.offsetWidth);
      setIsExpanded(true);
    }
  };

  React.useLayoutEffect(() => {
    setWidth(shortened?.current?.offsetWidth);
  }, []);

  return label ? (
    <span style={{ position: 'relative' }}>
      <div ref={shortened} className={cls.root}>
        {defaultLabel}
      </div>
      <div ref={expanded} className={cls.root}>
        {label}
      </div>
      <Chip
        onClick={toggle}
        icon={Icon ? <Icon /> : null}
        size="small"
        label={
          <div
            style={{
              position: 'relative',
              height: 32,
              transition: 'width 250ms',
              width,
            }}
          >
            <div className={cls.short}>{defaultLabel}</div>
            <div className={cls.long}>{label}</div>
          </div>
        }
        onDelete={onDelete}
        variant="outlined"
        style={{
          marginRight: '0.25rem',
          marginBottom: '0.25rem',
        }}
      />
    </span>
  ) : null;
};

FilterChipExpandable.defaultProps = {
  icon: null,
};

FilterChipExpandable.propTypes = {
  onDelete: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
  ]),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default FilterChipExpandable;
