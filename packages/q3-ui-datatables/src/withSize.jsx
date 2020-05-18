import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { browser } from 'q3-ui-helpers';
import useStyles from './utils/useStyles';

export default (Component) => (props) => {
  const { tableHead } = useStyles();
  const [width, setWidth] = React.useState();
  const { title } = props;

  React.useEffect(() => {
    if (!browser.isBrowserReady()) return undefined;

    const calculateCellWidth = () => {
      const els = Array.from(
        document.querySelectorAll(`[headers^=${title}]`),
      );

      if (Array.isArray(els))
        setWidth(
          els.reduce((prev, next) => {
            return prev < next.clientWidth
              ? next.clientWidth
              : prev;
          }, 85),
        );
    };

    window.addEventListener('resize', calculateCellWidth);
    calculateCellWidth();

    return () => {
      window.removeEventListener(
        'resize',
        calculateCellWidth,
      );
    };
  }, []);

  return (
    <TableCell
      id={title}
      component="div"
      variant="head"
      className={tableHead}
      style={{
        borderBottomWidth: '3px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        minWidth: width,
        maxWidth: width,
        width,
      }}
    >
      <Component {...props} />
    </TableCell>
  );
};
