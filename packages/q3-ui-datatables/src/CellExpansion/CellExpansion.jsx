import React from 'react';
import { browser } from 'q3-ui-helpers';

const isOverflown = (node) =>
  node.scrollWidth > node.clientWidth;

const handleCursorResizeState = (e) => {
  e.currentTarget.style.cursor =
    isOverflown(e.currentTarget) ||
    e.currentTarget.getAttribute('aria-expanded') === 'true'
      ? 'ew-resize'
      : undefined;
};

const handleCellResizeEvent = (id) => () => {
  const nodes = Array.from(
    document.querySelectorAll(`[data-q3-cell=${id}]`),
  );

  const hasOverflow = nodes.some(isOverflown);

  nodes.forEach((node) => {
    // eslint-disable-next-line
    node.style.width = hasOverflow ? '255px' : null;
    node.setAttribute('aria-expanded', hasOverflow);
  });
};

const Cell = ({ id, className, children }) => {
  const ref = React.useRef();
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    const handleDisabledState = () => {
      if (ref.current) {
        const hasOverflow = isOverflown(ref.current);
        setDisabled(!hasOverflow);
        ref.current.setAttribute(
          'aria-expanded',
          hasOverflow,
        );
      }
    };

    if (!browser.isBrowserReady()) return undefined;

    window.addEventListener('resize', handleDisabledState);
    handleDisabledState();

    return () => {
      window.removeEventListener(
        'resize',
        handleDisabledState,
      );
    };
  }, [ref.current]);

  return (
    <button
      ref={ref}
      data-q3-cell={id}
      tabIndex={disabled ? -1 : 0}
      aria-expanded="false"
      className={className}
      style={{
        border: 0,
        backgroundColor: '#FFF',
        color: 'inherit',
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'left',
      }}
      onFocus={handleCursorResizeState}
      onMouseOver={handleCursorResizeState}
      onClick={handleCellResizeEvent(id)}
      type="button"
    >
      {children}
    </button>
  );
};

export default Cell;
