import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import useStyle from './styles';

export default (Component, prop) =>
  React.forwardRef((props, ref) => {
    const cls = useStyle();

    // eslint-disable-next-line
    return props[prop] ? ( // eslint-disable-next-line
      <Tooltip
        arrow
        classes={cls}
        ref={ref}
        title={props[prop]}
      >
        <span className={cls.indicator}>
          <Component {...props} />
        </span>
      </Tooltip>
    ) : (
      <Component {...props} />
    );
  });
