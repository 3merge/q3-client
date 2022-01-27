import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import Tooltip from '../tooltip';
import useStyle, { getColor } from './useStyle';

const getFirstLetter = (v) =>
  typeof v === 'string' ? v.toUpperCase().charAt(0) : '';

const shouldDisplay = (v) =>
  typeof v === 'object' && v !== null;

const useBrokenLinkChecker = (imgSrc, setFallback) => {
  const [src, setSrc] = React.useState(imgSrc);

  const onError = React.useCallback(() => {
    if (src && src !== null) {
      setSrc(null);
      setFallback(<BrokenImageIcon />);
    }
  }, [imgSrc]);

  return { src, onError };
};

// eslint-disable-next-line
export const WithBadge = ({
  children,
  className,
  superscript,
}) =>
  superscript ? (
    <Badge badgeContent={superscript} className={className}>
      {children}
    </Badge>
  ) : (
    children
  );

// eslint-disable-next-line
export const WithTooltip = ({ children, tooltip }) =>
  tooltip ? (
    <Tooltip arrow title={tooltip}>
      {children}
    </Tooltip>
  ) : (
    children
  );

const ColoredAvatar = ({
  word,
  superscript,
  imgSrc,
  icon: Icon,
  large,
  onClick,
  tooltip,
}) => {
  const letter = getFirstLetter(word);
  const [text, setText] = React.useState(
    Icon ? <Icon /> : letter,
  );

  const { src, onError } = useBrokenLinkChecker(
    imgSrc,
    setText,
  );

  const cls = useStyle({
    ...getColor(letter),
    onClick,
    large,
  });

  React.useEffect(() => {
    if (!text && !src) setText(letter);
  }, [text, src]);

  const getChildren = () => {
    const Ic = imgSrc;
    if (Ic && typeof Ic !== 'string') return <Ic />;

    return shouldDisplay(src) ? src : text;
  };

  const getAvatarProps = () => {
    const commons = {
      imgProps: { onError },
      className: cls.root,
      alt: String(word),
      src,
    };

    if (onClick)
      Object.assign(commons, {
        tabIndex: 0,
        onKeyPress: onClick,
        onClick,
      });

    return commons;
  };

  return (
    <WithTooltip tooltip={tooltip}>
      <WithBadge
        superscript={superscript}
        className={cls.badge}
      >
        <Avatar {...getAvatarProps()} variant="rounded">
          {getChildren()}
        </Avatar>
      </WithBadge>
    </WithTooltip>
  );
};

ColoredAvatar.propTypes = {
  word: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  imgSrc: PropTypes.string,
  superscript: PropTypes.number,
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func,
  ]),

  large: PropTypes.bool,
  onClick: PropTypes.func,
  tooltip: PropTypes.string,
};

ColoredAvatar.defaultProps = {
  superscript: 0,
  word: '',
  imgSrc: null,
  icon: null,
  large: false,
  onClick: null,
  tooltip: null,
};

export default ColoredAvatar;
