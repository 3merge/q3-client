import React from 'react';
import { get, invoke } from 'lodash';
import useWindowEventHandler from './useWindowEventHandler';

export const MINIMUM_COLUMN_WIDTH = 125;
export const FIXED_COLUMN_WIDTH_AGGREGATE_VALUE = 325;

export const getExpectedColumnCount = (width, columns) =>
  Math.min(
    width > MINIMUM_COLUMN_WIDTH
      ? width /
          Math.min(
            Math.floor(width / MINIMUM_COLUMN_WIDTH),
            columns,
          )
      : MINIMUM_COLUMN_WIDTH,
    250,
  );

export const calculateWidth = (el, columns) =>
  getExpectedColumnCount(
    // we can't be certain the node has mounted yet
    get(invoke(el, 'getBoundingClientRect'), 'width') -
      FIXED_COLUMN_WIDTH_AGGREGATE_VALUE,
    columns,
  );

export default (columns = []) => {
  const node = React.useRef();
  const [width, setWidth] = React.useState(
    MINIMUM_COLUMN_WIDTH,
  );

  const getClientWidth = React.useCallback(() => {
    if (node.current !== undefined)
      setWidth(
        calculateWidth(node.current, columns.length),
      );
  }, [columns]);

  useWindowEventHandler(window, 'resize', getClientWidth);

  React.useEffect(() => {
    getClientWidth();
  }, [columns]);

  return [node, width];
};
