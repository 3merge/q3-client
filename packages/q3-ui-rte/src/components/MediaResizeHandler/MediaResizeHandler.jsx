import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';
import { Hidden } from '@material-ui/core';

const SIZE = 12;

const LEGEND = {
  ne: {
    cursor: 'sw-resize',
    directions: ['right', 'top'],
  },
  se: {
    cursor: 'nw-resize',
    directions: ['bottom', 'right'],
  },
  sw: {
    cursor: 'ne-resize',
    directions: ['bottom', 'left'],
  },
  nw: {
    cursor: 'se-resize',
    directions: ['left', 'top'],
  },
};

const useStyles = makeStyles((theme) => ({
  root: (coordinates = {}) => ({
    ...coordinates,
    backgroundColor: theme.palette.secondary.main,
    boxSizing: 'border-box',
    height: SIZE,
    position: 'absolute',
    width: SIZE,
  }),
}));

const MediaResizeHandler = React.forwardRef(
  ({ coordinate, offset }, ref) => {
    const match = get(LEGEND, coordinate, {});
    const cls = useStyles(
      get(match, 'directions', []).reduce(
        (acc, curr) => ({
          [curr]: offset,
          ...acc,
        }),
        {
          cursor: match?.cursor,
        },
      ),
    );

    const innerRef = React.useRef();

    const handleMouseDown = (evt) => {
      if (!ref.current) return;

      const state = {
        dragBox: evt.target,
        dragStartX: evt.clientX,
        preDragWidth:
          ref.current.width || ref.current.naturalWidth,
      };

      const handleDrag = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        if (!ref.current) return;

        const deltaX = ev.clientX - state.dragStartX;

        ref.current.width = ['nw', 'sw'].includes(
          coordinate,
        )
          ? Math.round(state.preDragWidth - deltaX)
          : Math.round(state.preDragWidth + deltaX);
      };

      document.addEventListener(
        'mousemove',
        handleDrag,
        false,
      );

      document.addEventListener(
        'mouseup',
        () => {
          document.removeEventListener(
            'mousemove',
            handleDrag,
          );
        },
        false,
      );
    };

    React.useEffect(() => {
      if (!innerRef.current) return;

      innerRef.current.addEventListener(
        'mousedown',
        handleMouseDown,
      );

      return () => {
        if (innerRef.current)
          innerRef.current.removeEventListener(
            'mousedown',
            handleMouseDown,
          );
      };
    }, []);

    return <span ref={innerRef} className={cls.root} />;
  },
);

MediaResizeHandler.defaultProps = {
  offset: -(SIZE / 2),
};

MediaResizeHandler.propTypes = {
  coordinate: PropTypes.oneOf(Object.keys(LEGEND))
    .isRequired,
  offset: PropTypes.number,
};

export default MediaResizeHandler;
