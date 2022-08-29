import React from 'react';
import PropTypes from 'prop-types';
import { get, map, uniqBy, isFunction } from 'lodash';
import { Box, Typography } from '@material-ui/core';
import useStyle from './useStyle';

export const applyFormatter = (formatter, value) =>
  isFunction(formatter) ? formatter(value) : value;

const TooltipList = ({ data, formatter }) => {
  const cls = useStyle();

  return (
    <Box
      className={cls.root}
      component="ul"
      margin={0}
      padding={0}
    >
      {map(uniqBy(data, 'name'), ({ name, payload }, i) => (
        <Typography
          className={cls.item}
          component="li"
          key={`${name}-${i}`}
        >
          <u>{name}</u>:{' '}
          {applyFormatter(formatter, get(payload, name))}
        </Typography>
      ))}
    </Box>
  );
};

TooltipList.defaultProps = {
  data: [],
  formatter: null,
};

TooltipList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      payload: PropTypes.shape({}),
    }),
  ),
  formatter: PropTypes.func,
};

export default TooltipList;
