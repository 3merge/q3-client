import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import { useActiveQueryParams } from 'q3-ui-queryparams';
import CheckIcon from '@material-ui/icons/Check';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
  root: {
    visibility: 'hidden',
    height: 0,
    position: 'absolute',
    fontSize: '0.659rem',
    whiteSpace: 'pre',
  },
  long: {
    visibility: (props) =>
      props.isExpanded ? 'visible' : 'none',
    opacity: (props) => (props.isExpanded ? '1' : '0'),
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'opacity 250ms',
  },
  short: {
    visibility: (props) =>
      props.isExpanded ? 'none' : 'visible',
    opacity: (props) => (props.isExpanded ? '0' : '1'),
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'opacity 250ms',
  },
}));

const DecoratedChip = ({
  onDelete,
  label,
  icon,
  name,
  value,
}) => {
  let Icon = icon;

  const isFalsy =
    String(name).includes('!') ||
    value === false ||
    value === 'exists(false)' ||
    value === 'has(false)';

  const isTruthy =
    value === true ||
    value === 'exists(true)' ||
    value === 'has(true)';

  if (isTruthy) Icon = CheckIcon;
  if (isFalsy) Icon = NotInterestedIcon;

  const defaultLabel = value && !isTruthy ? value : name;

  const [isExpanded, setIsExpanded] = React.useState(false);
  const [width, setWidth] = React.useState();
  const cls = useStyle({
    isExpanded,
  });

  const expanded = React.useRef();
  const shortened = React.useRef();

  const onMouseOver = () => {
    setWidth(expanded?.current?.offsetWidth);
    setIsExpanded(true);
  };

  const onMouseLeave = () => {
    setWidth(shortened?.current?.offsetWidth);
    setIsExpanded(false);
  };

  React.useLayoutEffect(() => {
    setWidth(shortened?.current?.offsetWidth);
  }, []);

  return label ? (
    <span
      onBlur={onMouseLeave}
      onFocus={onMouseOver}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      style={{ position: 'relative' }}
    >
      <div ref={shortened} className={cls.root}>
        {defaultLabel}
      </div>
      <div ref={expanded} className={cls.root}>
        {label}
      </div>
      <Chip
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
        icon={Icon ? <Icon /> : null}
      />
    </span>
  ) : null;
};

DecoratedChip.propTypes = {
  onDelete: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default (props) => {
  const chips = useActiveQueryParams(props.iconMap);

  return (
    chips.length > 0 && (
      <Box
        id="q3-filter-chips"
        display="inline-block"
        px={2}
      >
        {chips.map((chip) => (
          <DecoratedChip {...chip} />
        ))}
      </Box>
    )
  );
};
